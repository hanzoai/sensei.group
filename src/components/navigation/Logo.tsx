import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

// Logo SVG for clipboard copy
const LOGO_SVG = `<svg viewBox="0 0 67 67" xmlns="http://www.w3.org/2000/svg">
  <path d="M22.21 67V44.6369H0V67H22.21Z" fill="currentColor"/>
  <path d="M0 44.6369L22.21 46.8285V44.6369H0Z" fill="#DDDDDD"/>
  <path d="M66.7038 22.3184H22.2534L0.0878906 44.6367H44.4634L66.7038 22.3184Z" fill="currentColor"/>
  <path d="M22.21 0H0V22.3184H22.21V0Z" fill="currentColor"/>
  <path d="M66.7198 0H44.5098V22.3184H66.7198V0Z" fill="currentColor"/>
  <path d="M66.6753 22.3185L44.5098 20.0822V22.3185H66.6753Z" fill="#DDDDDD"/>
  <path d="M66.7198 67V44.6369H44.5098V67H66.7198Z" fill="currentColor"/>
</svg>`;

// Context menu items for right-click
const contextMenuItems = [
  { label: "Copy Logo SVG", action: "copy-svg" },
  { label: "Brand Guidelines", href: "/brand" },
  { divider: true },
  { label: "All Products", href: "/products" },
  { label: "Hanzo Dev", href: "/dev" },
  { label: "AI & Models", href: "/ai" },
  { label: "Hanzo Cloud", href: "/cloud" },
  { divider: true },
  { label: "Documentation", href: "https://docs.hanzo.ai", external: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact Sales", href: "/contact" },
  { label: "Status", href: "/status" },
];

const Logo = () => {
  const { isDarkMode } = useTheme();
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showIntroWordmark, setShowIntroWordmark] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Animation variants for the container
  const logoVariants = {
    initial: {
      opacity: 0,
      rotateY: 180,
      scale: 0.6
    },
    animate: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
        staggerChildren: 0.12,
        when: "beforeChildren"
      }
    }
  };

  // Path animation variants
  const pathVariants = {
    initial: (custom: number) => ({
      opacity: 0,
      scale: 0.8,
      x: custom % 2 === 0 ? -15 : 15,
      y: custom % 3 === 0 ? -15 : 15,
      rotate: custom * 5
    }),
    animate: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  // After logo animation, show wordmark briefly then hide
  useEffect(() => {
    const animTimer = setTimeout(() => {
      setAnimationComplete(true);
      setShowIntroWordmark(true);
    }, 1200);

    // Hide the intro wordmark after showing it
    const hideTimer = setTimeout(() => {
      setShowIntroWordmark(false);
    }, 2500);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Close context menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContextMenu(null);
    };

    if (contextMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [contextMenu]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleMenuItemClick = async (item: typeof contextMenuItems[0]) => {
    setContextMenu(null);
    if ('action' in item && item.action === 'copy-svg') {
      try {
        await navigator.clipboard.writeText(LOGO_SVG);
        // Could add a toast notification here
      } catch (err) {
        console.error('Failed to copy SVG:', err);
      }
    } else if ('external' in item && item.external) {
      window.open(item.href, "_blank");
    } else if (item.href) {
      navigate(item.href);
    }
  };

  const fillColor = isDarkMode ? "#ffffff" : "#000000";
  const accentColor = isDarkMode ? "#DDDDDD" : "#DDDDDD";

  // Show wordmark when hovering OR during intro animation
  const shouldShowWordmark = isHovered || showIntroWordmark;

  return (
    <>
      <Link
        to="/"
        className="hz-rel hz-row hz-ai-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onContextMenu={handleContextMenu}
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={logoVariants}
          className="hz-sq-4 hz-rel hz-none"
          onAnimationComplete={() => setAnimationComplete(true)}
          style={{ transformOrigin: "center center" }}
        >
          <svg
            viewBox="0 0 67 67"
            xmlns="http://www.w3.org/2000/svg"
            className="hz-w-full hz-h-full"
          >
            <motion.path
              custom={1}
              variants={pathVariants}
              d="M22.21 67V44.6369H0V67H22.21Z"
              fill={fillColor}
            />
            <motion.path
              custom={1.5}
              variants={pathVariants}
              d="M0 44.6369L22.21 46.8285V44.6369H0Z"
              fill={accentColor}
            />
            <motion.path
              custom={2}
              variants={pathVariants}
              d="M66.7038 22.3184H22.2534L0.0878906 44.6367H44.4634L66.7038 22.3184Z"
              fill={fillColor}
            />
            <motion.path
              custom={3}
              variants={pathVariants}
              d="M22.21 0H0V22.3184H22.21V0Z"
              fill={fillColor}
            />
            <motion.path
              custom={4}
              variants={pathVariants}
              d="M66.7198 0H44.5098V22.3184H66.7198V0Z"
              fill={fillColor}
            />
            <motion.path
              custom={4.5}
              variants={pathVariants}
              d="M66.6753 22.3185L44.5098 20.0822V22.3185H66.6753Z"
              fill={accentColor}
            />
            <motion.path
              custom={5}
              variants={pathVariants}
              d="M66.7198 67V44.6369H44.5098V67H66.7198Z"
              fill={fillColor}
            />
          </svg>
        </motion.div>

        {/* Wordmark - absolute positioned so it doesn't shift other content */}
        <div className="hz-abs hz-clip">
          <span
            className={`hz-w-bold hz-t-xl ${isDarkMode ? "hz-fg" : "hz-fg-faint"} hz-whitespace-nowrap hz-transition ${
              shouldShowWordmark ? "" : ""
            }`}
          >
            Hanzo
          </span>
        </div>
      </Link>

      {/* Right-click context menu */}
      <AnimatePresence>
        {contextMenu && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className={`hz-fixed hz-z-overlay hz-r-lg hz-shadow-lg hz-py-1 hz-bordered ${
              isDarkMode
                ? "hz-bg"
                : "hz-bg-inverse hz-border-strong"
            }`}
            style={{ left: contextMenu.x, top: contextMenu.y }}
          >
            {contextMenuItems.map((item, index) =>
              'divider' in item ? (
                <div key={index} className={`hz-border-t hz-mt-1 hz-mb-1 ${isDarkMode ? "" : "hz-border-strong"}`} />
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleMenuItemClick(item)}
                  className={`hz-w-full hz-align-left hz-px-3 hz-py-2 hz-t-sm hz-transition hz-row hz-ai-center hz-jc-between ${
                    isDarkMode
                      ? "hz-fg-soft hz-hoverable"
                      : "hz-fg-faint hz-link"
                  }`}
                >
                  {item.label}
                  {'action' in item && item.action === 'copy-svg' && (
                    <svg className={`hz-sq-1 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                  {'external' in item && item.external && (
                    <svg className={`hz-sq-1 ${isDarkMode ? "hz-fg-muted" : "hz-fg-muted"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </button>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Logo;
