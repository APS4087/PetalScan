import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera,  CameraType } from 'expo-camera/legacy';

export default function CameraScreen() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        console.log('Picture taken:', uri);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cameraContainer}>
        {hasCameraPermission === null ? (
          <Text>Waiting for camera permission...</Text>
        ) : hasCameraPermission === false ? (
          <Text>Camera permission denied.</Text>
        ) : (
          <Camera
            style={styles.camera}
            type={Camera.Constants.Type.back}
            ref={cameraRef}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={takePicture}>
          <Image source={require('../../../assets/Icons/capimage.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  icon: {
    width: 70,
    height: 70,
  },
});
