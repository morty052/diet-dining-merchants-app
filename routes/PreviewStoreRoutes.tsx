import { StyleSheet, Text, View } from "react-native";
import React from "react";
import SocketContextComponent from "../contexts/SocketContextComponent";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PreviewStoreScreen from "../screens/preview-store-screen";
import { getItem } from "../utils/storage";

type Props = {};

const Stack = createNativeStackNavigator();

const PreviewStoreRoutes = ({ navigation }: any) => {
  React.useEffect(() => {
    const affiliate_id = getItem("affiliate_id");
    if (!affiliate_id) {
      navigation.goBack();
    }
  }, []);

  return (
    <SocketContextComponent>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PreviewStoreHome" component={PreviewStoreScreen} />
      </Stack.Navigator>
    </SocketContextComponent>
  );
};

export default PreviewStoreRoutes;

const styles = StyleSheet.create({});
