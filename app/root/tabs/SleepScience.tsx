import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ScrollView, Linking, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TypingEffect from '@/app/TypingEffect';

const SleepScience = () => {
    const router = useRouter();
    const [expandedSections, setExpandedSections] = useState({
        faq: false,
        research: false,
        resources: false
    });

    const handlePress = () => {
        router.push('/');
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const StudyLink = ({ title, authors, journal, url, year }) => (
        <TouchableOpacity
            onPress={() => openLink(url)}
            className="mb-4 p-3 bg-gray-50 rounded-lg"
        >
            <Text className="text-blue-500 font-rubik-bold mb-1">{title}</Text>
            <Text className="text-sm font-rubik text-gray-600">{authors}</Text>
            <Text className="text-sm font-rubik text-gray-500">{journal} • {year}</Text>
        </TouchableOpacity>
    );

    const openLink = (url) => {
        Linking.openURL(url).catch((err) => console.error('Failed to open link:', err));
    };

    const Section = ({ title, children }) => (
        <View className="mb-8">
            <Text className="text-lg font-rubik-bold mb-4 text-gray-800">{title}</Text>
            <View className="space-y-2">{children}</View>
        </View>
    );

    const DropdownSection = ({ title, children, isExpanded, onToggle }) => (
        <View className="mb-8">
            <TouchableOpacity
                onPress={onToggle}
                className="flex-row items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
                <Text className="text-lg font-rubik-bold text-gray-800">{title}</Text>
                <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#4B5563"
                />
            </TouchableOpacity>
            {isExpanded && (
                <View className="mt-4 space-y-2">
                    {children}
                </View>
            )}
        </View>
    );

    const ListItem = ({ children }) => (
        <View className="flex-row items-start mb-2">
            <Text className="text-gray-600 mr-2">•</Text>
            <Text className="text-base font-rubik text-gray-600 flex-1">{children}</Text>
        </View>
    );

    const Link = ({ url, children }) => (
        <TouchableOpacity
            onPress={() => openLink(url)}
            className="mb-3"
        >
            <Text className="text-blue-500 font-rubik hover:text-blue-600">{children}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
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
            <ScrollView className="px-6 ">


                <View className="mb-8">
                    <TypingEffect text="Sleep Science" speed={100} />
                </View>

                <Section title="What is Sleep Science?">

                    <Text className="text-base font-rubik text-gray-600 leading-relaxed">

                        Sleep science is the study of sleep patterns, sleep disorders, and the impact of sleep on physical and mental health.

                        It explores how sleep affects brain function, mood, productivity, and overall well-being.

                    </Text>

                </Section>

                <Section title="Benefits of Good Sleep">
                    <ListItem>Improves memory and cognitive function</ListItem>
                    <ListItem>Boosts immune system</ListItem>
                    <ListItem>Enhances mood and reduces stress</ListItem>
                    <ListItem>Supports heart health</ListItem>
                    <ListItem>Increases energy levels and productivity</ListItem>
                </Section>

                <Section title="Tips to Improve Sleep Quality">
                    <ListItem>Stick to a consistent sleep schedule</ListItem>
                    <ListItem>Create a relaxing bedtime routine</ListItem>
                    <ListItem>Limit screen time before sleep</ListItem>
                    <ListItem>Make your sleep environment comfortable and dark</ListItem>
                    <ListItem>Exercise regularly, but not close to bedtime</ListItem>
                    <ListItem>Practice meditation or deep breathing exercises</ListItem>
                </Section>

                <View>
                    <Section title="Scientific Studies" >
                        <Text className="text-base font-rubik text-gray-600 mb-4 leading-relaxed">
                            Research has shown that sleep plays a critical role in brain function, emotional regulation, and physical health.
                            Key findings include:
                        </Text>

                        <View className="mb-6">
                            <ListItem>Sleep helps consolidate memories and improve learning</ListItem>
                            <ListItem>Chronic sleep deprivation is linked to various health issues</ListItem>
                            <ListItem>Poor sleep can negatively impact mental health</ListItem>
                            <ListItem>Short naps can improve alertness and performance</ListItem>
                        </View>


                        <DropdownSection
                            title="Recent Research Papers"
                            isExpanded={expandedSections.research}
                            onToggle={() => toggleSection('research')}


                        >
                            <StudyLink
                                title="Sleep Loss and Emotion: A Systematic Review and Meta-Analysis"
                                authors="Palmer, C. A., et al."
                                journal="Psychological Bulletin"
                                year="2023"
                                url="https://www.apa.org/pubs/journals/releases/bul-bul0000410.pdf"
                            />

                            <StudyLink
                                title="Sleep is essential to health: an American Academy of Sleep Medicine position statement"
                                authors="Ramar, K., et al."
                                journal="Journal of Clinical Sleep Medicine"
                                year="2021"
                                url="https://jcsm.aasm.org/doi/10.5664/jcsm.9476"
                            />

                            <StudyLink
                                title="The Extraordinary Importance of Sleep"
                                authors="Worley, S. L."
                                journal="Pharmacy and Therapeutics"
                                year="2018"
                                url="https://pmc.ncbi.nlm.nih.gov/articles/PMC6281147/"
                            />

                            <StudyLink
                                title="The Effects of Sleep Deprivation on College Students"
                                authors="Guadiana, N., & Okashima, T. L. "
                                journal="Dominican Scholar Nursing"
                                year="2021"
                                url="https://scholar.dominican.edu/nursing-senior-theses/1029/"
                            />

                            <StudyLink
                                title="Sleep timing, sleep consistency, and health in adults"
                                authors="Chaput, J. P., et al."
                                journal="Applied Physiology, Nutrition, and Metabolism"
                                year="2020"
                                url="https://cdnsciencepub.com/doi/full/10.1139/apnm-2020-0032"
                            />
                        </DropdownSection>
                    </Section>
                </View>

                <DropdownSection
                    title="Frequently Asked Questions"
                    isExpanded={expandedSections.faq}
                    onToggle={() => toggleSection('faq')}
                >
                    <View className="space-y-4">
                        <View>
                            <Text className="text-base font-rubik-bold text-gray-800 mb-2">How much sleep do I need?</Text>
                            <Text className="text-base font-rubik text-gray-600">Most adults need 7-9 hours of sleep per night, but it may vary.</Text>
                        </View>
                        <View>
                            <Text className="text-base font-rubik-bold text-gray-800 mb-2">What is REM sleep?</Text>
                            <Text className="text-base font-rubik text-gray-600">REM sleep is a stage where most dreaming occurs, essential for cognitive functions.</Text>
                        </View>
                        <View>
                            <Text className="text-base font-rubik-bold text-gray-800 mb-2">How does nutrition affect sleep?</Text>
                            <Text className="text-base font-rubik text-gray-600">Diet plays a significant role in sleep. A balanced diet and avoiding heavy meals along with caffeine and alcohol before bed can promote better sleep quality.</Text>
                        </View>
                        <View>
                            <Text className="text-base font-rubik-bold text-gray-800 mb-2">What is snoring?</Text>
                            <Text className="text-base font-rubik text-gray-600">Snoring is the vibration of respiratory structures and the resulting sound due to obstructed air movement during breathing while sleeping.</Text>
                        </View>
                        <View>
                            <Text className="text-base font-rubik-bold text-gray-800 mb-2">How to prevent snoring?</Text>
                            <Text className="text-base font-rubik text-gray-600">To prevent snoring, try sleeping on your side, maintaining a healthy weight, and avoiding alcohol before bed, as these actions can improve airflow and reduce throat tissue vibrations. If snoring persists, consult a doctor for further evaluation.</Text>
                        </View>
                    </View>
                </DropdownSection>

                <DropdownSection
                    title="Expert Resources"
                    isExpanded={expandedSections.resources}
                    onToggle={() => toggleSection('resources')}
                >
                    <Link url="https://www.youtube.com/watch?v=f1FOzJ9NWnE">
                        Institute of Human Anatomy: Why Sleep Is Important
                    </Link>
                    <Link url="https://www.youtube.com/watch?v=1U2qMRGihGg">
                        TED Talk: The Importance of Deep Sleep
                    </Link>
                    <Link url="https://www.sleepfoundation.org">
                        Sleep Foundation
                    </Link>
                </DropdownSection>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SleepScience;