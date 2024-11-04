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
import { useDispatch } from "react-redux";
import { loginForm } from "../../redux/slices/authSlice";

export default function LoginScreen() {
  const [formData, setFormData] = useState({
   
    email: "",
    password: "", 
  });
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
    const { email, password } = formData;

    if (!email || !password ) {
      Alert.alert("Error", "All fields are required.");
      // Alert.prompt("Error", "All fields are required.");
      return false;
    }
 
    // if (formData.password.length < 8) {
    //   Alert.alert("Error", "Password to be atleast of 8 characters")
    //   return false;
     
    // }

   
    // Additional validation checks can go here (e.g., email format, mobile number length)

    return true;
  };

  const handleSubmit = async() => {
    if (validateForm()) {
      console.log("submittingdata",formData);
      
     try {
      const res = await dispatch(
        loginForm({
          ...formData, 
        })
      );
      if (loginForm.fulfilled.match(res)) {
        // console.log("CAMED ");
        
        // console.log("res payload is",res.payload);
        // Alert.alert("Success",  `${res?.payload?.message || "Logged In  "}`)
        Alert.alert("Success",  `${ "Logged In  "}`)
      } else {
        console.log("err payload is",res.payload);
        Alert.alert("Error", `${res?.payload?.message || "Something went wrong "}`)
      }
    } catch (error) {
      
      Alert.alert("Error", `${error.message || "Please check your internet connection"}`)
    
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
          <Text className="text-5xl font-bold text-center">Sign in</Text>
          <Text className="text-gray-500 text-center mt-1">
            Please Sign in with your account
          </Text>
        </View>

        {/* Form Section */}
        <View className="px-8 mt-6 space-y-4">
          

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

       

          <TouchableOpacity>
            <Text className="text-gray-500 text-right mt-2">
              Forget Password?
            </Text>
          </TouchableOpacity>
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
