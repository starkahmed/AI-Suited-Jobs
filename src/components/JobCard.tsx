
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { BookmarkPlus, BookmarkCheck, Building2, MapPin, Briefcase, DollarSign, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  skills: string[];
  description: string;
  matchPercentage?: number;
  postedDate: string;
  logoUrl?: string;
  source?: "LinkedIn" | "Naukri" | "Glassdoor" | string;
  onSave?: (id: string) => void;
  onApply?: (id: string) => void;
}

const JobCard = ({
  id,
  title,
  company,
  location,
  salary,
  experience,
  skills,
  description,
  matchPercentage,
  postedDate,
  logoUrl,
  source,
  onSave,
  onApply,
}: JobCardProps) => {
  const [saved, setSaved] = useState(false);
  const { toast } = useToast();

  // Function to get source logo and color
  const getSourceInfo = (source?: string) => {
    if (!source) return { color: "bg-gray-100 text-gray-600" };
    
    switch(source.toLowerCase()) {
      case "linkedin":
        return { color: "bg-blue-100 text-blue-600 border-blue-200" };
      case "naukri":
        return { color: "bg-orange-100 text-orange-600 border-orange-200" };
      case "glassdoor":
        return { color: "bg-green-100 text-green-600 border-green-200" };
      default:
        return { color: "bg-gray-100 text-gray-600" };
    }
  };

  const sourceInfo = getSourceInfo(source);

  const handleSave = () => {
    setSaved(!saved);
    if (onSave) onSave(id);
    
    toast({
      title: saved ? "Removed from saved jobs" : "Job saved successfully",
      description: saved ? "This job has been removed from your saved list" : "This job has been added to your saved jobs",
      duration: 3000,
    });
  };

  const handleApply = () => {
    if (onApply) onApply(id);
    
    toast({
      title: "Application submitted",
      description: "Your application has been submitted successfully",
      duration: 3000,
    });
  };

  return (
    <Card className="p-6 card-hover hover:bg-card-gradient">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={`${company} logo`} 
              className="w-12 h-12 object-contain rounded-md"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
              <Building2 className="text-gray-400" />
            </div>
          )}
          
          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-gray-600">{company}</p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="inline-flex items-center text-sm text-gray-500">
                <MapPin size={16} className="mr-1" /> {location}
              </span>
              <span className="inline-flex items-center text-sm text-gray-500">
                <Briefcase size={16} className="mr-1" /> {experience}
              </span>
              <span className="inline-flex items-center text-sm text-gray-500">
                <DollarSign size={16} className="mr-1" /> {salary}
              </span>
            </div>
          </div>
        </div>
        
        {matchPercentage && (
          <div className="text-right">
            <div className={`
              text-white font-bold rounded-full w-12 h-12 flex items-center justify-center
              ${matchPercentage >= 80 ? 'bg-green-500' : 
                matchPercentage >= 60 ? 'bg-jobright-blue' : 
                'bg-orange-500'}
            `}>
              {matchPercentage}%
            </div>
            <span className="text-xs text-gray-500 block mt-1">Match</span>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <p className="text-gray-700 line-clamp-2">{description}</p>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.slice(0, 4).map((skill, index) => (
          <Badge key={index} variant="outline" className="bg-blue-50 text-jobright-blue border-jobright-blue/20">
            {skill}
          </Badge>
        ))}
        {skills.length > 4 && (
          <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-300/20">
            +{skills.length - 4} more
          </Badge>
        )}
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Posted {postedDate}</span>
          
          {source && (
            <Badge variant="outline" className={`flex items-center gap-1 ${sourceInfo.color}`}>
              <Globe size={12} />
              {source}
            </Badge>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm"
            className={saved ? "text-jobright-purple" : "text-gray-500"}
            onClick={handleSave}
          >
            {saved ? <BookmarkCheck size={16} className="mr-1" /> : <BookmarkPlus size={16} className="mr-1" />}
            {saved ? "Saved" : "Save"}
          </Button>
          
          <Button 
            size="sm" 
            className="bg-jobright-blue hover:bg-jobright-blue/90"
            onClick={handleApply}
          >
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
