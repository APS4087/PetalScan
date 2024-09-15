import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For icons
import { useRouter } from 'expo-router';
import AdminNavbar from '../../../components/AdminNavbar.js';
import images from '../../../components/data.js';

function UserPage({ navigation }) {
  const router = useRouter();
  
   // Handler for add user click
   const addOnClick = () => {
    router.push('/adminHome/users/create');
  };

   // Handler for update user click
   const updateUseronClick = () => {
    router.push('/adminHome/users/update');
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', status: 'active' },
    { id: 2, name: 'Jane Smith', status: 'inactive' },
    { id: 3, name: 'Bob Johnson', status: 'active' },
  ]);

  const toggleStatus = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {/* Title */}
        <View style={styles.header}>
          <Text style={styles.title}>User Page</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Image source={images.searchIcon} style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            placeholderTextColor="#888"
          />
        </View>

        {/* Add New User */}
        <TouchableOpacity style={styles.addUserContainer} onPress={addOnClick}>
          <MaterialIcons name="add" size={30} color="gray" />
        </TouchableOpacity>

        {/* User List */}
        {users.map((user) => (
          <View key={user.id} style={styles.userContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.userActions}>
              <TouchableOpacity
                style={[
                  styles.statusButton,
                  user.status === 'active' ? styles.active : styles.inactive
                ]}
                onPress={() => toggleStatus(user.id)}
              >
                <Text style={styles.statusText}>{user.status}</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={24} color="black" onPress={updateUseronClick}/>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <AdminNavbar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 10,
    borderBottomColor: '#FFFFFF',
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    borderRadius: 15,
    marginVertical: 20,
    marginHorizontal: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    marginTop: 0,
  },
  searchIcon: {
    width: 15,
    height: 15,
    marginLeft: 20,
  },
  searchBar: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  addUserContainer: {
    backgroundColor: '#E8ECF4',
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    marginBottom: 20,
  },
  userContainer: {
    backgroundColor: '#E8ECF4',
    padding: 12,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8391A1',
  },
  userActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusButton: {
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    width: 90,
  },
  active: {
    backgroundColor: '#109CF1',
  },
  inactive: {
    backgroundColor: '#FF3B47',
  },
  statusText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default UserPage;
