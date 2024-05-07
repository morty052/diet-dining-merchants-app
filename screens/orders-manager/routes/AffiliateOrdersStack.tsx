import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Screen } from "../../../components/screen";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import SearchBar from "../components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../../constants/baseUrl";
import { getItem } from "../../../utils/storage";
import AffiliateOrderCard from "../components/AffiliateOrderCard";
import Colors from "../../../constants/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const AllOrdersView = () => {
  const get_afiiliate_orders = async () => {
    const affilate_id = getItem("affiliate_id");
    const res = await fetch(
      `${baseUrl}/affiliates/get-affiliate-orders?afilliate_id=${affilate_id}`
    );
    const data = await res.json();
    if (!data) {
      return [];
    }
    return data;
  };

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery({ queryKey: ["orders"], queryFn: get_afiiliate_orders });

  return (
    <View style={{ backgroundColor: Colors.darkGrey, flex: 1, paddingTop: 10 }}>
      {/* <SearchBar /> */}
      <FlatList
        contentContainerStyle={{ gap: 10 }}
        data={orders}
        keyExtractor={(item) => item._id}
        renderItem={({ item: order }) => (
          <AffiliateOrderCard
            _id={order._id}
            status={order.status}
            location={order.location}
            total={order.total}
            products={order.products}
            image={order.products?.[0]?.image}
            orderTime={order._createdAt}
          />
        )}
      />
      {!isLoading && orders?.length === 0 && (
        <Text className="text-center text-gray-50 text-lg my-4 font-medium">
          No Orders Found
        </Text>
      )}
      {isLoading && <ActivityIndicator size={50} color={"white"} />}

      {/* <Text
        onPress={() => refetch()}
        className="text-center text-gray-50 text-lg my-4 font-medium"
      >
        Pull Down to refresh
      </Text> */}
    </View>
  );
};

const OrderTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.darkGrey,
        },
      }}
    >
      <Tabs.Screen name="Completed" component={AllOrdersView} />
      <Tabs.Screen name="Pending" component={AllOrdersView} />
      <Tabs.Screen name="Waiting" component={AllOrdersView} />
    </Tabs.Navigator>
  );
};

export const AffiliateOrdersStack = () => {
  return (
    <Screen>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="All" component={OrderTabs} />
      </Stack.Navigator>
    </Screen>
  );
};
