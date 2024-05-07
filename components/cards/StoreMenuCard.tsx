import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

type Props = {};

export function StoreMenuCard({
  name,
  image,
  price,
  _id,
  vendor,
  description,
}: {
  name: string;
  price: number;
  image: string;
  _id: string;
  vendor: string;
  description: string;
}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={
        () =>
          // @ts-ignore
          navigation.navigate("FoodScreen", {
            _id,
          })
        // console.log(_id)
      }
      className=" flex flex-row items-center  py-2 justify-between  "
    >
      <View className="flex-1 gap-2">
        <Text className="text-[18px] text-dark font-medium">{name}</Text>
        <Text className=" font-medium text-[18px]">${price} - 390 cal</Text>
      </View>
      <View className="w-32 h-32 border border-black/10 rounded-lg">
        <Image
          resizeMode="contain"
          className="w-full h-full"
          source={{ uri: image }}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
