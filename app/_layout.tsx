import Colors from "@/constants/Colors";
import { Stack, useNavigation } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import CustomHeader from "@/components/CustomHeader/CustomHeader";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "index",
};

export default function RootLayoutNav() {
    const navigation = useNavigation();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{
                            headerTitle: "Beer-warehouse",
                            headerStyle: { backgroundColor: Colors.primary },
                            headerTintColor: "#fff",
                            contentStyle: { backgroundColor: Colors.secondary },

                            header: () => <CustomHeader />,
                        }}
                    />

                    <Stack.Screen
                        name="(modal)/filter"
                        options={{
                            presentation: "modal",
                            headerTitle: "Filter",
                            headerShadowVisible: false,
                            headerStyle: { backgroundColor: Colors.lightGrey },
                            headerTitleStyle: { color: Colors.primary },
                            headerLeft: () => (
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.goBack();
                                    }}
                                >
                                    <Ionicons
                                        name="close-outline"
                                        size={28}
                                        color={Colors.primary}
                                    />
                                </TouchableOpacity>
                            ),
                        }}
                    />
                </Stack>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
