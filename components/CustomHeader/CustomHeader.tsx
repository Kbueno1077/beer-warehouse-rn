import Colors from "@/constants/Colors";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const CustomHeader = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.headerTitle}>Beer-Warehouse</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: Colors.primary },
    container: {
        flexDirection: "row",
        height: 50,
        backgroundColor: Colors.primary,
        alignItems: "center",
        paddingHorizontal: 16,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
    },
    headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default CustomHeader;
