import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TypingEffect from '@/app/TypingEffect'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const HowToUse = () => {
    const router = useRouter()

    const handlePress = () => {
        router.push("/root/tabs/DreamJournal")
    }
    return (
        <SafeAreaView>
            <View className="flex-row items-center">
                <TouchableOpacity
                    onPress={handlePress}
                    className="flex-row items-center p-2 rounded-md "
                    activeOpacity={0.1}
                >

                    <Ionicons name="arrow-back" size={12} color="blue" className="mr-2" />
                    <Text className="text-blue-500 font-semibold">Go Back</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TypingEffect text={"How to Use"} speed={100} />
            </View>

            <View className="flex flex-col justify-between p-5 min-h-screen">
                <View className="p-3">
                    <Text className="text-center font-rubik pb-4 leading-relaxed">Welcome to your personal Dream Journal! </Text>
                    <Text className="text-center font-rubik pb-4 leading-relaxed">Understand patterns in your sleep, take control of your emotions, and connect with your subconscious mind. </Text>
                    <Text className="text-center font-rubik pb-4 leading-relaxed">Reduce stress, anxiety, and depression while boosting creativity and brain function </Text>
                    <Text className="text-center font-rubik pb-4 leading-relaxed">Simply jot down your dreams every morning - even a few details can reveal a lot!</Text>
                </View>
                <Text className="text-center font-rubik text-sm text-gray-500 absolute bottom-5 left-0 right-0">Dates must be written in the format mm/dd/yy (e.g. 2025-01-18)</Text>
            </View>
        </SafeAreaView>
    )
}

export default HowToUse