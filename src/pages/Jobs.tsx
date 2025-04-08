
import { useState } from "react";
import JobFilters from "@/components/JobFilters";
import { sampleJobs } from "@/data/sampleJobs";
import JobSearch from "@/components/jobs/JobSearch";
import JobList from "@/components/jobs/JobList";
import { filterJobsByQuery, applyJobFilters } from "@/components/jobs/JobFilterUtils";
import type { JobCardProps } from "@/components/JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>(sampleJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFilterChange = (filters: any) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredJobs = applyJobFilters(sampleJobs, filters);
      setJobs(filteredJobs);
      setIsLoading(false);
    }, 800);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const filteredJobs = filterJobsByQuery(sampleJobs, searchQuery);
      setJobs(filteredJobs);
      setIsLoading(false);
    }, 800);
  };
  
  const resetSearch = () => {
    setSearchQuery("");
    setJobs(sampleJobs);
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-2">Find Your Perfect Job</h1>
      <p className="text-gray-600 mb-8">
        Browse through our curated list of opportunities matched to your skills and preferences
      </p>
      
      {/* Search Bar */}
      <JobSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        onFilterChange={handleFilterChange}
        isLoading={isLoading}
      />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar - Desktop */}
        <div className="w-full md:w-72 flex-shrink-0">
          <JobFilters onFilterChange={handleFilterChange} />
        </div>
        
        {/* Job Results */}
        <JobList 
          jobs={jobs}
          isLoading={isLoading}
          resetSearch={resetSearch}
        />
      </div>
    </div>
  );
};

export default Jobs;
