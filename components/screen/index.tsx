import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../constants/colors";

type Props = {
  children?: React.ReactNode;
};

export const Screen = ({ children }: Props) => {
  return (
    <View
      style={{
        backgroundColor: Colors.darkGrey,
        flex: 1,
        paddingHorizontal: 8,
        // paddingVertical: 24,
      }}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({});
