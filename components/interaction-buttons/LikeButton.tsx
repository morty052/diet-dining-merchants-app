import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
type Props = {};

const LikeButton = ({ background }: { background?: boolean }) => {
  const [liked, setLiked] = React.useState(false);
  const [newLike, setNewLike] = React.useState(false);

  async function handleLikeItem(item_id: string) {
    // if (newLike) {
    //   setNewLike(false);
    //   return;
    // }

    // try {
    //   setNewLike(true);
    //   const user_id = await getValueFor("user_id");
    //   // const res = await fetch()
    //   console.log(user_id, item_id);
    // } catch (error) {
    //   console.info(error);
    // }
    console.log("liked");
  }

  return (
    <Pressable
      style={background ? styles.container : null}
      onPress={() => handleLikeItem("test_id")}
    >
      <Ionicons
        color={Colors.primary}
        size={background ? 20 : 30}
        name={liked || newLike ? "heart" : "heart-outline"}
      />
    </Pressable>
  );
};

export default LikeButton;

const styles = StyleSheet.create({
  container: {
    height: 32,
    width: 32,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
