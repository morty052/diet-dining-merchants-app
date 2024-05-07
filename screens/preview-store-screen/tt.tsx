import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {
  LegacyRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/colors";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  withTiming,
} from "react-native-reanimated";
import { QuickFilters, StoreMenuSectionList, StoreTags } from "./components";
import burger from "../../assets/burger.jpg";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreInfo from "./components/StoreInfo";
import LikeButton from "../../components/interaction-buttons/LikeButton";

type Props = {};

const Stack = createNativeStackNavigator();

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const quickFiltersArray = [
  {
    title: "Most Popular",
  },
  {
    title: "Meal Combos",
  },
  {
    title: "Beverages",
  },
  {
    title: "Sweets and Treats",
  },
];

const Header = ({
  isVisible,
  setSearching,
  store_name,
  filters,
}: {
  isVisible: boolean;
  setSearching: (b: boolean) => void;
  store_name: string;
  filters: { title: string }[];
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
            {/* <TouchableOpacity
                className="h-8 w-8 flex justify-center items-center  bg-white rounded-full"
                onPress={() => setSearching(true)}
              >
                <Ionicons size={20} name="star-outline" color={Colors.primary} />
              </TouchableOpacity> */}
            {/* <TouchableOpacity className="h-8 w-8 flex justify-center items-center  bg-white rounded-full">
                <Ionicons size={20} name="heart-outline" color={Colors.primary} />
              </TouchableOpacity> */}
            <LikeButton background />
          </View>
        </View>
        {isVisible && filters.length > 1 && <QuickFilters filters={filters} />}
      </AnimatedSafeAreaView>
    </>
  );
};

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="bg-white h-8 w-8 rounded-full flex justify-center items-center"
      onPress={() => navigation.goBack()}
    >
      <Ionicons size={20} name="arrow-back" />
    </TouchableOpacity>
  );
};

const HeaderRightButtons = ({
  setSearching,
}: {
  setSearching: (b: boolean) => void;
}) => {
  const navigation = useNavigation();
  return (
    <View className="flex flex-row gap-4">
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          height: 30,
          width: 30,
          borderRadius: 30,
        }}
        onPress={() => setSearching(true)}
      >
        <Ionicons size={20} name="search" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          height: 30,
          width: 30,
          borderRadius: 30,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons size={20} name="heart" />
      </TouchableOpacity>
    </View>
  );
};

const RestaurantScreen = ({ store, storePreview }: any) => {
  const [isViewable, setisViewable] = useState(false);
  const [searching, setSearching] = useState(false);

  //   const fetchStore = async () => {
  //     const res = await fetch(
  //       // `http://localhost:3000/stores/get-single?store_id=${store_id}`
  //       `https://diet-dining-server.onrender.com/stores/get-single?store_id=${store_id}`
  //     );
  //     const data = await res.json();
  //     return data[0];
  //   };

  //   const {
  //     data: store,
  //     isLoading,
  //     isError,
  //   } = useQuery({
  //     queryKey: ["active store"],
  //     queryFn: fetchStore,
  //   });

  const scrollRef = useRef<ScrollView>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 200) {
      setisViewable(true);
    } else if (e.nativeEvent.contentOffset.y < 200) {
      setisViewable(false);
    }
  };

  const { store_name, store_image, store_id, store_tags } = store ?? {};

  if (!store) {
    return null;
  }

  return (
    <>
      <Header
        filters={store?.categories}
        setSearching={setSearching}
        isVisible={isViewable}
        store_name={store_name}
      />
      <ScrollView
        className="bg-white relative"
        onScroll={(e) => handleScroll(e)}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        <ImageBackground
          style={[{ height: 300 }]}
          source={{ uri: store_image ?? "develop" }}
        />
        <View className={`px-2 bg-white`}>
          <StoreTags
            tags={storePreview.tags ? storePreview.tags : store_tags}
            store_address={store?.store_address}
            store_id={store_id}
            store_name={
              !storePreview?.store_name ? store_name : storePreview?.store_name
            }
          />
          {/* <View className="mt-4 ">
            <StoreMenuSectionList data={store?.menu} />
          </View> */}
        </View>
      </ScrollView>
      {/* <StoreSearchModal setSearching={setSearching} searching={searching} /> */}
    </>
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

const styles = {
  container: "py-4 px-2 flex-1 ",
  store_name_text: "font-semibold text-[35px]",
  tags_container: "flex flex-row items-center gap-1 flex-wrap pt-1 pr-4",
};

export default RestaurantScreen;
