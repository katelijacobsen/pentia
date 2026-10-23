import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, FlatList, ScrollView, Text, TextInput, View } from "react-native";
import { RootParam } from "../types/Navigation";
import {Textfield} from "../components/Textfield";
import { useSendMessage } from "../hooks/useSendMessage";
import { getAuth } from "@react-native-firebase/auth";
import useMessages from "../hooks/useMessages";
import { MessageBubble } from "../components/MessageBubble";
import { ScreenContainer } from "react-native-screens";

type Props = NativeStackScreenProps<RootParam, 'Chat'>;

export default function Chat({route}: Props){
    const {roomId} = route.params;
    const  {send, error: sendError} = useSendMessage(roomId);
    const userUID = getAuth().currentUser?.uid;
    const { messages, loading, moreLoading, error, loadMore } = useMessages(roomId);

    if(loading) return <ActivityIndicator/>
    if (error) return <Text>{error}</Text>

    return(
        <View style={{flex:1}}>

            <FlatList
                inverted
                data={messages}
                keyExtractor={m => m.id}
                renderItem={({ item }) => (
                    <MessageBubble message={item} myMessage={item.user?.uid === userUID} />
                )}
                onEndReached={loadMore}
                onEndReachedThreshold={0.3}
                ListFooterComponent={moreLoading ? <ActivityIndicator/> : undefined}
                ListEmptyComponent={<Text>No messages yet</Text>}
                />
            {sendError && <Text style={{ color: 'red', padding: 8 }}>{sendError}</Text>}
            <Textfield onSend={send} />
        </View>
    )
}