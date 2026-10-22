import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TextInput, View } from "react-native";
import { RootParam } from "../types/Navigation";
import {Textfield} from "../components/Textfield";

type Props = NativeStackScreenProps<RootParam, 'Chat'>;

export default function Chat({route}: Props){
    const {roomId} = route.params;
    return(
        <View>
            <Text>This is one of the chats</Text>
            <Text>You entered the chatroom {roomId}</Text>
            <Textfield />
        </View>
    )
}