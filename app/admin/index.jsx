import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native';
import Navibar from './Navibar/Navibar.js';

function Admin({ navigation }) {
  // Sample data, replace with actual data fetching logic
  const [totalUsers, setTotalUsers] = useState(150);
  const [totalData, setTotalData] = useState(200); // Number of architecture + flowers
  const [totalNotifications, setTotalNotifications] = useState(20);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, Admin</Text>
        </View>

        {/* Cards Section */}
        <View style={styles.cardContainer}>
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Total User</Text>
            <Text style={styles.cardNumber}>{totalUsers}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Total Data</Text>
            <Text style={styles.cardNumber}>{totalData}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Total Notification</Text>
            <Text style={styles.cardNumber}>{totalNotifications}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {/* Navigation Bar at the Bottom */}
      <Navibar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 10,
    borderBottomColor: '#FFFFFF',
    marginTop: 50,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
  },
});

export default Admin;
