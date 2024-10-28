import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert, Dimensions, ActivityIndicator, Image } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import * as MediaLibrary from 'expo-media-library';
import Icon from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const SERVER_URL = 'http://3.26.10.254:8000/';

export default function CameraScreen() {
  const router = useRouter();
  const cameraRef = useRef(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pictureCount, setPictureCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [resultLabel, setResultLabel] = useState('');
  const [zoom, setZoom] = useState(0);
  const [scale, setScale] = useState(1); // State for pinch scale

  // Set the camera height to maintain the aspect ratio
  const cameraHeight = width * (4 / 3); // 4:3 aspect ratio for the camera

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
      const { status: galleryStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasGalleryPermission(galleryStatus === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (pictureCount > 0 && cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({ quality: 1 });
        setSelectedImage(photo.uri); // Set the captured image URI
        setPictureCount(pictureCount - 1);
        savePictureToGallery(photo.uri);
        handleImageDetection(photo.uri); // Call for image processing
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    } else {
      Alert.alert('Limit Reached', 'You have reached your daily limit. Purchase a snaps bundle for more!');
    }
  };

  const savePictureToGallery = async (uri) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('Camera', asset, false);
      console.log('Picture saved to gallery:', asset);
    } catch (error) {
      console.error('Error saving picture to gallery:', error);
    }
  };

  const handleImageDetection = async (uri) => {
    setLoading(true); // Start loading only for processing
    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
  
    try {
      const response = await fetch(`${SERVER_URL}predict/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      if (data && data.predicted_label) {
        setResultLabel(data.predicted_label);
      } else {
        Alert.alert('Error', 'No valid prediction returned from the server.');
      }
    } catch (error) {
      console.error('Error in image detection:', error);
      Alert.alert('Error', 'There was an error processing your image.');
    } finally {
      setLoading(false); // End loading
    }
  };
  

  const onPinchEvent = (event) => {
    const { scale: newScale } = event.nativeEvent;
    if (newScale > 1) {
      setScale(newScale);
      setZoom(Math.min(newScale - 1, 1)); // Limit zoom to max of 1
    } else {
      setScale(1);
      setZoom(0); // Reset zoom when pinch is released
    }
  };

  const resetPrediction = () => {
    setSelectedImage(null); // Clear the selected image
    setResultLabel(''); // Clear the prediction result
    setPictureCount(3); // Reset the picture count if needed
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        {loading && <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />}
        
        <View style={styles.cameraWrapper}>
          <PinchGestureHandler onGestureEvent={onPinchEvent}>
            <Camera style={[styles.camera, { height: cameraHeight }]} ref={cameraRef} ratio="4:3" zoom={zoom} />
          </PinchGestureHandler>
        </View>

        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icon name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.snapsText}>Snaps: {pictureCount} / 3</Text>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.iconButton} onPress={resetPrediction}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
            <View style={styles.innerCaptureButton} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="settings" size={40} color="white" />
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        )}

        {selectedImage && !loading && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            {resultLabel !== '' && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>Prediction Result: {resultLabel}</Text>
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    overflow: 'hidden',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  camera: {
    width: '100%',
    justifyContent: 'flex-end',
  },
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  topBar: {
    position: 'absolute',
    top: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  backButton: {
    padding: 5,
  },
  snapsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCaptureButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
  },
  previewContainer: {
    position: 'absolute',
    bottom: height * 0.2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '80%', // Responsive width
    height: undefined, // Allow height to adjust based on aspect ratio
    aspectRatio: 1, // Maintain aspect ratio
    resizeMode: 'contain',
  },
  resultContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    width: '100%', // Allow full width
    alignSelf: 'center', // Center the container horizontally
    maxWidth: '90%', // Optional: limit max width to avoid edge-to-edge stretching
  },
  
  resultText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center', // Center text alignment
    flexWrap: 'wrap', // Allow text to wrap
    lineHeight: 24, // Optional: Improve readability with line height
    flexShrink: 1, // Allow text to shrink to fit within container
  },
  
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});
