import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import TypingEffect from './TypingEffect';

const SignIn = () => {
    const router = useRouter();

    const handlePress = () => {
        router.push('/root/tabs/explore');
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <View className="items-center px-4">
                    
                    <Image
                        source={require('../assets/images/icon.png')}
                        className="w-32 h-32 mb-6"
                        resizeMode="contain"
                    />

                    
                    <TypingEffect text="Welcome to DreamSpace" speed={100} />

            
                    <Text className="text-center font-rubik text-gray-600 mt-4">
                        Your personal guide to better sleep and relaxation.
                    </Text>

               
                    <View className="mt-14">
                        <Text className="text-center text-gray-700 font-rubik-bold mb-4">
                            Get Started
                        </Text>
                        <View className="items-center mb-6">
                            <AntDesign name="arrowdown" size={24} color="#4B5563" />
                        </View>

          
                        <TouchableOpacity
                            className="bg-blue-500 rounded-full py-3 px-6 w-64 items-center "
                            onPress={handlePress}
                        >
                            <Text className="text-white font-rubik-bold text-lg">Explore</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;