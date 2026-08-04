import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createRequire } from "module";
import { guiAliases } from "@hanzogui/vite-plugin";

const require = createRequire(import.meta.url);
// react-native-svg (pulled in by the gui icon set) ships its web implementation
// beside the native one; only the package's native entry is declared, so point
// at the web build explicitly.
const rnSvgWeb = path.join(
  path.dirname(require.resolve("react-native-svg/package.json")),
  "lib/module/ReactNativeSVG.web.js",
);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // use 0.0.0.0 instead of ::
    port: 8080,
  },
  plugins: [react()],
  define: {
    // @hanzo/gui's cross-platform code branches on these at module scope.
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    "process.env.GUI_TARGET": JSON.stringify("web"),
    "process.env.TAMAGUI_TARGET": JSON.stringify("web"),
    global: "globalThis",
  },
  resolve: {
    // @hanzo/gui is cross-platform; on the web it resolves through the
    // react-native-web-lite shim and the `.web.*` variants of its deps.
    extensions: [".web.tsx", ".web.ts", ".web.jsx", ".web.js", ".mjs", ".tsx", ".ts", ".jsx", ".js", ".json"],
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      {
        find: /^react-native\/Libraries\/Utilities\/(codegenNativeComponent|codegenNativeCommands?)$/,
        replacement: path.resolve(__dirname, "script/rn-codegen-stub.mjs"),
      },
      { find: /^react-native$/, replacement: path.resolve(__dirname, "script/react-native-web-shim.mjs") },
      { find: /^react-native-svg$/, replacement: rnSvgWeb },
      ...guiAliases({ rnwLite: true }),
    ],
  },
});
