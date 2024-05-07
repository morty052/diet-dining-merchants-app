import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export function StoreTags({
  store_name,
  store_id,
  store_address,
  tags,
}: {
  store_name: string;
  store_id: string;
  store_address: any;
  tags: string[];
}) {
  const navigation = useNavigation();
  return (
    <View className="pt-3  ">
      <View className="flex flex-row items-center justify-between pb-2">
        <View className="flex-1 pr-4">
          <Text className={styles.store_name_text}>{store_name}</Text>
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

      <View className={styles.tags_container}>
        <View className="flex flex-row flex-wrap ">
          {tags?.map((tag, index) => (
            <Text key={tag} className={styles.tag_text}>
              {" "}
              {tag} {index + 1 != tags.length && "-"}
            </Text>
          ))}
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
      <View className={styles.more_info_container}>
        <View className="flex-1  items-start">
          <Text className={styles.more_info_text}>5.9km</Text>
          <Text className={styles.more_info_subtitle}>Distance</Text>
        </View>
        <View className="w-[1px] bg-black"></View>
        <View className="flex-1 items-end">
          <Text className={styles.more_info_text}>Opened</Text>
          <Text className={styles.more_info_subtitle}>Closes at 9:00 PM</Text>
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: "py-4 px-2 flex-1 ",
  store_name_text: "font-semibold  text-[25px]",
  tags_container: "flex-1 flex-row flex flex-wrap",
  tag_text: "font-medium ",
  more_info_container:
    "border border-black/10 flex flex-row justify-between px-6 py-2.5 mt-4 rounded-lg",
  more_info_text: "text-center font-medium text-[14px]",
  more_info_subtitle: "text-center font-medium ",
};
