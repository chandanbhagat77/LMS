import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';
const CourseDetails = ({ courseId }) => {
  console.log("course id is ",courseId);
  
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Overview');
  const [course, setCourse] = useState({});


  // Handler to fetch course details by ID
  const fetchCourseDetails = async (id) => {
    try {
     
      
      const response = await axios.get(`http://192.168.68.140:8000/api/courses/getcoursebyid?id=${id}`);
      console.log("course data",response);
      
      setCourse({...response?.data});
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  useEffect(() => {
    if (courseId) {
      fetchCourseDetails(courseId);
    }
  }, [courseId]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Overview':
        return (
          <View>
            <Text className="text-gray-700 mb-4 bg-gray-50 text-center p-2 rounded">{course.course_description}</Text>
            <Text className="text-lg font-semibold mb-2">Course Outcomes</Text>
            {course.course_Outcomes.map((outcome, index) => (
              <Text key={index} className="text-gray-500">• {outcome}</Text>
            ))}
          </View>
        );
      case 'Lessons':
        return course.modules.map((module) => (
          <View key={module._id} className="mb-4">
            <Text className="text-lg font-semibold mb-2">{module.module_name}</Text>
            {module.chapters.map((chapter) => (
              <View key={chapter._id} className="flex-row justify-between mb-2">
                <Text>{chapter.lesson_name}</Text>
                <Text className="text-gray-400">{chapter.duration} mins</Text>
              </View>
            ))}
          </View>
        ));
      case 'Reviews':
        return (
          <Text className="text-gray-500">No reviews available yet.</Text>
        );
      default:
        return null;
    }
  };

  return (
    <View className='  bg-white'>
 
    <ScrollView className="flex flex-col px-4  h-[95vh]  ">
      {/* Course Video Placeholder */}
  
      <View className='pb-48'>

      <View className="h-80 bg-gray-200 justify-center items-center rounded-md mb-4">
        <MaterialIcons name="play-circle-outline" size={60} color="gray" />
      </View>
      
      {/* Tab Navigation */}
      <View className="flex-row mb-4 border-b border-gray-200">
        {['Overview', 'Lessons', 'Reviews'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`pb-2 px-4 ${activeTab === tab ? 'border-b-2 border-black' : ''}`}
          >
            <Text className={activeTab === tab ? 'text-black font-semibold' : 'text-gray-500'}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
     
      {/* Course Title and Instructor */}
    { course?._id &&  <View className="mb-4 flex justify-center bg-gray-50 p-2 rounded-xl">
        <Text className="text-xl font-semibold text-center">{course.course_title}</Text>
        <Text className="text-gray-500 text-center">By {course.instructor.name}</Text>
     
       <View className="flex-row justify-center my-1 ">
          {[...Array(5)].map((_, i) => (
            <FontAwesome key={i} name="star" size={14} color="black" />
          ))}
        </View>
       
        <View className="flex justify-between items-center my-2">
          <Text className="text-2xl font-bold">${course.course_price / 100}</Text>
          <Text className="text-gray-400">{course.course_subtitle}</Text>
        </View>
      </View>}

      {/* Dynamic Tab Content */}
      {course?._id &&  renderTabContent()}

      {/* Instructor Info */}
   { course?._id &&  <View className="mt-4">
        <Text className="text-lg font-semibold mb-2">Instructor</Text>
        <Image
          source={{ uri: course.instructor.profile_picture }}
          className="w-16 h-16 rounded-full mb-2"
        />
        <Text className="text-lg font-semibold">{course.instructor.name}</Text>
        <Text className="text-gray-500">{course.instructor.position}</Text>
        <Text className="text-gray-600 mt-1">{course.instructor.bio}</Text>
      </View>}

      </View>

    </ScrollView>
    
    {course?._id && (
    <View className="absolute bottom-5 left-0 right-0 px-4 z-10 pb-3">
      <TouchableOpacity className="bg-black py-3 rounded-full">
        <Text className="text-center text-white font-semibold" 
            onPress={() => navigation.navigate("stack/courseCheckout", { courseData: course })}>Buy Course</Text>
      </TouchableOpacity>
    </View>
  )}
    </View>

  );
};

export default CourseDetails;
