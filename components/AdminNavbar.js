import React from "react";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { useRouter } from "expo-router";
import images from "./data";

function AdminNavbar({ navigation }) {
  const router = useRouter();
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => router.push("/admin")}>
        <View style={styles.navItem}>
          <Image source={images.homeIcon} style={styles.icon} />
          <Text style={styles.label}>Home</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/adminHome/database")}>
        <View style={styles.navItem}>
          <Image
            source={images.mapsIcon} // Replace with actual icon
            style={styles.icon}
          />
          <Text style={styles.label}>Database</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/adminHome/notification")}>
        <View style={styles.navItem}>
          <Image source={images.notificationIcon} style={styles.icon} />
          <Text style={styles.label}>Notification</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/user")}>
        <View style={styles.navItem}>
          <Image source={images.profileIcon} style={styles.icon} />
          <Text style={styles.label}>User</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1c1c1c", // Dark background color like in the screenshot
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  navItem: {
    alignItems: "center",
  },
  icon: {
    width: 24, // Size of the icons
    height: 24,
    tintColor: "#676D75", // White icon color to match the screenshot
  },
  label: {
    marginTop: 5,
    fontSize: 12,
    color: "#ffffff", // White text color to match the screenshot
  },
});

export default AdminNavbar;
