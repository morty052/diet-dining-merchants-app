import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useMemo } from "react";
import { Screen } from "../../components/screen";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import OrderCard, { TorderProps } from "./components/OrderCard";
import { baseUrl } from "../../constants/baseUrl";
import FilterButton from "./components/FilterButton";
import SearchBar from "./components/SearchBar";
import { getItem } from "../../utils/storage";
import { AffiliateOrdersStack } from "./routes/AffiliateOrdersStack";
import Colors from "../../constants/colors";

const Stack = createNativeStackNavigator();

type Props = {};

const AllOrdersView = () => {
  const get_all_orders = async () => {
    const res = await fetch(`${baseUrl}/orders/get-all`);
    // const res = await fetch("http://localhost:3000/orders/get-all");
    const data = await res.json();
    return data;
  };

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["orders"], queryFn: get_all_orders });

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.darkGrey }}>
      {orders?.map((order: TorderProps, index: number) => (
        <OrderCard
          status={order.status}
          key={index}
          vendor={order.vendor}
          location={order.location}
          total={order.total}
          vendor_logo={order.vendor_logo}
        />
      ))}
      <Text className="text-center text-gray-50 text-lg my-4 font-medium">
        Pull Down to refresh
      </Text>
    </ScrollView>
  );
};

const PendingOrdersView = () => {
  const get_all_orders = async () => {
    const res = await fetch(
      "https://diet-dining-server.onrender.com/orders/get-all"
    );
    // const res = await fetch("http://localhost:3000/orders/get-all");
    const data = await res.json();
    return data;
  };

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["orders"], queryFn: get_all_orders });

  return (
    <View className="bg-gray-800 flex-1">
      {orders?.map((order: TorderProps, index: number) => (
        <OrderCard
          status={order.status}
          key={index}
          vendor={order.vendor}
          location={order.location}
          total={order.total}
          vendor_logo={order.vendor_logo}
        />
      ))}
      <Text className="text-center text-gray-50 text-lg my-4 font-medium">
        Pull Down to refresh
      </Text>
    </View>
  );
};

export const OrdersManager = (props: Props) => {
  const isAffiliate = getItem("affiliate");

  if (isAffiliate) {
    return <AffiliateOrdersStack />;
  }

  return (
    <Screen>
      <View className="flex flex-row justify-between mb-4 max-h-12">
        <FilterButton title="All" />
        <FilterButton title="Pending" />
        <FilterButton title="Completed" />
        <FilterButton title="Cancelled" />
      </View>
      <SearchBar />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="All" component={AllOrdersView} />
        <Stack.Screen name="Pending" component={PendingOrdersView} />
        <Stack.Screen name="Completed" component={PendingOrdersView} />
        <Stack.Screen name="Cancelled" component={PendingOrdersView} />
      </Stack.Navigator>
    </Screen>
  );
};
