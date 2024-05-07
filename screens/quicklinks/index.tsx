import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/colors";
import { getItem } from "../../utils/storage";

type QuickLinkProps = {
  title: string;
  icon: string;
  onPress: () => void;
};

const affiliateLinksArray = [
  {
    link: "GenerateOtp",
    icon: "lock-closed-outline",
    title: "Generate OTP",
  },
  {
    link: "AffiliateStoreManager",
    icon: "storefront-outline",
    title: "Manage Store",
  },
  {
    link: "OrdersManager",
    icon: "bag-outline",
    title: "Manage Orders",
  },
  {
    link: "StoreMenu",
    icon: "fast-food-outline",
    title: "Menu",
  },
  {
    link: "IdentifyMealScreen",
    icon: "cloud-outline",
    title: "Genie",
  },
];

const QuickLink = ({ title, icon, onPress }: QuickLinkProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className=" border h-28 w-40 border-gray-50 px-2  mb-4 rounded-xl items-center justify-center"
    >
      <Ionicons name={icon as any} size={40} color="white" />
      <Text className="text-[16px] font-medium text-white">{title}</Text>
    </TouchableOpacity>
  );
};

export const QuickLinks = ({ route }: any) => {
  const store_name = getItem("store_name");

  const _id = "RDy0NRgK4s4Oz2Kxq9tuZw";

  const navigation = useNavigation<any>();

  const handleLock = async () => {
    navigation.navigate("Unlock");
  };

  function OnPress(title: string) {
    console.info("Pressed", title);
    // @ts-ignore
    navigation.navigate(title);
  }

  return (
    <View
      style={{
        backgroundColor: Colors.darkGrey,
        flex: 1,
        paddingTop: 8,
        paddingBottom: 24,
        paddingHorizontal: 8,
      }}
    >
      <View className="flex-1">
        <View className="px-2">
          <Text className="text-2xl text-gray-50 font-medium ">
            {store_name}
          </Text>
        </View>
        <ScrollView>
          <View className={styles.quickLinksContainer}>
            {affiliateLinksArray.map((qlink) => (
              <QuickLink
                key={qlink.title}
                title={qlink.title}
                icon={qlink.icon}
                onPress={() => OnPress(qlink.link)}
              />
            ))}
            <QuickLink
              title={"Preview Store"}
              icon={"eye"}
              onPress={() =>
                // @ts-ignore
                navigation.navigate("PreviewStore", {
                  _id,
                })
              }
            />
          </View>
        </ScrollView>
      </View>
      <TouchableOpacity onPress={handleLock} className={styles.button}>
        <Text className="text-2xl font-medium">Lock</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  button: " bg-white py-4 px-2 justify-center flex-row rounded-lg m-2",
  quickLinksContainer:
    " flex-wrap  flex-row justify-between  px-4 py-2 border border-white/40 rounded-md  mt-4 ",
};
