
import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import JobCard, { JobCardProps } from "@/components/JobCard";

interface JobListProps {
  jobs: JobCardProps[];
  isLoading: boolean;
  resetSearch: () => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, isLoading, resetSearch }) => {
  return (
    <div className="flex-grow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {isLoading ? 'Searching...' : `${jobs.length} Jobs Found`}
        </h2>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={resetSearch} 
          disabled={isLoading} 
          className="text-gray-500"
        >
          <RefreshCw size={14} className="mr-1" /> Reset
        </Button>
      </div>
      
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-100 animate-pulse h-40 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <>
          {jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-xl font-medium mb-2">No jobs found</p>
              <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
              <Button onClick={resetSearch}>Clear Filters</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobList;
