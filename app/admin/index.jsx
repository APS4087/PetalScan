import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Navibar from './Navibar/Navibar.js';
import { MaterialIcons } from '@expo/vector-icons'; // For icons (increase/decrease arrows)

function Admin({ navigation }) {
  // Sample data, replace with actual data fetching logic
  const [totalUsers, setTotalUsers] = useState(150);
  const [totalData, setTotalData] = useState(200); // Number of architecture + flowers
  const [totalNotifications, setTotalNotifications] = useState(20);
  const [revenue, setRevenue] = useState(50000); // Example revenue
  
  // Sample change indicators
  const userChange = 10; // Positive for increase, negative for decrease
  const dataChange = -15;
  const notificationChange = 5;

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
            <Text style={styles.cardTitle}>Total Users</Text>
            <View style={styles.cardRow}>
              <Text style={styles.cardNumber}>{totalUsers}</Text>
              <View style={styles.changeIndicator}>
                <MaterialIcons
                  name={userChange >= 0 ? 'arrow-upward' : 'arrow-downward'}
                  size={20}
                  color={userChange >= 0 ? 'green' : 'red'}
                />
                <Text style={{ color: userChange >= 0 ? 'green' : 'red' }}>
                  {Math.abs(userChange)} {userChange >= 0 ? 'added' : 'lost'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Total Data</Text>
            <View style={styles.cardRow}>
              <Text style={styles.cardNumber}>{totalData}</Text>
              <View style={styles.changeIndicator}>
                <MaterialIcons
                  name={dataChange >= 0 ? 'arrow-upward' : 'arrow-downward'}
                  size={20}
                  color={dataChange >= 0 ? 'green' : 'red'}
                />
                <Text style={{ color: dataChange >= 0 ? 'green' : 'red' }}>
                  {Math.abs(dataChange)} {dataChange >= 0 ? 'added' : 'lost'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardTitle}>Total Notifications</Text>
            <View style={styles.cardRow}>
              <Text style={styles.cardNumber}>{totalNotifications}</Text>
              <View style={styles.changeIndicator}>
                <MaterialIcons
                  name={notificationChange >= 0 ? 'arrow-upward' : 'arrow-downward'}
                  size={20}
                  color={notificationChange >= 0 ? 'green' : 'red'}
                />
                <Text style={{ color: notificationChange >= 0 ? 'green' : 'red' }}>
                  {Math.abs(notificationChange)} {notificationChange >= 0 ? 'added' : 'lost'}
                </Text>
              </View>
            </View>
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
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  changeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Admin;
