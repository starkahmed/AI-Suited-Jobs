
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JobCard from "@/components/JobCard";
import SkillsAnalysis from "@/components/SkillsAnalysis";
import { 
  BarChart3, 
  Bookmark, 
  BriefcaseBusiness, 
  Building2, 
  CheckCircle, 
  FileBarChart, 
  FileCheck
} from "lucide-react";

// Sample data
const sampleJobs = [
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
  }
];

const sampleSkills = [
  {
    name: "React",
    level: 85,
    category: "Frontend",
    suggestions: ["Add more complex state management examples to your portfolio", "Highlight experience with React hooks"]
  },
  {
    name: "TypeScript",
    level: 70,
    category: "Frontend",
    suggestions: ["Add TypeScript to more projects", "Show examples of advanced type usage"]
  },
  {
    name: "Node.js",
    level: 60,
    category: "Backend",
  },
  {
    name: "CSS",
    level: 80,
    category: "Frontend",
  },
  {
    name: "JavaScript",
    level: 90,
    category: "Frontend",
  },
  {
    name: "MongoDB",
    level: 40,
    category: "Backend",
    suggestions: ["Gain more experience with complex MongoDB queries", "Add projects using MongoDB aggregations"]
  },
  {
    name: "AWS",
    level: 30,
    category: "DevOps",
    suggestions: ["Consider getting an AWS certification", "Add more cloud deployment experience to your resume"]
  }
];

const Dashboard = () => {
  const [savedJobs, setSavedJobs] = useState(sampleJobs.slice(0, 2));
  const [appliedJobs, setAppliedJobs] = useState([sampleJobs[2]]);
  
  const handleSaveJob = (jobId: string) => {
    const isJobSaved = savedJobs.some(job => job.id === jobId);
    
    if (isJobSaved) {
      setSavedJobs(savedJobs.filter(job => job.id !== jobId));
    } else {
      const jobToSave = sampleJobs.find(job => job.id === jobId);
      if (jobToSave) {
        setSavedJobs([...savedJobs, jobToSave]);
      }
    }
  };
  
  const handleApplyJob = (jobId: string) => {
    const isJobApplied = appliedJobs.some(job => job.id === jobId);
    
    if (!isJobApplied) {
      const jobToApply = sampleJobs.find(job => job.id === jobId);
      if (jobToApply) {
        setAppliedJobs([...appliedJobs, jobToApply]);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <h1 className="text-3xl font-bold mb-8">Your Job Dashboard</h1>
      
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Card className="p-6 flex items-center">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <Building2 className="text-jobright-blue" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Job Matches</p>
            <p className="text-2xl font-bold">{sampleJobs.length}</p>
          </div>
        </Card>
        
        <Card className="p-6 flex items-center">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <Bookmark className="text-jobright-purple" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Saved Jobs</p>
            <p className="text-2xl font-bold">{savedJobs.length}</p>
          </div>
        </Card>
        
        <Card className="p-6 flex items-center">
          <div className="bg-green-100 p-3 rounded-full mr-4">
            <CheckCircle className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Applied Jobs</p>
            <p className="text-2xl font-bold">{appliedJobs.length}</p>
          </div>
        </Card>
        
        <Card className="p-6 flex items-center">
          <div className="bg-orange-100 p-3 rounded-full mr-4">
            <BarChart3 className="text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Profile Completeness</p>
            <p className="text-2xl font-bold">85%</p>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="matches">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="matches" className="flex items-center">
                  <BriefcaseBusiness className="mr-2 h-4 w-4" />
                  Matches
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Saved
                </TabsTrigger>
                <TabsTrigger value="applied" className="flex items-center">
                  <FileCheck className="mr-2 h-4 w-4" />
                  Applied
                </TabsTrigger>
              </TabsList>
              
              <Button asChild variant="outline" size="sm">
                <a href="/jobs">View All Jobs</a>
              </Button>
            </div>
            
            <TabsContent value="matches" className="space-y-6">
              {sampleJobs.map((job) => (
                <JobCard
                  key={job.id}
                  {...job}
                  onSave={handleSaveJob}
                  onApply={handleApplyJob}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="saved" className="space-y-6">
              {savedJobs.length > 0 ? (
                savedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    {...job}
                    onSave={handleSaveJob}
                    onApply={handleApplyJob}
                  />
                ))
              ) : (
                <Card className="p-8 text-center">
                  <Bookmark className="mx-auto mb-3 text-gray-400" size={32} />
                  <h3 className="text-lg font-medium mb-2">No saved jobs yet</h3>
                  <p className="text-gray-500 mb-4">
                    Save jobs you're interested in to keep track of them here
                  </p>
                  <Button asChild>
                    <a href="/jobs">Browse Jobs</a>
                  </Button>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="applied" className="space-y-6">
              {appliedJobs.length > 0 ? (
                appliedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    {...job}
                    onSave={handleSaveJob}
                    onApply={handleApplyJob}
                  />
                ))
              ) : (
                <Card className="p-8 text-center">
                  <FileBarChart className="mx-auto mb-3 text-gray-400" size={32} />
                  <h3 className="text-lg font-medium mb-2">No applications yet</h3>
                  <p className="text-gray-500 mb-4">
                    Apply to jobs that match your skills and interests
                  </p>
                  <Button asChild>
                    <a href="/jobs">Find Jobs to Apply</a>
                  </Button>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <SkillsAnalysis 
            skills={sampleSkills} 
            onSkillAdd={(skill) => console.log("Added skill:", skill)}
            onSkillRemove={(skill) => console.log("Removed skill:", skill)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
