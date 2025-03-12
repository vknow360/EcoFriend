import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HistoryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CO₂ Emission History</Text>
      <Text style={styles.info}>Track your monthly and yearly emissions</Text>

      {/* Future: Display charts and historical data */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    color: "gray",
  },
});

export default HistoryScreen;
