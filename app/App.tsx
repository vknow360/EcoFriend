import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import ComparisonScreen from "./screens/ComparisonScreen";
import RewardsScreen from "./screens/RewardsScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Comparison") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Rewards") {
            iconName = focused ? "trophy" : "trophy-outline";
          } else if (route.name === "History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4CAF50", // Green color for active tab
        tabBarInactiveTintColor: "#9E9E9E", // Gray color for inactive tab
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Comparison" component={ComparisonScreen} />
      <Tab.Screen name="Rewards" component={RewardsScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#f5f5f5f5f5f5", // White background for the tab bar
    borderTopWidth: 0,
    elevation: 10, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 68, // Slightly taller tab bar
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 4, // Space between icon and label
  },
  tabBarItem: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8, // Padding for each tab item
  },
});
