import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HistoryScreen = () => {
  const historyData = [
    { id: "1", date: "2023-10-01", emissions: 12.5, mode: "car" },
    { id: "2", date: "2023-10-02", emissions: 8.2, mode: "bus" },
    { id: "3", date: "2023-10-03", emissions: 5.0, mode: "bike" },
    { id: "4", date: "2023-10-04", emissions: 0.0, mode: "walking" },
  ];

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <Ionicons
          name={
            item.mode === "car"
              ? "car"
              : item.mode === "bus"
              ? "bus"
              : item.mode === "bike"
              ? "bicycle"
              : "walk"
          }
          size={24}
          color="#4CAF50"
        />
        <Text style={styles.historyDate}>{item.date}</Text>
      </View>
      <Text style={styles.historyEmissions}>
        {item.emissions.toFixed(2)} kg CO₂
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CO₂ Emission History</Text>
      <Text style={styles.subtitle}>
        Track your monthly and yearly emissions
      </Text>

      <FlatList
        data={historyData}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
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
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  historyCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
  },
  historyEmissions: {
    fontSize: 14,
    color: "#666",
  },
});

export default HistoryScreen;
