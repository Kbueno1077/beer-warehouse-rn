import BeerCard from "@/components/BeerCard/BeerCard";
import Colors from "@/constants/Colors";
import useBeerStore from "@/store/BeerStore";
import { getXataClient } from "@/xata/xata";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";

const homeImg = require("@/assets/images/beerglasses.png");

export type HomeProps = {};

export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefresing] = useState(false);

    const [page, setPage] = useState(1);
    const pageSize = 10;

    const { beers, filteredBeers, setBeers, hasFilters } = useBeerStore();

    const xata = getXataClient();

    const fetchBeers = async () => {
        setPage(1);

        setIsLoading(true);
        const record = await xata.db.beers
            .select([
                "id",
                "name",
                "alcohol_percentage",
                "ml",
                "country",
                "initial_impression",
                "bought_in",
                "evidence_img",
                "additional_comments",
            ])
            .sort("name", "asc")
            .getAll();

        setBeers(record);
        setIsLoading(false);
    };

    const handleRefresh = async () => {
        setRefresing(true);
        await fetchBeers();
        setRefresing(false);
    };

    const loadMore = () => {
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        fetchBeers();
    }, []);

    return (
        <ScrollView
            style={{ flex: 1 }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    colors={[Colors.medium]}
                    tintColor={Colors.medium}
                    onRefresh={handleRefresh}
                />
            }
        >
            <View style={styles.homeWrapper}>
                <Image
                    source={homeImg}
                    style={{ width: "100%", height: 320 }}
                />

                <View style={styles.beerWrapper}>
                    <View style={styles.totalContainer}>
                        <Link href="/(modal)/filter" asChild>
                            <TouchableOpacity style={styles.filterIcon}>
                                <View>
                                    <Entypo
                                        name="sound-mix"
                                        size={24}
                                        color={Colors.primary}
                                    />
                                </View>
                            </TouchableOpacity>
                        </Link>

                        <Text style={styles.totalText}>
                            Total:{" "}
                            {(hasFilters
                                ? filteredBeers.length
                                : beers?.length) || "N/A"}
                        </Text>
                    </View>

                    <View style={styles.beerContainer}>
                        {isLoading && !refreshing && (
                            <ActivityIndicator
                                size={48}
                                color={Colors.mediumDark}
                                animating={isLoading}
                            />
                        )}
                    </View>

                    <FlatList
                        data={
                            hasFilters
                                ? filteredBeers.slice(0, page * pageSize)
                                : beers.slice(0, page * pageSize)
                        }
                        ItemSeparatorComponent={() => (
                            <View style={{ padding: 16 }}></View>
                        )}
                        numColumns={2}
                        renderItem={({ item }) => (
                            <BeerCard key={item.id} beer={item} />
                        )}
                        columnWrapperStyle={styles.row}
                        style={styles.flatList}
                        scrollEnabled={false}
                    />

                    {(hasFilters
                        ? filteredBeers.length > page * pageSize
                        : beers.length > page * pageSize) && (
                        <TouchableOpacity
                            onPress={loadMore}
                            style={styles.loadMore}
                        >
                            <Text style={styles.loadMoreText}>Load More</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    homeWrapper: {
        marginBottom: 80,
    },
    beerWrapper: {
        marginHorizontal: 10,
        marginVertical: -60,
        paddingBottom: 20,
        backgroundColor: Colors.lightGrey,
        paddingHorizontal: 10,
        borderRadius: 10,
        shadowColor: Colors.grey,
        shadowOffset: {
            width: 14,
            height: -10,
        },
        shadowOpacity: 1,
        shadowRadius: 14,
        elevation: 28,
    },

    totalContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 15,
        marginHorizontal: 5,
    },

    beerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },

    filterIcon: {},

    flatList: {
        paddingBottom: 30,
    },

    row: {
        flex: 1,
        justifyContent: "center",
        gap: 10,
        marginBottom: -15,
    },

    totalText: {
        fontStyle: "italic",
        fontWeight: "bold",
        color: "gray",
        fontSize: 16,
    },

    loadMore: {
        alignSelf: "center",
        backgroundColor: Colors.primary,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },

    loadMoreText: { color: "white" },
});
