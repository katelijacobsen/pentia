import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text, TextInput, View } from "react-native";
import { RootParam } from "../types/Navigation";
import {Textfield} from "../components/Textfield";
import { useSendMessage } from "../hooks/useSendMessage";
import { getAuth } from "@react-native-firebase/auth";

type Props = NativeStackScreenProps<RootParam, 'Chat'>;

export default function Chat({route}: Props){
    const {roomId} = route.params;
    const  {send, error: sendError} = useSendMessage(roomId);
    const userUID = getAuth().currentUser?.uid;
    return(
        <View>
            <Text>This is one of the chats</Text>
            <Text>You entered the chatroom {roomId}</Text>
            <Textfield onSend={send}/>
        </View>
    )
}