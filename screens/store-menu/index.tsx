import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Colors from "../../constants/colors";

type Props = {};

export const StoreMenu = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image />
      <Text>StoreMenu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
  },
});
