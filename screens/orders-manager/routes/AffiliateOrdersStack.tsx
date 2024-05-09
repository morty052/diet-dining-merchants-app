import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Screen } from "../../../components/screen";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../../../constants/baseUrl";
import { getItem } from "../../../utils/storage";
import AffiliateOrderCard from "../components/AffiliateOrderCard";
import Colors from "../../../constants/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoadingScreen from "../../../components/ui/LoadingScreen";
import { Ionicons } from "@expo/vector-icons";
import { OrderProps } from "../../../types/OrderProps";

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const get_afiiliate_orders = async (): Promise<{
  waiting: OrderProps[];
  completed: OrderProps[];
  pending: OrderProps[];
}> => {
  const affilate_id = getItem("affiliate_id");
  const res = await fetch(
    `${baseUrl}/affiliates/get-affiliate-orders?afilliate_id=${affilate_id}`
  );
  const data: OrderProps[] = await res.json();

  if (!data) {
    console.log("no data");
    return {
      waiting: [],
      completed: [],
      pending: [],
    };
  }

  console.log(data[0].status);

  const waitingOrders = data.filter((order) => order.status?.waiting);
  const completedOrders = data.filter((order) => order.status?.completed);
  const pendingOrders = data.filter((order) => order.status?.pending);

  console.log({ waitingOrders });

  return {
    waiting: waitingOrders,
    completed: completedOrders,
    pending: pendingOrders,
  };
};

const AllOrdersView = () => {
  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["completed_orders"],
    queryFn: get_afiiliate_orders,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ backgroundColor: Colors.darkGrey, flex: 1, paddingTop: 10 }}>
      {/* <SearchBar /> */}
      {orders?.completed && orders?.completed?.length > 0 && (
        <FlatList
          contentContainerStyle={{ gap: 10 }}
          data={orders?.waiting}
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
      )}
      {orders?.completed?.length === 0 && (
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

const PendingOrdersView = () => {
  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery({ queryKey: ["pending_orders"], queryFn: get_afiiliate_orders });

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={{ backgroundColor: Colors.darkGrey, flex: 1, paddingTop: 10 }}>
      {/* <SearchBar /> */}
      {orders?.pending && orders?.pending?.length > 0 && (
        <FlatList
          contentContainerStyle={{ gap: 10 }}
          data={orders?.pending}
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
      )}
      {orders?.pending?.length === 0 && (
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

const WaitingOrdersView = () => {
  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery({ queryKey: ["waiting_orders"], queryFn: get_afiiliate_orders });

  if (isLoading) {
    return <LoadingScreen />;
  }

  console.log(orders);

  return (
    <View style={{ backgroundColor: Colors.darkGrey, flex: 1, paddingTop: 10 }}>
      {/* <SearchBar /> */}
      {orders?.waiting && orders?.waiting?.length > 0 && (
        <FlatList
          contentContainerStyle={{ gap: 10 }}
          data={orders?.waiting}
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
      )}
      {orders?.waiting?.length === 0 && (
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
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={!focused ? "white" : Colors.primary}
              name="checkmark-circle-outline"
              size={24}
            />
          ),
        }}
        name="Completed"
        component={AllOrdersView}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={!focused ? "white" : Colors.primary}
              name="hourglass"
              size={24}
            />
          ),
        }}
        name="Pending"
        component={PendingOrdersView}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={!focused ? "white" : Colors.primary}
              name="bag-outline"
              size={24}
            />
          ),
        }}
        name="Waiting"
        component={WaitingOrdersView}
      />
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
