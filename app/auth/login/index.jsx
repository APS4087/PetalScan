import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  // setting up the router
  const router = useRouter();

  // setting up the state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // setting up the function to handle login
  const handleLogin = async () => {
    console.log(email, password);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (user.emailVerified) {
        router.push('/home');
      } else {
        alert('Please verify your email address.');
        await auth.signOut();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0} 
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <TouchableOpacity style={styles.logo} onPress={() => router.push('/auth')}>
          <Image source={require('../../../assets/Icons/backArrow.png')} style={styles.arrow} />
        </TouchableOpacity>
        <Text style={styles.title}>Sign in to your Account</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerLinkButton} onPress={() => router.push('/auth/register')}>
          <Text style={styles.dontHaveAccountText}>Don't have an account?
            <Text style={styles.registerLinkButtonText}> Register</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20, // Add padding to avoid the bottom content being hidden
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
    marginTop: '20%',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 50,
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
    marginTop: 20,
    backgroundColor: '#F7F8F9',
  },
  loginButton: {
    backgroundColor: '#000000',
    padding: 12,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 35,
    marginLeft: 35,
    height: 50,
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    width: '30%',
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  forgotPasswordButtonText: {
    color: '#0000EE',
    fontSize: 12,
  },
  dontHaveAccountText: {
    fontSize: 10,
    width: '100%',
  },
  registerLinkButton: {
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  registerLinkButtonText: {
    color: '#0000EE',
    fontSize: 11,
    fontWeight: 'bold',
  },
});
