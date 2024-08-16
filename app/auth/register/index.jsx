import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';



export default function RegisterScreen() {

  const router = useRouter();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logo} onPress={() => router.push('/auth')}>
        <Image source={require('../../../assets/Icons/backArrow.png')} style={styles.arrow} />
      </TouchableOpacity>
      <Text style={styles.title}>Welcome!! Register to get started</Text>
      <TextInput
        style={styles.input}
        placeholder="username"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="email"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="confirm password"
        secureTextEntry
      />
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginLinkButton} onPress={()=>router.push('/auth/login')}>
        <Text style={styles.alreadyHaveAccountText}>Already have an account ?
        <Text style={styles.loginLinkButtonText}>   Login Now</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left', 
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
    alignItems: 'center', 
    justifyContent: 'center',
    marginLeft: 20,
    marginBottom: 10,
    marginTop: 10,
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
    // borderWidth: 1,
  },
  loginLinkButton: {
    marginTop: 10,
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',

  },
  loginLinkButtonText: {
    color: '#0000EE',
    fontSize: 12,
    fontWeight: 'bold',
  },
});