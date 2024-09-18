import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CountryPicker from 'react-native-country-picker-modal';
import * as ImagePicker from 'expo-image-picker';

export default function UpdateProfileScreen() {
  const [countryCode, setCountryCode] = useState('SG');
  const [callingCode, setCallingCode] = useState('65');
  const [withFlag, setWithFlag] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState(require('../../assets/images/profilePicture.jpg'));

  const onSelect = (country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const handleProfilePictureClick = async () => {
    // Request permission to access gallery
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.assets[0].uri });
    }
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
        <Text style={styles.profileTitle}>Update Profile</Text>
        <TouchableOpacity onPress={handleProfilePictureClick}>
          <Image 
            source={profileImage} 
            style={styles.profileImage} 
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>Fresh Banana</Text>
        <Text style={styles.profileEmail}>freshBanana@gmail.com</Text>
      </View>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="new username" />
      <TextInput style={styles.input} placeholder="new password" secureTextEntry />
      <TextInput style={styles.input} placeholder="confirm password" secureTextEntry />

      {/* Country Picker and Phone Number Input */}
      <View style={styles.phoneContainer}>
        <CountryPicker
          countryCode={countryCode}
          withFlag={withFlag}
          withCallingCode
          withFilter
          onSelect={onSelect}
          containerButtonStyle={styles.flagButton}
        />
        <Text style={styles.callingCode}>+{callingCode}</Text>
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Update Button */}
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
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
  input: {
    backgroundColor: '#E8ECF4',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  flagButton: {
    marginRight: 10,
  },
  callingCode: {
    fontSize: 16,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#E8ECF4',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
