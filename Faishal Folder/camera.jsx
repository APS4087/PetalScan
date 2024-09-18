import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import { Camera } from 'expo-camera/legacy';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function CameraScreen() {
  const router = useRouter();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [focusDepth, setFocusDepth] = useState(0.5); // Default focus depth for tap-to-focus
  const [pictureCount, setPictureCount] = useState(3); // Free users can take 3 pictures per day
  const [pictureLimit] = useState(3); // Total allowed pictures per day
  const cameraRef = useRef(null);
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      // Request camera permission
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');

      // Request gallery permission
      const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (pictureCount > 0) {
      if (cameraRef.current) {
        try {
          const { uri } = await cameraRef.current.takePictureAsync();
          console.log('Picture taken:', uri);
          setPictureCount(pictureCount - 1); // Decrease picture count by 1
        } catch (error) {
          console.error('Error taking picture:', error);
        }
      }
    } else {
      Alert.alert('Limit Reached', 'You have reached your daily limit. Purchase a snaps bundle for more!');
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
        <Text style={styles.snapsText}>Snaps Remaining: {pictureCount} / {pictureLimit}</Text>
      </View>

      {/* Purchase Snaps Bundle */}
      <View style={styles.purchaseContainer}>
        <TouchableOpacity onPress={() => router.push('/payment')}>
          <Text style={styles.purchaseText}>Purchase snaps bundle</Text>
        </TouchableOpacity>
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
            autoFocus={Camera.Constants.AutoFocus.off} // Disable default autofocus
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
          <Image source={{ uri: selectedImage }} style={[styles.previewImage, { width: screenWidth, height: screenWidth }]} />
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
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  topShadowBar: {
    position: 'absolute',
    top: 45,
    width: '100%',
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 0,
  },
  snapsContainer: {
    position: 'absolute',
    top: 90, // Position it above the purchase container
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFA500', // Orange background
    borderRadius: 20, // Rounded corners
    zIndex: 2,
  },
  snapsText: {
    color: 'white',
    fontWeight: 'bold',
  },
  purchaseContainer: {
    position: 'absolute',
    top: 150, // Adjusted to be below the snapsContainer
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#26CB63',
    borderRadius: 20, // Corner radius for purchase container
    zIndex: 2, // Ensure it's above the camera
  },
  purchaseText: {
    color: 'white',
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontWeight: 'bold',
  },
  bottomShadowBar: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    height: 130,
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
    padding: 30,
  },
  previewContainer: {
    alignItems: 'center',
    padding: 10,
  },
  previewText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  previewImage: {
    resizeMode: 'cover',
  },
});
