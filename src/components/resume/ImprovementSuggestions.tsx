
import { AlertCircle, Lightbulb, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ImprovementCategory {
  category: string;
  suggestions: string[];
}

interface ImprovementSuggestionsProps {
  suggestions: ImprovementCategory[];
}

const ImprovementSuggestions = ({ suggestions }: ImprovementSuggestionsProps) => {
  const [implementedSuggestions, setImplementedSuggestions] = useState<Record<string, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredSuggestions = activeCategory 
    ? suggestions.filter(s => s.category === activeCategory) 
    : suggestions;

  const handleToggleSuggestion = (category: string, suggestionIndex: number) => {
    const key = `${category}-${suggestionIndex}`;
    setImplementedSuggestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getSuggestionStatus = (category: string, suggestionIndex: number) => {
    const key = `${category}-${suggestionIndex}`;
    return implementedSuggestions[key] || false;
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-6">Resume Improvement Suggestions</h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        <Button 
          variant={activeCategory === null ? "default" : "outline"} 
          size="sm" 
          onClick={() => setActiveCategory(null)}
          className={activeCategory === null ? "bg-jobright-blue" : ""}
        >
          All
        </Button>
        {suggestions.map((section) => (
          <Button
            key={section.category}
            variant={activeCategory === section.category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(section.category)}
            className={activeCategory === section.category ? "bg-jobright-blue" : ""}
          >
            {section.category}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredSuggestions.map((section, idx) => (
          <div key={idx} className="border border-gray-100 rounded-lg p-4">
            <h4 className="font-medium mb-3">{section.category}</h4>
            <ul className="space-y-2">
              {section.suggestions.map((suggestion, sIdx) => {
                const isImplemented = getSuggestionStatus(section.category, sIdx);
                return (
                  <li 
                    key={sIdx} 
                    className={`flex items-start ${isImplemented ? 'text-gray-400' : 'text-gray-700'}`}
                    onClick={() => handleToggleSuggestion(section.category, sIdx)}
                  >
                    {isImplemented ? (
                      <CheckCircle className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    ) : (
                      <AlertCircle className="text-jobright-purple mr-2 mt-1 flex-shrink-0" size={16} />
                    )}
                    <span className={isImplemented ? 'line-through' : ''}>{suggestion}</span>
                  </li>
                );
              })}
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
              Tailor your resume for each job application by emphasizing the skills and experiences most relevant to the specific position. 
              This can significantly increase your match percentage.
            </p>
            <div className="mt-3">
              <Badge className="bg-green-100 text-green-700 border-green-300 hover:bg-green-200">
                Click on suggestions to mark them as implemented
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ImprovementSuggestions;
