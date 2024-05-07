import { TouchableOpacity, View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { SEMI_BOLD } from "../../../constants/fontNames";

const ServingsDisplay = ({
  setItemQuantity,
  itemQuantity,
}: {
  setItemQuantity: any;
  itemQuantity: number;
}) => {
  return (
    <View className="max-w-sm  mx-auto">
      {/* <Text className="text-2xl font-semibold text-dark">Servings</Text> */}
      <View className="flex-row items-center space-x-6 ">
        <TouchableOpacity
          onPress={() =>
            itemQuantity <= 1
              ? setItemQuantity(1)
              : setItemQuantity((prev: number) => prev - 1)
          }
        >
          <Ionicons size={35} name="remove-circle-outline" />
        </TouchableOpacity>
        <Text className="text-[24px]  font-semibold text-dark">
          {itemQuantity}
        </Text>
        <TouchableOpacity
          onPress={() => setItemQuantity((prev: number) => prev + 1)}
        >
          <Ionicons name="add-circle-outline" size={35} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ViewCartButton = ({ itemQuantity }: { itemQuantity: number }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      // @ts-ignore
      onPress={() => navigation.navigate("Cart")}
      style={
        {
          // width: "95%",
        }
      }
    >
      <View
        style={{
          height: 60,
          paddingHorizontal: 16,
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 8,
          borderColor: Colors.dark,
          borderWidth: 1,
          position: "relative",
        }}
        className=" text-white text-[20px] font-medium"
      >
        <Ionicons size={30} name="cart-outline" />
      </View>
    </TouchableOpacity>
  );
};

const Basketbutton = ({
  vendorTotal,
  vendorItemsCount,
  store_name,
  store_id,
}: {
  vendorItemsCount: number;
  vendorTotal: number;
  store_name: string;
  store_id: string;
}) => {
  const navigation = useNavigation();

  const handleNav = () => {
    // @ts-ignore
    navigation.navigate("Checkout", {
      store_name,
      store_id,
    });
  };

  return (
    <SafeAreaView
      edges={{
        bottom: "additive",
        top: "off",
      }}
      className="absolute bottom-0 flex items-center  left-0 right-0 gap-4 pb-4 pt-2  bg-white border-gray-300 px-2 border-t "
    >
      <View
        style={{
          flexDirection: "row",
          gap: 4,
          width: "100%",
          paddingHorizontal: 10,
        }}
      >
        <Pressable
          onPress={handleNav}
          style={{
            height: 60,
            paddingHorizontal: 16,
            backgroundColor: Colors.primary,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "row",
            borderRadius: 8,
            // width: "95%",
            flex: 1,
          }}
        >
          <View
            style={{
              //   height: 40,
              width: 40,
              alignItems: "center",
              backgroundColor: "black",
              opacity: 0.8,
              padding: 3,
              borderRadius: 4,
            }}
          >
            <Text
              style={{ fontSize: 17, color: "white", fontFamily: SEMI_BOLD }}
            >
              {vendorItemsCount}
            </Text>
          </View>
          <Text style={{ fontSize: 17, color: "white", fontFamily: SEMI_BOLD }}>
            View Basket
          </Text>
          <Text style={{ fontSize: 17, color: "white", fontFamily: SEMI_BOLD }}>
            ${vendorTotal}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Basketbutton;
