// Explore.js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TypingEffect from '@/app/TypingEffect';
import { Image } from 'react-native';

const Explore = () => {
    const router = useRouter();

    const handlePress = () => {
        router.push("/");
    };
    const handleEmergency = () => {
        router.push("/root/tabs/emergencysleep");
    };
    const handleSleepHabits = () => {
        router.push("/root/tabs/sleephabits");
    };
    const handleSleepScience = () => {
        router.push("/root/tabs/SleepScience");
    };
    const handleRelaxation = () => {
        router.push("/root/tabs/Relaxation");
    };

    return (
        <SafeAreaView className="flex-1 bg-white p-5">
            <View className="flex-row items-center justify-center p-4 relative">
                <View className="absolute left-4">
                    <TouchableOpacity
                        onPress={handlePress}
                        className="flex-row items-center p-2 rounded-md"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={12} color="blue" className="mr-2" />
                        <Text className="text-blue-500 font-rubik text-base">Go Back</Text>
                    </TouchableOpacity>
                </View>

                <Image
                    source={require('../../../assets/images/icon.png')}
                    className="w-24 h-24"
                    resizeMode="contain"
                />
            </View>
            <View className="mb-8">
                <TypingEffect text={"Explore"} speed={100} />
            </View>

            <View className="">
                <TouchableOpacity
                    onPress={handleSleepHabits}
                    className="py-4 border-b border-gray-200"
                >
                    <Text className="text-gray-800 text-center text-base font-rubik">Good Sleep Habits</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleEmergency}
                    className="py-4 border-b border-gray-200"
                >
                    <Text className="text-gray-800 text-center text-base font-rubik">Emergency Sleep Checklist</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleRelaxation}
                    className="py-4 border-b border-gray-200"
                >
                    <Text className="text-gray-800 text-center text-base font-rubik">Relax</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSleepScience}
                    className="py-4 border-b border-gray-200"
                >
                    <Text className="text-gray-800 text-center text-base font-rubik">Sleep Science</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );
};

export default Explore;