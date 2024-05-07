import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { Screen } from "../../components/screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { getItem } from "../../utils/storage";
import { SEMI_BOLD } from "../../constants/fontNames";
import Colors from "../../constants/colors";
import RestaurantScreen from "./restaurantscreen";
import { SafeAreaView } from "react-native-safe-area-context";

const Tabs = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

type Props = {};

type TstoreProps = {
  store_name: string;
  store_image: string;
  store_logo: string;
  store_address: string;
  store_description: string;
  store_status: any;
};

const SettingsItem = ({
  name,
  icon,
  subtitle,
  onPress,
}: {
  name: string;
  icon: any;
  subtitle: string;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        columnGap: 10,
        alignItems: "center",
        // borderTopWidth: 1,
        borderBottomWidth: 1,
        paddingVertical: 12,
        borderColor: Colors.gray,
      }}
    >
      {/* <Ionicons size={25} name={icon} /> */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "600", fontSize: 18, color: Colors.light }}>
          {name}
        </Text>
        <Text
          style={{ fontWeight: "normal", fontSize: 14, color: Colors.light }}
        >
          {subtitle}
        </Text>
      </View>
      <Ionicons color={Colors.dark} size={25} name={"chevron-forward"} />
    </Pressable>
  );
};

function Preview() {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingBottom: 200,
        }}
      >
        <Image
          source={require("../../assets/splash.png")}
          style={{ width: "100%", height: 400 }}
        />
        <Text style={{ color: "white" }}>Krabby pattys</Text>
        <SettingsItem
          onPress={() => console.log("mailto:support@expo.dev")}
          subtitle="Manage your diet plan settings"
          name="Store Tags"
          icon={"gift-outline"}
        />
        <SettingsItem
          onPress={() => console.log("mailto:support@expo.dev")}
          subtitle="Manage your diet plan settings"
          name="Address"
          icon={"gift-outline"}
        />
        <SettingsItem
          onPress={() => console.log("mailto:support@expo.dev")}
          subtitle="Manage your diet plan settings"
          name="Email"
          icon={"gift-outline"}
        />
        <SettingsItem
          onPress={() => console.log("mailto:support@expo.dev")}
          subtitle="Manage your diet plan settings"
          name="Phone Number"
          icon={"gift-outline"}
        />
      </View>
    </SafeAreaView>
  );
}

export const AffiliateStoreManager = ({ navigation }: any) => {
  const store_name = getItem("store_name");
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/splash.png")}
        style={{ width: "100%", height: 300 }}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontFamily: SEMI_BOLD }}>
          {store_name}
        </Text>
        <SettingsItem
          onPress={() => console.log("mailto:support@expo.dev")}
          subtitle="Manage tags associated with your store"
          name="Tags"
          icon={"gift-outline"}
        />
        <SettingsItem
          onPress={() => console.log("mailto:support@expo.dev")}
          subtitle="Edit store description"
          name="Description"
          icon={"gift-outline"}
        />
        <SettingsItem
          onPress={() => console.log("mailto:support@expo.dev")}
          subtitle="Edit store address"
          name="Address"
          icon={"gift-outline"}
        />
        <SettingsItem
          onPress={() => console.log("mailto:support@expo.dev")}
          subtitle="Edit email users see"
          name="Email"
          icon={"gift-outline"}
        />
        <SettingsItem
          onPress={() => console.log("mailto:support@expo.dev")}
          subtitle="Edit phone number users see "
          name="Phone Number"
          icon={"gift-outline"}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
  },
});
