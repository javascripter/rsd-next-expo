import { LogBox } from 'react-native'
import ReactNativeFeatureFlags from 'react-native/Libraries/ReactNative/ReactNativeFeatureFlags'

// Enable the JS-side of the w3c PointerEvent implementation
ReactNativeFeatureFlags.shouldEmitW3CPointerEvents = () => true

// Enable hover events in Pressibility to be backed by the PointerEvent implementation
ReactNativeFeatureFlags.shouldPressibilityUseW3CPointerEventsForHover = () =>
  true

// Native feature flags are enabled via app.config.ts

LogBox.ignoreLogs([
  /Failed prop type: Invalid prop `position` of value `static` supplied to `Text`/,
])

import 'expo-router/entry'
