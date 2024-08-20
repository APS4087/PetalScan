

import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import Navibar from './Navibar/Navibar.js'; // Adjusted import path since Navibar.js is in the same folder

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, User</Text>
          <TouchableOpacity>
            <Image source={require('../../assets/Icons/notification.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        {/* Recommended Section */}
        <View style={styles.recommended}>
          <Text style={styles.recommendedTitle}>Recommended</Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Architecture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Flower</Text>
          </TouchableOpacity>
        </View>

        {/* Image Cards */}
        <View style={styles.card}>
          <Image source={require('../../assets/images/parkImage.jpg')} style={styles.cardImage} />
          <Text style={styles.cardText}>PLACE 1</Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/images/sbgPlace2.jpg')} style={styles.cardImage} />
          <Text style={styles.cardText}>PLACE 2</Text>
        </View>

        <View style={styles.card}>
          <Image source={require('../../assets/images/place3.jpg')} style={styles.cardImage} />
          <Text style={styles.cardText}>PLACE 3</Text>
        </View>
      </ScrollView>
      {/* Navigation Bar at the Bottom */}
      <Navibar />
    </View>
  );
}

const styles = StyleSheet.create({

  container: { 
      flex: 1,
      backgroundColor: '#ffffff',
      padding: 16,
    },
  content: {
    flex: 1,
  },

  title: {
    marginTop: '30%',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 32,
    marginLeft: 20,
  },
  input: {
    width: '90%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    alignItems: 'center', 
    justifyContent: 'center',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 20,
    backgroundColor: '#F7F8F9',
  },
  loginButton: {
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 60,
    marginLeft: 35,
    height: 50,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  icon: {
    width: 28,
    height: 28,
  },
  recommended: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  recommendedTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 16,
    color: 'blue',
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 16,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  cardText: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

function DetailsScreen() {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}

export default HomeScreen;


  