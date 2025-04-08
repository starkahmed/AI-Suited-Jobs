
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

interface AnalyzingStateProps {
  fileName: string;
}

const AnalyzingState = ({ fileName }: AnalyzingStateProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const analysisSteps = [
    "Extracting text from resume...",
    "Identifying skills and experience...",
    "Analyzing resume format...",
    "Matching with job market requirements...",
    "Generating recommendations..."
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
      
      setCurrentStep((prev) => {
        const newStep = Math.min(Math.floor(progress / 20), analysisSteps.length - 1);
        return newStep;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, [progress]);
  
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8">Analyzing Your Resume</h1>
      
      <Card className="p-8">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
              <FileText className="text-jobright-blue" size={32} />
            </div>
            <div className="absolute -right-2 -bottom-2 bg-jobright-blue p-2 rounded-full animate-pulse">
              <Loader2 className="text-white animate-spin" size={20} />
            </div>
          </div>
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{fileName}</h3>
        <p className="text-gray-500 mb-6">Our AI is analyzing your resume</p>
        
        <Progress value={progress} className="h-2 mb-4" />
        
        <p className="text-sm text-gray-600 animate-pulse">
          {analysisSteps[currentStep]}
        </p>
      </Card>
    </div>
  );
};

export default AnalyzingState;
