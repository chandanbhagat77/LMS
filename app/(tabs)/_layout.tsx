import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  FontAwesome,
  MaterialIcons,
  Feather,
  Ionicons,
} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: Colors[colorScheme ?? "light"].tabIconDefault,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Courses",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
              className="mx-2 p-1"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs mb-1 ${
                focused ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Courses
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "compass" : "compass-outline"}
              size={24}
              color={color}
              className="mx-2 p-1"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs mb-1 ${
                focused ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Explore
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="notes"
        options={{
          title: "Notes",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name={focused ? "notes" : "note"}
              size={24}
              color={color}
              className="mx-2 p-1"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs mb-1 ${
                focused ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Notes
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name={focused ? "user" : "user-check"}
              size={24}
              color={color}
              className="mx-2 p-1"
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text
              className={`text-xs mb-1 ${
                focused ? "text-blue-500" : "text-gray-500"
              }`}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
