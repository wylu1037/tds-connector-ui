import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, Search } from "lucide-react";

export interface FilterOption {
  value: string;
  label: string;
}

export interface SearchFilterProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  filterValue?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: FilterOption[];
  searchPlaceholder?: string;
  filterPlaceholder?: string;
  className?: string;
}

export function SearchFilter({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions = [],
  searchPlaceholder = "Search...",
  filterPlaceholder = "All Categories",
  className,
}: SearchFilterProps) {
  return (
    <div className={`flex space-x-2 ${className || ""}`}>
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-background pl-10"
        />
      </div>
      {filterOptions.length > 0 && onFilterChange && (
        <Select value={filterValue} onValueChange={onFilterChange}>
          <SelectTrigger className="bg-background w-42">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder={filterPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
