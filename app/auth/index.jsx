import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/botanicLogo.png')} style={styles.logo} />
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/auth/login')}>
        <Text style={[styles.loginButtonText, styles.fontBold]}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/notification')}>
        <Text style={[styles.loginButtonText, styles.fontBold]}>Notification</Text>
      </TouchableOpacity> 
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/home')}>
        <Text style={[styles.loginButtonText, styles.fontBold]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/auth/register')}>
        <Text style={[styles.registerButtonText, styles.fontRegular]}>Register</Text>
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={[styles.separatorText, styles.fontItalic]}>or</Text>
        <View style={styles.separatorLine} />
      </View>
      <TouchableOpacity style={styles.googleButton}>
        <Image source={require('../../assets/images/googleLogo.png')} style={styles.googleLogo} />
        <Text style={[styles.googleButtonText, styles.fontRegular]}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '70%',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 10,
    marginTop: 100,
    marginBottom: 15,
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10,
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButtonText: {
    color: '#000000',
    fontSize: 16,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  separatorText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#666',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 50,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },
  googleLogo: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: '#000000',
    fontSize: 16,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  fontRegular: {
    fontWeight: 'normal',
  },
  fontItalic: {
    fontStyle: 'italic',
  },
});