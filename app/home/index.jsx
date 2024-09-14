import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import Navibar from './Navibar/Navibar.js';
import { useRouter } from 'expo-router';

function HomeScreen() {
  const router = useRouter();

  const handleNavigation = (page) => {
    router.push(page);
  };

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
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryButton} onPress={() => handleNavigation('/architecture/architecture')}>
            <Text style={styles.categoryText}>Architecture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={() => handleNavigation('/flower/flower')}>
            <Text style={styles.categoryText}>Flower</Text>
          </TouchableOpacity>
        </View>

        {/* Image Cards */}
        <TouchableOpacity style={styles.card} onPress={() => handleNavigation('/architecture/architecture')}>
          <Image source={require('../../assets/images/parkImage.jpg')} style={styles.cardImage} />
          <Text style={styles.cardText}>PLACE 1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleNavigation('/architecture/architecture')}>
          <Image source={require('../../assets/images/sbgPlace2.jpg')} style={styles.cardImage} />
          <Text style={styles.cardText}>PLACE 2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleNavigation('/architecture/architecture')}>
          <Image source={require('../../assets/images/place3.jpg')} style={styles.cardImage} />
          <Text style={styles.cardText}>PLACE 3</Text>
        </TouchableOpacity>
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

export default HomeScreen;
