import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import { NavBar } from "../components/navbar";
import {
  AffiliateStoreManager,
  GenerateOtpScreen,
  LoginPage,
  OrderScreen,
  QuickLinks,
  SettingsScreen,
  StoreMenu,
} from "../screens";
import PassCodeScreen from "../screens/passcode-screen";
import IdentifyMealScreen from "../components/image-analyzer";
import Colors from "../constants/colors";
import BackButton from "../components/ui/BackButton";
import RegisterScreen from "../screens/onboarding-screens/RegisterScreen";
import { ConfirmOtpScreen } from "../screens/onboarding-screens/ConfirmOtpScreen";
import SettingsButton from "../components/ui/SettingsButton";
import RestaurantScreen from "../screens/affiliate-store-manager/restaurantscreen";
import { AffiliateOrdersStack } from "../screens/orders-manager/routes/AffiliateOrdersStack";

type rootStackParams = {
  Home: undefined;
  Unlock: undefined;
  Register: undefined;
  Login: undefined;
  OtpScreen: {
    emailAddress: string;
    isAdmin: boolean;
  };
  GenerateOtp: undefined;
  QuickLinks: undefined;
  Settings: undefined;
  AffiliateStoreManager: undefined;
  OrdersManager: undefined;
  IdentifyMealScreen: undefined;
  Order: {
    order_id: string;
    products: any[];
    total: number;
  };
  PreviewStore: {
    _id: string;
  };
  StoreMenu: undefined;
};

const Stack = createNativeStackNavigator<rootStackParams>();

const Appstack = ({ ONBOARDED }: { ONBOARDED: boolean }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.darkGrey },
        headerShadowVisible: false,
      }}
      initialRouteName={ONBOARDED ? "Unlock" : "Register"}
    >
      <Stack.Screen
        options={{
          // header: () => <NavBar />,
          headerShown: false,
        }}
        name="Unlock"
        component={PassCodeScreen}
      />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={LoginPage}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="Register"
        component={RegisterScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="OtpScreen"
        component={ConfirmOtpScreen}
      />
      <Stack.Screen
        options={{
          title: "Quick links",
          headerTitleStyle: { color: "white" },
          headerBackVisible: false,
          headerTitleAlign: "center",
          headerRight: () => <SettingsButton />,
        }}
        name="QuickLinks"
        component={QuickLinks}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "",
          headerTitleStyle: { color: "white" },
        }}
        name="GenerateOtp"
        component={GenerateOtpScreen}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Settings",
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "Orders",
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
          // headerShown: false,
        }}
        name="OrdersManager"
        component={AffiliateOrdersStack}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="AffiliateStoreManager"
        component={AffiliateStoreManager}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "",
          headerLeft: () => <BackButton />,
          headerBackTitleVisible: false,
        }}
        name="Order"
        component={OrderScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="PreviewStore"
        component={RestaurantScreen}
      />
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShown: false,
        }}
        name="IdentifyMealScreen"
        component={IdentifyMealScreen}
      />
      <Stack.Screen
        options={{
          headerLeft: () => <BackButton />,
          title: "",
          headerTitleStyle: { color: "white" },
          headerTitleAlign: "center",
          // headerShown: false,
          headerBackTitleVisible: false,
          headerBackVisible: false,
        }}
        name="StoreMenu"
        component={StoreMenu}
      />
    </Stack.Navigator>
  );
};

export default Appstack;
