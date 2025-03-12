import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const ProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile</Text>
            <Text style={styles.info}>
                Manage your preferences and settings
            </Text>
            <Button title="Edit Profile" onPress={() => {}} />

            {/* Future: Integrate user authentication and profile settings */}
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
        marginBottom: 20,
    },
});

export default ProfileScreen;
