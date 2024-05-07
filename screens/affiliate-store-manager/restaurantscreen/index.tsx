import {
  ImageBackground,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ErrorState } from "../../../components";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Colors from "../../../constants/colors";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { StoreMenuSectionList, StoreTags } from "./components";
import LikeButton from "../../../components/interaction-buttons/LikeButton";
import { get_single_store } from "../../../lib/supabase";
import TstoreProps from "../../../types/Store";
import HorizontalRule from "../../../components/ui/HorizontalRule";
import { SEMI_BOLD } from "../../../constants/fontNames";
import { getItem } from "../../../utils/storage";

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const Header = ({
  isVisible,
  setSearching,
  store_name,
  filters,
  store_id,
}: {
  isVisible: boolean;
  setSearching: (b: boolean) => void;
  store_name: string;
  store_id: string;
  filters?: { title: string }[];
}) => {
  const navigation = useNavigation();

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: !isVisible
        ? "transparent"
        : withTiming("white", { duration: 100 }),
    };
  });

  return (
    <>
      <AnimatedSafeAreaView
        style={animatedStyles}
        edges={{
          bottom: "off",
          top: "additive",
        }}
        className={`z-10 absolute left-0 right-0 `}
      >
        <View className="flex px-2 py-4 flex-row items-center justify-between">
          <View className="flex flex-row items-center gap-4">
            <TouchableOpacity
              className="h-8 w-8 flex justify-center items-center  bg-white rounded-full"
              onPress={() => navigation.goBack()}
            >
              <Ionicons size={20} name="arrow-back" color={Colors.primary} />
            </TouchableOpacity>
            {isVisible && <Text>{store_name}</Text>}
          </View>
          <View className="flex-row gap-2 items-center">
            <LikeButton background />
          </View>
        </View>
        {/* {isVisible && filters.length > 1 && <QuickFilters filters={filters} />} */}
      </AnimatedSafeAreaView>
    </>
  );
};

const MerchantStoryGrid = ({
  store_name,
  data,
}: {
  store_name: string;
  data: any;
}) => {
  const StoryCard = ({
    image,
    index,
    store_name,
  }: {
    image: string;
    index: number;
    store_name: string;
  }) => {
    const navigation = useNavigation();
    return (
      <Pressable
        onPress={() =>
          // @ts-ignore
          navigation.navigate("MerchantStory", {
            startingIndex: index,
            store_name,
          })
        }
      >
        <View
          style={{
            position: "relative",
          }}
        >
          <Image
            resizeMode="cover"
            style={{ width: 80, height: 80, borderRadius: 80 }}
            source={{ uri: image }}
          />
          {/* OVERLAY */}
          <View
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              top: 0,
              backgroundColor: "black",
              borderRadius: 80,
              opacity: 0.1,
            }}
          ></View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={{ paddingHorizontal: 10, paddingTop: 10, gap: 10 }}>
      <Text style={{ fontSize: 20, fontFamily: SEMI_BOLD }}>Stories</Text>
      <ScrollView
        contentContainerStyle={{ gap: 10, flex: 1 }}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {data?.map((item: any, index: number) => (
          <StoryCard
            store_name={store_name}
            key={index}
            index={index}
            image={item.image}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const RestaurantScreen = ({ navigation, route }: any) => {
  const [isViewable, setisViewable] = useState(false);
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<null | TstoreProps>(null);
  const [vendorsChoice, setVendorsChoice] = useState(null);

  const store_id = getItem("store_id");
  const store_name = getItem("store_name");

  useFocusEffect(
    React.useCallback(() => {
      const fetchStore = async () => {
        // const res = await fetch(
        //   `http://localhost:3000/stores/get-single?store_id=${store_id}`
        //   // `https://diet-dining-server.onrender.com/stores/get-single?store_id=${store_id}`
        //   // `https://e48d-102-216-10-2.ngrok-free.app/stores/get-single?store_id=${store_id}`
        // );
        // const data = await res.json();
        // console.log(data);
        // return data[0];

        const data = await get_single_store(store_id as string);
        setStore(data[0]);
        setVendorsChoice(data[0].menu[0].products);
        setLoading(false);
        return data[0];
      };

      fetchStore();

      // return () => {
      //   setStore(null);
      // };
    }, [store_id])
  );

  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 200) {
      setisViewable(true);
    } else if (e.nativeEvent.contentOffset.y < 200) {
      setisViewable(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView>
        <ScrollView ref={scrollRef}></ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <View>
      <Header
        store_id={store_id as string}
        setSearching={setSearching}
        isVisible={isViewable}
        store_name={store_name as string}
      />
      <ScrollView
        className="bg-white relative "
        onScroll={(e) => handleScroll(e)}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        <ImageBackground
          style={[{ height: 300 }]}
          source={{ uri: store?.store_image }}
        />
        <View className={` bg-white`}>
          <StoreTags
            store_tags={store?.store_tags as string[]}
            store_address={store?.store_address}
            store_id={store_id as string}
            store_name={store_name as string}
          />
          <HorizontalRule marginTop={20} />
          <MerchantStoryGrid
            data={vendorsChoice}
            store_name={store_name as string}
          />
          <HorizontalRule marginTop={20} />
          <View>
            <StoreMenuSectionList data={store?.menu} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

function StoreSearchModal({
  searching,
  setSearching,
}: {
  searching: boolean;
  setSearching: any;
}) {
  const [query, setQuery] = useState("");

  return (
    <Modal animationType="slide" visible={searching}>
      <View className="flex-1 pt-14 bg-white px-2 ">
        <View className="flex border rounded-lg flex-row items-center">
          <Ionicons
            size={25}
            onPress={() => setSearching(false)}
            name="arrow-back"
          />
          <TextInput autoFocus className="flex-1 py-2 ml-4" />
        </View>
      </View>
    </Modal>
  );
}

export default RestaurantScreen;
