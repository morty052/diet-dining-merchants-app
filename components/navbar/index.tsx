import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  minimal?: boolean;
};

export const NavBar = ({ minimal }: Props) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-gray-800 ">
      <View className="py-2 px-4 bg-gray-800 border-b border-white">
        {minimal && (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons size={28} color={"white"} name="chevron-back" />
          </TouchableOpacity>
        )}
        {!minimal && (
          <Text className="text-2xl text-gray-50 font-medium">NavBar</Text>
        )}
      </View>
    </SafeAreaView>
  );
};
