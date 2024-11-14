import React from 'react';
import { View, Text,ScrollView } from 'react-native';
import CourseDetails from '../../components/Pages/Course/CourseDetails';
import { useRoute } from '@react-navigation/native';
import CoursePurchaseOverview from '../../components/Pages/Course/CourseCheckout';
const Profile = () => {
  const route = useRoute();
  const { courseId } = route.params;
  console.log("course id is ",courseId,route.params);
  
  return (
   
       <CoursePurchaseOverview />
   
  );
};

export default Profile;
