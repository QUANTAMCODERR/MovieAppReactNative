import React from "react";
import { View, Text, Image, FlatList } from "react-native";
import { icons } from "@/constants/icons";

const savedData: any[] = []; // Replace with real saved items later

const Saved = () => {
  return (
    <View className="flex-1 bg-primary px-6">
      {/* Header */}
      <Text className="text-white text-2xl font-semibold mt-16 mb-6">
        Saved
      </Text>

      {savedData.length === 0 ? (
        /* Empty State */
        <View className="flex-1 justify-center items-center gap-4">
          <Image
            source={icons.save}
            className="w-12 h-12"
            tintColor="#fff"
          />
          <Text className="text-gray-400 text-base text-center">
            You haven’t saved anything yet.
          </Text>
        </View>
      ) : (
        /* Saved Items List (Future Ready) */
        <FlatList
          data={savedData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View className="bg-gray-900 p-4 rounded-xl mb-4">
              <Text className="text-white text-base">{item.title}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Saved;
