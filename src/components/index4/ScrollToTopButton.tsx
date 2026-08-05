
import React from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface ScrollToTopButtonProps {
  scrolled: boolean;
}

const ScrollToTopButton = ({ scrolled }: ScrollToTopButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: scrolled ? 1 : 0 }}
      className={`hz-fixed hz-bg-raised hz-glass hz-p-3 hz-r-full hz-bordered hz-transition hz-z-overlay hz-hoverable ${
        !scrolled ? 'hz-no-pointer' : ''
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp className="hz-sq-3 hz-fg" />
    </motion.button>
  );
};

export default ScrollToTopButton;
