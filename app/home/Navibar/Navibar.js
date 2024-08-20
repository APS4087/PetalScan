
// App.jsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { Button, View, Text } from 'react-native';

const Stack = createStackNavigator();

function Navibar() {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.iconButton}>
        <Image source={require('../../../assets/Icons/home.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Image source={require('../../../assets/Icons/search.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Image source={require('../../../assets/Icons/scan.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Image source={require('../../../assets/Icons/maps.png')} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Image source={require('../../../assets/Icons/profile.png')} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderTopWidth: 1,
    borderColor: '#e7e7e7',
  },
  iconButton: {
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
  },
});

export default Navibar;