import { Text, View, StyleSheet, Image } from "react-native";
import { Message } from "../types/Message";

type Props = { message: Message; myMessage: boolean};

export function MessageBubble({message, myMessage}: Props){
    return (
        <View style={[styles.bubble, myMessage ? styles.mine : styles.theirs]}>
            
            {message.user.avatarUrl && ( <Image source={{ uri: message.user.avatarUrl}}/>)}
            {!myMessage && <Text style={styles.name}>{message.user?.name}</Text>}
            <Text style={myMessage ? styles.mineText : undefined}>{message.text}</Text>
            <Text style={[styles.time, myMessage && styles.mineText]}>
                {message.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bubble: { maxWidth: '80%', padding: 10, borderRadius: 12, marginVertical: 4, marginHorizontal: 12 },
    mine: { alignSelf: 'flex-end', backgroundColor: '#171717' },    // right side
    theirs: { alignSelf: 'flex-start', backgroundColor: '#f5f5f5' }, // left side
    mineText: { color: '#fafafa' },
    name: { fontSize: 12, fontWeight: '600', marginBottom: 2 },
    time: { fontSize: 10, opacity: 0.6, marginTop: 4, alignSelf: 'flex-end' },
});