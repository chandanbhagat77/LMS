import React, { useState } from "react";
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
import { signupForm } from "../../redux/slices/authSlice";

export default function SignInScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnfpassword: "",
    mobile: "", 
  });
  const {isLoggedIn}=useSelector((state)=>state.auth)
  const dispatch=useDispatch()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleChange = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, password, cnfpassword, mobile } = formData;

    if (!name || !email || !password || !cnfpassword || !mobile) {
      Alert.alert("Error", "All fields are required.");
      // Alert.prompt("Error", "All fields are required.");
      return false;
    }
    if (password !== cnfpassword) {
      Alert.alert("Error", "Passwords do not match.");
      return false;
    }
    if (formData.password.length < 8) {
      Alert.alert("Error", "Password to be atleast of 8 characters")
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
      console.log("submittingdata",formData);
      
     try {
      const res = await dispatch(
        signupForm({
          ...formData, 
        })
      );
      if (signupForm.fulfilled.match(res)) {
        console.log("CAMED ");
        
        // console.log("res payload is",res.payload);
        // Alert.alert("Success",  `${res?.payload?.message || "Account created "}`)
        Alert.alert("Success",  `${res?.payload?.message || "Account created "}`)
      } else {
        console.log("err payload is",res.payload);
        Alert.alert("Error", `${res?.payload?.error || "Something went wrong "}`)
      }
    } catch (error) {
      
      Alert.alert("Error", `${res?.payload?.error || "Please check your internet connection"}`)
    
     }
  
     
      // Alert.alert("Success", "Form submitted successfully!");
    }
  };

  return (
    <ScrollView>
      <View className="bg-gray-50 h-[100vh] flex flex-col justify-center">
        <TouchableOpacity className="absolute p-4 top-1">
          <FontAwesome name="arrow-left" size={24} color="black" />
        </TouchableOpacity>

        <View className="px-8 mt-4">
          <Text className="text-5xl font-bold text-center">Sign up</Text>
          <Text className="text-gray-500 text-center mt-1">
            Create Your account {isLoggedIn && <Text>Loggedin</Text>}
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

          <View className="flex mt-2">
            <Text className="my-2 ml-1 font-bold">Password</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg">
              <TextInput
                placeholder="Password"
                className="border border-gray-300 rounded-lg py-3 px-4 bg-white flex-1"
                secureTextEntry={!passwordVisible}
                value={formData.password}
                onChangeText={(value) => handleChange("password", value)}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                className="px-2 "
              >
                <FontAwesome
                  name={passwordVisible ? "eye" : "eye-slash"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex mt-2">
            <Text className="my-2 ml-1 font-bold">Confirm Password</Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg">
              <TextInput
                placeholder="Confirm Password"
                className="border border-gray-300 rounded-lg py-3 px-4 bg-white flex-1"
                secureTextEntry={!confirmPasswordVisible}
                value={formData.cnfpassword}
                onChangeText={(value) => handleChange("cnfpassword", value)}
              />
              <TouchableOpacity
                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                className="px-2"
              >
                <FontAwesome
                  name={confirmPasswordVisible ? "eye" : "eye-slash"}
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
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
            <Text className="text-center text-white font-semibold">SIGN IN</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
