import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../components/ui/BackButton";
import { SEMI_BOLD } from "../../constants/fontNames";
import React from "react";
import { baseUrl } from "../../constants/baseUrl";
import { getItem } from "../../utils/storage";

type ProductProps = {
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const OrderStatusBar = ({
  status,
}: {
  status: {
    completed: boolean;
    cancelled: boolean;
    pending: boolean;
    waiting: boolean;
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
    if (status.waiting) {
      return "Waiting for pickup";
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
              : statusText === "Waiting for pickup"
              ? "orange"
              : Colors.primary,
        },
      ]}
    >
      <Text style={styles.statusText}>{statusText}</Text>
    </View>
  );
};

export const OrderScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [loading, setLoading] = React.useState(false);
  const { order_id, products, total, status } = route.params;

  const { completed, waiting, pending, cancelled } = status;

  const handleCompleteOrder = async () => {
    const affiliate_id = getItem("affiliate_id");

    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/orders/ready-for-pickup`, {
        method: "POST",
        body: JSON.stringify({ affiliate_id, order_id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log({ data });
      navigation.setParams({
        status,
      });
      setLoading(false);
      return data;
    } catch (error) {
      console.error({ error });
      setLoading(false);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "",
      headerLeft: () => <BackButton />,
      headerRight: () => <OrderStatusBar status={status} />,
      headerBackTitleVisible: false,
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.darkGrey,
        position: "relative",
      }}
    >
      <View style={styles.headerContainer}></View>
      <View style={styles.container}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: SEMI_BOLD,
            textAlign: "center",
          }}
        >
          Total
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 34,
            fontFamily: SEMI_BOLD,
            textAlign: "center",
          }}
        >
          ${total}
        </Text>
        <ScrollView style={styles.innerContainer}>
          <View>
            {products?.map((product: ProductProps, index: number) => (
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                  paddingTop: 10,
                  borderColor: Colors.accent,
                  alignItems: "center",
                }}
                key={index}
              >
                <Image
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                  source={{ uri: product.image }}
                />
                {/* NAME AND PRICE */}
                <View style={{ flex: 1, paddingHorizontal: 10 }}>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontFamily: SEMI_BOLD,
                    }}
                  >
                    {product.name}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 20,
                      fontFamily: SEMI_BOLD,
                    }}
                  >
                    ${product.price}
                  </Text>
                </View>

                {/* QUANTITY */}
                <View style={{ alignSelf: "center" }}>
                  <Text style={{ color: "white" }}>X{product.quantity}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          paddingBottom: 20,
          gap: 20,
          paddingHorizontal: 10,
        }}
      >
        {pending && (
          <Pressable
            onPress={handleCompleteOrder}
            style={{
              height: 60,
              backgroundColor: Colors.primary,
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {!loading && (
              <Text
                style={{
                  color: "white",
                  fontFamily: SEMI_BOLD,
                  fontSize: 20,
                  flex: 1,
                  textAlign: "center",
                }}
              >
                Ready Order
              </Text>
            )}
            {loading && <ActivityIndicator size={25} color="white" />}
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: Colors.darkGrey,
    flex: 1,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    paddingTop: 20,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 3,
  },
  statusText: { color: "white", fontSize: 14, fontFamily: SEMI_BOLD },
  innerContainer: { gap: 20, paddingTop: 20 },
  titleText: { color: "black", fontSize: 16, fontFamily: SEMI_BOLD },
  title: { color: "black", fontSize: 16, fontFamily: SEMI_BOLD },
});
