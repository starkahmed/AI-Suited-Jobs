
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tag } from "lucide-react";

interface KeywordMatch {
  keyword: string;
  count: number;
  important: boolean;
}

interface KeywordMatchesProps {
  keywords: KeywordMatch[];
}

const KeywordMatches = ({ keywords }: KeywordMatchesProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center mb-4">
        <Tag className="mr-2 text-jobright-blue" size={20} />
        <h3 className="text-xl font-semibold">Keyword Matches</h3>
      </div>
      
      <p className="text-gray-600 mb-4">
        These keywords were identified in your resume. Important keywords have a higher impact on your match score.
      </p>
      
      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword, idx) => (
          <Badge 
            key={idx} 
            className={`
              ${keyword.important 
                ? 'bg-blue-100 text-jobright-blue border-jobright-blue/20 hover:bg-blue-200' 
                : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
              }
              text-sm py-1 px-3
            `}
          >
            {keyword.keyword} ({keyword.count})
            {keyword.important && <span className="ml-1 text-xs">★</span>}
          </Badge>
        ))}
      </div>
    </Card>
  );
};

export default KeywordMatches;
