import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Auth from "expo-local-authentication";
import { LocalAuthenticationOptions } from "expo-local-authentication";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../constants/colors";
import { SEMI_BOLD } from "../../constants/fontNames";
import { getItem } from "../../utils/storage";

type Props = {};

const PassCodeScreen = ({ navigation }) => {
  const [unlocked, setUnlocked] = React.useState(false);

  React.useEffect(() => {
    const isSignedOut = getItem("SignedOut");
    if (isSignedOut) {
      navigation.navigate("Login");
    }
  }, []);

  async function retry() {
    const isAffiliate = getItem("affiliate");

    const res = await Auth.authenticateAsync({
      promptMessage: "Authenticate to continue",
    });
    if (res.success) {
      setUnlocked(true);
      // SET AFFILIATE PARAM TO TRUE ON QUICKLINK SCREEN
      if (isAffiliate) {
        return navigation.navigate("QuickLinks", {
          isAffiliate: true,
        });
      }

      navigation.navigate("QuickLinks");
    }

    // TODO REMOVE THIS LINE OF CODE ONLY HERE FOR ANDROID SIMULATOR
    if (res.error == "not_enrolled") {
      console.log(res.error);
      navigation.navigate("QuickLinks");
    }
  }

  // if (!unlocked) {
  //   return (
  //     <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkGrey }}>
  //       <View
  //         style={{
  //           paddingBottom: 150,
  //           alignItems: "center",
  //           justifyContent: "center",
  //           flex: 1,
  //           paddingHorizontal: 20,
  //         }}
  //       >
  //         <MaterialIcons
  //           onPress={retry}
  //           name="fingerprint"
  //           size={150}
  //           color={Colors.primary}
  //         />
  //         <Text
  //           style={{ color: "white", fontSize: 24, fontFamily: SEMI_BOLD }}
  //           onPress={retry}
  //         >
  //           Verify to continue
  //         </Text>
  //         <Text
  //           style={{
  //             color: "white",
  //             fontSize: 16,
  //             fontFamily: SEMI_BOLD,
  //             textAlign: "center",
  //           }}
  //           onPress={retry}
  //         >
  //           Tap the icon to unlock with passcode or Face ID
  //         </Text>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.darkGrey }}>
      <View
        style={{
          paddingBottom: 150,
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <MaterialIcons
          onPress={retry}
          name="fingerprint"
          size={150}
          color={Colors.primary}
        />
        <Text
          style={{ color: "white", fontSize: 24, fontFamily: SEMI_BOLD }}
          onPress={retry}
        >
          Verify to continue
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontFamily: SEMI_BOLD,
            textAlign: "center",
          }}
          onPress={retry}
        >
          Tap the icon to unlock with passcode or Face ID
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PassCodeScreen;

const styles = StyleSheet.create({});
