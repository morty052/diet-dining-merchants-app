import { Dimensions, StyleSheet, Text, View, Image, Modal } from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { seafoods_emoji } from "../../assets/foodcategories";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { SEMI_BOLD } from "../../constants/fontNames";

type Props = {};

const { width, height } = Dimensions.get("screen");

const IngredientTag = ({ title }: { title: string }) => {
  return (
    <View style={styles.ingerdientTagContainer}>
      <Text style={styles.ingerdientTagText}>{title}</Text>
    </View>
  );
};

const MoreInfoModal = ({ viewingMore, setViewingMore }) => {
  return (
    <Modal animationType="slide" visible={viewingMore}>
      <SafeAreaView
        edges={{
          bottom: "additive",
        }}
        className="flex-1 py-16 justify-between bg-white px-2"
      >
        <Text
          style={[styles.dietNameText]}
          onPress={() => setViewingMore(false)}
        >
          Mediterranean
        </Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={18} color={Colors.primary} />
          <Ionicons name="star" size={18} color={Colors.primary} />
          <Ionicons name="star" size={18} color={Colors.primary} />
          <Ionicons name="star" size={18} color={Colors.primary} />
          <Ionicons name="star-outline" size={18} color={Colors.primary} />
        </View>
        <Image
          resizeMode="contain"
          className=" w-full h-1/2 mx-auto"
          source={seafoods_emoji}
        />
        <View className="flex-1 pt-4 ">
          <Text className="text-2xl font-medium text-dark ">Overview</Text>
          <Text className="mt-4 font-light text-[18px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur totam, culpa architecto molestias libero praesentium
            dignissimos quasi ut saepe perferendis nobis consectetur fugiat
            illo. Consequatur accusamus impedit quis dolor exercitationem?
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const DietPlanCard = (props: Props) => {
  const [viewingMore, setViewimgMore] = React.useState(false);

  return (
    <View style={[styles.container]}>
      <Text style={styles.dietNameText}>Mediterranean</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={18} color={Colors.primary} />
        <Ionicons name="star" size={18} color={Colors.primary} />
        <Ionicons name="star" size={18} color={Colors.primary} />
        <Ionicons name="star" size={18} color={Colors.primary} />
        <Ionicons name="star-outline" size={18} color={Colors.primary} />
      </View>
      <View style={styles.allIngredientsContainer}>
        <IngredientTag title="Fruits" />
        <IngredientTag title="Vegetables" />
        <IngredientTag title="Whole grains" />
        <IngredientTag title="Fish" />
        <IngredientTag title="Nuts" />
        {/* <IngredientTag title="Olive Oil" /> */}
      </View>
      <View style={styles.dietImageContainer}>
        <Image
          resizeMode="contain"
          style={styles.dietImage}
          source={seafoods_emoji}
        />
      </View>

      <TouchableOpacity onPress={() => setViewimgMore(true)}>
        <Text style={styles.moreInfotext}>Tap to see more info</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DietPlanCard;

const styles = StyleSheet.create({
  container: {
    width: width * 0.96,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "white",
    borderColor: Colors.primary,
  },
  dietNameText: {
    fontWeight: "600",
    fontSize: 25,
    color: Colors.dark,
    fontFamily: SEMI_BOLD,
  },
  ratingContainer: {
    flexDirection: "row",
    paddingVertical: 2,
  },
  allIngredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    paddingTop: 10,
  },
  ingerdientTagContainer: {
    backgroundColor: Colors.primary,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  ingerdientTagText: {
    color: "white",
    fontWeight: "600",
  },
  dietImage: {
    width: 200,
    height: 300,
  },
  dietImageContainer: {
    alignItems: "center",
    // borderWidth: 2,
  },
  moreInfotext: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 16,
    color: Colors.link,
  },
});
