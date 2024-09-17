import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import images from "../../../components/data";
import { useRouter } from "expo-router";
import { useAuth } from "../../../context/authContext";
import { auth } from "../../../firebaseConfig";

const { width, height } = Dimensions.get('window');

const ProfilePage = ({ navigation }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (user && user.username) {
      setUsername(user.username);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth.signOut(auth);
      router.push('/auth');
    } catch (error) {
      console.log('Error at handleLogout', error);
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.logo} onPress={() => router.back()}>
        <Image source={images.backArrowIcon} style={styles.arrow} />
      </TouchableOpacity>

      <Text style={styles.title}>Profile</Text>

      {/* Profile Picture */}
      <Image
        source={{ uri: username ? `https://api.multiavatar.com/${username}.png` : 'https://api.multiavatar.com/bill.png' }}
        style={styles.profileImage}
      />

      {/* Username and Email */}
      <Text style={styles.username}>{username || 'Loading...'}</Text>
      <Text style={styles.email}>{user?.email || 'Loading...'}</Text>

      {/* Profile Options */}
      <TouchableOpacity style={styles.optionButton}>
        <Text style={styles.optionText}>Your profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.optionButton} onPress={handleLogout}>
        <Text style={styles.optionText}>Log out</Text>
      </TouchableOpacity>

      {/* Delete Account Button */}
      <TouchableOpacity style={styles.deleteButton}>
        <Text style={styles.deleteText}>Deactivate Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: height * 0.05,
    paddingHorizontal: width * 0.05,
  },
  logo: {
    position: 'absolute',
    top: height * 0.05,
    left: width * 0.05,
  },
  arrow: {
    width: width * 0.07,
    height: width * 0.07,
  },
  profileImage: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: (width * 0.3) / 2,
    marginTop: height * 0.02,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  title: {
    fontSize: width * 0.09,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: height * 0.05,
  },
  username: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginTop: height * 0.01,
    textAlign: 'center',
  },
  email: {
    fontSize: width * 0.04,
    color: 'gray',
    marginBottom: height * 0.02,
    textAlign: 'center',
  },
  optionButton: {
    width: '90%',
    padding: height * 0.02,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginTop: height * 0.01,
    alignSelf: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: width * 0.045,
    color: '#000',
  },
  deleteButton: {
    width: '90%',
    padding: height * 0.02,
    borderRadius: 10,
    backgroundColor: '#8B0000',
    marginTop: height * 0.03,
    alignSelf: 'center',
    alignItems: 'center',
  },
  deleteText: {
    fontSize: width * 0.045,
    color: '#fff',
  },
});

export default ProfilePage;