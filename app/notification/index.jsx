import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function NotificationScreen() {
  const router = useRouter();

  // Handler for notification click
  const handleNotificationClick = () => {
    // Navigate directly to the NotificationDetailScreen in the insideNotification folder
    router.push('/notification/insideNotification');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back button to navigate to the previous screen */}
      <TouchableOpacity style={styles.logo} onPress={() => router.push('/auth')}>
        <Image source={require('../../assets/Icons/backArrow.png')} style={styles.arrow} />
      </TouchableOpacity>

      <View style={styles.notificationContainer}>
        <Text style={styles.sectionTitle}>Latest Notifications</Text>
        <TouchableOpacity
          style={styles.notificationItem}
          onPress={handleNotificationClick}  // No parameters needed, just navigate
        >
          <View style={styles.notificationTopContainer}>
            <Text style={styles.smallNotification}>New</Text>
            <Text style={styles.notificationDate}>Aug 15, 2024</Text>
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>New Update Available</Text>
            <View style={styles.innerContainer}>
              <Text style={styles.innerTitle}>Closed until September</Text>
              <Image
                source={require('../../assets/images/parkImage.jpg')} // Using local image
                style={styles.innerImage}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.notificationBottonContainer}>
        <Text style={styles.oldTitle}>Old Notifications</Text>
        <TouchableOpacity
          style={styles.notificationItem}
          onPress={handleNotificationClick}  // No parameters needed, just navigate
        >
          <View style={styles.notificationTopContainer}>
            <Text style={styles.smallNotification}>Update</Text>
            <Text style={styles.notificationDate}>Jul 20, 2024</Text>
          </View>
          <View style={styles.notificationContent}>
            <Text style={styles.notificationTitle}>Feature Update</Text>
            <View style={styles.oldContainer}>
              <Text style={styles.innerTitle}>Closed until September</Text>
              <Image
                source={require('../../assets/images/parkImage.jpg')} // Using local image
                style={styles.innerImage}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 30,
    marginTop: -20,
  },
  notificationContainer: {
    marginBottom: 10,
    marginTop: -60,
  },
  notificationBottonContainer: {
    marginBottom: 10,

  },
  logo: {
    height: 20,
    width: 20,
    justifyContent: 'left',
    alignItems: 'left',
    marginTop: '15%',
  },
  arrow: {
    height: '200%',
    width: '100%',
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: "30%",
  },
  oldTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  notificationItem: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    marginBottom: 30,
    elevation: 2, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationTopContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  smallNotification: {
    fontSize: 12,
    color: '#888888',
  },
  notificationDate: {
    fontSize: 12,
    color: '#888888',
  },
  notificationContent: {
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationText: {
    fontSize: 14,
    color: '#333333',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#149FBF', // Light blue background
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  oldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3588C6', // Light blue background
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  innerTitle: {
    fontSize: 14,
    color: '#333333',
    flex: 1,
  },
  innerImage: {
    width: 60,
    height: 50,
    borderRadius: 10, // Square image
  },
});