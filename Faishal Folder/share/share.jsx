import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the back button
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

// Local image assets
const images = [
  require('../../assets/images/place3.jpg'), 
  require('../../assets/images/parkImage.jpg'), 
  require('../../assets/images/sbgPlace2.jpg'),
];

const SharePage = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0); // Active image index
  const router = useRouter();

  // Handler for share click
  const afterShareClick = () => {
    // Navigate directly to the afterShare folder
    router.push('/share/afterShare');
  };
  const handleSeeAll = () => {
    const query = 'Orchid Garden Singapore Botanic Garden';
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    Linking.openURL(url);
  };

  const onScroll = (event) => {
    // Calculate active index based on scroll position
    const slideIndex = Math.floor(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      {/* Image Display */}
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16} // How often to handle the scroll event
        >
          {images.map((image, index) => (
            <Image key={index} style={styles.image} source={image} />
          ))}
        </ScrollView>

        {/* Back Button inside image */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back-circle-sharp" size={38} color="white" />
        </TouchableOpacity>

        {/* Title inside image */}
        <Text style={styles.imageTitle}>Orchid Garden</Text>

        {/* Slide indicator (e.g. "1 of 3") */}
        <Text style={styles.slideIndicator}>
          {activeIndex + 1} of {images.length}
        </Text>
      </View>

      {/* Image Description */}
      <View style={styles.content}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.Description}>Description</Text>
          <Text style={styles.imageDescription}>This flower is called orchid</Text>

          {/* See more */}
          <TouchableOpacity onPress={handleSeeAll}>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Floating Share Button */}
      <TouchableOpacity style={styles.shareButton}  onPress={afterShareClick}>
        <Entypo name="share" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: screenWidth,
    height: 470,
    alignSelf: 'center',
    marginTop: 50,
    position: 'relative',
  },
  image: {
    width: screenWidth,
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 2,
  },
  imageTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    zIndex: 1,
  },
  slideIndicator: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    color: 'white',
    fontSize: 16,
    zIndex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  descriptionContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  imageDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 10,
  },
  Description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeMore: {
    fontSize: 12,
    color: '#1E90FF',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
  shareButton: {
    backgroundColor: 'gray',
    borderRadius: 30,
    padding: 15,
    elevation: 5, // Shadow for Android
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
});

export default SharePage;

