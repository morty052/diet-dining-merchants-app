import { View, Text, Platform } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Appstack from "./routes/Appstack";
import { ClerkProvider } from "@clerk/clerk-expo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import { getItem, setItem } from "./utils/storage";
import { StatusBar } from "expo-status-bar";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {};

const queryClient = new QueryClient();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  try {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants?.expoConfig?.extra?.eas.projectId,
      });
      const { data } = token;

      console.log(data);
      setItem("expo_push_token", `${data}`);
      await SplashScreen.hideAsync();
    } else {
      alert("Must use physical device for Push Notifications");
      await SplashScreen.hideAsync();
    }
  } catch (error) {
    await SplashScreen.hideAsync();
    console.log(error);
  }

  return token?.data;
}

const App = (props: Props) => {
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  const [ONBOARDED, setONBOARDED] = React.useState<null | boolean>(null);

  SplashScreen.preventAutoHideAsync();

  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function checkForKey() {
    const key = getItem("ONBOARDED");
    // await SplashScreen.hideAsync();
    if (key == "TRUE") {
      setONBOARDED(true);
      console.info(key);
      return;
    } else {
      setONBOARDED(false);
      // await SplashScreen.hideAsync();
    }
  }
  React.useEffect(() => {
    checkForKey();
  }, []);

  if (ONBOARDED == null) {
    return null;
  }

  return (
    <ClerkProvider publishableKey="pk_test_c3VtbWFyeS1kYW5lLTg3LmNsZXJrLmFjY291bnRzLmRldiQ">
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Appstack ONBOARDED={ONBOARDED} />
          </NavigationContainer>
        </GestureHandlerRootView>
        <StatusBar backgroundColor={Colors.darkGrey} style="light" />
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default App;
