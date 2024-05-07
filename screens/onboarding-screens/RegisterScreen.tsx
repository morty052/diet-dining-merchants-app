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
import { useSignIn } from "@clerk/clerk-expo";
import { useSignUp } from "@clerk/clerk-expo";

type Props = {};

const RegisterScreen = ({ navigation }: any) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { isLoaded, signIn, setActive } = useSignIn();

  const { signUp } = useSignUp();

  // async function handleNext() {
  //   const isAdmin = email?.includes("@dietdining.org");
  //   const emailAddress = email?.trim();
  //   if (!email || !password) {
  //     return;
  //   }

  //   if (!isLoaded) {
  //     return;
  //   }

  //   if (isAdmin) {
  //     try {
  //       await signIn.create({
  //         strategy: "email_code",
  //         identifier: emailAddress,
  //       });
  //       setEmail("");
  //       setPassword("");
  //       return navigation.navigate("OtpScreen", {
  //         emailAddress: email,
  //         isAdmin: true,
  //       });
  //     } catch (error) {
  //       console.error({ error });
  //     }
  //   }

  //   try {
  //     await signIn.create({
  //       strategy: "email_code",
  //       identifier: emailAddress,
  //     });
  //     setEmail("");
  //     setPassword("");
  //     navigation.navigate("OtpScreen", {
  //       emailAddress,
  //     });
  //   } catch (error) {
  //     console.error({ error });
  //   }
  // }

  const onSignUpPress = async () => {
    const isAdmin = email?.includes("@dietdining.org");
    if (!isLoaded) {
      return;
    }

    try {
      await signUp?.create({
        emailAddress: email,
        password,
      });

      // send the email.
      await signUp?.prepareEmailAddressVerification({ strategy: "email_code" });

      if (isAdmin) {
        setEmail("");
        setPassword("");
        return navigation.navigate("OtpScreen", {
          emailAddress: email,
          isAdmin: true,
          isRegister: true,
        });
      }

      // * Handle affiliate sign up
      setEmail("");
      setPassword("");
      navigation.navigate("OtpScreen", {
        emailAddress: email,
        isRegister: true,
      });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

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
                  Welcome to diet dining
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontFamily: SEMI_BOLD,
                    fontSize: 14,
                  }}
                >
                  Get started with your companion setup by providing the details
                  below.
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
                <Text
                  style={{
                    color: "white",
                    fontFamily: SEMI_BOLD,
                    fontSize: 12,
                  }}
                >
                  Password must be 8 characters or more
                </Text>
              </View>
            </View>

            <View style={{ gap: 20 }}>
              <Pressable onPress={onSignUpPress} style={styles.button}>
                <Text>Continue</Text>
              </Pressable>
              <Text
                onPress={() => navigation.navigate("Login")}
                style={{
                  color: Colors.link,
                  textAlign: "center",
                  fontSize: 15,
                  fontFamily: SEMI_BOLD,
                }}
              >
                I want to login instead
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;

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
