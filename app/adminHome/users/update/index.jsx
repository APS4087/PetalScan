import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons'; // For back icon

// Create User Screen component
export default function CreateUserScreen() {
  // Set default username to "John Doe", uneditable
  const [username, setUsername] = useState('John Doe');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Function to handle user update (for now, just logs input)
  const handleUpdateUser = () => {
    console.log('User Updated:', { email, password });
    // You can add additional actions here, like saving updated user data
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
          <Text style={styles.title}>Update User</Text>

          {/* Username input field (Uneditable) */}
          <TextInput
            style={[styles.input, styles.disabledInput]}  // Add style for uneditable field
            value={username}
            editable={false}  // Make the field uneditable
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

          {/* Update button */}
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdateUser}>
            <Text style={styles.updateButtonText}>Update</Text>
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
  disabledInput: {
    backgroundColor: '#E0E0E0',  // Light grey background to indicate the field is uneditable
  },
  updateButton: {
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 80,
    marginLeft: 35,
    height: 50,
  },
  updateButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
