import { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getItem } from "../../utils/storage";
import { baseUrl } from "../../constants/baseUrl";
import Colors from "../../constants/colors";

export function GenerateOtpScreen({ navigation }) {
  const [OTP, setOTP] = useState(null);
  const [loading, setLoading] = useState(false);

  async function getOTP() {
    const isAffiliate = getItem("affiliate");
    console.log("isAffiliate", isAffiliate);
    try {
      setLoading(true);
      if (!isAffiliate) {
        const admin_id = getItem("admin_id");
        const res = await fetch(
          // `http://localhost:3000/admin/get-otp?admin_id=${admin_id}`
          `${baseUrl}/admin/get-otp?admin_id=${admin_id}`
        );
        const data = await res.json();
        const { otp } = data;
        setOTP(otp);
        setLoading(false);
        return;
      }

      const affiliate_id = getItem("affiliate_id");
      const res = await fetch(
        `${baseUrl}/affiliates/get-otp?affiliate_id=${affiliate_id}`
        // `https://diet-dining-server.onrender.com/affiliates/get-otp?affiliate_id=${affiliate_id}`
      );
      const data = await res.json();
      const { otp } = data;
      setOTP(otp);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <View
      style={{
        backgroundColor: Colors.darkGrey,
        flex: 1,
        paddingVertical: 64,
        paddingHorizontal: 16,
        justifyContent: "space-between",
      }}
    >
      <View className="flex-1 justify-center flex pb-20">
        {OTP && (
          <>
            <Text className="text-center text-gray-50 text-[20px] font-medium mb-4">
              Use the code below to verify login on the webapp
            </Text>
            <Text className="text-5xl text-gray-50 tracking-widest text-center">
              {OTP}
            </Text>
          </>
        )}
        {!OTP && !loading && (
          <View>
            <View className="flex flex-row justify-center py-4">
              <Ionicons size={80} color={"white"} name="lock-closed-outline" />
            </View>
            <Text className="text-center text-3xl text-gray-50 font-semibold mb-4">
              Verify Admin Login
            </Text>
            <Text className="text-center text-[20px] text-gray-50 font-medium mb-4">
              Click the button below to generate a one time password for your
              admin panel
            </Text>
          </View>
        )}
        {loading && (
          <View>
            <ActivityIndicator size={"large"} color={"white"} />
          </View>
        )}
      </View>
      <View className="gap-4">
        <TouchableOpacity
          onPress={() => (OTP ? navigation.goBack() : getOTP())}
          className={styles.button}
        >
          {!OTP && (
            <Text className="text-3xl">
              {loading ? "Generating..." : "Generate OTP"}
            </Text>
          )}
          {OTP && <Text className="text-3xl">{"Done"}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: "flex-1  py-16 px-4 justify-between",
  button: " bg-white py-4 px-2 justify-center flex-row rounded-lg",
};
