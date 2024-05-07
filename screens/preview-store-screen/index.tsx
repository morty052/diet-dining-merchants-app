import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import React from "react";
import { useSocketContext } from "../../contexts/SocketContext";
import RestaurantScreen from "./tt";
import { SafeAreaView } from "react-native-safe-area-context";
import { getItem } from "../../utils/storage";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "../../components/ui/BackButton";

type Props = {};

const PreviewStoreScreen = ({ route, navigation }) => {
  const [loading, setLoading] = React.useState(true);
  const [synced, setSynced] = React.useState(false);
  const [Store, setStore] = React.useState(null);
  const [storePreview, setStorePreview] = React.useState({
    store_name: "",
    tags: null,
  });
  const { socket } = useSocketContext();
  const _id = getItem("affiliate_id");

  React.useEffect(() => {
    socket?.emit("connect_companion", { _id }, () => {
      setLoading(false);
    });
  }, [socket]);

  React.useEffect(() => {
    socket?.on("synced", (data) => {
      // setLoading(true);
      console.log(data);
    });
    socket?.on("store_name_received", (data) => {
      console.log(data);
      setStorePreview((prev) => ({
        ...prev,
        store_name: data.store_name,
      }));
    });
    socket?.on("store_tag_received", (tag) => {
      console.log("tag received ", tag);
      setStorePreview((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    });
  }, [socket]);

  const handleSync = () => {
    socket?.emit("sync", { _id }, (data) => {
      console.info("Synced", data);
      navigation.setOptions({
        headerShown: false,
      });
      setSynced(true);
      setStore(data);
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkGrey }}>
        <View
          style={{
            paddingHorizontal: 10,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 200,
          }}
        >
          <ActivityIndicator size={"large"} color={Colors.light} />
        </View>
      </SafeAreaView>
    );
  }

  if (!synced) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkGrey }}>
        <View style={{ padding: 10 }}>
          <BackButton />
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 200,
          }}
        >
          <Ionicons name="sync" color={Colors.light} size={100} />
          <Text
            style={{ color: Colors.light, fontSize: 30, fontFamily: SEMI_BOLD }}
            onPress={handleSync}
          >
            Sync Companion
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return <RestaurantScreen storePreview={storePreview} store={Store} />;
};

export default PreviewStoreScreen;

const styles = StyleSheet.create({});
