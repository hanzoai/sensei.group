
import { solutions } from "@/constants/navigation";
import { SolutionCategory } from "./SolutionCategory";
import { AgencyCard } from "./AgencyCard";
import { SenseiCard } from "./SenseiCard";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface SolutionsContentProps {
  onCloseMenu: () => void;
}

export const SolutionsContent = ({ onCloseMenu }: SolutionsContentProps) => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  
  return (
    <div className={`hz-row ${isMobile ? 'hz-col' : 'hz-row'} hz-gap-5`}>
      <div className={`${isMobile ? 'hz-w-full' : 'hz-grow'} hz-grid ${isMobile ? '' : ''} hz-gap-6`}>
        {solutions.map((category, idx) => (
          <SolutionCategory
            key={idx}
            title={category.title}
            items={category.items}
            onItemClick={onCloseMenu}
          />
        ))}
      </div>

      <div className={`${isMobile ? 'hz-w-full' : 'hz-bw-8'} hz-stack-4 hz-none`}>
        <AgencyCard onCardClick={onCloseMenu} />
        <SenseiCard onCardClick={onCloseMenu} />
      </div>
    </div>
  );
};
