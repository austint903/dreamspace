import React, { useState, useEffect } from 'react';
import { View, Text, Image} from 'react-native';

const LiveTimeInTimeZone = ({ timeZone }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(timer);
  }, []);

  const getCityName = (timeZone) => {
    if (!timeZone) return '';
    const parts = timeZone.split('/');
    if (parts.length < 2) return timeZone; 
    
    return parts.slice(1).join('/').replace(/_/g, ' ');
  };

  const cityName = getCityName(timeZone);

  return (
    <View >
      <Text className="text-center font-rubik mb-2" style={{
          textDecorationLine: 'underline',
          }}> {cityName} </Text>
      <Text className="text-center font-rubik mb-2" >
        {time.toLocaleTimeString('en-US', { timeZone })}
      </Text>
    </View>
  );
};

export default LiveTimeInTimeZone;
