import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import Colors from "../../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { SEMI_BOLD } from "../../constants/fontNames";
import { useSignIn, useUser } from "@clerk/clerk-expo";

type Props = {};

export const LoginPage = ({ navigation }: any) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();

  React.useEffect(() => {
    if (isSignedIn) {
      navigation.navigate("Home");
    }
  }, []);

  async function handleNext() {
    const emailAddress = email?.trim();
    if (!email || !password) {
      return;
    }

    if (!isLoaded) {
      return;
    }

    try {
      await signIn.create({
        strategy: "email_code",
        identifier: emailAddress,
      });
      setEmail("");
      setPassword("");
      navigation.navigate("OtpScreen", {
        emailAddress,
      });
    } catch (error) {
      console.error({ error });
    }
  }

  return (
    <View
      style={[StyleSheet.absoluteFill, { backgroundColor: Colors.darkGrey }]}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <View>
                <Text
                  style={{
                    color: "white",
                    fontFamily: SEMI_BOLD,
                    fontSize: 28,
                  }}
                >
                  Welcome Back
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontFamily: SEMI_BOLD,
                    fontSize: 14,
                  }}
                >
                  Please login to continue
                </Text>
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ color: "white", fontFamily: SEMI_BOLD }}>
                  Enter the email linked to your account
                </Text>
                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  style={styles.input}
                  placeholderTextColor={"white"}
                  placeholder="Registered email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                />
              </View>
              <View style={{ gap: 6 }}>
                <Text style={{ color: "white", fontFamily: SEMI_BOLD }}>
                  Enter account password
                </Text>
                <TextInput
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                  secureTextEntry
                  style={styles.input}
                  placeholderTextColor={"white"}
                  placeholder="Password"
                  autoCapitalize="none"
                  autoComplete="off"
                />
              </View>
            </View>

            <View style={{ gap: 20 }}>
              <Pressable onPress={handleNext} style={styles.button}>
                <Text>Continue</Text>
              </Pressable>
              <Text
                onPress={() => navigation.navigate("Register")}
                style={{
                  color: Colors.link,
                  textAlign: "center",
                  fontSize: 15,
                  fontFamily: SEMI_BOLD,
                }}
              >
                I want to create a new account
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 20,
    justifyContent: "space-between",
  },
  innerContainer: {
    gap: 20,
  },
  button: {
    height: 60,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "white",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "white",
  },
});
