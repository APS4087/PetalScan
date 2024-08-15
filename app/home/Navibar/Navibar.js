
// App.jsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text } from 'react-native';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View>
      <Text>Home Screen</Text>
      <Button 
        title="Go to Details" 
        onPress={() => navigation.navigate('Details')} 
      />
    </View>
  );
}

function DetailsScreen() {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
