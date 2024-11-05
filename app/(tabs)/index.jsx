import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { FontAwesome, Feather, Ionicons,AntDesign ,MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useDispatch, useSelector } from "react-redux";
import { setAuthData } from "./../../redux/slices/authSlice";
export default function HomeScreen() {
  const dispatch=useDispatch()
  const [courses,setCourses]=useState([]);
  let {isLoggedIn,data}=useSelector((state)=>state.auth)
  // data=JSON.parse(data)
  console.log("user data",data, isLoggedIn);
  
  async function getAllCourses() {
    console.log("data after await",await AsyncStorage.getItem("token"));
    
    try {
      const res=await axios.get("http://192.168.68.147:8000/api/courses/getallcourses")
      // console.log("course data ",res.data);
      setCourses(res?.data?.data)
    } catch (e) {
      
    }
  }
  useEffect(()=>{
    getAllCourses()
    const loadAuthData = async () => {
      const data = await AsyncStorage.getItem("data");
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn") === "true"; // Convert to boolean
      const token = await AsyncStorage.getItem("token");
      console.log("rearranged the data",data,isLoggedIn,token);
      
      dispatch(setAuthData({
        data: data ? JSON.parse(data) : {},
        isLoggedIn,
        token: token || ''
      }));
    };

   ( !isLoggedIn) && loadAuthData();
  },[])
  return (
    <ScrollView className="flex-1 bg-white px-4 mt-10">
      {/* Header Section */}
      <View className="flex-row justify-between items-center mt-4 pb-10 ">
        <Text className="text-2xl font-bold fixed ">Welcome, {`${isLoggedIn && data?.name}`}</Text>
        {isLoggedIn ? <View className="flex flex-row">
        <TouchableOpacity className="mr-3">
          <Ionicons
            name="notifications-outline"
            size={24}
            className="text-gray-700"
          />
        </TouchableOpacity>
        <TouchableOpacity>
        <AntDesign name="user" size={24}  className="text-gray-700" />
        </TouchableOpacity>
        </View> : <MaterialIcons name="login" size={24} color="black" />}
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-200 rounded-full mt-4 px-4 py-2">
        <Feather name="search" size={18} className="text-gray-500" />
        <TextInput
          placeholder="Search Here"
          className="ml-2 flex-1 text-gray-700"
          placeholderTextColor="#A0A0A0"
        />
      </View>

      {/* Tag Section */}
      <View className="flex-row flex-wrap mt-6">
        {["UI/UX", "Graphics Design", "Figma"].map((tag, index) => (
          <TouchableOpacity
            key={index}
            className="bg-gray-200 py-1 px-4 mr-2 mb-2 rounded-full"
          >
            <Text className="text-gray-700">{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Enrolled Courses Section */}
     { isLoggedIn && <View className="mt-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-lg font-semibold">Enrolled Courses</Text>
          <TouchableOpacity>
            <Text className="text-blue-600">See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          {data?.enroll_courses?.length > 0 && data.enroll_courses.map((el, index) => (
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
          ))}
        </ScrollView>
      </View>}

      {/* All Courses Section */}
      <View className="mt-6">
        <Text className="text-lg font-semibold mb-2">All Courses</Text>
        {courses.length > 0 && courses.map((course, index) => (
          <View
            key={index}
            className="flex-row items-center bg-gray-100 rounded-lg p-3 mb-4 shadow"
          >
            <View className="w-20 h-20 bg-gray-300 rounded-lg" />
            <View className="flex-1 ml-4">
              <Text className="text-base font-semibold text-gray-800">
                {course.course_title}
              </Text>
              <Text className="text-sm text-gray-500">{course?.instructor?.name}</Text>
              {/* <View className="flex-row items-center">
                <Text className="text-sm text-gray-500">45% Done</Text>
                <FontAwesome
                  name="star"
                  size={14}
                  className="ml-2 text-yellow-500"
                />
                <FontAwesome
                  name="star"
                  size={14}
                  className="text-yellow-500"
                />
                <FontAwesome
                  name="star"
                  size={14}
                  className="text-yellow-500"
                />
                <FontAwesome
                  name="star"
                  size={14}
                  className="text-yellow-500"
                />
                <FontAwesome
                  name="star-half"
                  size={14}
                  className="text-yellow-500"
                />
              </View> */}
              <View className="h-1 w-full bg-gray-200 mt-1 rounded-full">
                <View className="h-1 bg-blue-500 w-2/5 rounded-full" />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
