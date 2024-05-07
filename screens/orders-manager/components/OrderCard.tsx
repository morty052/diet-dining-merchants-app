import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import Colors from "../../../constants/colors";
import React from "react";
import { SEMI_BOLD } from "../../../constants/fontNames";

export type TorderProps = {
  vendor: string;
  location: string;
  total: number;
  vendor_logo: any;
  status: {
    pending: boolean;
    completed: boolean;
    cancelled: boolean;
  };
};

const OrderStatusBar = ({
  status,
}: {
  status: {
    completed: boolean;
    cancelled: boolean;
    pending: boolean;
  };
}) => {
  const statusText = React.useMemo(() => {
    if (status.completed) {
      return "Completed";
    }

    if (status.cancelled) {
      return "Cancelled";
    }

    if (status.pending) {
      return "Pending";
    }
  }, [status]);
  return (
    <View
      style={[
        styles.statusContainer,
        {
          backgroundColor:
            statusText === "Pending"
              ? "orange"
              : statusText === "Cancelled"
              ? "red"
              : Colors.primary,
        },
      ]}
    >
      <Text style={styles.statusText}>{statusText}</Text>
    </View>
  );
};

const OrderCard = ({
  vendor,
  location,
  vendor_logo,
  total,
  status,
}: TorderProps) => {
  return (
    <Pressable style={styles.container}>
      <Image style={styles.image} source={{ uri: vendor_logo }} />
      <View style={{ flex: 1, paddingLeft: 8, gap: 5 }}>
        <Text className="font-medium">{vendor}</Text>
        {/* <Text>{location}</Text> */}
        <Text className="text-xl font-semibold">${total}</Text>
      </View>
      <OrderStatusBar status={status} />
    </Pressable>
  );
};

export default OrderCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "rgb(249 250 251)",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
    position: "relative",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  statusContainer: {
    paddingHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 3,
    position: "absolute",
    top: 5,
    right: 5,
    width: 100,
  },
  statusText: { color: "white", fontSize: 12, fontFamily: SEMI_BOLD },
});
