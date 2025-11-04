# React Native Todo

An Expo + Convex powered Todo application that delivers a polished, theme-aware experience with live data updates, drag-and-drop sorting, and Tailwind-powered styling via NativeWind.

## Key Features

- **Pixel-inspired UI** matching the supplied design with responsive layout constraints.
- **Light & Dark Themes** toggled instantly from the header switch, with NativeWind handling styling.
- **Real-time Todos** backed by Convex; create, toggle complete, delete, clear completed, and re-order items.
- **Drag & Drop Sorting** in the "All" view using `react-native-draggable-flatlist` for a smooth reordering flow.
- **Filters & Empty States** for All/Active/Completed views, plus messaging when no todos match.

## Tech Stack

- **React Native (Expo)** with Expo Router
- **TypeScript** for end-to-end type safety
- **Convex** for realtime backend functions and data storage
- **NativeWind (Tailwind)** for utility-first styling
- **react-native-gesture-handler** & **react-native-draggable-flatlist** for interactive gestures

## Prerequisites

- Node.js 18+
- npm 9+
- Expo CLI (`npm install -g expo-cli`, optional but helpful)
- Convex account & project (https://dashboard.convex.dev)

## Environment Variables

Create an `.env.local` file in the project root and define:

```bash
EXPO_PUBLIC_CONVEX_URL="https://<your-convex-deployment>.convex.site"
```

> Convex automatically provisions this URL once you deploy or run `npx convex dev` locally. The value is exposed through Expo's public env namespace for the client.

## Installation

```bash
npm install
```

This installs all Expo, NativeWind, Convex, and gesture-handler dependencies.

## Running the App

Start the Expo development server with metro bundler:

```bash
npx expo start
```

Then choose your preferred target:

- **Press `a`** in the terminal for Android Emulator
- **Press `i`** for iOS Simulator (macOS only)
- **Scan the QR code** with Expo Go on a physical device

The app hot-reloads as you edit files inside the `app/` directory thanks to Expo Router.

## Backend (Convex) Setup

1. **Login & Init**
    ```bash
    npx convex dev
    ```
    - Authenticates you with Convex CLI
    - Spins up a local Convex deployment
    - Generates types under `convex/_generated`

2. **Deploy (optional)**
    ```bash
    npx convex deploy
    ```
    - Publishes functions to a hosted Convex environment
    - Outputs the production `EXPO_PUBLIC_CONVEX_URL`

3. **Convex Functions**
    - Located in `convex/todos.ts`
    - Includes create, update, delete, clearCompleted, and list query handlers

> Keep the Convex dev server running alongside Expo for live data during development.

## Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run start` | Alias for `expo start` |
| `npm run android` | Launches Expo on Android emulator/device |
| `npm run ios` | Launches Expo on iOS simulator |
| `npm run web` | Starts Expo web target |
| `npm run reset-project` | Restores the original Expo starter template |
| `npx convex dev` | Runs local Convex functions & generates types |

## Project Structure

```
app/
   index.tsx          # Home screen with hero, filters, draggable list
   _layout.tsx        # Expo Router root wrapped with Convex + gesture provider
components/
   CreateTodo.tsx     # Input row with checkbox + add button
   Todo.tsx           # Todo row (toggle + delete)
   CheckButton.tsx
   AddButton.tsx
   DeleteButton.tsx
convex/
   todos.ts           # Convex mutations & queries
   _generated/        # Auto-generated Convex client bindings
assets/
   images/            # Background, icons, splash assets
```

`tailwind.config.js` and `nativewind` integration power utility classes throughout the UI.

## Building Releases

- **Android APK/AAB**
   ```bash
   eas build --platform android
   ```
- **iOS IPA**
   ```bash
   eas build --platform ios
   ```

Follow the prompts from Expo Application Services (EAS). Ensure you’ve configured credentials in the Expo dashboard before running production builds.

## Testing Checklist

- Create new todos (optionally marking complete on creation)
- Toggle completion in place
- Drag to reorder in the All tab
- Filter between All / Active / Completed
- Clear completed todos
- Switch between light and dark themes

## Useful Resources

- Expo Router: https://docs.expo.dev/router/introduction/
- NativeWind: https://www.nativewind.dev/
- Convex React Guides: https://docs.convex.dev/quickstart/react-native
- React Native Gesture Handler: https://docs.swmansion.com/react-native-gesture-handler/

---

Happy hacking! 🚀
