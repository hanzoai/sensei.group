
import React, { useState } from "react";
import { Button } from "@hanzo/ui";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { accent, rgba } from "@/components/visual/accent-colors";

interface ViewAllButtonProps {
  href: string;
  text: string;
  hoverColor: string;
}

const ViewAllButton: React.FC<ViewAllButtonProps> = ({ href, text, hoverColor }) => {
  const [hovered, setHovered] = useState(false);
  const a = accent(hoverColor, "blue");

  return (
    <div className="flex justify-center mb-12">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Button
          variant="outline"
          size="sm"
          className="group transition-all duration-300"
          style={
            hovered
              ? { backgroundColor: rgba(a.bg, 0.2), borderColor: rgba(a.edge, 1), color: a.textHover }
              : { color: a.text }
          }
          asChild
        >
          <a href={href} className="flex items-center gap-2">
            <span>{text}</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </motion.div>
    </div>
  );
};

export default ViewAllButton;
