import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View className="border border-white px-2 py-1 mb-4  rounded-lg flex items-center flex-row">
      <Ionicons size={24} color={"white"} name="search-outline" />
      <TextInput
        placeholderTextColor={"white"}
        placeholder="Search All Orders"
        className="w-full p-2 text-white"
      />
    </View>
  );
};

export default SearchBar;
