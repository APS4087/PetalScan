import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';


export default function AddNotificationScreen({ navigation }) {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Handler for submit button
  const handleSubmit = () => {
    router.push('/adminHome/notification');
  };

  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <View style={styles.notificationContainer}>
          <Text style={styles.sectionTitle}>Add Notification</Text>

          {/* Title Input */}
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />

          {/* Description Input */}
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = {
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  notificationContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
  },
};