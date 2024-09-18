import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function CameraScreen() {
  const router = useRouter();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [focusDepth, setFocusDepth] = useState(0.5); // Default focus depth for tap-to-focus
  const [pictureCount, setPictureCount] = useState(3); // Free users can take 3 pictures per day
  const [pictureLimit] = useState(3); // Total allowed pictures per day
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      // Request camera permission
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      // Request gallery permission
      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus === 'granted');

      // Request media library permission
      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();
      setHasGalleryPermission(mediaLibraryStatus === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (pictureCount > 0) {
      if (cameraRef.current) {
        try {
          const { uri } = await cameraRef.current.takePictureAsync();
          console.log('Picture taken:', uri);
          setPictureCount(pictureCount - 1); // Decrease picture count by 1
          savePictureToGallery(uri); // Save the picture to the gallery
        } catch (error) {
          console.error('Error taking picture:', error);
        }
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

        if (!result.cancelled) {
          setSelectedImage(result.uri);
          console.log('Image selected from gallery:', result.uri);
        }
      } catch (error) {
        console.error('Error picking image:', error);
      }
    } else {
      console.log('Gallery permission is required.');
    }
  };

  const handleTapToFocus = async (event) => {
    // Adjust focus depth based on the tap
    const { locationY } = event.nativeEvent;
    const screenHeight = Dimensions.get('window').height;

    // Calculate focus depth based on tap location
    const calculatedDepth = locationY / screenHeight;
    setFocusDepth(calculatedDepth);
    console.log('Focus depth set to:', calculatedDepth);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top shadow bar with back button */}
      <View style={styles.topShadowBar}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Snaps Remaining Display */}
      <View style={styles.snapsContainer}>
        {pictureCount > 0 ? (
          <Text style={styles.snapsText}>Snaps Remaining: {pictureCount} / {pictureLimit}</Text>
        ) : (
          <TouchableOpacity onPress={() => router.push('/payment')}>
            <Text style={styles.snapsText}>Purchase more snaps</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Camera with Tap-to-Focus */}
      <View style={styles.cameraContainer} onTouchEnd={handleTapToFocus}>
        {hasCameraPermission === null ? (
          <Text>Waiting for camera permission...</Text>
        ) : hasCameraPermission === false ? (
          <Text>Camera permission denied.</Text>
        ) : (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={Camera.Constants.Type.back}
            focusDepth={focusDepth} // Control focus depth based on tap
            autoFocus={Camera.Constants.AutoFocus.on} // Enable autofocus
          />
        )}
      </View>

      {/* Bottom shadow bar with centered icons */}
      <View style={styles.bottomShadowBar}>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.iconButton} onPress={pickImageFromGallery}>
            <Icon name="photo-library" size={50} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={takePicture}>
            <MaterialIcons name="photo-camera" size={50} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image preview */}
      {selectedImage && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Selected Image:</Text>
          <Image source={{ uri: selectedImage }} style={[styles.previewImage, { width: width * 0.8, height: width * 0.8 }]} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraContainer: {
    width: '100%',
    height: width * 4 / 3, // 3:4 aspect ratio
    marginTop: height * 0.18,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center', // Center the camera container
  },
  camera: {
    flex: 1,
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
    top: height * 0.2, // Position it above the camera container
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: height * 0.01,
    backgroundColor: 'rgba(175, 225, 175, 0.4)', // Orange background with 40% opacity
    borderRadius: 20, // Rounded corners
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
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: width * 0.08,
  },
  previewContainer: {
    alignItems: 'center',
    padding: height * 0.02,
  },
  previewText: {
    color: 'white',
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  previewImage: {
    resizeMode: 'cover',
  },
});