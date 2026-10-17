import { View, Text, Button } from "react-native";
import appleAuth, { AppleButton } from "@invertase/react-native-apple-authentication";
import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider, getAuth, signInWithCredential } from "@react-native-firebase/auth";
// Switching from AppleAuthProver to OAuthProvider since upcoming changes in v27 will change it
import { GoogleOneTapSignIn, isNoSavedCredentialFoundResponse, isSuccessResponse } from "react-native-nitro-google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

GoogleOneTapSignIn.configure({webClientId: '87008628205-r10ki8ikmu3gnr0fhahu76ce1s6inilv.apps.googleusercontent.com'});


// Facebook
async function onFacebookButtonPress(){
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

    if(result.isCancelled) {
        throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();

    if(!data){
        throw Error('Something went wrong');
    }

    const facebookCredential = FacebookAuthProvider.credential(data.accessToken);

    return signInWithCredential(getAuth(), facebookCredential)

}

// Google
async function onGoogleButtonPress(){
    await GoogleOneTapSignIn.checkPlayServices();

    let response = await GoogleOneTapSignIn.signIn();

    if(isNoSavedCredentialFoundResponse(response)){
        response = await GoogleOneTapSignIn.presentExplicitSignIn();
    }

    if(!isSuccessResponse(response)){
        throw Error('Failed to sign in with Google');
    }

    const idToken = response.data?.idToken;
    if(!idToken){
        throw new Error('No ID token found');
    }

    const googleCredential = GoogleAuthProvider.credential(idToken);
    
    return signInWithCredential(getAuth(), googleCredential);

}

export default function Login(){
    return(
        <View>
            <Text>Pentia</Text>
            <View style={{}}>
            <Button title="Sign in with Facebook" onPress={() => onFacebookButtonPress().then(() => console.log('Facebook login ok')).catch(() => console.log('Haha did not work'))}/>
            <Button title="Sign in with Google" onPress={() => onGoogleButtonPress().then(() => console.log('Google login ok')).catch(() => console.log('Haha did not work'))}/>
            </View>
        </View>
    )
}