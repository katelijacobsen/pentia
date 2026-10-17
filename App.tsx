import { View, Text, Button } from "react-native";
import appleAuth, { AppleButton } from "@invertase/react-native-apple-authentication";
import { FacebookAuthProvider, GoogleAuthProvider, OAuthProvider, getAuth, signInWithCredential } from "@react-native-firebase/auth";
// Switching from AppleAuthProver to OAuthProvider since upcoming changes in v27 will change it
import { GoogleOneTapSignIn, isNoSavedCredentialFoundResponse, isSuccessResponse } from "react-native-nitro-google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

GoogleOneTapSignIn.configure({webClientId: '87008628205-r10ki8ikmu3gnr0fhahu76ce1s6inilv.apps.googleusercontent.com'});


// Apple Login
async function onAppleButtonPress(){
    const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // Return ID token from user
    if (!appleAuthRequestResponse.identityToken){
        throw new Error('Failed to sign in')
    }

    const { identityToken, nonce } = appleAuthRequestResponse;
    
    const provider = new OAuthProvider('apple.com');
    const appleCredential = provider.credential({
        idToken: identityToken,
        rawNonce: nonce,
    });

    return signInWithCredential(getAuth(), appleCredential);
}

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
        throw new Error('Failed to sign in with Google');
    }

    const idToken = response.data?.idToken;
    if(!idToken){
        throw new Error('No ID token found');
    }

    const googleCredential = GoogleAuthProvider.credential(idToken);
    
    return signInWithCredential(getAuth(), googleCredential);

}

export default function App() {
    return (
        <View>
            <Text>Pentia</Text>
            <AppleButton
            buttonStyle={AppleButton.Style.WHITE_OUTLINE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{width: 200, height: 45}}
            onPress={() => onAppleButtonPress().then(()=> console.log('Apple sign-in ok'))}/>
            <Button title="Sign in with Facebook" onPress={() => onFacebookButtonPress().then(() => console.log('Facebook login ok'))}/>
            <Button title="Sign in with Google" onPress={() => onGoogleButtonPress().then(() => console.log('Google login ok'))}/>
        </View>
    )
}