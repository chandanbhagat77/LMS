import React from 'react';
import { View, Text,ScrollView } from 'react-native';
import CourseDetails from '../../components/Pages/Course/CourseDetails';

const Profile = () => {
  return (
    <ScrollView className=" ">
       <CourseDetails/>
    </ScrollView>
  );
};

export default Profile;
