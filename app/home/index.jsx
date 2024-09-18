import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { ScrollView } from 'react-native';
import { Image } from 'react-native';
import UserNavbar from '../../components/UserNavbar';
import { useRouter } from 'expo-router';
import images from '../../components/data';
import { useAuth } from '../../context/authContext';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const { width, height } = Dimensions.get('window');

function HomeScreen() {
  const router = useRouter();

  // Get the user from the AuthContext
  const { user } = useAuth();
  const [architectures, setArchitectures] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Architecture'); // Default category

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const architecturesCollection = collection(db, 'architectures');
        const architecturesSnapshot = await getDocs(architecturesCollection);
        const architecturesList = architecturesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setArchitectures(architecturesList);

        const flowersCollection = collection(db, 'flowers');
        const flowersSnapshot = await getDocs(flowersCollection);
        const flowersList = flowersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFlowers(flowersList);
      } catch (error) {
        setError('Failed to load places.');
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  const places = selectedCategory === 'Architecture' ? architectures : flowers;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {user ? user.username : 'Guest'}</Text>
          <TouchableOpacity onPress={() => router.push("/home/notifications")}>
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
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'Architecture' && styles.selectedCategoryButton]}
            onPress={() => setSelectedCategory('Architecture')}
          >
            <Text style={styles.categoryText}>Architecture</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.categoryButton, selectedCategory === 'Flower' && styles.selectedCategoryButton]}
            onPress={() => setSelectedCategory('Flower')}
          >
            <Text style={styles.categoryText}>Flower</Text>
          </TouchableOpacity>
        </View>

        {/* Image Cards */}
        {places.map(place => (
          <TouchableOpacity
            key={place.id}
            style={styles.card}
            onPress={() => router.push(`/home/${selectedCategory.toLowerCase()}/${place.id}`)}
          >
            <Image source={{ uri: place.imageUrl }} style={styles.cardImage} />
            <Text style={styles.cardText}>{place.name}</Text>
          </TouchableOpacity>
        ))}
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
    padding: width * 0.04,
    paddingTop: height * 0.05, // Add padding to the top
    paddingBottom: height * 0.08, // Add padding to the bottom
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  greeting: {
    fontSize: width * 0.065,
    fontWeight: 'bold',
  },
  icon: {
    width: width * 0.07,
    height: width * 0.07,
  },
  recommended: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  recommendedTitle: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: width * 0.035,
    marginRight: width * 0.02,
    width: width * 0.2,
    textAlign: 'right',
  
    color: 'blue',
  },
  categories: {
    flexDirection: 'row',
    marginBottom: height * 0.02,
  },
  categoryButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.04,
    borderRadius: 20,
    marginRight: width * 0.02,
    flex: 1,
    alignItems: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: '#d0d0d0',
  },
  categoryText: {
    fontSize: width * 0.035,
    textAlign: 'center',
   // borderWidth: 1,
    width: width * 0.4,
  
  },
  card: {
    marginBottom: height * 0.02,
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  cardImage: {
    width: '100%',
    height: width * 0.5, // 50% of screen width
    borderRadius: 10,
  },
  cardText: {
    position: 'absolute',
    bottom: height * 0.01,
    left: width * 0.03,
    color: 'white',
    fontWeight: 'bold',
    fontSize: width * 0.045,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: width * 0.04,
  },
});

export default HomeScreen;