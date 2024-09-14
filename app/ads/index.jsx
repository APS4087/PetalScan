import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Linking } from 'react-native';

const AdvertisedPage = ({ navigation }) => {
  // Function to open the Singapore Airlines website
  const openAdUrl = () => {
    const url = 'https://www.singaporeair.com'; // Singapore Airlines URL
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      {/* "Continue to the App" Button */}
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('/home')} // Adjust to your desired screen
      >
        <Text style={styles.continueText}>Continue to the App</Text>
      </TouchableOpacity>

      {/* Singapore Airlines Advertisement */}
      <View style={styles.advertisement}>
        <Image 
          source={require('../../assets/images/cabin.webp')}  
          style={styles.adImage}
        />
        <Text style={styles.adText}>Discover the World with Singapore Airlines!</Text>
        <TouchableOpacity style={styles.learnMoreButton} onPress={openAdUrl}>
          <Text style={styles.learnMoreText}>Learn More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  continueButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 18,
  },
  continueText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  advertisement: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 8,
    width: Dimensions.get('window').width - 40,
  },
  adImage: {
    width: 300,
    height: 250,
    marginBottom: 15,
  },
  adText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  learnMoreButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AdvertisedPage;
