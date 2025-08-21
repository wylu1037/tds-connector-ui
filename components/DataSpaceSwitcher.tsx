"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronsUpDown, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDataSpace } from "@/lib/contexts/DataSpaceContext";

export function DataSpaceSwitcher() {
  const [open, setOpen] = useState(false);
  const { currentDataSpace, availableDataSpaces, switchDataSpace } = useDataSpace();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[240px] justify-between"
        >
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="truncate">{currentDataSpace.name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-0">
        <Command>
          <CommandInput placeholder="Search data space..." />
          <CommandList>
            <CommandEmpty>No data space found.</CommandEmpty>
            <CommandGroup>
              {availableDataSpaces.map((dataSpace) => (
                <CommandItem
                  key={dataSpace.id}
                  value={dataSpace.id}
                  onSelect={() => {
                    switchDataSpace(dataSpace.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      currentDataSpace.id === dataSpace.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{dataSpace.name}</span>
                      <Badge
                        variant={dataSpace.status === 'active' ? 'default' : 'secondary'}
                        className="ml-2 text-xs"
                      >
                        {dataSpace.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {dataSpace.description}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
