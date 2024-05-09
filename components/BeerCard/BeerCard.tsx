import React, { useState } from "react";
import {
    Image,
    ImageBackground,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { BeerType } from "../../util/types";
import { SvgUri } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

export type BeerCardProps = { beer: BeerType };

const BeerCard: React.FC<BeerCardProps> = ({ beer }) => {
    const [isLoading, setIsloading] = useState(true);
    const navigation = useNavigation();

    const onLoad = () => {
        setIsloading(false);
    };

    let flag = beer.country;

    if (flag === "en") {
        flag = "us";
    }

    const flagUrl = `https://flagcdn.com/${flag}.svg`;

    return (
        <View style={styles.container}>
            <ImageBackground
                resizeMode="cover"
                imageStyle={{ borderRadius: 10 }}
                source={{ uri: beer?.evidence_img ?? "" }}
                style={styles.img}
                onLoadEnd={onLoad}
            >
                <View style={styles.nameContainer}>
                    <Text style={styles.nameTitle}>{beer.name}</Text>
                </View>

                <View style={styles.details}>
                    <View>
                        <Text>ABV: {beer.alcohol_percentage}%</Text>
                        <Text>ML: {beer.ml}</Text>
                    </View>

                    <View>
                        <SvgUri
                            width="40"
                            height="40"
                            uri={flagUrl}
                            style={styles.svg}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexBasis: "48.5%",
        height: 250,
        elevation: 3,
        shadowColor: "#333",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        borderRadius: 10,
    },

    img: {
        flex: 1,
        justifyContent: "space-between",
    },

    nameContainer: {
        marginHorizontal: 5,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: "rgba(52, 52, 52, 0.8)",
        alignSelf: "flex-start",
    },
    nameTitle: { padding: 10, color: "white" },

    details: {
        backgroundColor: "rgba(255,255,255,0.85)",
        borderTopColor: "white",
        borderTopWidth: 1,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
    },

    SvgContainer: {
        flex: 1,
    },

    svg: {
        flex: 1,
    },
});

export default BeerCard;
