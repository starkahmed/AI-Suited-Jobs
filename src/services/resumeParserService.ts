
import { toast } from "@/hooks/use-toast";

export interface ParsedResume {
  skills: {
    name: string;
    level: number;
    category: string;
    suggestions?: string[];
  }[];
  // Additional fields that could be extracted
  personalInfo?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  experience?: {
    title?: string;
    company?: string;
    date?: string;
    description?: string;
  }[];
  education?: {
    degree?: string;
    institution?: string;
    date?: string;
  }[];
}

// Mock AI parsing for demonstration - in a real app, replace with actual API call
const mockParseWithAI = async (file: File): Promise<ParsedResume> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real implementation, this would be an API call to a backend service
  // that uses AI models like OpenAI, spaCy, or pyresparser
  
  // For now, simulate different results based on filename to show variety
  const filename = file.name.toLowerCase();
  
  if (filename.includes("developer") || filename.includes("engineer")) {
    return {
      skills: [
        { name: "JavaScript", level: 85, category: "Programming" },
        { name: "React", level: 80, category: "Framework" },
        { name: "Node.js", level: 75, category: "Backend" },
        { name: "TypeScript", level: 70, category: "Programming" },
        { name: "Git", level: 90, category: "Tool" },
        { name: "REST API", level: 85, category: "Web Development" },
        { name: "Problem Solving", level: 80, category: "Soft Skill" },
        { name: "Team Leadership", level: 70, category: "Soft Skill" }
      ]
    };
  } else if (filename.includes("design") || filename.includes("ux")) {
    return {
      skills: [
        { name: "Figma", level: 90, category: "Tool" },
        { name: "UI Design", level: 85, category: "Design" },
        { name: "User Research", level: 80, category: "UX" },
        { name: "Wireframing", level: 90, category: "Design" },
        { name: "Adobe XD", level: 75, category: "Tool" },
        { name: "Prototyping", level: 85, category: "Design" },
        { name: "Design Thinking", level: 90, category: "Methodology" },
        { name: "Visual Communication", level: 85, category: "Soft Skill" }
      ]
    };
  } else if (filename.includes("manager") || filename.includes("lead")) {
    return {
      skills: [
        { name: "Project Management", level: 90, category: "Management" },
        { name: "Team Leadership", level: 85, category: "Soft Skill" },
        { name: "Agile/Scrum", level: 80, category: "Methodology" },
        { name: "Stakeholder Management", level: 85, category: "Management" },
        { name: "Strategic Planning", level: 75, category: "Management" },
        { name: "Risk Management", level: 80, category: "Management" },
        { name: "Communication", level: 90, category: "Soft Skill" },
        { name: "Conflict Resolution", level: 85, category: "Soft Skill" }
      ]
    };
  } else {
    // Default skills for any other resume
    return {
      skills: [
        { name: "Communication", level: 80, category: "Soft Skill" },
        { name: "Problem Solving", level: 75, category: "Soft Skill" },
        { name: "Microsoft Office", level: 85, category: "Tool" },
        { name: "Time Management", level: 80, category: "Soft Skill" },
        { name: "Teamwork", level: 90, category: "Soft Skill" },
        { name: "Adaptability", level: 85, category: "Soft Skill" },
        { name: "Organization", level: 80, category: "Soft Skill" }
      ]
    };
  }
};

export const parseResume = async (file: File): Promise<ParsedResume> => {
  try {
    // Validate file type first
    const validTypes = [
      "application/pdf", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if (!validTypes.includes(file.type)) {
      throw new Error("Invalid file format. Please upload a PDF or DOCX file.");
    }
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error("File size exceeds 5MB limit.");
    }
    
    // In a real app, you would call your backend API here
    // For now, we'll use the mock function
    const parsedData = await mockParseWithAI(file);
    
    // Store the parsed data in localStorage for future use
    localStorage.setItem("aisuitedjobs_parsed_resume", JSON.stringify(parsedData));
    
    return parsedData;
  } catch (error) {
    let message = "Failed to parse resume";
    if (error instanceof Error) {
      message = error.message;
    }
    toast({
      title: "Resume parsing failed",
      description: message,
      variant: "destructive"
    });
    throw error;
  }
};
