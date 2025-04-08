
import { AlertCircle, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ImprovementCategory {
  category: string;
  suggestions: string[];
}

interface ImprovementSuggestionsProps {
  suggestions: ImprovementCategory[];
}

const ImprovementSuggestions = ({ suggestions }: ImprovementSuggestionsProps) => {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">Resume Improvement Suggestions</h3>
      
      <div className="space-y-6">
        {suggestions.map((section, idx) => (
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
  );
};

export default ImprovementSuggestions;
