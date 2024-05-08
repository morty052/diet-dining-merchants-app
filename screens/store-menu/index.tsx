import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { getItem } from "../../utils/storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ProductProps } from "../../types/ProductProps";
import { baseUrl } from "../../constants/baseUrl";
import { useQuery } from "@tanstack/react-query";
import { TextInput } from "react-native-gesture-handler";
import { ProductCard } from "../../components/cards/ProductCard";
import { SEMI_BOLD } from "../../constants/fontNames";

const Tab = createBottomTabNavigator();

type Props = {};

const store_image = getItem("store_image");

export type menu = {
  title: string;
  products: ProductProps[];
};

export type categoryProps = {
  title: string;
  products: ProductProps[];
  menus: string[];
};

async function fetchMenu(): Promise<menu[] | []> {
  const store_id = getItem("store_id");
  const res = await fetch(
    `${baseUrl}/affiliates/get-affiliate-menu?store_id=${store_id}`
  );
  const data = await res.json();
  const { menus } = data;

  return menus;
}

async function fetchProducts(): Promise<ProductProps[] | []> {
  const store_id = getItem("store_id");
  const res = await fetch(
    `${baseUrl}/stores/get-products?store_id=${store_id}`
  );
  const data = await res.json();
  const { products, status } = data;

  return products;
}

async function fetchCategories(): Promise<categoryProps[] | []> {
  const store_id = getItem("store_id");
  const res = await fetch(
    `${baseUrl}/affiliates/get-affiliate-categories?store_id=${store_id}`
  );
  const data = await res.json();
  const { categories } = data;

  return categories;
}

const Menus = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: store_image }}
        style={{ width: "100%", height: 300 }}
      />
      <Text>StoreMenu</Text>
    </View>
  );
};
const Overview = (props: Props) => {
  const {
    data: menus,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["menus"], queryFn: fetchMenu });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Items"
        placeholderTextColor="white"
        style={{
          color: "white",
          backgroundColor: Colors.lightBlack,
          paddingHorizontal: 10,
          borderRadius: 5,
          height: 50,
        }}
      />
      {menus?.map((menu, index) => (
        <View key={index}>
          <Text style={{ color: "white" }}>{menu.title}</Text>
          <View>
            {menu.products.map((product, index) => (
              <Text style={{ color: "white" }} key={index}>
                {product.name}
              </Text>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

const StoreItems = () => {
  const [query, setQuery] = React.useState("");
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["items"], queryFn: fetchProducts });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  const queryResults = React.useMemo(() => {
    if (!query) {
      return products;
    }

    const product = products?.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    return product;
  }, [query, products]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        {!query && (
          <Text style={{ color: "white", fontFamily: SEMI_BOLD, fontSize: 20 }}>
            All items
          </Text>
        )}
        {!query && (
          <Pressable
            style={{
              backgroundColor: Colors.primary,
              width: 100,
              height: 30,
              borderRadius: 20,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontFamily: SEMI_BOLD }}>
              Add New
            </Text>
          </Pressable>
        )}
        {query && (
          <Text style={{ color: "white", fontFamily: SEMI_BOLD, fontSize: 20 }}>
            {queryResults?.length} result
            {queryResults && queryResults?.length > 1 ? "s" : ""}
          </Text>
        )}
      </View>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search Items"
        placeholderTextColor="white"
        style={{
          color: "white",
          backgroundColor: Colors.lightBlack,
          paddingHorizontal: 10,
          borderRadius: 5,
          height: 50,
        }}
      />
      <ScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ gap: 10, paddingBottom: 20, paddingTop: 10 }}
      >
        {queryResults?.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
        {queryResults?.length === 0 && (
          <Text style={{ color: "white", textAlign: "center" }}>
            No results found
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export const StoreMenu = (props: Props) => {
  return (
    <Tab.Navigator
      initialRouteName="Overview"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: Colors.darkGrey },
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tab.Screen name="Menus" component={Menus} />
      <Tab.Screen name="Items" component={StoreItems} />
      <Tab.Screen name="Overview" component={Overview} />
      <Tab.Screen name="Categories" component={Menus} />
      <Tab.Screen name="Customizations" component={Menus} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkGrey,
    gap: 10,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});
