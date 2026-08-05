// react-native, as the browser needs it.
//
// @hanzo/gui is cross-platform: its dependencies (react-native-svg, the gui icon
// set) import react-native's native-only helpers even in code the web never
// renders. @hanzogui/react-native-web-lite covers the components but not these
// three build-time helpers, so the dependency optimizer fails on them. This
// re-exports the shim and fills the gaps with the web's honest answer: there is
// no native module registry here.
export * from '@hanzogui/react-native-web-lite'

export const TurboModuleRegistry = {
  get: () => null,
  getEnforcing: () => ({}),
}
