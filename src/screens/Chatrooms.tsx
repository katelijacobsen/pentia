import { ActivityIndicator, Button, FlatList, Pressable, StyleSheet, Text, TextInput, View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../nav/Nav";

import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot } from "@react-native-firebase/firestore";
import { useEffect } from "react";
import { useRooms } from "../hooks/useRooms";


export default function Chatrooms() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { rooms, loading, reloading, error, reload } = useRooms();
    
    useEffect(() => {
        const rmvListener = onSnapshot(
            collection(getFirestore(), 'Users'),
            snapshot => console.log('Users', snapshot.size),
            error => console.error(error),
        );
        return rmvListener;
    }, []);
    

    
    if(error)
        return <Text>{error}</Text>;
    if(loading)
        return <ActivityIndicator/>;

    return (
        <View>
            <FlatList data={rooms} keyExtractor={room => room.id} renderItem={({ item }) =>(
                <Pressable>
                    <Text>{item.chatroom}</Text>
                </Pressable>
            )}
            refreshing={reloading}
            onRefresh={reload}
            ListEmptyComponent={<Text>No chatrooms found</Text>}
            >
            <Text>Name</Text>
            <Text>Description</Text>
            </FlatList>
            <TextInput placeholder="Message" returnKeyType="send"/>
            <Pressable style={styles.button}>
                <Text>Send</Text>
            </Pressable>
            <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
        </View>
    );
}

const styles = StyleSheet.create({
    button: { backgroundColor: "#42a5f5",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",},
})
