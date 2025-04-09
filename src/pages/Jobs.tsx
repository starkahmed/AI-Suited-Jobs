
import { useState, useEffect } from "react";
import JobFilters from "@/components/JobFilters";
import JobSearch from "@/components/jobs/JobSearch";
import JobList from "@/components/jobs/JobList";
import { filterJobsByQuery, applyJobFilters } from "@/components/jobs/JobFilterUtils";
import type { JobCardProps } from "@/components/JobCard";
import { fetchJobs, searchJobs, filterJobs, JobListing } from "@/services/jobService";
import { useToast } from "@/hooks/use-toast";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

const Jobs = () => {
  const [jobs, setJobs] = useState<JobCardProps[]>([]);
  const [allJobs, setAllJobs] = useState<JobCardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5; // Number of jobs to display per page
  
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
      setCurrentPage(1); // Reset to first page when filters change
      setIsLoading(false);
    }, 500);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    setTimeout(() => {
      const results = searchJobs(allJobs, searchQuery);
      setJobs(results);
      setCurrentPage(1); // Reset to first page when search changes
      setIsLoading(false);
    }, 500);
  };
  
  const resetSearch = () => {
    setSearchQuery("");
    setJobs(allJobs);
    setCurrentPage(1); // Reset to first page when search is reset
  };
  
  // Get current jobs for pagination
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  
  // Generate page numbers for pagination
  const generatePaginationItems = () => {
    let items = [];
    
    // Always show first page
    items.push(
      <PaginationItem key="first">
        <PaginationLink 
          onClick={() => setCurrentPage(1)} 
          isActive={currentPage === 1}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    // If there are many pages, show ellipsis after first page
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Show current page - 1 if it's not first page or right after first page
    if (currentPage > 2) {
      items.push(
        <PaginationItem key={currentPage - 1}>
          <PaginationLink 
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {currentPage - 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show current page if it's not first page
    if (currentPage !== 1 && currentPage !== totalPages) {
      items.push(
        <PaginationItem key={currentPage}>
          <PaginationLink 
            onClick={() => setCurrentPage(currentPage)} 
            isActive={true}
          >
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // Show current page + 1 if it's not last page or right before last page
    if (currentPage < totalPages - 1) {
      items.push(
        <PaginationItem key={currentPage + 1}>
          <PaginationLink 
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    // If there are many pages, show ellipsis before last page
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink 
            onClick={() => setCurrentPage(totalPages)} 
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
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
        <div className="flex-grow flex flex-col">
          <JobList 
            jobs={currentJobs}
            isLoading={isLoading}
            resetSearch={resetSearch}
          />
          
          {/* Pagination */}
          {!isLoading && jobs.length > 0 && (
            <div className="mt-6">
              <Pagination>
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(currentPage - 1)} 
                      />
                    </PaginationItem>
                  )}
                  
                  {generatePaginationItems()}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
