import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';


const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhotoUri(photo.uri);  // Save the photo URI
      // Optionally save it to the media library:
      await MediaLibrary.createAssetAsync(photo.uri);
    }
  };

  if (hasPermission === null) {
    return <View><Text>Requesting camera permission...</Text></View>;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} ref={setCameraRef}>
        {/* You can add overlay controls here */}
      </Camera>
      <Button title="Capture" onPress={takePicture} />
      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={{ width: 300, height: 300 }}
        />
      )}
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default CameraScreen;
