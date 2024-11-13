import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
const ProfileScreen = () => {
  const { data } = useSelector((state) => state.auth);
  const navigation = useNavigation();
  return (
    <View className="flex-1 bg-white px-4 h-[100vh]">
      <View className="mt-10">
        {/* Profile Header */}
        <View className="items-center mb-6">
          <View className="w-24 h-24 bg-gray-300 rounded-full mb-4" />
          <Text className="text-xl font-bold">{data?.name || "Name Here"}</Text>
          <Text className="text-sm text-gray-500">{data?.email || "example@example.com"}</Text>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity className="flex-row items-center justify-center bg-blue-500 px-4 py-2 rounded-lg mb-4" onPress={() => {
         
          navigation.navigate("stack/EditProfile")
          
        }}>
          <Text className="text-white text-sm font-semibold">Edit Profile</Text>
        </TouchableOpacity>

        {/* Enrolled Courses Section */}
        <View className="bg-gray-100 p-4 rounded-lg">
          <Text className="text-lg font-bold mb-2">Enrolled Courses</Text>
          {data?.enroll_courses && data.enroll_courses.length > 0 ? (
            data.enroll_courses.map((el, index) => (
              <View
              key={index}
              className="w-40 mr-4 p-2 rounded-lg bg-gray-100 shadow-lg"
            >
              <View className="w-full h-28 bg-gray-300 rounded-lg" />
              <Text className="mt-2 text-base font-semibold text-gray-800">
               {el?.course_title}
              </Text>
              <Text className="text-sm text-gray-500">{el.instructor?.name}</Text>
              {/* <Text className="text-sm text-gray-500">45% Done</Text> */}
              <View className="h-1 w-full bg-gray-200 mt-1 rounded-full">
                <View className="h-1 bg-blue-500 w-2/5 rounded-full" />
              </View>
            </View>
            ))
          ) : (
            <Text className="text-gray-500">No courses enrolled yet.</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;
