import React from "react";
import { View, Text, StyleSheet } from "react-native";

const RewardsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Green Coins</Text>
            <Text style={styles.info}>
                Earn rewards for eco-friendly choices
            </Text>

            {/* Future: Display earned Green Coins and redemption options */}
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

export default RewardsScreen;
