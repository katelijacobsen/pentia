# Pentia Chat

A real-time chat app for iOS built with React Native and Firebase.
Users sign in with Google or Facebook, browse chat rooms and exchange messages live.

> Built as a case assignment for Pentia.

## Features

| Feature | Status |
|---|---|
| Sign in with Google / Facebook (Firebase Auth) | ✅ |
| Sign out | ✅ |
| Chat room list sorted by latest activity, pull-to-refresh | ✅ |
| Real-time messages (Firestore snapshot listener) | ✅ |
| Send messages | ✅ |
| Load older messages on scroll (cursor pagination) | ⚠️ Implemented, see Known issues |
| Splash screen | ❌ |
| Push notifications with deep links | ❌ |
| Image upload | ❌ |

## Tech stack

- **React Native 0.88** + **TypeScript**
- **Firebase**: Auth, Cloud Firestore
- **React Navigation** (native stack)
- **react-native-fbsdk-next** and **react-native-nitro-google-signin** for social login
- ESLint, Prettier, Jest

## Architecture

The app is split into three layers so UI code never talks to Firebase directly:

```
src/
├── repos/       Data access – the only layer that knows about Firestore
├── hooks/       State & logic – loading, errors, pagination, subscriptions
├── screens/     Screens wired into navigation
├── components/  Reusable UI (CustomButton, Textfield, MessageBubble)
├── nav/         Auth-gated navigation
└── types/       Shared TypeScript types
```

**Key decisions**

- **Auth-gated navigation**: `onAuthStateChanged` decides whether the login stack or the app stack is rendered, so signing out returns to login automatically.
- **Pagination + live listener**: the chat loads the latest 50 messages once, then subscribes only to messages *newer* than that page. Older messages are fetched with `startAfter(cursor)`. This keeps the listener small regardless of chat history size.
- **Atomic writes**: sending a message and updating the room's `lastMessageAt` happen in one `writeBatch`, using `serverTimestamp()` so ordering doesn't depend on device clocks.
- **Denormalised sender info**: name and avatar are stored on each message to avoid a user lookup per message.

## Getting started

### Requirements

- Node.js ≥ 22.11
- Xcode <version you used> and CocoaPods
- Ruby / Bundler (for CocoaPods)

### Install and run (iOS)

```bash
git clone https://github.com/katelijacobsen/pentia.git
cd pentia
npm install
cd ios && bundle install && bundle exec pod install && cd ..
npm run ios
```

The Firebase client config (`ios/GoogleService-Info.plist`) is committed on purpose. It identifies the Firebase project and is not a secret. Data access is protected by Firestore Security Rules.

### Signing in

- **Google**: works with any Google account.
- **Facebook**: the Facebook app is in development mode, so only accounts added as testers can sign in. <Ask me to add you, or use Google.>

### Android

<Option A: Android has not been configured for Firebase yet (`google-services.json` and Facebook setup missing). The app is developed and tested on iOS only.>
<Option B: describe the steps once it works.>

## Known issues

- "Load more messages" never triggers because `hasMore` isn't set after the first page load.
- Send errors are logged but not shown to the user.
- Some placeholder files exist for features not yet built (toast, avatar, file upload).
- Styles/colours are duplicated across components instead of a shared theme.

## Next steps

1. Fix pagination and surface errors in the UI (error dialog on login failure)
2. Shared `theme.ts` for colours and spacing
3. Room description and chevron in the room list
4. Splash screen
5. Image upload with Firebase Storage
6. Push notifications (FCM) with deep links into a specific room
7. Unit tests for hooks and repos
