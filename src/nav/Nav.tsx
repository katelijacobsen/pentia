import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged  } from '@react-native-firebase/auth';
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Chatrooms from "../screens/Chatrooms";
import Profile from "../screens/Profile";
import Login from "../screens/Login";
import type { User } from "@react-native-firebase/auth";
import type { RootParam } from "../types/Navigation"
import Chat from "../screens/Chat";

const Stack = createNativeStackNavigator<RootParam>();


export default function Nav(){
    const [user, setUser] = useState<User | null>(null);
    const [init, setInit] = useState(true);
    
    useEffect(() =>{
        return onAuthStateChanged(getAuth(), u => {
            setUser(u);
            setInit(false);
        });
    }, []);

    if(init) return null;

    return(
        <NavigationContainer>
            
            <Stack.Navigator>
                {user ? (
                    <>
                    <Stack.Screen name="Chatrooms" component={Chatrooms} /> 
                    <Stack.Screen name="Chat" component={Chat} options={({route}) => ({title: route.params.roomName})}/>
                    <Stack.Screen name="Profile" component={Profile}/> 
                    </> 
                    ):(
                    <Stack.Screen name="Login" component={Login} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}