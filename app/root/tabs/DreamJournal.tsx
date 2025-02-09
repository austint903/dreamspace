import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TypingEffect from '@/app/TypingEffect';
import { Calendar } from 'react-native-calendars';
import Collapsible from 'react-native-collapsible';
import { Image } from 'react-native';

const DreamJournal = () => {
    const router = useRouter();

    const handlePress = () => {
        router.push('/');
    };

    const handleToUse = () => {
        router.push('/root/tabs/HowToUse');
    };

    const [date, setDate] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [mood, setMood] = useState('Anxious');
    const [sleepQuality, setSleepQuality] = useState('Fair');
    const [entries, setEntries] = useState([]);
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const saveEntry = async () => {
        const entry = {
            date,
            title,
            description,
            mood,
            sleepQuality,
        };

        try {
            const existingEntries = await AsyncStorage.getItem('dreamJournal');
            const journalData = existingEntries ? JSON.parse(existingEntries) : [];
            journalData.push(entry);

            await AsyncStorage.setItem('dreamJournal', JSON.stringify(journalData));
            alert('Entry saved!');

            setDate('');
            setTitle('');
            setDescription('');
            setMood('Happy');
            setSleepQuality('Good');

            loadEntries();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const loadEntries = async () => {
        try {
            const existingEntries = await AsyncStorage.getItem('dreamJournal');
            const journalData = existingEntries ? JSON.parse(existingEntries) : [];
            setEntries(journalData);
        } catch (error) {
            console.error('Error loading:', error);
        }
    };

    useEffect(() => {
        loadEntries();
    }, []);

    const handleDayPress = (day) => {
        console.log('Day pressed:', day.dateString);
        const entryForDay = entries.find((entry) => entry.date === day.dateString);
        console.log('Entry for day:', entryForDay);
        setSelectedEntry(entryForDay || null);
    };

    const markedDates = entries.reduce((acc, entry) => {
        acc[entry.date] = { marked: true, dotColor: 'blue' };
        return acc;
    }, {});

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View className="flex-row items-center justify-between p-4">
                <TouchableOpacity
                    onPress={handlePress}
                    className="flex-row items-center p-2 rounded-md"
                    activeOpacity={0.1}
                >
                    <Ionicons name="arrow-back" size={12} color="blue" className="mr-2" />
                    <Text className="text-blue-500 font-rubik">Go Back</Text>
                </TouchableOpacity>

                <View className="items-center">
                    <Image
                        source={require('../../../assets/images/icon.png')}
                        className="w-24 h-24 "
                        resizeMode="contain"
                    />
                </View>

                <TouchableOpacity onPress={handleToUse}>
                    <Text className="font-rubik text-blue-500">How to Use</Text>
                </TouchableOpacity>
            </View>
            <ScrollView className="p-5">
                <View className="mb-4">
                    <TypingEffect text={"Dream Journal"} speed={100} />
                </View>

                <Text className="text-xl font-rubik mt-5 mb-3 text-center">Calendar</Text>
                <View className="border border-gray-400 rounded-2xl overflow-hidden bg-[#F5F5F5]">
                    <Calendar
                        onDayPress={handleDayPress}
                        markedDates={markedDates}
                        theme={{
                            backgroundColor: '#F5F5F5',
                            calendarBackground: '#F5F5F5',
                            textSectionTitleColor: '#6E6E6E',
                            selectedDayBackgroundColor: '#4a90e2',
                            selectedDayTextColor: '#ffffff',
                            todayTextColor: '#4a90e2',
                            dayTextColor: '#3C3C3C',
                            textDisabledColor: '#D9D9D9',
                            dotColor: '#4a90e2',
                            arrowColor: '#6E6E6E',
                            monthTextColor: '#6E6E6E',
                            indicatorColor: '#6E6E6E',
                            textDayFontFamily: 'Rubik-Regular',
                            textMonthFontFamily: 'Rubik',
                            textDayHeaderFontFamily: 'Rubik-Medium',
                            textDayFontSize: 14,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 14,
                        }}
                    />
                </View>

                {selectedEntry && (
                    <View className="border border-gray-300 rounded-lg p-3 mt-3 font-rubik">
                        <Text className="text-sm mb-1 font-rubik">Date: {selectedEntry.date}</Text>
                        <Text className="text-sm mb-1 font-rubik">Title: {selectedEntry.title}</Text>
                        <Text className="text-sm mb-1 font-rubik">Description: {selectedEntry.description}</Text>
                        <Text className="text-sm mb-1 font-rubik">Mood: {selectedEntry.mood}</Text>
                        <Text className="text-sm mb-1 font-rubik">Sleep Quality: {selectedEntry.sleepQuality}</Text>
                    </View>
                )}

                <Text className="text-base mb-1 text-center">Date</Text>
                <Text className="text-center text-xs font-rubik text-gray-500">Dates must be written in the format yy/mm/dd (e.g. 2025-01-18)</Text>
                <TextInput
                    className="border border-gray-300 rounded p-2 mb-4"
                    placeholder="Enter date (e.g., 2025-10-15)"
                    value={date}
                    onChangeText={setDate}
                />

                <Text className="text-base mb-1 text-center">Dream Title</Text>
                <TextInput
                    className="border border-gray-300 rounded p-2 mb-4"
                    placeholder="Enter dream title"
                    value={title}
                    onChangeText={setTitle}
                />

                <Text className="text-base mb-1 text-center">Dream Description</Text>
                <TextInput
                    className="border border-gray-300 rounded p-2 mb-4 h-24"
                    placeholder="Describe your dream"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

                <View className="flex-row justify-between">
                    <View className="flex-1 mr-2">
                        <Text className="text-base mb-1 text-center">Mood</Text>
                        <Picker
                            selectedValue={mood}
                            style={{ fontSize: 14 }}
                            itemStyle={{ fontSize: 12 }}
                            className="border border-gray-300 rounded"
                            onValueChange={(itemValue) => setMood(itemValue)}
                        >
                            <Picker.Item label="Happy" value="Happy" />
                            <Picker.Item label="Sad" value="Sad" />
                            <Picker.Item label="Anxious" value="Anxious" />
                            <Picker.Item label="Excited" value="Excited" />
                            <Picker.Item label="Calm" value="Calm" />
                        </Picker>
                    </View>

                    <View className="flex-1 ml-2">
                        <Text className="text-base mb-1 text-center">Sleep Quality</Text>
                        <Picker
                            selectedValue={sleepQuality}
                            style={{ fontSize: 14 }}
                            itemStyle={{ fontSize: 12 }}
                            className="border border-gray-300 rounded"
                            onValueChange={(itemValue) => setSleepQuality(itemValue)}
                        >
                            <Picker.Item label="Poor" value="Poor" />
                            <Picker.Item label="Fair" value="Fair" />
                            <Picker.Item label="Good" value="Good" />
                            <Picker.Item label="Excellent" value="Excellent" />
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity onPress={saveEntry} activeOpacity={0.7}>
                    <Text className="text-blue-500 font-rubik text-center">Save Entry</Text>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity
                        onPress={() => setIsCollapsed(!isCollapsed)}
                        className="flex-row items-center justify-center p-1.5  bg-gray-100 bg-gray-200 mt-2 mb-5 rounded-lg"
                    >
                        <Text className="font-rubik text-center">All Journal Entries</Text>
                        <Ionicons
                            name={isCollapsed ? 'chevron-down' : 'chevron-up'}
                            size={20}
                            color="gray"
                            className="ml-2"
                        />
                    </TouchableOpacity>

                    <Collapsible collapsed={isCollapsed}>
                        {entries.map((entry, index) => (
                            <View key={index} className="border border-gray-300 rounded-lg rounded p-3 mb-3 font-rubik">
                                <Text className="text-sm mb-1 font-rubik">Date: {entry.date}</Text>
                                <Text className="text-sm mb-1 font-rubik">Title: {entry.title}</Text>
                                <Text className="text-sm mb-1 font-rubik">Description: {entry.description}</Text>
                                <Text className="text-sm mb-1 font-rubik">Mood: {entry.mood}</Text>
                                <Text className="text-sm mb-1 font-rubik">Sleep Quality: {entry.sleepQuality}</Text>
                            </View>
                        ))}
                    </Collapsible>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DreamJournal;