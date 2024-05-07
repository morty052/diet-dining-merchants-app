import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button } from "../ui";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

type Props = {};

export const ErrorState = (props: Props) => {
  const navigation = useNavigation();

  return (
    <View className={styles.container}>
      <Ionicons size={150} name="warning" color={"red"} />
      <View className={styles.textContainer}>
        <Text className={styles.errorText}>Something went Wrong</Text>
        <Text className={styles.subText}>
          Check your connection and try again
        </Text>
      </View>
      <Button variant="default" title="Try Again" />
    </View>
  );
};

const styles = {
  container: "align-center items-center bg-white  py-28 px-4 flex-1",
  textContainer: "mb-8",
  errorText: "text-4xl font-medium text-dark text-center",
  subText: "text-center text-lg ",
};
