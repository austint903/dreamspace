import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';

const TypingEffect = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayedText('');
    indexRef.current = 0;

    if (indexRef.current < text.length) {
      const interval = setInterval(() => {
        setDisplayedText((prev) => {
          const nextChar = text.charAt(indexRef.current);
          indexRef.current += 1;
          return prev + nextChar;
        });

        if (indexRef.current >= text.length) {
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }
  }, [text, speed]);

  return (
    <View>
      <Text className="text-center text-2xl font-rubik">{displayedText}</Text>
    </View>
  );
};

export default TypingEffect;