import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

export default function NotificationScreen() {
  // Handler for notification click
  const handleNotificationClick = (notificationId) => {
    // Handle the notification click event
    console.log('Notification clicked:', notificationId);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.notificationContainer}>
        <Text style={styles.sectionTitle}>Latest Notifications</Text>
        <TouchableOpacity
          style={styles.notificationItem}
          onPress={() => handleNotificationClick(1)}
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
                source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual image URL
                style={styles.innerImage}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.notificationContainer}>
        <Text style={styles.oldTitle}>Old Notifications</Text>
        <TouchableOpacity
          style={styles.notificationItem}
          onPress={() => handleNotificationClick(3)}
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
                source={{ uri: 'https://via.placeholder.com/50' }} // Replace with actual image URL
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
    padding: 16,
  },
  notificationContainer: {
    marginBottom: 32,
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
    marginBottom: 16,
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
