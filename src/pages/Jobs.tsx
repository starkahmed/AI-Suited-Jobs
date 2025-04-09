
import { useState, useEffect } from "react";
import JobFilters from "@/components/JobFilters";
import JobSearch from "@/components/jobs/JobSearch";
import JobList from "@/components/jobs/JobList";
import { filterJobsByQuery, applyJobFilters } from "@/components/jobs/JobFilterUtils";
import type { JobCardProps } from "@/components/JobCard";
import { fetchJobs, searchJobs, filterJobs, JobListing } from "@/services/jobService";
import { useToast } from "@/hooks/use-toast";

const Jobs = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [allJobs, setAllJobs] = useState<JobCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Fetch jobs on component mount
  useEffect(() => {
    const getJobs = async () => {
      setIsLoading(true);
      try {
        const fetchedJobs = await fetchJobs();
        const mappedJobs = fetchedJobs.map(job => ({
          ...job,
          onSave: (id: string) => console.log(`Saved job: ${id}`),
          onApply: (id: string) => {
            console.log(`Applied to job: ${id}`);
            toast({
              title: "Application submitted",
              description: "Your application has been submitted successfully.",
            });
          },
          // Add a random match percentage for demo purposes
          matchPercentage: Math.floor(Math.random() * 50) + 50
        }));
        
        setAllJobs(mappedJobs);
        setJobs(mappedJobs);
      } catch (error) {
        console.error("Error loading jobs:", error);
        toast({
          title: "Error loading jobs",
          description: "Could not load job listings. Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    getJobs();
  }, [toast]);
  
  const handleFilterChange = (filters: any) => {
    setIsLoading(true);
    
    setTimeout(() => {
      const filteredJobs = filterJobs(allJobs, filters);
      setJobs(filteredJobs);
      setIsLoading(false);
    }, 500);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    setTimeout(() => {
      const results = searchJobs(allJobs, searchQuery);
      setJobs(results);
      setIsLoading(false);
    }, 500);
  };
  
  const resetSearch = () => {
    setSearchQuery("");
    setJobs(allJobs);
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
