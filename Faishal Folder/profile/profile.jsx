import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const handleProfilePictureClick = () => {
    console.log('Profile picture clicked');
    // Implement what happens when the profile picture is clicked
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Information */}
      <View style={styles.profileContainer}>
        <Text style={styles.profileTitle}>Profile</Text>
        <TouchableOpacity onPress={handleProfilePictureClick}>
          <Image 
            source={require('../../assets/images/profilePicture.jpg')} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>Fresh Banana</Text>
        <Text style={styles.profileEmail}>freshBanana@gmail.com</Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <View style={styles.optionContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="person-outline" size={24} color="#0601B4" />
            </View>
            <Text style={styles.optionText}>Your profile</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#6e6e6e" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.option}>
          <View style={styles.optionContent}>
            <View style={styles.iconCircle}>
              <Ionicons name="log-out-outline" size={24} color="#0601B4" />
            </View>
            <Text style={styles.optionText}>Log out</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#6e6e6e" />
        </TouchableOpacity>
      </View>

      {/* Delete Account */}
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: '13%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6e6e6e',
  },
  optionsContainer: {
    marginBottom: 30,
  },
  option: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  deleteButton: {
    backgroundColor: '#8D2136',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
    width: '90%',
    alignSelf: 'center',
  },

  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

 



 
