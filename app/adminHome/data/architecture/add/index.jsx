import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // For back icon
import * as ImagePicker from 'expo-image-picker'; // For image picking
import { Picker } from '@react-native-picker/picker'; // For category picker
import { useRouter } from 'expo-router';

function AddDatabase({ navigation }) {
  const [selectedImages, setSelectedImages] = useState([]); // To store selected images
  const [description, setDescription] = useState('');
  const [googleLink, setGoogleLink] = useState('');
  const [category, setCategory] = useState('Architecture'); // Default category set
  const router = useRouter();

  // Function to pick images from the gallery
  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,  
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setSelectedImages([...selectedImages, result.assets[0].uri]); // Add selected image to state
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>

        {/* Back Button */}
        <TouchableOpacity onPress={() => router.push('/adminHome/data')} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Add Database</Text>

        {/* Image Picker Container */}
        <TouchableOpacity style={styles.imageContainer} onPress={pickImages}>
          {selectedImages.length > 0 ? (
            <ScrollView horizontal>
              {selectedImages.map((imageUri, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUri }}
                  style={styles.selectedImage}
                />
              ))}
            </ScrollView>
          ) : (
            <Text style={styles.addPictureText}>Add Picture</Text>
          )}
        </TouchableOpacity>

        {/* Description Input */}
        <TextInput
          style={styles.input}
          placeholder="Description"
          placeholderTextColor="#888"
          value={description}
          onChangeText={setDescription}
        />

        {/* Google Link Input */}
        <TextInput
          style={styles.input}
          placeholder="Google link"
          placeholderTextColor="#888"
          value={googleLink}
          onChangeText={setGoogleLink}
        />

        {/* Category Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            
            <Picker.Item label="Architecture" value="Architecture" />
            <Picker.Item label="Flower" value="Flower" />
            <Picker.Item label="Plant" value="Plant" />
          </Picker>
        </View>

        {/* Publish Button */}
        <TouchableOpacity style={styles.publishButton}>
          <Text style={styles.publishText}>Publish</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  content: {
    flex: 1,
  },
  backButton: {
    marginTop: 50,
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  imageContainer: {
    backgroundColor: '#d3d3d3',
    height: 200,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  addPictureText: {
    color: '#888',
    fontSize: 18,
  },
  selectedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  input: {
    backgroundColor: '#F7F8F9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: '#cccccc',
    borderWidth: 1,
  },
  pickerContainer: {
    backgroundColor: '#F7F8F9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    marginBottom: 20,
  },
  publishButton: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  publishText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddDatabase;
