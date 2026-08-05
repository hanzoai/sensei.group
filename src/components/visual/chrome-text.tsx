
import React, { useState, useEffect, useRef, CSSProperties } from "react";
import { cn } from "@hanzo/ui";

interface ChromeTextProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
  className?: string;
  preHeading?: string;
  preHeadingClassName?: string;
  style?: CSSProperties;
}

const ChromeText = ({ 
  children, 
  as: Component = "h1", 
  className,
  preHeading,
  preHeadingClassName,
  style
}: ChromeTextProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Use a more generic ref type that works with any HTML element
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={cn("hz-col", preHeading ? "hz-ai-center" : "hz-ai-start")}>
      {preHeading && (
        <div className={cn(
          "hz-px-4 hz-py-1 hz-r-full hz-bg-surface hz-bordered hz-border-strong hz-fg-soft hz-t-sm hz-w-medium hz-mb-4 pre-heading-glow", 
          preHeadingClassName
        )}>
          {preHeading}
        </div>
      )}
      <div ref={textRef} className="">
        <Component
          className={cn("chrome-text hz-leading-relaxed hz-py-1", className)}
          style={{
            backgroundPosition: `${(mousePosition.x / (textRef.current?.offsetWidth || 1)) * 100}% ${(mousePosition.y / (textRef.current?.offsetHeight || 1)) * 100}%`,
            ...style
          }}
        >
          {children}
        </Component>
      </div>
    </div>
  );
};

export default ChromeText;
