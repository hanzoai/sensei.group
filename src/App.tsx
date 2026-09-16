import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "./analytics";
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
    {/* Inside the router: <Analytics> counts one pageview per client-side route
        change, and a route change here never touches the network. */}
    <Analytics>
      <ThemeProvider>
        <ScrollToTop />
        <PageTransition>
          <Routes>
            <Route path="/" element={<SenseiLanding />} />
          </Routes>
        </PageTransition>
      </ThemeProvider>
    </Analytics>
  </BrowserRouter>
);

export default App;
