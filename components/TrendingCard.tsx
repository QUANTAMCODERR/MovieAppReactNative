import { images } from '@/constants/images';
import MaskedView from '@react-native-masked-view/masked-view';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


const TrendingCard = ({movie:{movie_id, title, poster_url}, index}:TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
        <TouchableOpacity 
          className='w-32'
          style={{ width: 128 }}
        >
            <View 
              style={{ 
                height: 192, 
                width: 128,
                backgroundColor: '#1a1a1a',
                borderRadius: 8,
                overflow: 'hidden',
                position: 'relative'
              }}
            >
                <Image 
                  source={{uri: poster_url || 'https://via.placeholder.com/128x192'}}
                  className='w-32 h-48 rounded-lg'
                  contentFit='cover'
                  style={{ width: 128, height: 192 }}
                  transition={200}
                />

                <View 
                    className='absolute bottom-9 -left-3.5'
                    style={{ 
                        width: 56, 
                        height: 56,
                        zIndex: 10
                    }}
                >
                    <MaskedView
                        style={{ width: 56, height: 56 }}
                        maskElement={
                            <View style={{ 
                                width: 56, 
                                height: 56, 
                                backgroundColor: 'transparent', 
                                justifyContent: 'center', 
                                alignItems: 'center' 
                            }}>
                                <Text style={{ 
                                    fontSize: 48, 
                                    fontWeight: 'bold', 
                                    color: 'white',
                                    textAlign: 'center'
                                }}>
                                    {index + 1}
                                </Text>
                            </View>

                        }
                    >
                        <Image 
                            source={images.rankingGradient} 
                            style={{ width: 56, height: 56 }}
                            contentFit='cover'
                        />
                    </MaskedView>
                 </View>
            </View>

            <Text className='text-sm font-bold mt-2 text-light-200' numberOfLines={1} style={{ color: '#A8B5DB' }}>
                {title}
            </Text>
        </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard;