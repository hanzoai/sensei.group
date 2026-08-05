
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
    <div className="hz-mb-7">
      <SectionHeader
        badge="AI Cloud"
        badgeColor="hz-bg-surface hz-bordered hz-border-strong hz-fg-soft"
        title="Scalable Infrastructure for AI Applications"
        description="Build high-performance AI applications with our suite of cloud services designed for AI workloads."
      />

      <div className="hz-mb-6">
        <ScrollArea className="hz-w-full hz-whitespace-nowrap">
          <div className="hz-row hz-inline-4 hz-pb-4 hz-px-1">
            {products.map((product, index) => (
              <div key={index} className="hz-none">
                <ProductCard
                  icon={<product.icon className="hz-fg-muted" />}
                  title={product.name}
                  description={product.description}
                  color="hz-bg-surface"
                  hoverColor="hz-bg-raised"
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
