
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, Loader2, Search, Filter } from "lucide-react";
import JobCard, { JobCardProps } from "@/components/JobCard";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<JobCardProps[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const fetchSavedJobs = () => {
      setIsLoading(true);
      // Get saved jobs from localStorage
      const savedJobsData = localStorage.getItem("aisuitedjobs_saved_jobs") || localStorage.getItem("jobright_saved_jobs");
      
      setTimeout(() => {
        if (savedJobsData) {
          try {
            const parsedJobs = JSON.parse(savedJobsData);
            setSavedJobs(parsedJobs);
            setFilteredJobs(parsedJobs);
          } catch (error) {
            console.error("Error parsing saved jobs:", error);
            toast({
              title: "Error loading saved jobs",
              description: "There was a problem loading your saved jobs",
              variant: "destructive",
            });
            setSavedJobs([]);
            setFilteredJobs([]);
          }
        } else {
          setSavedJobs([]);
          setFilteredJobs([]);
        }
        setIsLoading(false);
      }, 800); // Simulate loading delay
    };

    fetchSavedJobs();
  }, [toast]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredJobs(savedJobs);
    } else {
      const filtered = savedJobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  }, [searchTerm, savedJobs]);

  const handleRemoveJob = (id: string) => {
    const updatedJobs = savedJobs.filter(job => job.id !== id);
    setSavedJobs(updatedJobs);
    
    // Update localStorage
    localStorage.setItem("aisuitedjobs_saved_jobs", JSON.stringify(updatedJobs));
    
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
      <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-jobright-blue to-jobright-purple">
        Saved Jobs
      </h1>
      <p className="text-gray-600 mb-8">
        View and manage your saved job listings
      </p>

      {!isLoading && savedJobs.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search saved jobs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={18} /> Filter
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="animate-spin mr-2" size={24} />
          <span>Loading your saved jobs...</span>
        </div>
      ) : (
        <div>
          {savedJobs.length > 0 ? (
            <>
              {filteredJobs.length > 0 ? (
                <div className="space-y-6">
                  {filteredJobs.map((job) => (
                    <JobCard 
                      key={job.id} 
                      {...job} 
                      onSave={() => handleRemoveJob(job.id)}
                      onApply={() => handleApply(job.id)}
                    />
                  ))}
                </div>
              ) : (
                <Card className="p-8 text-center bg-gray-50">
                  <Search size={48} className="mx-auto text-gray-400 mb-4" />
                  <h2 className="text-xl font-medium mb-2">No matching jobs found</h2>
                  <p className="text-gray-500 mb-4">
                    Try adjusting your search term to find what you're looking for
                  </p>
                  <Button onClick={() => setSearchTerm("")}>
                    Clear Search
                  </Button>
                </Card>
              )}
            </>
          ) : (
            <Card className="p-8 text-center bg-gray-50">
              <BookmarkCheck size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-medium mb-2">No saved jobs yet</h2>
              <p className="text-gray-500 mb-6">
                When you find jobs you like, click the "Save" button to add them here
              </p>
              <Button onClick={() => window.location.href = "/jobs"} className="bg-gradient-to-r from-jobright-blue to-jobright-purple">
                Browse Jobs
              </Button>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
