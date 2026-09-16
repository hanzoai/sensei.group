import React from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Home, FileQuestion } from "lucide-react";

const ACCENT = "#fd4444";

// Every path but / lands here, so this page is the one a stranger is most
// likely to see after the landing page. It names this site and links to this
// site: the Hanzo navbar, footer and the four links to /products, /docs,
// /contact and /status that used to sit here were another brand's, and a 404
// that sends you to another company's product pages is the defect, not a
// convenience.
const NotFound = () => (
  <div className="hz-min-h-screen hz-bg hz-fg hz-col">
    <Helmet>
      <title>404 — Page not found | Sensei Group</title>
      <meta name="description" content="The page you're looking for doesn't exist." />
    </Helmet>

    <main className="hz-grow hz-row hz-ai-center hz-jc-center hz-px-4 hz-py-7">
      <div className="hz-container-narrow hz-mw-md hz-align-center hz-rel">
        <div className="hz-abs hz-inset hz-clip hz-z-base hz-no-pointer">
          <div
            className="hz-center-xy hz-abs hz-r-full hz-dim-more"
            style={{
              background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)`,
              filter: "blur(100px)",
            }}
          />
        </div>

        <div className="hz-rel hz-z-raised">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="hz-mb-6"
          >
            <div
              className="hz-sq-8 hz-r-xl hz-mx-auto hz-row hz-ai-center hz-jc-center hz-mb-5"
              style={{ backgroundColor: `${ACCENT}15` }}
            >
              <FileQuestion className="hz-sq-7" style={{ color: ACCENT }} />
            </div>
            <h1 className="hz-t-7xl hz-w-bold hz-mb-4 hz-chrome">404</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="hz-t-2xl hz-w-semibold hz-fg hz-mb-4">Page not found</h2>
            <p className="hz-container-narrow hz-mw-sm hz-fg-muted hz-t-lg hz-mb-6">
              The page you're looking for doesn't exist.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/"
              className="hz-btn hz-btn-ghost hz-transition"
              style={{ backgroundColor: ACCENT, color: "#ffffff" }}
            >
              <Home className="hz-sq-2 hz-mr-2" />
              Go to Homepage
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  </div>
);

export default NotFound;
