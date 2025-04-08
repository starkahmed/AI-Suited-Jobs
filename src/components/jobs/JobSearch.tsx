
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import JobFilters from "@/components/JobFilters";

interface JobSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  onFilterChange: (filters: any) => void;
  isLoading: boolean;
}

const JobSearch: React.FC<JobSearchProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  onFilterChange,
  isLoading,
}) => {
  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search jobs, skills, or companies..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <Button type="submit" className="bg-jobright-blue" disabled={isLoading}>
          Search
        </Button>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="md:hidden" disabled={isLoading}>
              <SlidersHorizontal size={18} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Job Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-4">
              <JobFilters onFilterChange={onFilterChange} />
            </div>
          </SheetContent>
        </Sheet>
      </form>
    </div>
  );
};

export default JobSearch;
