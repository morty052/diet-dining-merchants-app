import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";

type Props = {};

const LoadingScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={100} color={Colors.primary} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 200,
  },
});
