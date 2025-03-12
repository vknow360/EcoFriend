import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ComparisonScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>CO₂ Emission Comparison</Text>
            <Text style={styles.info}>Compare different travel options</Text>

            {/* Future: Integrate charts for better visualization */}
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

export default ComparisonScreen;
