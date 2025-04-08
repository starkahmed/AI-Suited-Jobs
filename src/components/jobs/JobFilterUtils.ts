
/**
 * Utility functions for filtering jobs based on different criteria
 */

import { JobCardProps } from "@/components/JobCard";

/**
 * Filters jobs based on search query
 */
export const filterJobsByQuery = (jobs: JobCardProps[], query: string): JobCardProps[] => {
  if (!query.trim()) return jobs;
  
  const lowercaseQuery = query.toLowerCase();
  return jobs.filter(job => 
    job.title.toLowerCase().includes(lowercaseQuery) || 
    job.company.toLowerCase().includes(lowercaseQuery) ||
    job.location.toLowerCase().includes(lowercaseQuery) ||
    job.description.toLowerCase().includes(lowercaseQuery) ||
    job.skills.some((skill: string) => skill.toLowerCase().includes(lowercaseQuery))
  );
};

/**
 * Filters jobs based on multiple filter criteria
 */
export const applyJobFilters = (jobs: JobCardProps[], filters: any): JobCardProps[] => {
  let filteredJobs = [...jobs];
  
  // Apply keyword filter
  if (filters.keyword) {
    const keyword = filters.keyword.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(keyword) || 
      job.company.toLowerCase().includes(keyword) ||
      job.description.toLowerCase().includes(keyword) ||
      job.skills.some((skill: string) => skill.toLowerCase().includes(keyword))
    );
  }
  
  // Apply location filter
  if (filters.location) {
    const location = filters.location.toLowerCase();
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(location)
    );
  }
  
  // Apply experience level filter if not "All Levels"
  if (filters.experienceLevel && filters.experienceLevel !== "All Levels") {
    filteredJobs = filteredJobs.filter(job => 
      job.experience.includes(filters.experienceLevel.replace(" Level", "").replace("Associate", "2-4 years"))
    );
  }
  
  // Apply job type filter if not "All Types"
  if (filters.jobType && filters.jobType !== "All Types") {
    filteredJobs = filteredJobs.filter(job => 
      job.title.toLowerCase().includes(filters.jobType.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.jobType.toLowerCase())
    );
  }
  
  // Apply skills filter
  if (filters.skills && filters.skills.length > 0) {
    filteredJobs = filteredJobs.filter(job => 
      filters.skills.some((skill: string) => 
        job.skills.some((jobSkill: string) => 
          jobSkill.toLowerCase() === skill.toLowerCase()
        )
      )
    );
  }
  
  // Apply salary filter
  if (filters.salaryRange && filters.salaryRange.length === 2) {
    const minSalary = filters.salaryRange[0];
    const maxSalary = filters.salaryRange[1];
    
    // Skip filtering if both are at min/max values
    if (!(minSalary === 0 && maxSalary === 200)) {
      filteredJobs = filteredJobs.filter(job => {
        // Extract salary numbers from string like "$90k - $130k"
        const salaryText = job.salary;
        const salaryMatches = salaryText.match(/\$(\d+)k\s*-\s*\$(\d+)k/);
        
        if (salaryMatches && salaryMatches.length >= 3) {
          const jobMinSalary = parseInt(salaryMatches[1], 10);
          const jobMaxSalary = parseInt(salaryMatches[2], 10);
          
          // Check if job salary range overlaps with filter salary range
          return (
            (jobMinSalary <= maxSalary && jobMaxSalary >= minSalary)
          );
        }
        return true;
      });
    }
  }
  
  return filteredJobs;
};
