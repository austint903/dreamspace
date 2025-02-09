import { Text, View } from "react-native";
import { Link } from 'expo-router';
import TypingEffect from "./TypingEffect"
import { Image } from "react-native";


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        source={require('../assets/images/icon.png')}
        className="w-48 h-48"
        resizeMode="contain"
      />
      <View className="font-bold text-lg mb-9 font-rubik text-3xl">
        <TypingEffect text={"DreamSpace"} speed={100} />
      </View>

      <Link href="/sign-in" className="font-rubik"> Welcome</Link>
      <Link href="/root/tabs/explore" className="font-rubik">Explore</Link>
      <Link href="/root/tabs/DreamJournal" className="font-rubik">Dream Journal</Link>
      <Link href="/root/tabs/travel" className="font-rubik">Travel Tips</Link>


      <Link href="/root/tabs/About" className="font-rubik absolute bottom-5 left-5 text-gray-500 text-base">
        About
      </Link>
    </View>
  );
}
