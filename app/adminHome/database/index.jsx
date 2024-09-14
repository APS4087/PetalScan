import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For back icon
import { useRouter } from 'expo-router';
import images from '../../../components/data';

function Database({ navigation }) {
    const router = useRouter();

    // Handler for add database click
  const addonClick = () => {
    router.push('adminHome/database/architecture/add');
  };

    // Handler for update database click
  const updateonClick = () => {
    router.push('/adminHome/database/architecture/update');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>

        {/* Back Button */}
        <TouchableOpacity onPress={() => router.push('/admin')} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        {/* Search Bar with Icon */}
        <View style={styles.searchBarContainer}>
          <Image source={images.searchIcon} style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="#888"
          />
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Architecture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Flower</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>Plant</Text>
          </TouchableOpacity>
        </View>

        {/* First Card (Modified) - Add Database */}
        <TouchableOpacity style={styles.emptyCard} onPress={addonClick}>
          <MaterialIcons name="add" size={48} color="gray" />
        </TouchableOpacity>

        {/* Other Image Cards */}
        <TouchableOpacity style={styles.card} onPress={updateonClick} >
          <Image source={images.parkImage} style={styles.cardImage} />
          <Text style={styles.cardText}>PLACE 1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image source={images.parkImage2} style={styles.cardImage} />
          <Text style={styles.cardText}>PLACE 2</Text>
        </TouchableOpacity>

      </ScrollView>
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
  backButton: {
    marginTop: 50,
    marginLeft: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
  },
  searchIcon: {
    width: 15,
    height: 15,
    marginLeft: 20,
  },
  searchBar: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  categories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 20,
  },
  categoryButton: {
    padding: 13,
    borderRadius: 15,
    width: '30%',
    borderColor: '#959595',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  emptyCard: {
    backgroundColor: '#d3d3d3', // Gray background
    height: 200,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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

export default Database;
