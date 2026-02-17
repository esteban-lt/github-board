import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";

import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

import { Search, SlidersHorizontal } from "lucide-react";

export function RepositoryFilters() {
  return (
    <div className="flex w-full items-center gap-2">
      {/* Search */}
      <div className="relative w-full">
        <Label htmlFor="repository-search" className="sr-only">
          Search repositories
        </Label>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id="repository-search"
          placeholder="Search repositories..."
          className="pl-8"
        />
      </div>

      {/* Filters button + dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            aria-label="Open filters"
          >
            <SlidersHorizontal />
            <span className="hidden sm:inline">Filters</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-[320px] p-2">
          <DropdownMenuLabel className="px-1">Filters</DropdownMenuLabel>
          
          <Separator className="my-2" />

          <div className="flex flex-col gap-4">
            {/* Language */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Language</p>
              <div className="space-y-2 rounded-xl border p-2">
                <FilterCheckbox id="typescript" label="TypeScript" />
                <FilterCheckbox id="javascript" label="JavaScript" />
                <FilterCheckbox id="python" label="Python" />
                <FilterCheckbox id="go" label="Go" />
              </div>
            </div>

            {/* Visibility */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Visibility</p>
              <div className="rounded-xl border p-2">
                <RadioGroup defaultValue="all">
                  <FilterRadio value="all" label="All" />
                  <FilterRadio value="public" label="Public" />
                  <FilterRadio value="private" label="Private" />
                </RadioGroup>
              </div>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Status</p>
              <div className="rounded-xl border p-2">
                <RadioGroup defaultValue="all">
                  <FilterRadio value="all" label="All" />
                  <FilterRadio value="active" label="Active" />
                  <FilterRadio value="inactive" label="Inactive" />
                </RadioGroup>
              </div>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function FilterCheckbox({ id, label }: { id: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id={id} />
      <Label htmlFor={id} className="text-sm font-normal">
        {label}
      </Label>
    </div>
  );
}

function FilterRadio({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <RadioGroupItem value={value} id={value} />
      <Label htmlFor={value} className="text-sm font-normal">
        {label}
      </Label>
    </div>
  );
}
