import React from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import { fetchMovieDetails } from "@/services/api";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => {
  const displayValue = value && String(value).trim().length > 0 ? value : "N/A";

  return (
    <View className="flex-col mt-5 w-full">
      <Text className="text-light-200 text-sm">{label}</Text>
      <Text className="text-light-100 text-base mt-2">{displayValue}</Text>
    </View>
  );
};

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() =>
    fetchMovieDetails(id as string)
  );

  if (loading) {
    return (
      <View className="flex-1 bg-primary items-center justify-center">
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary">
      {/* SCROLLABLE CONTENT */}
      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* POSTER */}
        {movie?.poster_path && (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
        )}

        {/* DETAILS */}
        <View className="px-5 mt-5">
          <Text className="text-white font-bold text-xl">{movie?.title}</Text>

          {/* YEAR + RUNTIME */}
          <View className="flex-row gap-x-2 mt-2">
            <Text className="text-light-200 text-sm">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
          </View>

          {/* RATING */}
          <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
            <Image source={icons.star} className="size-4" />
            <Text className="text-white font-bold text-sm">
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className="text-light-200 text-sm">
              ({movie?.vote_count} votes)
            </Text>
          </View>

          {/* INFO SECTIONS */}
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={movie?.genres?.map((g) => g.name).join(", ")}
          />

          <View className="flex-row justify-between mt-5">
            <View className="flex-1 mr-2">
              <MovieInfo
                label="Budget"
                value={
                  movie?.budget && movie.budget > 0
                    ? `$${(movie.budget / 1_000_000).toFixed(1)}M`
                    : "N/A"
                }
              />
            </View>

            <View className="flex-1 ml-2">
              <MovieInfo
                label="Revenue"
                value={
                  movie?.revenue && movie.revenue > 0
                    ? `$${(movie.revenue / 1_000_000).toFixed(1)}M`
                    : "N/A"
                }
              />
            </View>
          </View>

          <MovieInfo
            label="Production Companies"
            value={movie?.production_companies?.map((c) => c.name).join(" · ")}
          />
        </View>
      </ScrollView>

      {/* FIXED GO BACK BUTTON */}
      <TouchableOpacity
        onPress={router.back}
        style={{
          position: "absolute",
          bottom: 20,
          alignSelf: "center",
          width: 420, // 🔥 set width directly
          backgroundColor: "#2563EB",
          paddingVertical: 14,
          borderRadius: 12,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 50,
        }}
      >
        <Image
          source={icons.arrow}
          tintColor="#fff"
          style={{
            width: 20,
            height: 20,
            marginRight: 8,
            transform: [{ rotate: "180deg" }],
          }}
        />
        <Text style={{ color: "#fff", fontWeight: "600" }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
