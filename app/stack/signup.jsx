import React from 'react';
import { View, Text,ScrollView } from 'react-native';
import CourseDetails from '../../components/Pages/Course/CourseDetails';
import { useRoute } from '@react-navigation/native';
import LoginScreen from '../../components/Pages/Auth/Login';
import SignInScreen from '../../components/Pages/Auth/signup';
const Profile = () => {
  const route = useRoute();
  
  return (
   
       <SignInScreen />
   
  );
};

export default Profile;
