import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Text style={[styles.title, darkMode && styles.darkTitle]}>
          User Profile
        </Text>
        <Text style={[styles.subtitle, darkMode && styles.darkSubtitle]}>
          Manage your preferences and settings
        </Text>
      </View>

      <View style={styles.profileCard}>
        <Ionicons name="person-circle" size={60} color="#007AFF" />
        <View style={styles.profileInfo}>
          <Text style={[styles.profileName, darkMode && styles.darkText]}>
            John Doe
          </Text>
          <Text style={[styles.profileEmail, darkMode && styles.darkText]}>
            john.doe@example.com
          </Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.settingsCard}>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, darkMode && styles.darkText]}>
            Dark Mode
          </Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#e8e8e8", true: "#007AFF" }}
            thumbColor={darkMode ? "#fff" : "#f4f3f4"}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, darkMode && styles.darkText]}>
            Notifications
          </Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#e8e8e8", true: "#007AFF" }}
            thumbColor={notifications ? "#fff" : "#f4f3f4"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  darkContainer: {
    backgroundColor: "#1a1a1a",
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
  },
  darkTitle: {
    color: "#fff",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "400",
  },
  darkSubtitle: {
    color: "#bbb",
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  profileEmail: {
    fontSize: 14,
    color: "#666",
  },
  darkText: {
    color: "#fff",
  },
  editButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  editButtonText: {
    color: "white",
    fontWeight: "600",
  },
  settingsCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default ProfileScreen;
