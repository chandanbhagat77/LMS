import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

const CoursePurchaseOverview = () => {
    function handlePayment(params) {
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: 'rzp_test_UNIZ41P0iAVJ38',
            amount: '5000',
            name: 'Acme Corp',
            order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
            prefill: {
              email: 'gaurav.kumar@example.com',
              contact: '9191919191',
              name: 'Gaurav Kumar'
            },
            theme: {color: '#53a20e'}
          }
          RazorpayCheckout.open(options).then((data) => {
            // handle success
            alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) => {
            console.log("error is",error);
            
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
          });
    }
  return (
    <View className="flex-1 bg-white px-4 py-2">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        {/* Progress Steps */}
        <View className="flex-row justify-center items-center bg-gray-200 rounded-lg p-4 mb-6">
          
          <View className="items-center">
            <View className="w-8 h-8 rounded-full bg-gray-400 items-center justify-center">
              <Text className="text-black font-semibold">1</Text>
            </View>
            <Text className="text-xs mt-2">Pay and Endroll</Text>
          </View>
          
        </View>

        {/* Course Information */}
        <Text className="text-lg font-semibold mb-2">Overview</Text>
        <Text className="text-base mb-4">
          Course Name: <Text className="font-bold">Graphic Design</Text>
        </Text>

        <View className="bg-blue-100 p-4 rounded-lg mb-6">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-sm">80+ Lectures</Text>
            <Text className="text-sm">Certificate</Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-sm">8 Weeks</Text>
            <Text className="text-sm">10% Off</Text>
          </View>
        </View>

        <Text className="text-sm mb-2">Course Rating: ★★★★★</Text>
        <Text className="text-sm mb-2">Course Time: <Text className="font-bold">8 Weeks</Text></Text>
        <Text className="text-sm mb-6">Course Trainer: <Text className="font-bold">Syed Hasnain</Text></Text>

        {/* Purchase Details */}
        <View className="bg-blue-50 rounded-lg p-4 mb-6">
          <Text className="text-sm font-semibold mb-2">Purchase Details</Text>
          <View className="flex-row justify-between mb-1">
            <Text className="text-sm">Date:</Text>
            <Text className="text-sm font-bold">19/03/2024</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-sm">Price:</Text>
            <Text className="text-sm font-bold">$72</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-sm">Coupon:</Text>
            <Text className="text-sm font-bold">10% Off</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-sm">Final Price:</Text>
            <Text className="text-sm font-bold">$65</Text>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View className="absolute bottom-4 left-0 right-0 px-4">
        <TouchableOpacity className="bg-black py-3 rounded-full" onPress={handlePayment}>
          <Text className="text-center text-white font-semibold">Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CoursePurchaseOverview;
