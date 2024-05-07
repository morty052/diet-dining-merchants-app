import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, View, Text } from "react-native";

const FilterButton = ({ title }: { title: string }) => {
  const navigation = useNavigation();

  // const screenTitle = useNavigation().getId();

  // console.log(screenTitle);

  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate(title)}
      className="text-gray-50  border border-white flex items-center justify-center  py-1 rounded-xl w-24 h-8 "
    >
      <Text className="text-white  font-medium text-center">{title}</Text>
    </TouchableOpacity>
  );
};

export default FilterButton;
