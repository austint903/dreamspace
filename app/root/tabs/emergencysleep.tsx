import React, { useState } from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import TypingEffect from '@/app/TypingEffect';
import { Image } from 'react-native';

const Checklist = ({ items, checkedItems, onToggle }) => {
  return (
    <View className="px-4">
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onToggle(index)}
          className="flex-row items-center space-x-2 py-2"
        >
          <View
            className={`w-4 h-4 border-2 border-gray-500 rounded-md ${checkedItems[index] ? 'bg-blue-500 border-blue-500' : 'bg-transparent'
              }`}
          >
            {checkedItems[index] && (
              <Ionicons name="checkmark" size={10} color="white" className="ml-0.1 mt-0.3" />
            )}
          </View>
          <Text className="font-rubik text-gray-700 ml-3">{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const ProgressIndicator = ({ progress, total }) => {
  return (
    <View className="px-4 mt-4">
      <Text className="text-gray-600 font-rubik">
        Progress: {progress} of {total} completed
      </Text>
      <View className="w-full h-2 bg-gray-200 rounded-full mt-2">
        <View
          className="h-2 bg-blue-500 rounded-full"
          style={{ width: `${(progress / total) * 100}%` }}
        />
      </View>
    </View>
  );
};

const EmergencySleep = () => {
  const router = useRouter();
  const items = [
    'Use earplugs to block noise',
    'Wear an eye mask to block light',
    'Take melatonin (if recommended)',
    'Set a consistent bedtime',
    'Think about something that brings you joy',
    'Practice deep breathing for 5 minutes',
  ];
  const [checkedItems, setCheckedItems] = useState(Array(items.length).fill(false));

  const handleExplore = () => {
    router.push('/root/tabs/explore');
  };

  const handleRelax = () => {
    router.push('/root/tabs/Relaxation');
  };

  const handleToggleCheckbox = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
  };

  const progress = checkedItems.filter((item) => item).length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center justify-center p-4 relative">
        <View className="absolute left-4">
          <TouchableOpacity
            onPress={handleExplore}
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

      <View className="px-4">
        <TypingEffect text="Emergency Sleep" speed={100} />
      </View>
      <View>
        <Text className="font-rubik text-sm text-gray-500 text-center px-4 mt-4 mb-5">
          Having trouble falling asleep? Whether it's stress, travel, or just one of those nights, use our carefully and thoughtfully crafted "emergency" sleep checklist that will get you dreaming in no time! Try it now, and prepare for a restful night!
        </Text>
      </View>
      <View>
        <Text className="text-center font-rubik underline">Checklist</Text>
      </View>

      <Checklist items={items} checkedItems={checkedItems} onToggle={handleToggleCheckbox} />

      <ProgressIndicator progress={progress} total={items.length} />

      <View className="p-4 mt-4">
        <Text className="text-gray-600 font-rubik">
          Tip: Try deep breathing exercises if you're still having trouble sleeping, or check out ways to{' '}
          <Text onPress={handleRelax} className="underline">relax.</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default EmergencySleep;