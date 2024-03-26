import { type ExpoConfig } from '@expo/config'
const config = ({ config }: { config: ExpoConfig }) => {
  return {
    ...config,
    mods: {
      ios: {
        appDelegate: (config: { modResults: { contents: string } }) => {
          // Enable W3C Pointer Events
          // https://reactnative.dev/blog/2022/12/13/pointer-events-in-react-native#ios-specific
          config.modResults.contents = config.modResults.contents.replace(
            '#import <React/RCTLinkingManager.h>',
            (value) => {
              return `${value}\n#import <React/RCTConstants.h>`
            },
          )

          config.modResults.contents = config.modResults.contents.replace(
            'self.moduleName = @"main";',
            (value) => {
              return `RCTSetDispatchW3CPointerEvents(YES);\n  ${value}`
            },
          )

          return config
        },
      },
      android: {
        mainApplication: (config: { modResults: { contents: string } }) => {
          // Enable W3C Pointer Events
          // https://reactnative.dev/blog/2022/12/13/pointer-events-in-react-native#android-specific
          config.modResults.contents = config.modResults.contents.replace(
            'import expo.modules.ReactNativeHostWrapper',
            (value) => {
              return `${value}\nimport com.facebook.react.config.ReactFeatureFlags`
            },
          )

          config.modResults.contents = config.modResults.contents.replace(
            'super.onCreate()',
            (value) => {
              return `ReactFeatureFlags.dispatchPointerEvents = true\n    ${value}`
            },
          )

          return config
        },
      },
    },
  }
}

export default config
