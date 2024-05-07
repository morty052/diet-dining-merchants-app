import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function Home() {
  const [OTP, setOTP] = useState(null);

  async function getOTP() {
    try {
      const res = await fetch("http://localhost:3000/admin/get-otp");
      const data = await res.json();
      const { otp } = data;
      setOTP(otp);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View className={styles.container}>
      <View className="flex-1 justify-center flex pb-20">
        {OTP && (
          <>
            <Text className="text-center text-[16px] mb-4">
              Use the code below to verify login on the webapp
            </Text>
            <Text className="text-5xl text-center">{OTP}</Text>
          </>
        )}
        {!OTP && (
          <Text className="text-center text-[18px] font-medium mb-4">
            Click the button below to generate a one time password for your
            admin panel
          </Text>
        )}
      </View>
      <View className="gap-4">
        <TouchableOpacity onPress={getOTP} className={styles.button}>
          <Text className="text-3xl">Generate OTP</Text>
        </TouchableOpacity>
        <TouchableOpacity className={styles.button}>
          <Text className="text-3xl">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: "flex-1 bg-red-100 py-16 px-4 justify-between",
  button: " bg-white py-4 px-2 justify-center flex-row rounded-lg",
};

export default Home;
