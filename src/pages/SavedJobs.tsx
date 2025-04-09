
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, Loader2 } from "lucide-react";
import JobCard, { JobCardProps } from "@/components/JobCard";
import { useToast } from "@/hooks/use-toast";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<JobCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSavedJobs = () => {
      setIsLoading(true);
      // Get saved jobs from localStorage
      const savedJobsData = localStorage.getItem("jobright_saved_jobs");
      
      setTimeout(() => {
        if (savedJobsData) {
          try {
            const parsedJobs = JSON.parse(savedJobsData);
            setSavedJobs(parsedJobs);
          } catch (error) {
            console.error("Error parsing saved jobs:", error);
            toast({
              title: "Error loading saved jobs",
              description: "There was a problem loading your saved jobs",
              variant: "destructive",
            });
            setSavedJobs([]);
          }
        } else {
          setSavedJobs([]);
        }
        setIsLoading(false);
      }, 800); // Simulate loading delay
    };

    fetchSavedJobs();
  }, [toast]);

  const handleRemoveJob = (id: string) => {
    const updatedJobs = savedJobs.filter(job => job.id !== id);
    setSavedJobs(updatedJobs);
    
    // Update localStorage
    localStorage.setItem("jobright_saved_jobs", JSON.stringify(updatedJobs));
    
    toast({
      title: "Job removed",
      description: "This job has been removed from your saved jobs",
    });
  };

  const handleApply = (id: string) => {
    toast({
      title: "Application submitted",
      description: "Your application has been submitted successfully",
    });
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-2">Saved Jobs</h1>
      <p className="text-gray-600 mb-8">
        View and manage your saved job listings
      </p>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Loading your saved jobs...</span>
        </div>
      ) : (
        <div>
          {savedJobs.length > 0 ? (
            <div className="space-y-6">
              {savedJobs.map((job) => (
                <JobCard 
                  key={job.id} 
                  {...job} 
                  onSave={() => handleRemoveJob(job.id)}
                  onApply={() => handleApply(job.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <BookmarkCheck size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-medium mb-2">No saved jobs yet</h2>
              <p className="text-gray-500 mb-6">
                When you find jobs you like, click the "Save" button to add them here
              </p>
              <Button onClick={() => window.location.href = "/jobs"}>
                Browse Jobs
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
