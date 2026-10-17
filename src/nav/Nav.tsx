import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, type User } from '@react-native-firebase/auth';
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Chat from "../screens/Chat";
import Profile from "../screens/Profile";
import Login from "../screens/Login";

export type RootStackParamList = {
    Login: undefined;
    Profile: undefined;
    Chat: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();


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
                    <Stack.Screen name="Chat" component={Chat} /> 
                    <Stack.Screen name="Profile" component={Profile}/> 
                    </> 
                    ):(
                    <Stack.Screen name="Login" component={Login} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}