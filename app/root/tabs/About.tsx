import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import TypingEffect from '@/app/TypingEffect'
import { Image } from 'react-native'


const About = () => {
    const router = useRouter()

    const handlePress = () => {
        router.push("/")
    }
    return (
        <SafeAreaView>
            <View className="flex-row items-center p-4">
                <TouchableOpacity
                    onPress={handlePress}
                    className="flex-row items-center p-2 rounded-md"
                    activeOpacity={0.1}
                >
                    <Ionicons name="arrow-back" size={12} color="blue" className="mr-2" />
                    <Text className="text-blue-500 font-rubik">Go Back</Text>
                </TouchableOpacity>
            </View>
            <View className="items-center">
                <Image
                    source={require('../../../assets/images/icon.png')}
                    className="w-32 h-32 "
                    resizeMode="contain"
                />
            </View>
            <TypingEffect text={"About Us"} speed={100} />

            <View className="flex justify-center items-center p-7">
                <View className="p-3">
                    <Text className="text-center font-rubik pb-4 leading-relaxed">DreamSpace was built from of a college dorm room, born out of the founder's personal struggles with loud roommates, anxiety, and sleepless nights.  </Text>
                    <Text className="text-center text-gray-500 pb-4">.......zzzzzzzzzzzz.......</Text>
                    <Text className="text-center font-rubik pb-4 leading-relaxed">Determined to create a solution that was both effective and accessible to the public, the founder combined their passion for technology and desire for sleep to develop an app to help users easily unwind into the night and achieve restful nights of sleep.    </Text>
                    <Text className="text-center text-gray-500 pb-4">.......zzzzzzzzzzzz.......</Text>
                    <Text className="text-center font-rubik pb-4">DreamSpace offers a dream journal to document your sleep, a travel section ensuring you get your well-deserved sleep even during travel, and a variety of other helpful resources!</Text>
                    <Text className="text-center font-rubik text-gray-500 text-sm">DreamSpace is committed to making sleep a number one priority</Text>
                    <Text className="text-center font-rubik text-gray-500 text-sm">For any questions or inquiries please contact ... </Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default About