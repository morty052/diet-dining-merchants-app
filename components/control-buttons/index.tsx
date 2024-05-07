import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { SEMI_BOLD } from "../../constants/fontNames";
import { SafeAreaView } from "react-native-safe-area-context";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={{
        backgroundColor: Colors.gray,
        height: 50,
        width: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
      }}
    >
      <Ionicons size={30} name="arrow-back" />
    </Pressable>
  );
};

const NextButton = ({ handlePress }: { handlePress: () => void }) => {
  return (
    <Pressable
      onPress={handlePress}
      style={{
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 20, fontFamily: SEMI_BOLD, color: "white" }}>
        Next
      </Text>
    </Pressable>
  );
};

export function ControlButtons({ handlePress }: { handlePress: () => void }) {
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 20,
        }}
      >
        <BackButton />
        <NextButton handlePress={handlePress} />
      </View>
    </SafeAreaView>
  );
}
