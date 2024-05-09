import React, { useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

type ErrorType = {
    name?: string;
};

interface FiltersModal {
    applyFiltersCallback: Function;
    hasFilters: boolean;
}

const FiltersModal: React.FC<FiltersModal> = ({
    applyFiltersCallback,
    hasFilters,
}) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [errors, setErrors] = useState<ErrorType>({});

    const validateForm = () => {
        let errors: ErrorType = {};

        if (!name) errors.name = "Name is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const applyFilters = () => {
        if (validateForm()) {
            const filters = { name };
            setErrors({});

            applyFiltersCallback(filters);
            setIsModalVisible(false);
            setName("");
        }
    };

    const cancelFilters = () => {
        setErrors({});
        setName("");
        applyFiltersCallback({ name: "" });
        setIsModalVisible(false);
    };

    return (
        <View>
            <Button
                title={hasFilters ? "Filters*" : "Filters"}
                onPress={() => setIsModalVisible(true)}
            />
            <Modal
                visible={isModalVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalWrapper}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Filter by name"
                        value={name}
                        onChangeText={setName}
                    />
                    {errors.name ? (
                        <Text style={styles.errorText}>{errors.name}</Text>
                    ) : null}

                    <View style={styles.ctaContainer}>
                        <Button
                            title="Remove Filters"
                            onPress={cancelFilters}
                        />

                        <Button title="Apply Filter" onPress={applyFilters} />
                    </View>
                </View>
            </Modal>
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
        borderColor: "gray",
        borderWidth: 2,
        borderRadius: 10,
    },

    errorText: { color: "red", marginBottom: 10, paddingHorizontal: 10 },

    ctaContainer: {
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around",
    },
});
