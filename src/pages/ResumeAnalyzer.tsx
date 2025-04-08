
import { useState } from "react";
import ResumeUploader from "@/components/ResumeUploader";
import SkillsAnalysis from "@/components/SkillsAnalysis";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileSearch, ArrowRight, AlertCircle, Lightbulb } from "lucide-react";

// Sample data for skills extracted from resume
const extractedSkills = [
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
];

// Sample improvement suggestions
const improvementSuggestions = [
  {
    category: "Work Experience",
    suggestions: [
      "Quantify your achievements with specific metrics and results",
      "Use more action verbs at the beginning of each bullet point",
      "Include specific technologies and tools you used in each role"
    ]
  },
  {
    category: "Skills Section",
    suggestions: [
      "Group your skills by category (e.g., Programming Languages, Frameworks, Tools)",
      "Remove outdated or irrelevant technologies",
      "Add more industry-specific keywords relevant to your target jobs"
    ]
  },
  {
    category: "Education Section",
    suggestions: [
      "Add relevant coursework if you are a recent graduate",
      "Include any certificates or additional training"
    ]
  },
];

const ResumeAnalyzer = () => {
  const [currentStep, setCurrentStep] = useState<"upload" | "analyzing" | "results">("upload");
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const handleUploadSuccess = (file: File) => {
    // Start the analysis process
    setCurrentStep("analyzing");
    simulateAnalysis();
  };

  const simulateAnalysis = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setAnalysisProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setCurrentStep("results");
        }, 500);
      }
    }, 150);
  };
  
  const renderStepContent = () => {
    switch (currentStep) {
      case "upload":
        return (
          <ResumeUploader onUploadSuccess={handleUploadSuccess} />
        );
      
      case "analyzing":
        return (
          <Card className="p-6">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-pulse mb-6">
                <FileSearch size={48} className="text-jobright-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Analyzing Your Resume...</h3>
              <div className="w-full max-w-md mb-2">
                <Progress value={analysisProgress} className="h-2" />
              </div>
              <p className="text-gray-500 text-center">
                Our AI is extracting skills, analyzing experience, and identifying improvement opportunities
              </p>
              
              <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-md">
                <div className="text-center">
                  <div className={`mx-auto mb-2 p-2 rounded-full ${analysisProgress >= 30 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <FileSearch size={20} className={analysisProgress >= 30 ? 'text-green-600' : 'text-gray-400'} />
                  </div>
                  <p className="text-xs text-gray-500">Scanning Content</p>
                </div>
                
                <div className="text-center">
                  <div className={`mx-auto mb-2 p-2 rounded-full ${analysisProgress >= 60 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Badge size={20} className={analysisProgress >= 60 ? 'text-green-600' : 'text-gray-400'} />
                  </div>
                  <p className="text-xs text-gray-500">Extracting Skills</p>
                </div>
                
                <div className="text-center">
                  <div className={`mx-auto mb-2 p-2 rounded-full ${analysisProgress >= 90 ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Lightbulb size={20} className={analysisProgress >= 90 ? 'text-green-600' : 'text-gray-400'} />
                  </div>
                  <p className="text-xs text-gray-500">Recommendations</p>
                </div>
              </div>
            </div>
          </Card>
        );
      
      case "results":
        return (
          <div className="space-y-8">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Resume Analysis Results</h3>
                <Button variant="outline" size="sm">Download Report</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-2">Skills Extracted</p>
                  <p className="text-3xl font-bold text-jobright-blue">{extractedSkills.length}</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-2">Resume Score</p>
                  <p className="text-3xl font-bold text-jobright-purple">72/100</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 mb-2">Improvement Ideas</p>
                  <p className="text-3xl font-bold text-green-600">8</p>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <Button size="lg" className="bg-jobright-blue">
                  Find Matching Jobs <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </Card>
            
            <SkillsAnalysis skills={extractedSkills} />
            
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6">Resume Improvement Suggestions</h3>
              
              <div className="space-y-6">
                {improvementSuggestions.map((section, idx) => (
                  <div key={idx} className="border border-gray-100 rounded-lg p-4">
                    <h4 className="font-medium mb-3">{section.category}</h4>
                    <ul className="space-y-2">
                      {section.suggestions.map((suggestion, sIdx) => (
                        <li key={sIdx} className="flex items-start text-gray-700">
                          <AlertCircle className="text-jobright-purple mr-2 mt-1 flex-shrink-0" size={16} />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <Lightbulb className="text-jobright-blue mr-3 flex-shrink-0" size={24} />
                  <div>
                    <h4 className="font-medium mb-1">Pro Tip</h4>
                    <p className="text-gray-700">
                      Tailor your resume for each job application by emphasizing the skills and experiences most relevant to the specific position. This can significantly increase your match percentage.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      
      default:
        return <ResumeUploader onUploadSuccess={handleUploadSuccess} />;
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">AI Resume Analyzer</h1>
        <p className="text-gray-600 mb-8">
          Upload your resume to get AI-powered insights, skill extraction, and personalized improvement suggestions.
        </p>
        
        {renderStepContent()}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
