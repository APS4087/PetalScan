import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Navibar from './Navibar/Navibar.js';  // Ensure Navibar is correctly imported
import { MaterialIcons } from '@expo/vector-icons';  // Import MaterialIcons

export default function AdminNotificationScreen({ navigation }){
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');

  // Handler for notification click
  const handleNotificationClick = () => {
    router.push('/notification/insideNotification');
  };

  // Handler for add notification click
  const adminNotifonClick = () => {
    router.push('/adminNotif/addNotif');
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.notificationContainer}>
          <Text style={styles.sectionTitle}>Notification</Text>

          {/* Search Bar with Icon */}
          <View style={styles.searchContainer}>
            <Image
              source={require('../../assets/Icons/search.png')}
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Latest</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Oldest</Text>
            </TouchableOpacity>
          </View>

          {/* Add Notification Button with Material Icon */}
          <TouchableOpacity style={styles.blankContainer} onPress={adminNotifonClick}>
            <MaterialIcons name="add" size={30} color="black" />
          </TouchableOpacity>

          {/* Notification Items */}
          <TouchableOpacity
            style={styles.notificationItem}
            onPress={handleNotificationClick}
          >
            <View style={styles.notificationTopContainer}>
              <Text style={styles.smallNotification}>Latest</Text>
              <Text style={styles.notificationDate}>Aug 15, 2024</Text>
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>New Update Available</Text>
              <View style={styles.innerContainer}>
                <Text style={styles.innerTitle}>Closed until September</Text>
                <Image
                  source={require('../../assets/images/parkImage.jpg')}
                  style={styles.innerImage}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.notificationBottonContainer}>
          <TouchableOpacity
            style={styles.notificationItem}
            onPress={handleNotificationClick}
          >
            <View style={styles.notificationTopContainer}>
              <Text style={styles.smallNotification}>Oldest</Text>
              <Text style={styles.notificationDate}>Jul 20, 2024</Text>
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>Feature Update</Text>
              <View style={styles.oldContainer}>
                <Text style={styles.innerTitle}>Closed until September</Text>
                <Image
                  source={require('../../assets/images/parkImage.jpg')}
                  style={styles.innerImage}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navigation Bar at the Bottom */}
      <View style={styles.navibarContainer}>
        <Navibar navigation={navigation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 30,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 70, // Ensure content does not overlap with the Navibar
  },
  notificationContainer: {
    marginBottom: 10,
    marginTop: -60,
  },
  notificationBottonContainer: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: "30%",
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 12,
    marginBottom: 20,
    borderColor: '#959595',
    borderWidth: 1,
  },
  searchIcon: {
    width: 15,
    height: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 15,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    flex: 0.48,
    backgroundColor: 'white',
    paddingVertical: 8,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#959595',
    borderWidth: 1,
  },
  filterText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  blankContainer: {
    backgroundColor: '#F7F8F9',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#8F9EBC',
    borderWidth: 1,
  },
  notificationItem: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
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
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#149FBF',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  oldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3588C6',
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
    borderRadius: 10,
  },
  navibarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
