import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const ComparisonScreen = () => {
  const [distance, setDistance] = useState("10"); // Default distance: 10 km
  const modeEmissions = {
    car: 120, // g/km
    bus: 80,
    bike: 50,
    walking: 0,
  };

  const travelOptions = [
    { mode: "car", icon: "car", iconLib: "Ionicons" },
    { mode: "bus", icon: "bus", iconLib: "Ionicons" },
    { mode: "bike", icon: "motorcycle", iconLib: "FontAwesome" },
    { mode: "walking", icon: "walk", iconLib: "Ionicons" },
  ];

  const calculateEmissions = (mode) => {
    const dist = parseFloat(distance) || 0;
    return ((dist * modeEmissions[mode]) / 1000).toFixed(2); // Convert to kg
  };

  const getMaxEmission = () => {
    const dist = parseFloat(distance) || 0;
    return ((dist * modeEmissions.car) / 1000).toFixed(2); // Car has the highest emissions
  };

  const renderTravelOption = ({ item }) => {
    const emissions = calculateEmissions(item.mode);
    const maxEmission = getMaxEmission();
    const barWidth = maxEmission > 0 ? (emissions / maxEmission) * 100 : 0;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          {item.iconLib === "Ionicons" ? (
            <Ionicons name={item.icon} size={24} color="#333" />
          ) : (
            <FontAwesome name={item.icon} size={24} color="#333" />
          )}
          <Text style={styles.cardTitle}>
            {item.mode.charAt(0).toUpperCase() + item.mode.slice(1)}
          </Text>
        </View>
        <View style={styles.emissionRow}>
          <View style={styles.barContainer}>
            <View style={[styles.emissionBar, { width: `${barWidth}%` }]} />
          </View>
          <Text style={styles.emissionText}>{emissions} kg CO₂</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>CO₂ Emission Comparison</Text>
        <Text style={styles.subtitle}>Compare different travel options</Text>
      </View>

      {/* Distance Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Distance (km)</Text>
        <TextInput
          style={styles.input}
          value={distance}
          onChangeText={setDistance}
          keyboardType="numeric"
          placeholder="Enter distance"
          placeholderTextColor="#888"
        />
      </View>

      {/* Travel Options List */}
      <FlatList
        data={travelOptions}
        renderItem={renderTravelOption}
        keyExtractor={(item) => item.mode}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Summary</Text>
        <Text style={styles.summaryText}>
          Walking is the most eco-friendly option with 0 kg CO₂ emissions.
        </Text>
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
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    fontWeight: "400",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#333",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },
  emissionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  barContainer: {
    flex: 1,
    height: 8,
    backgroundColor: "#e8e8e8",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 12,
  },
  emissionBar: {
    height: "100%",
    backgroundColor: "#FF3B30",
    borderRadius: 4,
  },
  emissionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  summaryCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: "#666",
  },
});

export default ComparisonScreen;
