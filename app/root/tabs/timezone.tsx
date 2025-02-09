import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image } from 'react-native'
import LiveTimeInTimeZone from './timezones1';
import TypingEffect from '@/app/TypingEffect';


const timezone = () => {
    const router = useRouter();

    const handlePress = () => {
        router.push('/root/tabs/travel');
    };

    return (
        <SafeAreaView>
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

            <TypingEffect text={"Timezones"} speed={100} />
            <ScrollView >
                <Text className="text-center font-rubik-semibold text-xl py-3 mt-2">North America</Text>

                <LiveTimeInTimeZone timeZone="America/New_York" />
                <LiveTimeInTimeZone timeZone="America/Chicago" />
                <LiveTimeInTimeZone timeZone="America/Los_Angeles" />

                <Text className="text-center font-rubik-semibold text-xl py-3">Asia</Text>

                <LiveTimeInTimeZone timeZone="Asia/Tokyo" />
                <LiveTimeInTimeZone timeZone="Asia/Shanghai" />
                <LiveTimeInTimeZone timeZone="Asia/Hong_Kong" />
                <LiveTimeInTimeZone timeZone="Asia/Seoul" />


                <Text className="text-center font-rubik-semibold text-xl py-3">Australia</Text>

                <LiveTimeInTimeZone timeZone="Australia/Sydney" />
                <LiveTimeInTimeZone timeZone="Australia/Perth" />

                <Text className="text-center font-rubik-semibold text-xl py-3">Africa</Text>

                <LiveTimeInTimeZone timeZone="Africa/Cairo" />
                <LiveTimeInTimeZone timeZone="Africa/Johannesburg" />

                <Text className="text-center font-rubik-semibold text-xl py-3">Europe</Text>

                <LiveTimeInTimeZone timeZone="Europe/London" />
                <LiveTimeInTimeZone timeZone="Europe/Paris" />
                <LiveTimeInTimeZone timeZone="Europe/Berlin" />
                <LiveTimeInTimeZone timeZone="Europe/Moscow" />

            </ScrollView>
        </SafeAreaView>
    )
}

export default timezone