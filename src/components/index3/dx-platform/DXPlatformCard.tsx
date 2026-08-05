
import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import ChromeText from "@/components/visual/chrome-text";
import { Link } from "react-router-dom";
import { tileStyle } from "@/components/visual/accent-colors";

interface DXPlatformCardProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  isHovered: string | null;
  setIsHovered: (id: string | null) => void;
  color?: string;
}

const DXPlatformCard: React.FC<DXPlatformCardProps> = ({
  id,
  title,
  description,
  features,
  icon: Icon,
  isHovered,
  setIsHovered,
  color = "indigo"
}) => {
  const isHoveredState = isHovered === id;
  const tile = tileStyle(color, isHoveredState, "indigo");

  const CardContent = (
    <>
      <div style={tile.bg} className="h-12 w-12 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300">
        <Icon style={tile.text} className="h-6 w-6 transition-colors duration-300" />
      </div>
      <ChromeText as="h3" className="text-xl font-bold mb-2">
        {title}
      </ChromeText>
      <p className="text-neutral-300 mb-4 text-sm">
        {description}
      </p>
      <ul className="text-neutral-400 space-y-2 text-xs mt-auto hidden lg:block">
        {features.slice(0, 2).map((feature, index) => (
          <li key={`${id}-feature-${index}`} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </>
  );

  const containerClasses = "bg-gray-900/20 border border-gray-800 rounded-xl p-6 group hover:bg-gray-900/30 transition-colors h-full flex flex-col";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 }}
      onMouseEnter={() => setIsHovered(id)}
      onMouseLeave={() => setIsHovered(null)}
    >
      {id === "more" ? (
        <Link to="/platform" className={containerClasses}>
          {CardContent}
        </Link>
      ) : (
        <Link to={`/${id}`} className={containerClasses}>
          {CardContent}
        </Link>
      )}
    </motion.div>
  );
};

export default DXPlatformCard;
