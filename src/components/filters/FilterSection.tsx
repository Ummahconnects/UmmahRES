
import { 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import FilterCheckboxItem from "./FilterCheckboxItem";

interface FilterSectionProps {
  title: string;
  section: string;
  items: string[];
  selectedItems: string[];
  updateFilter: (section: string, value: string) => void;
}

const FilterSection = ({ 
  title, 
  section, 
  items, 
  selectedItems, 
  updateFilter 
}: FilterSectionProps) => {
  return (
    <AccordionItem value={section} className="border-none">
      <AccordionTrigger className="py-2 text-sm font-medium">{title}</AccordionTrigger>
      <AccordionContent>
        <div className="space-y-2 py-2">
          {items.map((item) => (
            <FilterCheckboxItem
              key={item}
              id={`${section}-${item}`}
              label={item}
              checked={selectedItems?.includes(item)}
              onCheckedChange={(checked) => {
                if (checked) {
                  updateFilter(section, item);
                } else {
                  updateFilter(section, item);
                }
              }}
            />
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default FilterSection;
