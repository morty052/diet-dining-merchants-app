import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Screen } from "../../components/screen";
import { useClerk } from "@clerk/clerk-expo";
import { removeItem, setItem } from "../../utils/storage";

type Props = {};

const handleDeleteClerkAccount = async () => {
  await fetch("https://api.clerk.com/v1/users/{user_id}", {
    method: "DELETE",
    headers: {
      Authorization: "CLERK_SECRET_KEY",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Handle successful response
        console.log("User deleted successfully.");
      } else {
        // Handle error response
        console.error(
          "Error deleting user:",
          response.status,
          response.statusText
        );
      }
    })
    .catch((error) => {
      // Handle network errors or other exceptions
      console.error("An error occurred:", error);
    });
};

export const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    removeItem("affiliate");
    removeItem("firstname");
    removeItem("store_name");
    removeItem("affiliate_id");
    removeItem("admin_id");
    removeItem("admin");
    setItem("SignedOut", "TRUE");
    await signOut();
    // @ts-ignore
    navigation.navigate("Login");
  };

  return (
    <Screen>
      <Pressable
        onPress={handleSignOut}
        style={{
          height: 40,
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white" }}>Sign out</Text>
      </Pressable>
    </Screen>
  );
};

const styles = StyleSheet.create({});
