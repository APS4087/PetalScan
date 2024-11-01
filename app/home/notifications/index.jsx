import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import images from '../../../components/data';

const LOCAL_MACHINE_IP = 'http://192.168.102.197:8000'; 
const HOME_WIFI = 'http://192.168.10.218:8000';
const AWS_SERVER_URL = 'http://3.27.248.187:8000';


export default function Notifications() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  // Fetch events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${AWS_SERVER_URL}/events/`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setEvents(data.upcoming_events || []); // Ensure events is always an array
      } catch (error) {
        console.error('Error fetching events:', error);
        setEvents([]); // Set events to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Handler for notification click
  const handleNotificationClick = (link) => {
    // Open the link in the default browser
    Linking.openURL(link);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../../assets/animations/notiLoadingAnimation.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back button to navigate to the previous screen */}
      <TouchableOpacity style={styles.logo} onPress={() => router.back()}>
        <Image source={images.backArrowIcon} style={styles.arrow} />
      </TouchableOpacity>

      <View style={styles.notificationContainer}>
        <Text style={styles.sectionTitle}>Latest Notifications</Text>
        {events.map((event, index) => (
          <TouchableOpacity
            key={index}
            style={styles.notificationItem}
            onPress={() => handleNotificationClick(event.link)}  // Navigate to the event link
          >
            <View style={styles.notificationTopContainer}>
              <Text style={styles.smallNotification}>New</Text>
              <Text style={styles.notificationDate}>{event.date}</Text>
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{event.title}</Text>
              <View style={styles.innerContainer}>
                <Text style={styles.innerTitle}>{event.description}</Text>
                <Image
                  source={images.parkImage} // Using local image
                  style={styles.innerImage}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 300,
    height: 300,
  },
  notificationContainer: {
    marginBottom: 10,
    marginTop: -60,
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