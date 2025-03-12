import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const RewardsScreen = () => {
  const rewardsData = [
    { id: "1", title: "Eco-Friendly Bag", coins: 50 },
    { id: "2", title: "Reusable Water Bottle", coins: 30 },
    { id: "3", title: "Plant a Tree", coins: 100 },
  ];

  const renderRewardItem = ({ item }) => (
    <View style={styles.rewardCard}>
      <Text style={styles.rewardTitle}>{item.title}</Text>
      <View style={styles.rewardFooter}>
        <Text style={styles.rewardCoins}>{item.coins} Green Coins</Text>
        <TouchableOpacity style={styles.redeemButton}>
          <Text style={styles.redeemButtonText}>Redeem</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Green Coins</Text>
      <Text style={styles.subtitle}>Earn rewards for eco-friendly choices</Text>

      <View style={styles.coinBalance}>
        <Ionicons name="trophy" size={24} color="#FFD700" />
        <Text style={styles.coinBalanceText}>150 Green Coins</Text>
      </View>

      <FlatList
        data={rewardsData}
        renderItem={renderRewardItem}
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
  coinBalance: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  coinBalanceText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
  },
  listContainer: {
    paddingBottom: 20,
  },
  rewardCard: {
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
  rewardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  rewardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rewardCoins: {
    fontSize: 14,
    color: "#666",
  },
  redeemButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  redeemButtonText: {
    color: "white",
    fontWeight: "600",
  },
});

export default RewardsScreen;
