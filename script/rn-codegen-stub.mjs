// react-native's codegen helpers describe NATIVE views. On the web the
// components that reference them are never mounted, so the identity of the
// descriptor is all that is needed for the module graph to resolve.
export default function codegenNativeComponent(name) {
  return name
}
export function codegenNativeCommands() {
  return {}
}
