import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, View, } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../nav/Nav";

import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot } from "@react-native-firebase/firestore";

const db = getFirestore();
const userCollection = collection(db, 'Users');

const users = await getDocs(collection(db, 'Users'));
const user = await getDoc(doc(collection(db, 'Users'), 'ABC'));

function onResult(QuerySnapshot){
    console.log('Get Users Collection Result', QuerySnapshot);
}

function onError(error){
    console.error(error);
}

onSnapshot(collection(db, 'Users'), onResult, onError);

export default function Chatrooms() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View>
            <FlatList data={"something"}>
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
