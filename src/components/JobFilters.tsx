
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Check, Sliders } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const experienceLevels = [
  "All Levels",
  "Entry Level",
  "Internship",
  "Associate",
  "Mid-Level",
  "Senior",
  "Director",
  "Executive",
];

const jobTypes = [
  "All Types",
  "Full-time",
  "Part-time",
  "Contract",
  "Temporary",
  "Internship",
  "Remote",
];

interface JobFiltersProps {
  onFilterChange?: (filters: any) => void;
}

const JobFilters = ({ onFilterChange }: JobFiltersProps) => {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    experienceLevel: "All Levels",
    jobType: "All Types",
    salaryRange: [0, 200],
    skills: ["React", "TypeScript", "UI/UX"],
  });
  
  const [activeSkill, setActiveSkill] = useState("");

  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    if (onFilterChange) {
      onFilterChange(updatedFilters);
    }
  };

  const addSkill = () => {
    if (activeSkill && !filters.skills.includes(activeSkill)) {
      handleFilterChange("skills", [...filters.skills, activeSkill]);
      setActiveSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    handleFilterChange(
      "skills",
      filters.skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const clearAllFilters = () => {
    setFilters({
      keyword: "",
      location: "",
      experienceLevel: "All Levels",
      jobType: "All Types",
      salaryRange: [0, 200],
      skills: [],
    });
    if (onFilterChange) {
      onFilterChange({
        keyword: "",
        location: "",
        experienceLevel: "All Levels",
        jobType: "All Types",
        salaryRange: [0, 200],
        skills: [],
      });
    }
  };

  const formatSalary = (value: number) => {
    if (value === 0) return "$0k";
    if (value === 200) return "$200k+";
    return `$${value}k`;
  };

  // Desktop filter UI
  const DesktopFilters = () => (
    <div className="bg-white rounded-lg p-6 shadow-sm border hidden md:block">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-sm text-gray-500"
          onClick={clearAllFilters}
        >
          Clear all
        </Button>
      </div>

      <div className="space-y-6">
        {/* Search */}
        <div>
          <Label htmlFor="keyword">Keyword</Label>
          <Input
            id="keyword"
            placeholder="Job title, keyword, or company"
            className="mt-2"
            value={filters.keyword}
            onChange={(e) => handleFilterChange("keyword", e.target.value)}
          />
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, state, or zip"
            className="mt-2"
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>

        <Separator />

        {/* Experience Level */}
        <div>
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Select
            value={filters.experienceLevel}
            onValueChange={(value) => handleFilterChange("experienceLevel", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Type */}
        <div>
          <Label htmlFor="jobType">Job Type</Label>
          <Select
            value={filters.jobType}
            onValueChange={(value) => handleFilterChange("jobType", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Salary Range */}
        <div>
          <div className="flex justify-between">
            <Label>Salary Range</Label>
            <span className="text-sm text-gray-500">
              {formatSalary(filters.salaryRange[0])} - {formatSalary(filters.salaryRange[1])}
            </span>
          </div>
          <Slider
            className="mt-4"
            defaultValue={[0, 200]}
            max={200}
            step={10}
            value={filters.salaryRange}
            onValueChange={(value) => handleFilterChange("salaryRange", value)}
          />
        </div>

        <Separator />

        {/* Skills */}
        <div>
          <Label htmlFor="skills">Skills</Label>
          <div className="flex mt-2">
            <Input
              id="skills"
              placeholder="Add a skill"
              className="flex-1"
              value={activeSkill}
              onChange={(e) => setActiveSkill(e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              className="ml-2"
              onClick={addSkill}
              disabled={!activeSkill}
            >
              <Check size={16} />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-3">
            {filters.skills.map((skill) => (
              <Badge 
                key={skill} 
                variant="secondary"
                className="pl-3 pr-2 bg-gray-100"
              >
                {skill}
                <button
                  className="ml-1 hover:text-red-500 focus:outline-none"
                  onClick={() => removeSkill(skill)}
                >
                  ×
                </button>
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Mobile filter sheet UI
  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full mb-4">
              <Sliders className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-lg">
            <SheetHeader>
              <SheetTitle>Job Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              {/* Same content as desktop but in mobile layout */}
              <div>
                <Label htmlFor="keyword-mobile">Keyword</Label>
                <Input
                  id="keyword-mobile"
                  placeholder="Job title, keyword, or company"
                  className="mt-2"
                  value={filters.keyword}
                  onChange={(e) => handleFilterChange("keyword", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="location-mobile">Location</Label>
                <Input
                  id="location-mobile"
                  placeholder="City, state, or zip"
                  className="mt-2"
                  value={filters.location}
                  onChange={(e) => handleFilterChange("location", e.target.value)}
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="experienceLevel-mobile">Experience Level</Label>
                <Select
                  value={filters.experienceLevel}
                  onValueChange={(value) => handleFilterChange("experienceLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="jobType-mobile">Job Type</Label>
                <Select
                  value={filters.jobType}
                  onValueChange={(value) => handleFilterChange("jobType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select job type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div>
                <div className="flex justify-between">
                  <Label>Salary Range</Label>
                  <span className="text-sm text-gray-500">
                    {formatSalary(filters.salaryRange[0])} - {formatSalary(filters.salaryRange[1])}
                  </span>
                </div>
                <Slider
                  className="mt-4"
                  defaultValue={[0, 200]}
                  max={200}
                  step={10}
                  value={filters.salaryRange}
                  onValueChange={(value) => handleFilterChange("salaryRange", value)}
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="skills-mobile">Skills</Label>
                <div className="flex mt-2">
                  <Input
                    id="skills-mobile"
                    placeholder="Add a skill"
                    className="flex-1"
                    value={activeSkill}
                    onChange={(e) => setActiveSkill(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    className="ml-2"
                    onClick={addSkill}
                    disabled={!activeSkill}
                  >
                    <Check size={16} />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {filters.skills.map((skill) => (
                    <Badge 
                      key={skill} 
                      variant="secondary"
                      className="pl-3 pr-2 bg-gray-100"
                    >
                      {skill}
                      <button
                        className="ml-1 hover:text-red-500 focus:outline-none"
                        onClick={() => removeSkill(skill)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
                <Button className="flex-1 bg-jobright-blue">Apply Filters</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Filters */}
      <DesktopFilters />
    </>
  );
};

export default JobFilters;
