import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    ActivityIndicator,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
} from "react-native";
import MapView, {
    Marker,
    Polyline,
    PROVIDER_DEFAULT,
    Region,
} from "react-native-maps";

const HomeScreen = () => {
    const [start, setStart] = useState("Kushinagar");
    const [destination, setDestination] = useState("Gorakhpur");
    const [startCoords, setStartCoords] = useState<{
        lat: number;
        lon: number;
    } | null>(null);
    const [destinationCoords, setDestinationCoords] = useState<{
        lat: number;
        lon: number;
    } | null>(null);
    const [route, setRoute] = useState<
        { latitude: number; longitude: number }[]
    >([]);
    const [loading, setLoading] = useState(false);
    const [distance, setDistance] = useState<number | null>(null);
    const [emissions, setEmissions] = useState<number | null>(null);
    const [greenCoins, setGreenCoins] = useState<number | null>(null);
    const [region, setRegion] = useState<Region>({
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const [transportMode, setTransportMode] = useState<
        "car" | "bus" | "bike" | "walking"
    >("car");
    const [infoPanelVisible, setInfoPanelVisible] = useState(true);

    const modeEmissions = {
        car: 120,
        bus: 80,
        bike: 50,
        walking: 0,
    };

    const mapRef = useRef<MapView | null>(null);
    const updateTransportMode = (mode: "car" | "bus" | "bike" | "walking") => {
        setTransportMode(mode);
        if (distance !== null) {
            const newEmissions = distance * (modeEmissions[mode] / 1000);
            setEmissions(newEmissions);
            setGreenCoins(Math.floor(greenCoinsEarned(newEmissions)));
        }
    };

    const greenCoinsEarned = (emissions: number) => {
        let maxEmission = (distance ?? 0) * (modeEmissions["car"] / 1000);
        return (maxEmission - emissions) * 2;
    };

    const fetchCoordinates = async (location: string) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
                    location
                )}`,
                {
                    headers: {
                        "User-Agent": "TheFutureApp/1.0 (contact@example.com)",
                    },
                }
            );
            const data = await response.json();
            if (data.length === 0) {
                Alert.alert(
                    "Location Not Found",
                    "Please enter a valid location."
                );
                return null;
            }
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
            };
        } catch (error) {
            Alert.alert("Error", "Failed to fetch location. Please try again.");
            return null;
        }
    };

    const fetchRoute = async () => {
        if (!start || !destination) {
            Alert.alert(
                "Missing Input",
                "Please enter both start and destination."
            );
            return;
        }

        setLoading(true);
        hideKeyboard();

        const startLocation = await fetchCoordinates(start);
        const destinationLocation = await fetchCoordinates(destination);

        if (!startLocation || !destinationLocation) {
            setLoading(false);
            return;
        }

        setStartCoords(startLocation);
        setDestinationCoords(destinationLocation);

        try {
            const routeResponse = await fetch(
                `http://router.project-osrm.org/route/v1/${transportMode}/${startLocation.lon},${startLocation.lat};${destinationLocation.lon},${destinationLocation.lat}?overview=full&geometries=geojson`
            );
            const routeData = await routeResponse.json();
            if (routeData.routes.length === 0) {
                throw new Error("No route found.");
            }

            const coordinates = routeData.routes[0].geometry.coordinates.map(
                ([lon, lat]: [number, number]) => ({
                    latitude: lat,
                    longitude: lon,
                })
            );

            setRoute([]);
            setTimeout(() => setRoute(coordinates), 300);

            const routeDistance = routeData.routes[0].distance / 1000;
            const emissionEstimate =
                routeDistance * (modeEmissions[transportMode] / 1000);
            const earnedGreenCoins = Math.max(0, (5 - emissionEstimate) * 2);

            setDistance(routeDistance);
            setEmissions(emissionEstimate);
            setGreenCoins(earnedGreenCoins);

            mapRef.current?.fitToCoordinates(coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
            setInfoPanelVisible(true);
        } catch (error) {
            Alert.alert("Error", "Failed to fetch route.");
        } finally {
            setLoading(false);
        }
    };

    const zoomIn = () => {
        setRegion((prev) => ({
            ...prev,
            latitudeDelta: prev.latitudeDelta / 1.5,
            longitudeDelta: prev.longitudeDelta / 1.5,
        }));
    };

    const zoomOut = () => {
        setRegion((prev) => ({
            ...prev,
            latitudeDelta: prev.latitudeDelta * 1.5,
            longitudeDelta: prev.longitudeDelta * 1.5,
        }));
    };

    return (
        <View style={styles.container}>
            {/* Map */}
            <MapView
                ref={mapRef}
                provider={PROVIDER_DEFAULT}
                style={styles.map}
                region={region}
                pitchEnabled={true}
                onRegionChangeComplete={setRegion}
            >
                {startCoords && (
                    <Marker
                        coordinate={{
                            latitude: startCoords.lat,
                            longitude: startCoords.lon,
                        }}
                        title="Start"
                    />
                )}
                {destinationCoords && (
                    <Marker
                        coordinate={{
                            latitude: destinationCoords.lat,
                            longitude: destinationCoords.lon,
                        }}
                        title="Destination"
                    />
                )}
                {route.length > 0 && (
                    <Polyline
                        coordinates={route}
                        strokeWidth={4}
                        strokeColor="green"
                    />
                )}
            </MapView>

            {/* Compact Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Start"
                    value={start}
                    onChangeText={setStart}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Destination"
                    value={destination}
                    onChangeText={setDestination}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    activeOpacity={0.8}
                    onPress={fetchRoute}
                >
                    <Text style={styles.searchButtonText}>Go</Text>
                </TouchableOpacity>
            </View>

            {/* Zoom Controls (Bottom Right) */}
            <View style={styles.zoomControls}>
                <Pressable style={styles.zoomButton} onPress={zoomIn}>
                    <Text style={styles.zoomText}>+</Text>
                </Pressable>
                <Pressable style={styles.zoomButton} onPress={zoomOut}>
                    <Text style={styles.zoomText}>-</Text>
                </Pressable>
            </View>

            {/* Info Panel */}
            {infoPanelVisible && distance !== null && (
                <View style={styles.bottomSheet}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoText}>
                            📍 {distance.toFixed(2)} km
                        </Text>
                        <Text style={styles.infoText}>
                            💨 {emissions?.toFixed(2)} kg CO₂
                        </Text>
                        <Text style={styles.infoText}>
                            🎉 {greenCoins?.toFixed(1)} Green Coins
                        </Text>
                    </View>
                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                transportMode === "car" && styles.activeTab,
                            ]}
                            onPress={() => updateTransportMode("car")}
                        >
                            <Ionicons name="car" size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                transportMode === "bus" && styles.activeTab,
                            ]}
                            onPress={() => updateTransportMode("bus")}
                        >
                            <Ionicons name="bus" size={20} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                transportMode === "bike" && styles.activeTab,
                            ]}
                            onPress={() => updateTransportMode("bike")}
                        >
                            <FontAwesome
                                name="motorcycle"
                                size={20}
                                color={"black"}
                            ></FontAwesome>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tab,
                                transportMode === "walking" && styles.activeTab,
                            ]}
                            onPress={() => updateTransportMode("walking")}
                        >
                            <Ionicons name="walk" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setInfoPanelVisible(false)}
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            )}

            {loading && (
                <ActivityIndicator
                    size="large"
                    color="blue"
                    style={styles.loader}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    searchContainer: {
        position: "absolute",
        top: 10,
        left: 10,
        right: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 8,
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 3,
        zIndex: 1,
    },
    input: {
        flex: 1,
        backgroundColor: "#e8e8e8",
        borderRadius: 6,
        padding: 10,
        marginRight: 5,
    },
    searchButton: {
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 6,
        alignItems: "center",
    },
    searchButtonText: { color: "white", fontWeight: "bold" },
    map: { flex: 1 },
    zoomControls: {
        position: "absolute",
        top: 80,
        right: 20,
        alignItems: "center",
    },
    zoomButton: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 5,
        marginBottom: 5,
        elevation: 3,
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    zoomText: {
        fontSize: 18,
        fontWeight: "bold",
        width: 30,
        height: 30,
        textAlign: "center",
    },
    bottomSheet: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        position: "absolute",
        bottom: 10,
        left: 20,
        right: 20,
        elevation: 3,
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    infoText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
        flex: 1,
    },
    tabContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    tab: {
        flex: 1,
        padding: 10,
        borderRadius: 6,
        alignItems: "center",
        backgroundColor: "#e8e8e8",
        marginHorizontal: 5,
        height: 40,
        justifyContent: "center",
        width: 60,
    },
    activeTab: {
        backgroundColor: "#007AFF",
    },
    tabText: {
        color: "black",
        fontWeight: "bold",
    },
    closeButton: {
        backgroundColor: "#FF3B30",
        padding: 10,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
    },
    closeButtonText: { color: "white", fontWeight: "bold" },
    loader: { position: "absolute", top: "50%", left: "50%" },
});

export default HomeScreen;
function hideKeyboard() {
    Keyboard.dismiss();
}
