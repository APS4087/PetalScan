import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import images from '../../../../components/data';

export default function Notification() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image source={images.parkImage} style={styles.backgroundImage} />

      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <View style={styles.backButtonContent}>
          <Image source={images.backArrowIcon} style={styles.backArrow} />
          <Text style={styles.backButtonText}>Back</Text>
        </View>
      </TouchableOpacity>

      {/* Notification content */}
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>Park Renovation!</Text>
        <Text style={styles.notificationText}>This park is under renovation until 20th September 2024.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: '40%', // Adjust this value based on your image's aspect ratio
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    width: 16,
    height: 16,
    marginRight: 8,
    resizeMode: 'contain',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  notificationContent: {
    flex: 1,
    backgroundColor: '#F9F9F9', // Light pink background
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -20, // Pull the content slightly over the image
  },
  notificationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
    marginTop: 15,
  },
});