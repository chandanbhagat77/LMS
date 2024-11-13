import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Button } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const CourseDetails = () => {
  return (
    <ScrollView className="flex flex-col bg-white p-4 h-[100vh]">
      {/* Video Placeholder */}
      <View className="h-80 bg-gray-200 justify-center items-center rounded-md mb-4">
        <MaterialIcons name="play-circle-outline" size={60} color="gray" />
      </View>

      {/* Tab Navigation */}
      <View className="flex-row mb-4 border-b border-gray-200">
        <TouchableOpacity className="pb-2 border-b-2 border-black px-4">
          <Text className="text-black font-semibold">Overview</Text>
        </TouchableOpacity>
        <TouchableOpacity className="pb-2 px-4">
          <Text className="text-gray-500">Lessons</Text>
        </TouchableOpacity>
        <TouchableOpacity className="pb-2 px-4">
          <Text className="text-gray-500">Reviews</Text>
        </TouchableOpacity>
      </View>

      {/* Course Title and Details */}
      <View className="flex mt-2">
        <Text className="text-xl font-semibold mb-2">Graphic Design</Text>
        <Text className="text-gray-500">By Syed Hasnain</Text>
        <View className="flex-row items-center my-1">
          <FontAwesome name="star" size={14} color="black" />
          <FontAwesome name="star" size={14} color="black" />
          <FontAwesome name="star" size={14} color="black" />
          <FontAwesome name="star" size={14} color="black" />
          <FontAwesome name="star" size={14} color="black" />
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold">$72</Text>
          <Text className="text-gray-400">Lorem Ipsum Text</Text>
        </View>
      </View>

      {/* Description */}
      <Text className="text-gray-600 mb-4">
        Lorem ipsum dolor sit amet consectetur. Nec eget accumsan molestie proin.
        Integer rhoncus vitae nisi natoque ac mus tellus scelerisque gravida...
        <Text className="text-black font-semibold"> Read More</Text>
      </Text>

      {/* Highlights Section */}
      <View className="flex-row justify-between bg-gray-100 p-4 rounded-lg mb-4">
        <View className="items-center">
          <MaterialIcons name="library-books" size={24} color="black" />
          <Text className="text-sm">80+ Lectures</Text>
        </View>
        <View className="items-center">
          <MaterialIcons name="verified" size={24} color="black" />
          <Text className="text-sm">Certificate</Text>
        </View>
        <View className="items-center">
          <MaterialIcons name="local-offer" size={24} color="black" />
          <Text className="text-sm">10% Off</Text>
        </View>
      </View>

      {/* Skills Section */}
      <Text className="text-lg font-semibold mb-2">Skills</Text>
      <View className="flex-row flex-wrap gap-2 mb-6">
        {['Adobe', 'Adobe Photoshop', 'Logo', 'Designing', 'Poster Design', 'Figma'].map((skill, index) => (
          <View key={index} className="px-4 py-2 bg-gray-100 rounded-full">
            <Text className="text-gray-600">{skill}</Text>
          </View>
        ))}
      </View>

      {/* Enroll Button */}
      <TouchableOpacity className="bg-black py-4 rounded-full items-center">
        <Text className="text-white font-semibold text-lg">GET ENROLL</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CourseDetails;
