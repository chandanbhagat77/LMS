import React from 'react';
import { View, Text,ScrollView } from 'react-native';
import ProfileScreen from '../../components/Pages/Profile/profile';

const Profile = () => {
  return (
    <ScrollView className=" ">
       <ProfileScreen/>
    </ScrollView>
  );
};

export default Profile;
