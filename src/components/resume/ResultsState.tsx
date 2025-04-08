
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileCheck, Download, Share2 } from "lucide-react";

interface ResultsStateProps {
  onStartOver: () => void;
}

const ResultsState = ({ onStartOver }: ResultsStateProps) => {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm mb-8">
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 p-4 rounded-full">
          <FileCheck className="text-green-600" size={32} />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2">Analysis Complete!</h2>
      <p className="text-gray-600 text-center mb-6">
        We've analyzed your resume and prepared personalized feedback and improvement suggestions.
      </p>
      
      <div className="flex justify-center gap-4 mb-8">
        <Button variant="outline" onClick={onStartOver}>
          Upload Another Resume
        </Button>
        <Button className="bg-jobright-blue">
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>
      
      <Card className="p-4 bg-blue-50 border border-blue-100">
        <div className="flex items-start">
          <Share2 className="text-jobright-blue mr-3 flex-shrink-0 mt-1" size={20} />
          <div>
            <h4 className="font-medium mb-1">Share Your Results</h4>
            <p className="text-sm text-gray-600">
              Get additional feedback by sharing your results with career coaches or mentors.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResultsState;
