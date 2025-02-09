import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, TextInput, Button, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TypingEffect from '@/app/TypingEffect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Collapsible from 'react-native-collapsible';
import { Image } from 'react-native';

const Sleephabits = () => {
    const router = useRouter();
    const [habit, setHabit] = useState('');
    const [habitsList, setHabitsList] = useState([]);
    const [isFormCollapsed, setIsFormCollapsed] = useState(true);
    const [isListCollapsed, setIsListCollapsed] = useState(true);

    // Static list of recommended sleep habits
    const recommendedHabits = [
        { id: '1', text: 'Go to bed and wake up at the same time every day.' },
        { id: '2', text: 'Avoid caffeine and nicotine close to bedtime.' },
        { id: '3', text: 'Exercise regularly, but not too close to bedtime.' },
        { id: '4', text: 'Avoid heavy meals and alcohol before sleep.' },
        { id: '5', text: 'Create a relaxing bedtime routine.' },
        { id: '6', text: 'Make your sleeping environment comfortable and quiet.' },
        { id: '7', text: 'Limit screen time before bed.' },
        { id: '8', text: 'Manage stress and anxiety through relaxation techniques.' },
    ];

    useEffect(() => {
        loadHabits();
    }, []);

    const handlePress = () => {
        router.push('/root/tabs/explore');
    };

    const handleAddHabit = async () => {
        if (habit.trim()) {
            const newHabit = { id: Date.now().toString(), text: habit };
            const updatedHabits = [...habitsList, newHabit];
            setHabitsList(updatedHabits);
            await AsyncStorage.setItem('sleepHabits', JSON.stringify(updatedHabits));
            setHabit('');
        }
    };

    const loadHabits = async () => {
        const savedHabits = await AsyncStorage.getItem('sleepHabits');
        if (savedHabits) {
            setHabitsList(JSON.parse(savedHabits));
        }
    };

    const handleDeleteHabit = async (id) => {
        Alert.alert(
            'Delete Habit',
            'Are you sure you want to delete this habit?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const updatedHabits = habitsList.filter((item) => item.id !== id); //filters with id
                        setHabitsList(updatedHabits);
                        await AsyncStorage.setItem('sleepHabits', JSON.stringify(updatedHabits));
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const renderHabitItem = ({ item }) => (
        <View className="flex-row items-center justify-between p-3 border-b border-gray-300">
            <Text className="font-rubik">{item.text}</Text>
            <TouchableOpacity onPress={() => handleDeleteHabit(item.id)}>
                <Ionicons name="trash" size={20} color="red" />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 p-4 bg-white">
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
            <View className="">
                <TypingEffect text={"Sleeping Habits"} speed={100} />
            </View>
            <View>
                <Text className="text-gray-500 text-center font-rubik mt-2">Practicing good sleep habits is the best way to ensure high-quality rest, enhancing your bodily functions, and most importantly, waking up and feeling ...  amazing! </Text>
                <Text className="text-center font-rubik-semibold mt-6">Recommended Habits</Text>


                <FlatList
                    data={recommendedHabits}
                    renderItem={({ item }) => (
                        <View className="flex-row items-center justify-between p-3 border-b border-gray-300">
                            <Text className="font-rubik">{item.text}</Text>
                        </View>
                    )}
                    keyExtractor={(item) => item.id}
                    className="mt-4"
                />
            </View>
            <Text className="text-center font-rubik mt-8 text-gray-500">Can't find your preferable sleep habit? Add your own!</Text>
            <View className="mt-6">
                <TouchableOpacity
                    onPress={() => setIsFormCollapsed(!isFormCollapsed)}
                    className="flex-row items-center justify-between p-3 bg-gray-100 rounded-lg"
                >
                    <Text className=" font-rubik">
                        {isFormCollapsed ? 'Add a New Habit' : 'Hide Form'} {/* remeber for future, collapse and uncollpase text */}
                    </Text>
                    <Ionicons
                        name={isFormCollapsed ? 'chevron-down' : 'chevron-up'}
                        size={16}
                        color="gray"
                    />
                </TouchableOpacity>

                <Collapsible collapsed={isFormCollapsed}>
                    <View className="mt-4">
                        <TextInput
                            className="border border-gray-300 rounded-lg font-rubik p-3 mb-4"
                            placeholder="Enter a sleep habit"
                            value={habit}
                            onChangeText={setHabit}
                        />

                        <TouchableOpacity onPress={handleAddHabit} >
                            <Text className="text-center font-rubik text-blue-500">Add Habit</Text>
                        </TouchableOpacity>

                    </View>
                </Collapsible>
            </View>

            <View className="mt-6">
                <TouchableOpacity
                    onPress={() => setIsListCollapsed(!isListCollapsed)}
                    className="flex-row items-center justify-between p-3 bg-gray-100 rounded-lg"
                >
                    <Text className="font-rubik">
                        {isListCollapsed ? 'View Your Habits' : 'Hide Habits'}
                    </Text>
                    <Ionicons
                        name={isListCollapsed ? 'chevron-down' : 'chevron-up'}
                        size={16}
                        color="gray"
                    />
                </TouchableOpacity>
                <Collapsible collapsed={isListCollapsed}>
                    <FlatList
                        data={habitsList}
                        renderItem={renderHabitItem}
                        keyExtractor={(item) => item.id}
                        className="mt-4"
                    />
                </Collapsible>
            </View>
        </SafeAreaView>
    );
};

export default Sleephabits;