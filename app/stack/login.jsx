import React from 'react';
import { View, Text,ScrollView } from 'react-native';
import CourseDetails from '../../components/Pages/Course/CourseDetails';
import { useRoute } from '@react-navigation/native';
import LoginScreen from '../../components/Pages/Auth/Login';
const Profile = () => {
  const route = useRoute();
  
  return (
   
       <LoginScreen />
   
  );
};

export default Profile;
