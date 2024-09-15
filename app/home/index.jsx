import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import UserNavbar from '../../components/UserNavbar';
import { useRouter } from 'expo-router';
import images from '../../components/data';

function HomeScreen() {
  const router = useRouter();


  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, User</Text>
          <TouchableOpacity onPress={()=>router.push("/home/notifications")}>
            <Image source={images.notifcationIcon} style={styles.icon} />
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
          <TouchableOpacity style={styles.categoryButton} onPress={() => router.push('/home/architecture')}>
            <Text style={styles.categoryText}>Architecture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton} onPress={() => handleNavigation('/flower/flower')}>
            <Text style={styles.categoryText}>Flower</Text>
          </TouchableOpacity>
        </View>

        {/* Image Cards */}
        <TouchableOpacity style={styles.card} onPress={() => handleNavigation('/architecture/architecture')}>
          <Image source={images.parkImage} style={styles.cardImage} />
          <Text style={styles.cardText}>PLACE 1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleNavigation('/architecture/architecture')}>
          <Image source={images.parkImage2} style={styles.cardImage} />
          <Text style={styles.cardText}>PLACE 2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => handleNavigation('/architecture/architecture')}>
          <Image source={images.parkImage3} style={styles.cardImage} />
          <Text style={styles.cardText}>PLACE 3</Text>
        </TouchableOpacity>
      </ScrollView>
      {/* Navigation Bar at the Bottom */}
      <UserNavbar />
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
