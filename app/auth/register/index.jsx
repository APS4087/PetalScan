import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { auth, db } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Register screen component
export default function RegisterScreen() {
  // State variables to store user input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Function to handle user registration
  const handleRegister = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setLoading(true); // Set loading to true
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Save user data to Firestore
      console.log('Saving user data to Firestore...');
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
        createdAt: new Date().toISOString()
      });
      console.log('User data saved to Firestore.');

      // Show success message and redirect to login screen
      alert('Registration successful! Please verify your email.');
      router.push('/auth/login');
    } catch (error) {
      console.error('Error during registration:', error);
      alert(`Registration failed: ${error.message}`);
    } finally {
      setLoading(false); // Set loading to false
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} 
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Back button to navigate to the previous screen */}
        <TouchableOpacity style={styles.logo} onPress={() => router.push('/auth')}>
          <Image source={require('../../../assets/Icons/backArrow.png')} style={styles.arrow} />
        </TouchableOpacity>
        {/* Title text */}
        <Text style={styles.title}>Welcome!! Register to get started</Text>
        {/* Username input field */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        {/* Email input field */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        {/* Password input field */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {/* Confirm password input field */}
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {/* Register button */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>
        {/* Login link for users who already have an account */}
        <TouchableOpacity style={styles.loginLinkButton} onPress={() => router.push('/auth/login')}>
          <Text style={styles.alreadyHaveAccountText}>Already have an account?
            <Text style={styles.loginLinkButtonText}>   Login Now</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Styles for the RegisterScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    height: 30,
    width: 30,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  title: {
    marginTop: '10%',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 45,
    marginLeft: 20,
  },
  input: {
    width: '90%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    marginLeft: 20,
    marginBottom: 10,
    backgroundColor: '#F7F8F9',
  },
  registerButton: {
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 35,
    height: 50,
  },
  registerButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alreadyHaveAccountText: {
    fontSize: 10,
    width: '100%',
  },
  loginLinkButton: {
    marginTop: 10,
    width: '55%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loginLinkButtonText: {
    color: '#0000EE',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
