import Colors from "@/constants/Colors";
import useBeerStore from "@/store/BeerStore";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    Touchable,
    View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";

type ErrorType = {
    name?: string;
};

interface FiltersModal {
    applyFiltersCallback: Function;
    hasFilters: boolean;
}

const FiltersModal: React.FC<FiltersModal> = () => {
    const [name, setName] = useState<string>("");
    const [errors, setErrors] = useState<ErrorType>({});
    const { applyFilters, clearFilters } = useBeerStore();

    const navigation = useNavigation();

    const validateForm = () => {
        let errors: ErrorType = {};

        if (!name) errors.name = "Name is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const applyFiltersCallback = () => {
        if (validateForm()) {
            const filters = { name };

            applyFilters(filters);
            setErrors({});
            setName("");
            navigation.goBack();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }
    };

    const cancelFilters = () => {
        setErrors({});
        setName("");
        clearFilters();
        navigation.goBack();
    };

    return (
        <View style={styles.modalWrapper}>
            <TextInput
                style={styles.textInput}
                placeholder="Filter by name"
                placeholderTextColor={Colors.mediumDark}
                value={name}
                onChangeText={setName}
            />
            {errors.name ? (
                <Text style={styles.errorText}>{errors.name}</Text>
            ) : null}

            <View style={styles.ctaContainer}>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={cancelFilters}
                >
                    <Text style={styles.removeButtonText}>Remove Filters</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.applyButton}
                    onPress={applyFiltersCallback}
                >
                    <Text style={styles.applyButtonText}>Apply Filter</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default FiltersModal;

const styles = StyleSheet.create({
    modalWrapper: {
        paddingVertical: 16,
    },

    textInput: {
        padding: 16,
        margin: 5,
        borderColor: Colors.grey,
        borderWidth: 2,
        borderRadius: 10,
    },

    errorText: {
        color: Colors.error,
        marginBottom: 10,
        paddingHorizontal: 10,
        fontStyle: "italic",
        alignSelf: "flex-end",
    },

    ctaContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },

    applyButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        alignItems: "center",
        borderRadius: 8,
    },
    applyButtonText: {
        color: "white",
    },

    removeButton: {
        borderColor: Colors.primary,
        borderWidth: 2,
        padding: 16,
        alignItems: "center",
        borderRadius: 8,
    },
    removeButtonText: {
        color: Colors.primary,
    },
});
