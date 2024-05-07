import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

const SettingsButton = (props: Props) => {
  const navigate = useNavigation();
  return (
    // @ts-ignore
    <Pressable onPress={() => navigate.navigate("Settings")}>
      <Ionicons name="settings-outline" size={24} color="white" />
    </Pressable>
  );
};

export default SettingsButton;

const styles = StyleSheet.create({});
