import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ProductProps } from "../../types/ProductProps";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

export function ProductCard({ product }: { product: ProductProps }) {
  const navigation = useNavigation<any>();

  const { name, image, price, _id, description } = product;

  return (
    <Pressable
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        columnGap: 10,
        backgroundColor: Colors.lightBlack,
        padding: 10,
        borderRadius: 10,
      }}
      onPress={() =>
        navigation.navigate("FoodScreen", {
          _id,
        })
      }
    >
      <Image
        source={{ uri: image }}
        style={{ width: 60, height: 60, borderRadius: 10 }}
      />
      <View style={{ flex: 1, paddingRight: 20 }}>
        <Text style={{ color: "white" }}>{name}</Text>
        <Text style={{ color: "white" }}>${price}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
