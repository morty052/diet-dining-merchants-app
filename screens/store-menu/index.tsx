import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  SectionList,
  DefaultSectionT,
  SectionListData,
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
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "../../components/ui/LoadingScreen";

const Tab = createBottomTabNavigator();

type Props = {};

const store_image = getItem("store_image");

export type menu = {
  title: string;
  data: ProductProps[];
};

export type categoryProps = {
  title: string;
  products: ProductProps[];
  menus: string[];
};

async function fetchMenu() {
  const store_id = getItem("store_id");
  const res = await fetch(
    `${baseUrl}/affiliates/get-affiliate-menu?store_id=${store_id}`
  );
  const data = await res.json();
  const { menus: menusData } = data;

  console.info(menusData);

  const menus = menusData.map(
    (menu: { title: string; products: ProductProps[] }) => {
      return {
        title: menu.title,
        data: menu.products,
      };
    }
  );

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

async function fetchCategories(): Promise<
  { title: string; data: ProductProps[] }[] | []
> {
  const store_id = getItem("store_id");
  const res = await fetch(
    `${baseUrl}/affiliates/get-affiliate-categories?store_id=${store_id}`
  );
  const data = await res.json();
  const { categories: categoriesData }: { categories: categoryProps[] } = data;

  const categories = categoriesData.map((category) => {
    return {
      title: category.title,
      data: category.products,
    };
  });

  return categories;
}

const SearchInput = ({
  query,
  setQuery,
  placeholder,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.lightBlack,
        borderRadius: 5,
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <Ionicons name="search" size={30} color={Colors.muted} />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={placeholder}
        placeholderTextColor={Colors.muted}
        style={{
          color: "white",
          paddingHorizontal: 10,
          borderRadius: 5,
          height: 50,
          width: "100%",
        }}
      />
    </View>
  );
};

const Menus = (props: Props) => {
  const {
    data: menus,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["menus"], queryFn: fetchMenu });

  if (isLoading) {
    return <LoadingScreen />;
  }

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
        <Text style={{ color: "white", fontFamily: SEMI_BOLD, fontSize: 20 }}>
          Menus
        </Text>
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
          <Text style={{ color: "white", fontFamily: SEMI_BOLD }}>Add New</Text>
        </Pressable>
      </View>
      <SectionList
        contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
        sections={menus as SectionListData<ProductProps, DefaultSectionT>[]}
        renderSectionHeader={({ section: { title } }) => (
          <View>
            <Text
              style={{ color: "white", fontFamily: SEMI_BOLD, fontSize: 20 }}
            >
              {title}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ color: "white", fontFamily: SEMI_BOLD, fontSize: 16 }}
              >
                10:00 AM - 9:00 PM
              </Text>
              <Text
                style={{ color: "white", fontFamily: SEMI_BOLD, fontSize: 16 }}
              >
                Mon-Fri
              </Text>
            </View>
          </View>
        )}
        renderItem={({ item, section }) => <ProductCard product={item} />}
      />
    </View>
  );
};
const Overview = (props: Props) => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  console.info(categories);

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
      <SectionList
        contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
        sections={
          categories as SectionListData<ProductProps, DefaultSectionT>[]
        }
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ color: "white", fontFamily: SEMI_BOLD, fontSize: 20 }}>
            {title}
          </Text>
        )}
        renderItem={({ item, section }) => <ProductCard product={item} />}
      />
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

  const queryResults = React.useMemo(() => {
    if (!query) {
      return products;
    }

    const product = products?.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    return product;
  }, [query, products]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <Text>Something went wrong</Text>;
  }

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
      <SearchInput
        placeholder="Search Items"
        query={query}
        setQuery={setQuery}
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

const Categories = (props: Props) => {
  const [query, setQuery] = React.useState("");
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  const queryResults = React.useMemo(() => {
    if (!query) {
      return categories;
    }

    const results = categories?.filter((category) =>
      category.title.toLowerCase().includes(query.toLowerCase())
    );

    return results;
  }, [query, categories]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>Something went wrong</Text>;
  }

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
      </View>
      {query && (
        <Text style={{ color: "white", fontFamily: SEMI_BOLD, fontSize: 20 }}>
          {queryResults?.length} result
          {queryResults && queryResults?.length > 1 ? "s" : ""}
        </Text>
      )}
      <SearchInput
        placeholder="Search Categories"
        query={query}
        setQuery={setQuery}
      />
      <SectionList
        contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
        sections={
          queryResults as SectionListData<ProductProps, DefaultSectionT>[]
        }
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ color: "white", fontFamily: SEMI_BOLD, fontSize: 20 }}>
            {title}
          </Text>
        )}
        renderItem={({ item, section }) => <ProductCard product={item} />}
      />
    </View>
  );
};

function Customs() {
  return (
    <View>
      <View></View>
    </View>
  );
}

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
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={!focused ? "white" : Colors.primary}
              name="file-tray-full-outline"
              size={24}
            />
          ),
        }}
        name="Menus"
        component={Menus}
      />
      <Tab.Screen
        name="Items"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={!focused ? "white" : Colors.primary}
              name="bag"
              size={24}
            />
          ),
        }}
        component={StoreItems}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={!focused ? "white" : Colors.primary}
              name="home"
              size={24}
            />
          ),
        }}
        name="Overview"
        component={Overview}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={!focused ? "white" : Colors.primary}
              name="albums"
              size={24}
            />
          ),
        }}
        name="Categories"
        component={Categories}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={!focused ? "white" : Colors.primary}
              name="settings"
              size={24}
            />
          ),
        }}
        name="Customs"
        component={Menus}
      />
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
