import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { icons } from "@/constants/icons";

const Profile = () => {
  return (
    <View className="flex-1 bg-primary px-6">
      {/* Profile Header */}
      <View className="flex items-center mt-20 mb-10">
        <View className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-4">
          <Image
            source={icons.person}
            className="w-12 h-12"
            tintColor="#fff"
          />
        </View>

        <Text className="text-white text-xl font-semibold">
          Tushar Gujjanwar
        </Text>
        <Text className="text-gray-400 text-sm mt-1">
          tushar@example.com
        </Text>
      </View>

      {/* Stats Section */}
      <View className="flex-row justify-between bg-gray-900 rounded-xl p-5 mb-8">
        <View className="items-center">
          <Text className="text-white text-lg font-bold">12</Text>
          <Text className="text-gray-400 text-sm">Saved</Text>
        </View>

        <View className="items-center">
          <Text className="text-white text-lg font-bold">5</Text>
          <Text className="text-gray-400 text-sm">Orders</Text>
        </View>

        <View className="items-center">
          <Text className="text-white text-lg font-bold">3</Text>
          <Text className="text-gray-400 text-sm">Reviews</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View className="gap-4">
        <ProfileItem title="Edit Profile" />
        <ProfileItem title="Settings" />
        <ProfileItem title="Help & Support" />
        <ProfileItem title="Logout" danger />
      </View>
    </View>
  );
};

const ProfileItem = ({
  title,
  danger = false,
}: {
  title: string;
  danger?: boolean;
}) => {
  return (
    <TouchableOpacity className="bg-gray-900 p-4 rounded-xl">
      <Text
        className={`text-base ${
          danger ? "text-red-500" : "text-white"
        }`}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Profile;
