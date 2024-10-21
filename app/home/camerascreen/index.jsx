import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Icon from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() { 
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [pictureCount, setPictureCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [resultLabel, setResultLabel] = useState(''); // State for the detection result

  // Request permission for media library
  useEffect(() => {
    (async () => {
      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (pictureCount > 0) {
      if (hasGalleryPermission) {
        try {
          let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
  
          console.log(result);  // Check the result structure
  
          if (!result.canceled && result.assets && result.assets[0].uri) {
            setSelectedImage(result.assets[0].uri);
            setPictureCount(pictureCount - 1); // Decrease picture count by 1
            savePictureToGallery(result.assets[0].uri); // Save the picture to the gallery
            handleImageDetection(result.assets[0].uri);  // Perform image detection
          }
        } catch (error) {
          console.error('Error taking picture:', error);
        }
      } else {
        Alert.alert('Permission Denied', 'Camera and gallery permissions are required to take pictures.');
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

  const pickImageFromGallery = async () => {
    if (hasGalleryPermission) {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled && result.assets && result.assets[0].uri) {
          setSelectedImage(result.assets[0].uri);
          await handleImageDetection(result.assets[0].uri);  // Perform image detection
        }
      } catch (error) {
        console.error('Error picking image:', error);
      }
    } else {
      Alert.alert('Permission Denied', 'Gallery permission is required to access photos.');
    }
  };

  // Send image to the API for prediction
  const handleImageDetection = async (uri) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', {
      uri: uri,
      name: 'photo.jpg',
      type: 'image/jpeg', 
    });

    try {
      const response = await fetch('http://3.26.10.254:8000/predict/', {  
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
      console.log('API Response:', data); // Debug log to see the response structure

      if (data && data.predicted_label) {
        setResultLabel(data.predicted_label); // Update the result label based on response
        Alert.alert('Detection Result', `Detected: ${data.predicted_label}`);
      } else {
        Alert.alert('Error', 'No valid prediction returned from the server.');
      }
    } catch (error) {
      console.error('Error in image detection:', error);
      Alert.alert('Error', 'There was an error processing your image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#fff" style={{ position: 'absolute', top: height * 0.5 }} />
      )}

      {/* Top shadow bar with back button */}
      <View style={styles.topShadowBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Snaps Remaining Display */}
      <View style={styles.snapsContainer}>
        {pictureCount > 0 ? (
          <Text style={styles.snapsText}>Snaps Remaining: {pictureCount} / 3</Text>
        ) : (
          <TouchableOpacity onPress={() => router.push('/payment')}>
            <Text style={styles.snapsText}>Purchase more snaps</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Bottom shadow bar with centered icons */}
      <View style={styles.bottomShadowBar}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={pickImageFromGallery}>
            <Icon name="photo-library" size={50} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={takePicture}>
            <Icon name="photo-camera" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image preview */}
      {selectedImage ? (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Selected Image:</Text>
          <Image source={{ uri: selectedImage }} style={[styles.previewImage, { width: width * 0.8, height: width * 0.8 }]} />
        </View>
      ) : (
        <Text style={styles.previewText}>No image selected yet.</Text>
      )}

      {/* Show result label */}
      {resultLabel !== '' && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Prediction Result: {resultLabel}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  topShadowBar: {
    position: 'absolute',
    top: height * 0.05,
    width: '100%',
    height: height * 0.08,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: width * 0.04,
  },
  backButton: {
    padding: 0,
  },
  snapsContainer: {
    position: 'absolute',
    top: height * 0.2,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.01,
    backgroundColor: 'rgba(175, 225, 175, 0.4)',
    borderRadius: 20,
    zIndex: 2,
  },
  snapsText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bottomShadowBar: {
    position: 'absolute',
    bottom: height * 0.04,
    width: '100%',
    height: height * 0.16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  iconButton: {
    padding: 10,
  },
  previewContainer: {
    position: 'absolute',
    bottom: height * 0.25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewText: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  previewImage: {
    resizeMode: 'contain',
  },
  resultContainer: {
    position: 'absolute',
    top: height * 0.6,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
    elevation: 5, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  resultText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});