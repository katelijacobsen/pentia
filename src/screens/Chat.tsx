import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../nav/Nav";

export default function Chat() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View>
            <Text>Chat</Text>
            <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
        </View>
    );
}