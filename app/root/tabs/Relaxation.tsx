import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import TypingEffect from '@/app/TypingEffect';
import { useSpotifyAuth } from '@/app/utils/spotifyAuth';
import axios from 'axios';

const Relaxation = () => {
  const router = useRouter();
  const { token, promptAsync } = useSpotifyAuth();
  const [currentSong, setCurrentSong] = useState<any>(null);
  const [playlists, setPlaylists] = useState<any[]>([]);

  const handlePress = () => {
    router.push('/');
  };

  const fetchPlaylists = async () => {
    if (!token) return;
    const playlistNames = [
      'Binaural Beats',
      '8D ASMR Rain Sounds',
      'Calming Sleep Music - global meditation records',
      'White Noise 10 Hours - By spotify',
      'Sleeping At Last - Instrumentals',
      'PIANO COVERS 2025 relaxing versions of popular songs - Flying Fingers'
    ];
    try {
      const responses = await Promise.all(
        playlistNames.map(name =>
          axios.get('https://api.spotify.com/v1/search', {
            headers: { Authorization: `Bearer ${token}` },
            params: { q: name, type: 'playlist', limit: 1 },
          })
        )
      );

      setPlaylists(responses.map(response => response.data.playlists.items[0]).filter(Boolean));
    } catch (error) {
      console.error('Error fetching playlists:', error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, [token]);

  const playMusic = async () => {
    if (!token) {
      alert('Please log in to Spotify first.');
      return;
    }

    try {
      const devicesResponse = await axios.get(
        'https://api.spotify.com/v1/me/player/devices',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const devices = devicesResponse.data.devices;
      if (!devices || devices.length === 0) {
        alert('No active Spotify devices found. Please open Spotify on one of your devices and try again.');
        return;
      }

      const deviceId = devices[0].id;

      const recommendationsResponse = await axios.get(
        'https://api.spotify.com/v1/recommendations',
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { seed_genres: 'chill', limit: 1 },
        }
      );

      if (!recommendationsResponse.data.tracks || recommendationsResponse.data.tracks.length === 0) {
        alert('No tracks found.');
        return;
      }

      const track = recommendationsResponse.data.tracks[0];
      setCurrentSong(track);

      await axios.put(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        { uris: [track.uri] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error('Error playing music:', error.response?.data || error);
      alert('Error playing music. Make sure Spotify is open on an active device and try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="p-4">
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

        <View className="my-4">
          <TypingEffect text="Relax" speed={100} />
        </View>

        <View>
          <Text className="text-center font-rubik text-gray-500 text-sm mb-4">Please log into Spotify to view recommended playlists</Text>
        </View>

        <TouchableOpacity onPress={() => promptAsync()} className="bg-gray-600 p-3 rounded-md my-2">
          <Text className="text-white text-center font-bold">Login with Spotify</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={playMusic} className="bg-gray-400 p-3 rounded-md my-2">
          <Text className="text-white text-center font-bold">Play Relaxing Music</Text>
        </TouchableOpacity>

        {currentSong && (
          <View className="mt-6">
            <Text className="text-center font-bold">Now Playing:</Text>
            <Text className="text-center">
              {currentSong.name} - {currentSong.artists[0].name}
            </Text>
          </View>
        )}

        {playlists.length > 0 && (
          <View className="mt-6 p-4 bg-gray-100 rounded-xl">
            <Text className="text-lg font-bold text-center font-rubik">Recommended Playlists for Sleep</Text>
            {playlists.map((playlist, index) => (
              <View key={index} className="mb-4">
                <Text className="text-center text-gray-600 font-rubik">{playlist.name}</Text>
                <Image source={{ uri: playlist.images[0].url }} className="w-32 h-32 mx-auto my-2 rounded-xl" />
                <TouchableOpacity
                  onPress={() => router.push(playlist.external_urls.spotify)}
                  className="bg-green-500 p-2 rounded-xl mt-2"
                >
                  <Text className="text-white font-rubik text-center">Open in Spotify</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        <View >
          <Text className="text-center text-gray-500 font-rubik mt-4 text-sm">Disclaimer: Users must have an active Spotify Premium subscription and Spotify must be open in order for users to play relaxing music. </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Relaxation;
