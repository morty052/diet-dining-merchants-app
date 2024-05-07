import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import { SEMI_BOLD } from "../../../constants/fontNames";
import { day } from "../../../utils/day";
import { Ionicons } from "@expo/vector-icons";

export type TAffiliateOrderProps = {
  location?: string;
  _id: string;
  total: number;
  status: {
    pending: boolean;
    completed: boolean;
    cancelled: boolean;
  };
  products: {
    quantity: number;
    image: string;
    name: string;
    price: number;
  }[];
  image: string;
  orderTime: string;
};

const OrderStatus = ({
  status,
}: {
  status: {
    pending: boolean;
    completed: boolean;
    cancelled: boolean;
  };
}) => {
  const { pending, cancelled, completed } = status;
  let state = "";
  switch (true) {
    case pending:
      state = "Pending";
      break;
    case cancelled:
      state = "Cancelled";
      break;
    case completed:
      state = "Completed";
      break;
    default:
      break;
  }

  return (
    <View className="absolute bottom-2 right-2">
      <View className="">
        <Text>{state}</Text>
      </View>
    </View>
  );
};

const AffiliateOrderCard = ({
  location,
  total,
  status,
  image,
  _id,
  products,
  orderTime,
}: TAffiliateOrderProps) => {
  const navigate = useNavigation<any>();

  return (
    <Pressable
      style={styles.container}
      onPress={() =>
        navigate.navigate("Order", {
          order_id: _id,
          products,
          total,
          status,
        })
      }
    >
      <Image style={styles.image} source={{ uri: image }} />
      <View style={{ flex: 1, paddingLeft: 5, paddingRight: 10 }}>
        {/* <Text>{location}</Text> */}
        <Text style={styles.total}>${total}</Text>
        <Text style={styles.location}>{location}</Text>
        <Text style={styles.orderTime}>{day(orderTime).fromNow()}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} />
      <OrderStatus status={status} />
    </Pressable>
  );
};

export default AffiliateOrderCard;

const styles = StyleSheet.create({
  container: {
    // border mb-4 relative flex flex-row border-white bg-gray-50 rounded-lg p-2
    borderWidth: 1,
    position: "relative",
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  image: {
    height: 80,
    width: 80,
  },
  total: {
    fontFamily: SEMI_BOLD,
    fontSize: 20,
  },
  location: {
    fontFamily: SEMI_BOLD,
    fontSize: 14,
  },
  orderTime: {
    fontSize: 14,
  },
});
