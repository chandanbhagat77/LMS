import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import SignInScreen from "../../components/Pages/Signup";
export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <View>
        <SignInScreen />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
