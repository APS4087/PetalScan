import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // For back icon

// Create User Screen component
export default function CreateUserScreen() {
  // State variables to store user input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Function to handle user creation (for now, just logs input)
  const handleCreateUser = () => {
    console.log('User Created:', { username, email, password });
    // You can add additional actions here, like saving user data locally or in an external system
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {/* Back button to navigate to the previous screen */}
          <TouchableOpacity onPress={() => router.push('/adminHome/users')} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={30} color="black" />
          </TouchableOpacity>

          {/* Title text */}
          <Text style={styles.title}>Create User</Text>

          {/* Username input field */}
          <TextInput
            style={styles.input}
            placeholder="username"
            placeholderTextColor="#8a8a8a"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          {/* Email input field */}
          <TextInput
            style={styles.input}
            placeholder="email"
            placeholderTextColor="#8a8a8a"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          {/* Password input field */}
          <TextInput
            style={styles.input}
            placeholder="password"
            placeholderTextColor="#8a8a8a"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Create button */}
          <TouchableOpacity style={styles.createButton} onPress={handleCreateUser}>
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Styles for the CreateUserScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  backButton: {
    marginLeft: 10,
    marginTop: '-70%',
  },
  title: {
    marginTop: '10%',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: '15%',
    textAlign: 'center',
  },
  input: {
    width: '90%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    marginLeft: 20,
    marginBottom: 20,
    backgroundColor: '#F7F8F9',
    color: 'black',
    height: 50,
  },
  createButton: {
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 80,
    marginLeft: 35,
    height: 50,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
