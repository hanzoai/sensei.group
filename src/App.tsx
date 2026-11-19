import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageTransition from "./components/PageTransition";
import ScrollToTop from "./components/ScrollToTop";
import { ThemeProvider } from "./contexts/ThemeContext";
import SenseiLanding from "./pages/SenseiLanding";

// THIS HOST OWNS ONE PAGE. The repo started as a copy of the Hanzo site, and
// every route that came with it — /pricing, /products, the whole account and
// billing surface — served Hanzo's logo, nav and prices under sensei.group. A
// site carries its own brand and no one else's.
//
// One route and no catch-all: the export ships a single index.html, so anything
// else 404s at the edge and never reaches the browser. Adding a route here means
// writing the page for THIS site.
const App = () => (
  <BrowserRouter>
    <ThemeProvider>
      <ScrollToTop />
      <PageTransition>
        <Routes>
          <Route path="/" element={<SenseiLanding />} />
        </Routes>
      </PageTransition>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
