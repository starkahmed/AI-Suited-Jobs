
import { ArrowRight, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SkillsAnalysis from "@/components/SkillsAnalysis";
import ImprovementSuggestions from "@/components/resume/ImprovementSuggestions";

interface Skill {
  name: string;
  level: number;
  category: string;
  suggestions?: string[];
}

interface ImprovementCategory {
  category: string;
  suggestions: string[];
}

interface ResultsStateProps {
  extractedSkills: Skill[];
  improvementSuggestions: ImprovementCategory[];
}

const ResultsState = ({ extractedSkills, improvementSuggestions }: ResultsStateProps) => {
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
      
      <ImprovementSuggestions suggestions={improvementSuggestions} />
    </div>
  );
};

export default ResultsState;
