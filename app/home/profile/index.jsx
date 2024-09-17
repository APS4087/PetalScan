import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import images from "../../../components/data";
import { useRouter } from "expo-router";
import { useAuth } from "../../../context/authContext";
import { auth } from "../../../firebaseConfig";

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
    try{
        await auth.signOut(auth);
        router.push('/auth');
    }catch(error){
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
    paddingTop: 50,
  },
  logo: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  arrow: {
    width: 25,
    height: 25,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    width: '85%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginTop: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
    color: '#000',
  },
  deleteButton: {
    width: '85%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#8B0000',
    marginTop: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  deleteText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default ProfilePage;