import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTailwind } from "nativewind";

export default function WelcomeScreen() {
  const tailwind = useTailwind();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Skip Button */}
      <View className="flex-row justify-end p-4">
        <TouchableOpacity className="bg-gray-200 px-4 py-2 rounded-full">
          <Text className="text-gray-700 font-medium">SKIP</Text>
        </TouchableOpacity>
      </View>

      {/* Centered Content */}
      <View className="flex-1 justify-center items-center">
        {/* Replace this with your image */}
        <Image
          source={{ uri: "YourImage" }}
          className="w-48 h-48 mb-8" // Adjust the size as needed
          resizeMode="contain"
        />
        <Text className="text-xl font-bold text-center px-10">
          Join Cybex IT Group to Kick Start Your Lesson
        </Text>
        <Text className="text-gray-500 text-center mt-2 px-10">
          Join and Learn from our Top Instructors!
        </Text>
      </View>

      {/* Buttons */}
      <View className="flex-row justify-center space-x-4 mb-8 px-10">
        <TouchableOpacity className="flex-1 bg-black py-3 rounded-full mr-2">
          <Text className="text-center text-white font-semibold">Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 border border-black py-3 rounded-full ml-2">
          <Text className="text-center text-black font-semibold">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
