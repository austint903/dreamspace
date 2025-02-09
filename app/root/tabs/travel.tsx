import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TypingEffect from '@/app/TypingEffect';
import { Image } from 'react-native';

const BulletList = ({ items }) => {
    return (
        <View className="space-y-3 pl-6 pr-6"> 
            {items.map((item, index) => (
                <View key={index} className="flex-row items-center">
                    <Ionicons name="checkmark-circle" size={16} color="#D3D3D3" className="mr-2" />
                    <Text className="font-rubik text-gray-500">{item}</Text>
                </View>
            ))}
        </View>
    );
};

const Travel = () => {
    const router = useRouter();
    const [currentTimeZone, setCurrentTimeZone] = useState("");
    const [destinationTimeZone, setDestinationTimeZone] = useState("");
    const [timeDifference, setTimeDifference] = useState(null);

    const handlePress = () => {
        router.push('/');
    };

    const handleTimeZone = () => {
        router.push('/root/tabs/timezone');
    };

    const calculateTimeDifference = () => {
        if (currentTimeZone && destinationTimeZone) {
            const difference = parseInt(destinationTimeZone) - parseInt(currentTimeZone);
            setTimeDifference(difference);
        }
    };

    const sleepTips = [
        "Adjust your sleep schedule a few days before traveling.",
        "Stay hydrated during your flight.",
        "Avoid caffeine and alcohol before sleep.",
        "Use an eye mask and earplugs to block out light and noise.",
        "Try to get some sunlight during the day at your destination.",
    ];

    const relaxationTechniques = [
        "Deep Breathing: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds.",
        "Progressive Muscle Relaxation: Tense and relax each muscle group from head to toe.",
    ];

    const travelSleepKit = [
        "Travel Pillow",
        "Eye Mask",
        "Earplugs or Noise-Canceling Headphones",
        "Aromatherapy Oils (e.g., Lavender)",
    ];

    return (
        <SafeAreaView className="flex-1 bg-white px-6 py-8">
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

            <ScrollView className="flex-1">
                <TypingEffect text="Travel" speed={100} />
                <Text className="text-center mt-3 text-sm text-gray-400">
                    Unlock Restful Sleep Anywhere
                </Text>

                <View className="mt-8">
                    <Text className="text-center font-rubik-bold text-lg">Sleep Tips for Travelers</Text>
                    <BulletList items={sleepTips} />
                </View>

                <View className="mt-8">
                    <Text className="text-center font-rubik-bold text-lg">Relaxation Techniques</Text>
                    <BulletList items={relaxationTechniques} />
                </View>

                <View className="mt-8 mb-8">
                    <Text className="text-center font-rubik-bold text-lg">Travel Sleep Kit</Text>
                    <BulletList items={travelSleepKit} />
                </View>

                <View className="flex-row justify-center mt-8">
                    <TouchableOpacity
                        onPress={handleTimeZone}
                        className="bg-gray-400 rounded-full py-3 px-8 shadow-sm shadow-zinc-300 flex-row items-center"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="time-outline" size={20} color="white" className="mr-3" />
                        <Text className="text-white text-center font-rubik text-base">Check Time Zones</Text>
                    </TouchableOpacity>
                </View>

                <View className="mt-4 p-4">
                    <Text className="text-center font-rubik-bold text-lg">Jet Lag Calculator</Text>
                    <Text className="text-center font-rubik text-gray-500 mt-2">
                        Enter your current and destination time zones to calculate the time difference.
                    </Text>

                    <View className="mt-4">
                        <TextInput
                            className="border border-gray-300 rounded-lg font-rubik p-3 mb-4"
                            placeholder="Current Time Zone (e.g., -5)"
                            keyboardType="numeric"
                            value={currentTimeZone}
                            onChangeText={setCurrentTimeZone}
                        />
                        <TextInput
                            className="border border-gray-300 rounded font-rubik p-3 mb-4"
                            placeholder="Destination Time Zone (e.g., +3)"
                            keyboardType="numeric"
                            value={destinationTimeZone}
                            onChangeText={setDestinationTimeZone}
                        />
                        <TouchableOpacity
                            onPress={calculateTimeDifference}
                            className="bg-gray-600 p-3 rounded-lg"
                        >
                            <Text className="text-white text-center font-rubik-bold">Calculate</Text>
                        </TouchableOpacity>

                        {timeDifference !== null && (
                            <Text className="text-center font-rubik mt-4">
                                Time Difference: {timeDifference} hours
                            </Text>
                        )}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Travel;