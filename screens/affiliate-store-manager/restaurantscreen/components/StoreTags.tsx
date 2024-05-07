import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { SEMI_BOLD } from "../../../../constants/fontNames";

// TODO ADD DISTANCE AS PROPS
// TODO ADD STORE TAGS PROPS
export function StoreTags({
  store_name,
  store_id,
  store_address,
  store_tags,
}: {
  store_name: string;
  store_id: string;
  store_address: any;
  store_tags: string[];
}) {
  const navigation = useNavigation();
  return (
    <View className="pt-3 px-2 ">
      <View className="flex flex-row items-center justify-between pb-2">
        <View className="flex-1 pr-4">
          <Text style={styles.store_name_text}>{store_name}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            // @ts-ignore
            navigation.navigate("StoreInfo", {
              store_id,
              store_name,
              store_address,
            })
          }
          className="bg-primary py-2 px-4 rounded-2xl flex flex-row items-center"
        >
          <Ionicons
            color={"white"}
            size={18}
            name="information-circle-outline"
          />
          <Text className="text-[14px] font-medium text-white ml-1 ">
            Store Info
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.tags_container}>
          {store_tags?.map((tag, index) => {
            return (
              <Text key={index} style={styles.tag_text}>
                {" "}
                {tag} {index != store_tags.length - 1 && " -"}
              </Text>
            );
          })}
        </View>

        {/* RATINGS*/}
        <View className="flex flex-row px-1">
          <View className="items-center flex flex-row ">
            <Ionicons color={"gold"} size={16} name="star" />
            <Text className=" font-medium"> 4.7 (252 ratings)</Text>
          </View>
        </View>
      </View>

      {/* DISTANCE AND OPEN STATUS */}
      <View
        className={
          "border border-black/10 flex flex-row justify-between px-6 py-2.5 mt-4 rounded-lg"
        }
      >
        <View className="flex-1  items-start">
          <Text style={styles.more_info_text}>5.9km</Text>
          <Text style={styles.more_info_subtitle}>Distance</Text>
        </View>
        <View className="w-[1px] bg-black"></View>
        <View className="flex-1 items-end">
          <Text style={styles.more_info_text}>Opened</Text>
          <Text style={styles.more_info_subtitle}>Closes at 9:00 PM</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  store_name_text: {
    fontFamily: SEMI_BOLD,
    fontSize: 24,
  },
  tags_container: {
    flexDirection: "row",
  },
  tag_text: {},
  more_info_container: {},
  more_info_text: {
    fontSize: 16,
    textAlign: "center",
  },
  more_info_subtitle: {
    textAlign: "center",
  },
});
