import { getAuth, signOut } from "@react-native-firebase/auth";
import { Button } from "react-native";

export default function Profile(){
    return(
        <Button title="Sign out" onPress={() => signOut(getAuth())} />
    )
}
