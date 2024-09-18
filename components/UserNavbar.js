import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Button, View, Text, Linking } from "react-native";
import { useRouter } from "expo-router";
import images from "./data";

const Stack = createStackNavigator();

function UserNavbar() {
  const router = useRouter();

  const openMaps = () => {
    const url = "https://www.google.com/maps/@1.3138,103.8159,15z"; // Coordinates of Singapore Botanic Gardens
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.iconButton}>
        <Image source={images.homeIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton}>
        <Image source={images.searchIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => router.push("/home/camerascreen")}
      >
        <Image source={images.scanIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={openMaps}>
        <Image source={images.mapsIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => {
          router.push("/home/profile");
        }}
      >
        <Image source={images.profileIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderColor: "#e7e7e7",
  },
  iconButton: {
    alignItems: "center",
  },
  icon: {
    width: 28,
    height: 28,
  },
});

export default UserNavbar;
