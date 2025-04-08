
import { useState } from "react";
import ResumeUploader from "@/components/ResumeUploader";
import AnalyzingState from "@/components/resume/AnalyzingState";
import ResultsState from "@/components/resume/ResultsState";
import SkillsAnalysis from "@/components/SkillsAnalysis";
import ImprovementSuggestions from "@/components/resume/ImprovementSuggestions";
import ResumeMatchScore from "@/components/resume/ResumeMatchScore";
import KeywordMatches from "@/components/resume/KeywordMatches";
import { 
  extractedSkills, 
  improvementSuggestions, 
  resumeMatchScore,
  keywordMatches 
} from "@/data/resumeData";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

type AnalysisState = "idle" | "analyzing" | "results";

const ResumeAnalyzer = () => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  
  const handleUploadSuccess = (file: File) => {
    setResumeFile(file);
    setAnalysisState("analyzing");
    
    // Simulate analysis delay
    setTimeout(() => {
      setAnalysisState("results");
    }, 3000);
  };
  
  const handleStartOver = () => {
    setAnalysisState("idle");
    setResumeFile(null);
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      {analysisState === "idle" && (
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Resume Analyzer</h1>
          <p className="text-gray-600 mb-8">
            Upload your resume to get AI-powered analysis of your skills and suggestions for improvement. We'll analyze your resume and match it with job market requirements.
          </p>
          
          <ResumeUploader onUploadSuccess={handleUploadSuccess} />
          
          <div className="mt-12 rounded-lg bg-blue-50 p-6">
            <h3 className="font-semibold text-lg mb-3">What happens after you upload your resume?</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-jobright-blue text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                <span>Our AI analyzes your resume's content, format, and structure</span>
              </li>
              <li className="flex items-start">
                <span className="bg-jobright-blue text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                <span>We extract your skills, experience, and qualifications</span>
              </li>
              <li className="flex items-start">
                <span className="bg-jobright-blue text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                <span>You get personalized suggestions to improve your resume</span>
              </li>
              <li className="flex items-start">
                <span className="bg-jobright-blue text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</span>
                <span>We match your resume with job market requirements</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {analysisState === "analyzing" && (
        <AnalyzingState fileName={resumeFile?.name || "resume.pdf"} />
      )}
      
      {analysisState === "results" && (
        <div>
          <div className="mb-6">
            <Button variant="outline" size="sm" onClick={handleStartOver}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Upload Another Resume
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Resume Analysis Results</h1>
          <p className="text-gray-600 mb-8">
            Analysis of {resumeFile?.name || "your resume"}
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <ResumeMatchScore 
              overall={resumeMatchScore.overall} 
              categories={resumeMatchScore.categories} 
            />
            <div className="lg:col-span-2">
              <KeywordMatches keywords={keywordMatches} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ImprovementSuggestions suggestions={improvementSuggestions} />
            </div>
            <div>
              <SkillsAnalysis 
                skills={extractedSkills} 
                onSkillAdd={(skill) => console.log("Added skill:", skill)}
                onSkillRemove={(skill) => console.log("Removed skill:", skill)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
