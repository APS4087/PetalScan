import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logo} onPress={() => router.push('/auth')}>
        <Image source={require('../../../assets/Icons/backArrow.png')} style={styles.arrow} />
      </TouchableOpacity>
      <Text style={styles.title}>Sign in to your Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordButtonText}>Forgot Password ?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerLinkButton} onPress={()=>router.push('/auth/register')}>
        <Text style={styles.dontHaveAccountText}>Don't have an account ?
        <Text style={styles.registerLinkButtonText}>   Register</Text>
        </Text>
      </TouchableOpacity>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start', 
    backgroundColor: '#ffffff',
    padding: 16,
  },
  logo: {
    height: 30,
    width: 30,
    marginLeft: 20,
    marginTop: 40,
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
    //borderWidth: 1,
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
    // borderWidth: 1,
  },
  registerLinkButton: {
    //borderWidth: 1,
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