
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FilterCheckboxItemProps {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const FilterCheckboxItem = ({ id, label, checked, onCheckedChange }: FilterCheckboxItemProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id={id} 
        checked={checked}
        onCheckedChange={(checked) => {
          if (checked !== "indeterminate") {
            onCheckedChange(checked);
          }
        }}
      />
      <Label 
        htmlFor={id}
        className="text-sm cursor-pointer"
      >
        {label}
      </Label>
    </div>
  );
};

export default FilterCheckboxItem;
