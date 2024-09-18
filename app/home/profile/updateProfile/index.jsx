import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CountryPicker from 'react-native-country-picker-modal';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../../../context/authContext';  
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function UpdateProfileScreen() {
  const [countryCode, setCountryCode] = useState('SG');
  const [callingCode, setCallingCode] = useState('65');
  const [withFlag, setWithFlag] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState(null);

  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user && user.username) {
      setUsername(user.username);
    }
  }, [user]);

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
        <TouchableOpacity onPress={()=> router.push('/home/profile')}>
          <Ionicons name="arrow-back" size={width * 0.09} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Information */}
      <View style={styles.profileContainer}>
        <Text style={styles.profileTitle}>Update Profile</Text>
        <TouchableOpacity onPress={handleProfilePictureClick}>
          <Image
            source={{ uri: username ? `https://api.multiavatar.com/${username}.png` : 'https://api.multiavatar.com/bill.png' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <Text style={styles.profileName}>{user?.username}</Text>
        <Text style={styles.profileEmail}>{user?.email}</Text>
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
    padding: width * 0.05,
    marginTop: height * 0.11,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: height * 0.03,
  },
  profileTitle: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    marginBottom: height * 0.015,
  },
  profileImage: {
    width: width * 0.2,
    height: width * 0.2,
    borderRadius: (width * 0.2) / 2,
    marginBottom: height * 0.01,
  },
  profileName: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    justifyContent: 'center',
    marginBottom: height * 0.005,
  },
  profileEmail: {
    fontSize: width * 0.04,
    marginLeft: width * 0.23,
    justifyContent: 'center',
    width: '80%',
    color: '#6e6e6e',
  },
  input: {
    backgroundColor: '#E8ECF4',
    padding: width * 0.04,
    borderRadius: 10,
    fontSize: width * 0.04,
    marginBottom: height * 0.01,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  flagButton: {
    marginRight: width * 0.03,
  },
  callingCode: {
    fontSize: width * 0.04,
    marginRight: width * 0.03,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: '#E8ECF4',
    padding: width * 0.04,
    borderRadius: 10,
    fontSize: width * 0.04,
  },
  updateButton: {
    backgroundColor: '#000',
    padding: width * 0.04,
    borderRadius: 14,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});