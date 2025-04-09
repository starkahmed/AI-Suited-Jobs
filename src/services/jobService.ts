
// Fetch real job listings from a public API
export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  description: string;
  postedDate: string;
  skills: string[];
  logoUrl?: string;
  source?: string;
}

// Function to convert remote job API data to our app's format
const mapToJobListing = (job: any): JobListing => {
  return {
    id: job.id || `job-${Math.random().toString(36).substr(2, 9)}`,
    title: job.title || job.position_title || "Unknown Position",
    company: job.company_name || job.company || "Unknown Company",
    location: job.location || job.job_location || job.job_city || "Remote",
    salary: job.salary || job.salary_range || "$40,000 - $80,000",
    experience: job.experience || job.experience_level || "Not specified",
    description: job.description || "No description provided",
    postedDate: job.posted_date || job.date_posted || "Recently",
    skills: job.skills || job.required_skills || ["Not specified"],
    logoUrl: job.company_logo_url || job.logo_url,
    source: job.source || "JobRight"
  };
};

// Fallback data if API fails
const fallbackJobs: JobListing[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    salary: "$120,000 - $150,000",
    experience: "5-7 years",
    skills: ["React", "TypeScript", "Node.js", "CSS"],
    description: "We're looking for a skilled frontend developer with experience in modern frameworks...",
    postedDate: "2 days ago",
    source: "JobRight"
  },
  {
    id: "2",
    title: "Data Scientist",
    company: "Analytics Inc",
    location: "New York, NY",
    salary: "$110,000 - $140,000",
    experience: "3-5 years",
    skills: ["Python", "SQL", "Machine Learning", "Data Visualization"],
    description: "Join our data science team to build predictive models and analyze customer behavior...",
    postedDate: "1 week ago",
    source: "LinkedIn"
  }
];

// Using remotive.io public API for remote jobs
export const fetchJobs = async (): Promise<JobListing[]> => {
  try {
    const response = await fetch('https://remotive.io/api/remote-jobs');
    
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    
    const data = await response.json();
    
    if (data && data.jobs && data.jobs.length > 0) {
      // Map the first 20 results to our format
      return data.jobs.slice(0, 20).map((job: any) => ({
        id: job.id.toString(),
        title: job.title,
        company: job.company_name,
        location: job.candidate_required_location || "Remote",
        salary: "Competitive",
        experience: "Not specified",
        skills: job.tags || ["Not specified"],
        description: job.description.replace(/<[^>]*>?/gm, '').substring(0, 200) + "...",
        postedDate: new Date(job.publication_date).toLocaleDateString(),
        logoUrl: job.company_logo_url,
        source: "Remotive"
      }));
    }
    
    return fallbackJobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return fallbackJobs;
  }
};

// Filter jobs based on search query
export const searchJobs = (jobs: JobListing[], query: string): JobListing[] => {
  if (!query) return jobs;
  
  const lowerCaseQuery = query.toLowerCase();
  
  return jobs.filter(job => 
    job.title.toLowerCase().includes(lowerCaseQuery) ||
    job.company.toLowerCase().includes(lowerCaseQuery) ||
    job.location.toLowerCase().includes(lowerCaseQuery) ||
    job.description.toLowerCase().includes(lowerCaseQuery) ||
    job.skills.some(skill => skill.toLowerCase().includes(lowerCaseQuery))
  );
};

// Apply filters to jobs
export const filterJobs = (
  jobs: JobListing[], 
  filters: {
    location?: string,
    experience?: string,
    salary?: string,
    skills?: string[]
  }
): JobListing[] => {
  return jobs.filter(job => {
    // Filter by location
    if (filters.location && !job.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Filter by experience
    if (filters.experience && !job.experience.toLowerCase().includes(filters.experience.toLowerCase())) {
      return false;
    }
    
    // Filter by salary (simple inclusion check)
    if (filters.salary && !job.salary.includes(filters.salary)) {
      return false;
    }
    
    // Filter by skills
    if (filters.skills && filters.skills.length > 0) {
      const hasSkill = filters.skills.some(skill => 
        job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
      );
      if (!hasSkill) return false;
    }
    
    return true;
  });
};
