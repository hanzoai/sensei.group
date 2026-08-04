
import React from "react";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";
import ViewAllButton from "./ViewAllButton";
import { ProductItem } from "@/components/navigation/products-menu/types";
import { ScrollArea } from "@hanzo/ui";

interface DXPlatformSectionProps {
  products: ProductItem[];
}

const DXPlatformSection: React.FC<DXPlatformSectionProps> = ({ products }) => {
  return (
    <div className="mb-20">
      <SectionHeader
        badge="DX Platform"
        badgeColor="bg-purple-900/30 border border-purple-500/30 text-purple-300"
        title="Developer Experience Tools for AI Engineering"
        description="Supercharge your AI development workflow with purpose-built tools for engineers."
      />

      <div className="mb-8">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4 px-1">
            {products.map((product, index) => (
              <div key={index} className="w-[300px] flex-shrink-0">
                <ProductCard
                  icon={<product.icon className="text-purple-400" />}
                  title={product.name}
                  description={product.description}
                  color="bg-purple-900/30"
                  hoverColor="bg-purple-600/40"
                  link={product.link || "#"}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <ViewAllButton 
        href="/platform"
        text="View all DX Platform tools"
        hoverColor="purple"
      />
    </div>
  );
};

export default DXPlatformSection;
