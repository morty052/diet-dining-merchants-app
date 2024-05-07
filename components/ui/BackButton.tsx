import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
type Props = {
  isCancel?: boolean;
};

const BackButton = ({ isCancel }: Props) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        padding: 4,
        height: 35,
        width: 35,
        alignItems: "center",
        backgroundColor: "white",
        justifyContent: "center",
        borderRadius: 20,
      }}
    >
      {!isCancel && <Ionicons name="arrow-back" color={"black"} size={24} />}
      {isCancel && <Ionicons name="close" color={"black"} size={24} />}
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
