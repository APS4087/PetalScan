import React from 'react';
import { View, TextInput, Image, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import images from '../../../components/data';

const ArchitectureSite = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => router.push('/home')}>
        <Image source={images.backArrowIcon} style={styles.backArrow} />
      </TouchableOpacity>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
        />
      </View>

      {/* Image Cards */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.card}>
          <ImageBackground source={images.parkImage} style={styles.cardImage}>
            <Text style={styles.cardText}>PLACE 1</Text>
          </ImageBackground>
        </View>

        <View style={styles.card}>
          <ImageBackground source={images.parkImage2} style={styles.cardImage}>
            <Text style={styles.cardText}>PLACE 2</Text>
          </ImageBackground>
        </View>

        <View style={styles.card}>
          <ImageBackground source={images.parkImage3} style={styles.cardImage}>
            <Text style={styles.cardText}>PLACE 3</Text>
          </ImageBackground>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  backArrow: {
    width: 24,
    height: 24,
    marginBottom: 10,
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  cardText: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    fontSize: 18,
    padding: 10,
  },
});

export default ArchitectureSite;
