import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function LandingScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('auth/index');
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Recognize, Appreciate, Enjoy!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '20%', // Adjusted margin top
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: width * 0.8, // Responsive width
    height: height * 0.2, // Responsive height
    resizeMode: 'contain', // Ensure the image scales correctly
    marginTop: 200, // Adjusted margin top
    marginBottom: 40, // Add some space below the logo
  },
  text: {
    //borderWidth: 1,
    width: width * 0.8, // Responsive width
    position: 'absolute',
    top: height * 0.38, // Position below the logo
    right: - width * 0.2, // Position to the right side of the logo
    fontSize: 14,
    color: '#00000',
  },
});