import { Text, View } from "react-native";
import { Message } from "../types/Message";

type Props = { message: Message; myMessage: boolean};

export function MessageBubble({message, myMessage}: Props){
    return ( 
        <View>
            <Text>{message.text}</Text>
            <Text>{message.createdAt.toLocaleDateString([], {hour: '2-digit', minute: '2-digit'})}</Text>
        </View>
    )
}