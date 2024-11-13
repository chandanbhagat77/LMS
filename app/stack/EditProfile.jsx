import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux"; 
import axios from "axios";
import { handleEditData, setAuthData } from "../../redux/slices/authSlice";

export default function SignInScreen() {
    const {isLoggedIn,data,token}=useSelector((state)=>state.auth);
    // console.log(typeof data);
    
  const [formData, setFormData] = useState({
    name: data?.name || "",
    email: data?.email || "",
   
    mobile: data?.mobile || "", 
  });
  const dispatch=useDispatch() 

  const handleChange = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, mobile } = formData;

    if (!name || !email || !mobile) {
      Alert.alert("Error", "All fields are required.");
      // Alert.prompt("Error", "All fields are required.");
      return false;
    }
  

    if (formData.mobile.length >= 11) {
      Alert.alert("Error", "Enter correct mobile number");
      return false; 
    }
    // Additional validation checks can go here (e.g., email format, mobile number length)

    return true;
  };

  const handleSubmit = async() => {
    if (validateForm()) {
      console.log("submittingdata",formData,await AsyncStorage.getItem("data"));
      
     try {
      const res = await axios.put(`http://192.168.137.1:8000/api/users/updateuser/${data._id}`,{formData})
      if (res) {
        console.log("CAMED ",res.data);
       
        dispatch(handleEditData({
            data: res.data ? res.data : {}, 
          }));
        // console.log("res payload is",res.payload);
        // Alert.alert("Success",  `${res?.payload?.message || "Account created "}`)
        Alert.alert("Success",  ` "Profile updated "}`)
      } else {
        console.log("err payload is",res.payload);
        Alert.alert("Error", `${res?.payload?.error || "Something went wrong "}`)
      }
    } catch (error) {
    console.log("error",error);
    
      Alert.alert("Error", `${res?.payload?.error || "Please check your internet connection"}`)
    
     }
  
     
      // Alert.alert("Success", "Form submitted successfully!");
    }
  };
  useEffect(()=>{

  },[data])

  return (
    <ScrollView>
      <View className="bg-gray-50 h-[100vh] flex flex-col justify-center">
        

        <View className="px-8 mt-4">
          <Text className="text-5xl font-bold text-center">Edit Profile</Text>
          <Text className="text-gray-500 text-center mt-1">
           
            
          </Text>
        </View>

        {/* Form Section */}
        <View className="px-8 mt-6 space-y-4">
          <View className="flex mt-2">
            <Text className="my-2 ml-1 font-bold">Name</Text>
            <TextInput
              placeholder="Name Here"
              className="border border-gray-300 rounded-lg py-3 px-4 bg-white"
              autoCapitalize="words"
              value={formData.name}
              onChangeText={(value) => handleChange("name", value)}
            />
          </View>

          <View className="flex mt-2">
            <Text className="my-2 ml-1 font-bold">Email</Text>
            <TextInput
              placeholder="Email Here"
              className="border border-gray-300 rounded-lg py-3 px-4 bg-white"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(value) => handleChange("email", value)}
            />
          </View>

        

          <View className="flex my-2">
            <Text className="my-2 ml-1 font-bold">Mobile</Text>
            <TextInput
              placeholder="Mobile Number"
              className="border border-gray-300 rounded-lg py-3 px-4 bg-white"
              keyboardType="phone-pad"
              value={formData.mobile}
              onChangeText={(value) => handleChange("mobile", value)}
            />
          </View>

          
        </View>

        {/* Sign In Button */}
        <View className="px-8 mt-8">
          <TouchableOpacity className="bg-black py-4 rounded-full" onPress={handleSubmit}>
            <Text className="text-center text-white font-semibold">Submit Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
