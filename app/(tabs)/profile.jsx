import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import LoginScreen from "../../components/Pages/Login";

export default function TabTwoScreen() {
  return (
    <SafeAreaView>
      <View>
       <LoginScreen/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
