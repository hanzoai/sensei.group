
import React from "react";
import ReactDOM from "react-dom/client";
import { Hanzo } from "@hanzo/ui";
import App from "./App";
import "./styles/index.css";

// <Hanzo> is @hanzo/ui's root: it mounts the gui config, the generated
// stylesheet and the theme. Without it, the first component that renders
// through @hanzo/gui throws on first paint —
//
//   "Missing hanzogui config, you either have a duplicate config, or haven't
//    set it up. Be sure createGui is called before rendering."
//
// — React unmounts the whole tree, and the site serves a blank white document
// with a perfectly green build behind it. `vite build` exits 0 either way,
// which is why this survived: nothing in a bundler knows whether the app it
// produced renders anything.
//
// The shadcn rip on this branch repointed every import at @hanzo/ui but never
// mounted the root. hanzo.blog died the same way on its own branch and fixed
// it the same way.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Hanzo>
      <App />
    </Hanzo>
  </React.StrictMode>
);
