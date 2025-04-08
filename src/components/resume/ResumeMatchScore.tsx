
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CircleCheck, TrendingUp } from "lucide-react";

interface ScoreCategory {
  name: string;
  score: number;
}

interface ResumeMatchScoreProps {
  overall: number;
  categories: ScoreCategory[];
}

const ResumeMatchScore = ({ overall, categories }: ResumeMatchScoreProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-jobright-blue";
    return "bg-orange-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Improvement";
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">Resume Match Score</h3>
      
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          <div className="w-40 h-40 rounded-full border-8 border-gray-100 flex items-center justify-center">
            <div>
              <p className="text-4xl font-bold text-center">{overall}%</p>
              <p className="text-gray-500 text-center text-sm">Overall Match</p>
            </div>
          </div>
          <div className="absolute -top-2 -right-2 bg-green-100 p-2 rounded-full">
            <CircleCheck className="text-green-600" size={24} />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {categories.map((category, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{category.name}</span>
              <div className="flex items-center">
                <span className="text-sm font-medium">{category.score}%</span>
                {category.score > 75 && (
                  <TrendingUp className="ml-1 text-green-600" size={14} />
                )}
              </div>
            </div>
            <Progress 
              value={category.score} 
              className={`h-2 ${getScoreColor(category.score)}`} 
            />
            <div className="mt-1">
              <span className="text-xs text-gray-500">{getScoreLabel(category.score)}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ResumeMatchScore;
