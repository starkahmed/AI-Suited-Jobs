
import { useState } from "react";
import ResumeUploader from "@/components/ResumeUploader";
import AnalyzingState from "@/components/resume/AnalyzingState";
import ResultsState from "@/components/resume/ResultsState";
import { extractedSkills, improvementSuggestions } from "@/data/resumeData";

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
        return <ResumeUploader onUploadSuccess={handleUploadSuccess} />;
      
      case "analyzing":
        return <AnalyzingState analysisProgress={analysisProgress} />;
      
      case "results":
        return <ResultsState extractedSkills={extractedSkills} improvementSuggestions={improvementSuggestions} />;
      
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
