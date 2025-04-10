
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Loader2, Code, PieChart, CheckCircle, Database } from "lucide-react";
import { useState, useEffect } from "react";

interface AnalyzingStateProps {
  fileName: string;
}

const AnalyzingState = ({ fileName }: AnalyzingStateProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  
  const analysisSteps = [
    { text: "Extracting text from resume...", icon: <FileText className="text-jobright-blue" size={20} /> },
    { text: "Identifying skills and experience...", icon: <Code className="text-jobright-blue" size={20} /> },
    { text: "Analyzing resume format...", icon: <PieChart className="text-jobright-blue" size={20} /> },
    { text: "Matching with job market requirements...", icon: <Database className="text-jobright-blue" size={20} /> },
    { text: "Generating recommendations...", icon: <CheckCircle className="text-jobright-blue" size={20} /> }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + 3, 100);
      });
      
      setCurrentStep((prev) => {
        const newStep = Math.min(Math.floor(progress / 20), analysisSteps.length - 1);
        return newStep;
      });
    }, 120);
    
    return () => clearInterval(interval);
  }, [progress]);
  
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-jobright-blue to-jobright-purple">Analyzing Your Resume</h1>
      
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
        
        <Progress value={progress} className="h-2 mb-4 bg-gray-100" />
        
        <div className="space-y-4 mt-6">
          {analysisSteps.map((step, index) => (
            <div 
              key={index} 
              className={`flex items-center gap-3 transition-all duration-300 ${
                index === currentStep 
                  ? "text-jobright-blue font-medium" 
                  : index < currentStep 
                    ? "text-gray-500 opacity-50" 
                    : "text-gray-400 opacity-30"
              }`}
            >
              {index === currentStep ? (
                <div className="animate-pulse">{step.icon}</div>
              ) : (
                step.icon
              )}
              <span className="text-sm">
                {step.text}
                {index === currentStep && (
                  <span className="inline-block ml-1 animate-pulse">...</span>
                )}
                {index < currentStep && (
                  <CheckCircle className="inline-block ml-2 text-green-500" size={16} />
                )}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AnalyzingState;
