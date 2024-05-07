import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/colors";

type Props = {};

const tags = ["Juice", "Burgers", "Halal", "Keto", "Rice", "Soups"];

const { width, height } = Dimensions.get("screen");

const StoreMap = ({
  latitude,
  longitude,
}: {
  latitude: number;
  longitude: number;
}) => {
  return (
    <MapView
      style={styles.map}
      //   ref={mapRef}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        // latitude: 49.246292,
        // longitude: -123.116226,
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      //   region={{
      //     latitude: latitude as number,
      //     longitude: longitude as number,
      //     latitudeDelta: 0.0922,
      //     longitudeDelta: 0.0421,
      //   }}
    >
      {latitude && longitude && (
        <Marker
          coordinate={{
            latitude: latitude as number,
            longitude: longitude as number,
          }}
          title="Delivery location"
        />
      )}
    </MapView>
  );
};

const StoreTags = () => {
  return (
    <View style={styles.storeTagsContainer}>
      {tags.map((tag, index) => (
        <Text style={{ color: "gray" }} key={tag}>
          {`${tag}`}
          {index + 1 < tags.length && " -"}
        </Text>
      ))}
    </View>
  );
};

const StoreRating = () => {
  return (
    <View className="flex flex-row ">
      <View className="items-center flex flex-row ">
        <Ionicons color={"gold"} size={16} name="star" />
        <Text className=" font-medium"> 4.7 (252 ratings)</Text>
      </View>
    </View>
  );
};

const StoreInfo = ({ route }) => {
  const { store_name, store_address } = route.params;

  const { latitude, longitude } = store_address;

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <StoreMap latitude={Number(latitude)} longitude={Number(longitude)} />
      </View>
      <View style={styles.storeInfoContainer}>
        <Text style={styles.storeNameText}>{store_name}</Text>
        <StoreTags />
        <StoreRating />
      </View>

      {/* LOCATION */}
      <View className="border-y border-black/10 py-6 px-3 flex flex-row justify-between">
        <View className="flex-1 flex-row items-center">
          <Ionicons size={24} name="location-outline" />
          <Text className="font-medium text-dark ml-2">
            12 deerfield ln, 90210 Vancouver
          </Text>
        </View>
        <Ionicons color={Colors.dark} size={20} name="chevron-forward" />
      </View>
      {/* OPENING HOURS */}
      <View className="border-y border-black/10 py-6 px-3 flex flex-row justify-between">
        <View className="flex-1 flex-row items-center">
          <Ionicons size={24} name="time-outline" />
          <Text className="font-medium text-green-600 ml-2">Open -</Text>
          <Text className="text-dark">Closes at 9.00PM</Text>
        </View>
        <Ionicons color={Colors.dark} size={20} name="chevron-down" />
      </View>

      {/* Call Store */}
      <View className="border-y border-black/10 py-6 px-3 flex flex-row justify-between">
        <View className="flex-1 flex-row items-center">
          <Ionicons size={24} name="call-outline" />
          <Text className="text-dark ml-2">Call store</Text>
        </View>
        <Ionicons color={Colors.dark} size={20} name="chevron-forward" />
      </View>

      {/* REFER FRIEND */}
      <View className="border-y border-black/10 py-6 px-3 flex flex-row justify-between">
        <View className="flex-1 flex-row items-center">
          <Ionicons color={Colors.primary} size={24} name="gift" />
          <Text className="text-dark ml-2">Refer Friend </Text>
        </View>
        <Ionicons color={Colors.dark} size={20} name="chevron-forward" />
      </View>
    </View>
    // <>

    // </>
  );
};

export default StoreInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  mapContainer: {
    backgroundColor: "rgb(134 239 172)",
    height: height * 0.35,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  storeInfoContainer: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderColor: Colors.gray,
  },
  storeNameText: {
    fontWeight: "bold",
    fontSize: 28,
  },
  storeTagsContainer: {
    flexDirection: "row",
    columnGap: 4,
    paddingVertical: 4,
  },
  infoContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  infoInnerContainer: {
    // className:"flex-1 flex-row items-center justify-between border-b border-gray-400 pb-3 ml-4",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: Colors.gray,
    paddingBottom: 16,
    marginLeft: 6,
  },
});
