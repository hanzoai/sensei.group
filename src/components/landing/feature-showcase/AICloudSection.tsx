
import React from "react";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";
import ViewAllButton from "./ViewAllButton";
import { ProductItem } from "@/components/navigation/products-menu/types";
import { ScrollArea } from "@hanzo/ui";

interface AICloudSectionProps {
  products: ProductItem[];
}

const AICloudSection: React.FC<AICloudSectionProps> = ({ products }) => {
  return (
    <div className="mb-20">
      <SectionHeader
        badge="AI Cloud"
        badgeColor="bg-blue-900/30 border border-blue-500/30 text-blue-300"
        title="Scalable Infrastructure for AI Applications"
        description="Build high-performance AI applications with our suite of cloud services designed for AI workloads."
      />

      <div className="mb-8">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex space-x-4 pb-4 px-1">
            {products.map((product, index) => (
              <div key={index} className="w-[300px] flex-shrink-0">
                <ProductCard
                  icon={<product.icon className="text-blue-400" />}
                  title={product.name}
                  description={product.description}
                  color="bg-blue-900/30"
                  hoverColor="bg-blue-600/40"
                  link={product.link || "#"}
                />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <ViewAllButton 
        href="/ai"
        text="View all AI Cloud services"
        hoverColor="blue"
      />
    </div>
  );
};

export default AICloudSection;
