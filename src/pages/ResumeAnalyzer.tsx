
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
                    <div className={analysisProgress >= 60 ? 'text-green-600' : 'text-gray-400'}>
                      <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L13.3536 2.35355ZM15 5.5C15 5.22386 14.7761 5 14.5 5H11C10.7239 5 10.5 5.22386 10.5 5.5C10.5 5.77614 10.7239 6 11 6H14.5C14.7761 6 15 5.77614 15 5.5ZM14.5 10C14.7761 10 15 9.77614 15 9.5C15 9.22386 14.7761 9 14.5 9H11C10.7239 9 10.5 9.22386 10.5 9.5C10.5 9.77614 10.7239 10 11 10H14.5ZM15 13.5C15 13.2239 14.7761 13 14.5 13H11C10.7239 13 10.5 13.2239 10.5 13.5C10.5 13.7761 10.7239 14 11 14H14.5C14.7761 14 15 13.7761 15 13.5ZM2.64645 7.64645C2.84171 7.84171 3.15829 7.84171 3.35355 7.64645C3.54882 7.45118 3.54882 7.1346 3.35355 6.93934L2.64645 7.64645ZM1 5.5L0.646447 5.14645C0.451184 5.34171 0.451184 5.65829 0.646447 5.85355L1 5.5ZM3.35355 4.06066C3.54882 3.8654 3.54882 3.54882 3.35355 3.35355C3.15829 3.15829 2.84171 3.15829 2.64645 3.35355L3.35355 4.06066ZM6.64645 11.6464C6.45118 11.4512 6.1346 11.4512 5.93934 11.6464C5.74408 11.8417 5.74408 12.1583 5.93934 12.3536L6.64645 11.6464ZM8 14L8.35355 14.3536C8.54882 14.1583 8.54882 13.8417 8.35355 13.6464L8 14ZM5.93934 15.6464C5.74408 15.8417 5.74408 16.1583 5.93934 16.3536C6.1346 16.5488 6.45118 16.5488 6.64645 16.3536L5.93934 15.6464ZM12.6464 1.64645L7.97487 6.31802L8.68198 7.02513L13.3536 2.35355L12.6464 1.64645ZM7.97487 6.31802L2.64645 11.6464L3.35355 12.3536L8.68198 7.02513L7.97487 6.31802ZM2.64645 11.6464C1.76638 12.5265 1.76638 13.9453 2.64645 14.8254L3.35355 14.1183C2.8654 13.6301 2.8654 12.8417 3.35355 12.3536L2.64645 11.6464ZM2.64645 14.8254C3.52652 15.7054 4.94535 15.7054 5.82542 14.8254L5.11831 14.1183C4.63017 14.6064 3.8417 14.6064 3.35355 14.1183L2.64645 14.8254ZM5.82542 14.8254L9.41976 11.231L8.71266 10.5239L5.11831 14.1183L5.82542 14.8254ZM9.41976 11.231C9.44457 11.2062 9.44375 11.1679 9.41718 11.1413L8.72792 11.83C8.5304 11.6323 8.52064 11.3211 8.71266 11.1291L9.41976 11.231ZM9.41718 11.1413C9.39094 11.1151 9.35267 11.1143 9.32535 11.1389L10.0145 11.8282C9.8226 12.0001 9.51862 11.9902 9.31586 11.7937C9.31552 11.7934 9.31518 11.793 9.31484 11.7927L8.72792 11.83C8.72792 11.83 8.72791 11.83 8.72791 11.83C8.72928 11.8315 8.73064 11.8329 8.73199 11.8343C8.73404 11.8365 8.73607 11.8386 8.73808 11.8407C8.73908 11.8418 8.74008 11.8428 8.74108 11.8439C8.74159 11.8444 8.7421 11.8449 8.7426 11.8454C8.74311 11.8459 8.74361 11.8465 8.74411 11.847L9.41718 11.1413ZM9.32535 11.1389L6.49644 13.6307L7.18549 14.3199L10.0145 11.8282L9.32535 11.1389ZM6.49644 13.6307C6.38158 13.7322 6.34302 13.8914 6.40493 14.0276L7.33855 13.6587C7.39094 13.7764 7.35761 13.9224 7.18549 14.0199L6.49644 13.6307ZM6.40493 14.0276C6.46615 14.1624 6.6017 14.2442 6.73571 14.2355L6.67905 13.2385C6.80271 13.2305 6.9868 13.5404 7.33855 13.6587L6.40493 14.0276ZM6.73571 14.2355C6.87032 14.2268 6.98591 14.1292 7.01888 13.9982L6.04169 13.7211C6.07236 13.6019 6.554 13.2464 6.67905 13.2385L6.73571 14.2355ZM7.01888 13.9982C7.05076 13.8699 6.99461 13.7354 6.87306 13.6631L6.38536 14.5371C6.25892 14.4612 6.01214 13.8375 6.04169 13.7211L7.01888 13.9982ZM6.87306 13.6631L3.35355 11.6464L2.86585 12.5204L6.38536 14.5371L6.87306 13.6631ZM3.35355 6.93934L1.35355 4.93934L0.646447 5.64645L2.64645 7.64645L3.35355 6.93934ZM1.35355 6.06066L3.35355 4.06066L2.64645 3.35355L0.646447 5.35355L1.35355 6.06066ZM5.93934 12.3536L7.64645 14.0607L8.35355 13.3536L6.64645 11.6464L5.93934 12.3536ZM7.64645 14.0607L7.97487 14.3891L8.68198 13.682L8.35355 13.3536L7.64645 14.0607ZM7.97487 14.3891L5.93934 16.4246L6.64645 17.1317L8.68198 15.0962L7.97487 14.3891Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                      </svg>
                    </div>
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
