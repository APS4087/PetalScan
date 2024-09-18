import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Share, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';  // Clipboard API for copying text
import { MaterialIcons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import Octicons from '@expo/vector-icons/Octicons';
import { useRouter } from 'expo-router';

// Importing the local image
import parkImage from '../../../assets/images/parkImage.jpg'; // Adjust the path according to your project structure

const afterSharePage = ({ navigation }) => {
  // Function to handle the share action
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this post: https://www.example.com/flower1',
        url: 'https://www.example.com/flower1',  // URL that is shared, works on iOS only
        title: 'Flower 1 Post'
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with activity type of result.activityType (iOS only)
        } else {
          // Shared
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Function to handle copying the link
  const onCopyLink = () => {
    Clipboard.setString('https://www.example.com/flower1');  // Copy the link
    Alert.alert('Link copied', 'The link has been copied to your clipboard!');  // Show a confirmation alert
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="close" size={28} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <View style={styles.header}>
        <Text style={styles.title}>share</Text>
      </View>

      {/* Content with Local Image and Description */}
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={parkImage}  // Local image source
          />
          <Text style={styles.imageTitle}>Place 1</Text>
          <Text style={styles.imageDescription}>The oval place is an iconic place in Singapore Botanic Gardens</Text>
        </View>
      </View>

      {/* Share Options */}
      <View style={styles.shareOptions}>
        <TouchableOpacity style={styles.shareButton} onPress={onShare}>
        <Entypo name="share-alternative" size={24} color="black" />
          <Text style={styles.shareText}>Share this</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton} onPress={onCopyLink}>
        <Octicons name="copy" size={24} color="black" />
          <Text style={styles.shareText}>Copy link</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 10,
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 60,
  },
  content: {
    marginTop: 30,
    alignItems: 'center',
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
  },
  imageTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageDescription: {
    color: '#777',
  },
  shareOptions: {
    marginTop: 40,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F5',
    padding: 15,
    marginBottom: 20,
    borderRadius: 16,
  },
  shareText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default afterSharePage;

