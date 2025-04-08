
import { useState } from "react";
import JobCard from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Sample jobs data
const allJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    salary: "$80k - $120k",
    experience: "3-5 years",
    skills: ["React", "TypeScript", "CSS", "HTML", "JavaScript"],
    description: "We're looking for a frontend developer with experience in React and TypeScript to join our team. You will be working on building user interfaces for our enterprise applications.",
    matchPercentage: 92,
    postedDate: "2 days ago",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "Growth Startup",
    location: "Remote",
    salary: "$100k - $150k",
    experience: "4+ years",
    skills: ["React", "Node.js", "MongoDB", "Express", "AWS"],
    description: "Join our growing team as a full stack engineer. You will be working across our entire stack to build new features and improve existing ones.",
    matchPercentage: 85,
    postedDate: "1 week ago",
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Design Agency",
    location: "New York, NY",
    salary: "$90k - $130k",
    experience: "3+ years",
    skills: ["Figma", "Adobe XD", "UI Design", "User Research", "Prototyping"],
    description: "We're seeking a talented UI/UX designer to create beautiful interfaces and experiences for our clients. You should have a strong portfolio showing your design process.",
    matchPercentage: 78,
    postedDate: "3 days ago",
  },
  {
    id: "4",
    title: "Backend Developer",
    company: "FinTech Innovations",
    location: "Boston, MA",
    salary: "$90k - $130k",
    experience: "2-4 years",
    skills: ["Python", "Django", "PostgreSQL", "API Design", "Docker"],
    description: "Join our backend team to develop scalable services for our financial platform. You'll work on API design, database optimization, and integrating with third-party services.",
    matchPercentage: 80,
    postedDate: "5 days ago",
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "Cloud Services Ltd",
    location: "Remote",
    salary: "$110k - $140k",
    experience: "3-6 years",
    skills: ["AWS", "Kubernetes", "Docker", "CI/CD", "Terraform"],
    description: "We're looking for a DevOps engineer to help us build and maintain our cloud infrastructure. You'll be responsible for deployment pipelines, monitoring, and infrastructure as code.",
    matchPercentage: 70,
    postedDate: "1 week ago",
  },
  {
    id: "6",
    title: "Product Manager",
    company: "SaaS Platform",
    location: "Austin, TX",
    salary: "$120k - $150k",
    experience: "4+ years",
    skills: ["Product Management", "Agile", "User Research", "Analytics", "Roadmapping"],
    description: "Lead the development of our SaaS platform by defining product vision, gathering requirements, and working with cross-functional teams to deliver features that delight customers.",
    matchPercentage: 65,
    postedDate: "2 weeks ago",
  },
  {
    id: "7",
    title: "Data Scientist",
    company: "Analytics Inc.",
    location: "Chicago, IL",
    salary: "$95k - $140k",
    experience: "2-5 years",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistical Analysis"],
    description: "Turn data into insights that drive business decisions. You'll work on developing models, analyzing trends, and presenting findings to stakeholders.",
    matchPercentage: 72,
    postedDate: "4 days ago",
  },
];

const Jobs = () => {
  const [jobs, setJobs] = useState(allJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleFilterChange = (filters: any) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let filteredJobs = [...allJobs];
      
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
      
      setJobs(filteredJobs);
      setIsLoading(false);
    }, 800);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (!searchQuery.trim()) {
        setJobs(allJobs);
      } else {
        const query = searchQuery.toLowerCase();
        const filteredJobs = allJobs.filter(job => 
          job.title.toLowerCase().includes(query) || 
          job.company.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.skills.some((skill: string) => skill.toLowerCase().includes(query))
        );
        setJobs(filteredJobs);
      }
      
      setIsLoading(false);
    }, 800);
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
            />
          </div>
          <Button type="submit" className="bg-jobright-blue">
            Search
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <SlidersHorizontal size={18} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Job Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-4">
                <JobFilters onFilterChange={handleFilterChange} />
              </div>
            </SheetContent>
          </Sheet>
        </form>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar - Desktop */}
        <div className="w-full md:w-72 flex-shrink-0">
          <JobFilters onFilterChange={handleFilterChange} />
        </div>
        
        {/* Job Results */}
        <div className="flex-grow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {isLoading ? 'Searching...' : `${jobs.length} Jobs Found`}
            </h2>
            
            <Button variant="ghost" size="sm" onClick={resetSearch} disabled={isLoading} className="text-gray-500">
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
      </div>
    </div>
  );
};

export default Jobs;
