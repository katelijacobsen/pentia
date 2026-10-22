import { ActivityIndicator, Button, FlatList, Pressable, StyleSheet, Text, TextInput, View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../nav/Nav";

import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot } from "@react-native-firebase/firestore";
import { useEffect } from "react";
import { useRooms } from "../hooks/useRooms";
import {CustomButton} from "../components/CustomButton";
import { Chat } from "../screens/Chat"


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
  <View style={{ flex: 1, paddingInline: 32, paddingTop: 50 }}>
    <FlatList
      data={rooms}
      keyExtractor={(room) => room.id}
      renderItem={({ item }) => (
        <CustomButton onPress={() => navigation.navigate('Chat', { roomId: item.id, roomName: item.chatroom})}>
          {item.chatroom}
        </CustomButton>
      )}
      ItemSeparatorComponent={() => (
        <View style={{ height: 12, paddingInline: 24 }} />
      )}
      refreshing={reloading}
      onRefresh={reload}
      ListEmptyComponent={<Text>No chatrooms found</Text>}
    />

    <CustomButton
      onPress={() => navigation.navigate('Profile')}
      variant="outline"
    >
      Profile
    </CustomButton>
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
