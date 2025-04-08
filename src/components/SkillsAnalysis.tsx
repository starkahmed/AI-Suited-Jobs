
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Skill {
  name: string;
  level: number;
  category: string;
  suggestions?: string[];
}

interface SkillsAnalysisProps {
  skills: Skill[];
  onSkillAdd?: (skill: string) => void;
  onSkillRemove?: (skill: string) => void;
}

const SkillsAnalysis = ({
  skills: initialSkills,
  onSkillAdd,
  onSkillRemove,
}: SkillsAnalysisProps) => {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [newSkill, setNewSkill] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  const filteredSkills = activeCategory
    ? skills.filter((skill) => skill.category === activeCategory)
    : skills;

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    const skill: Skill = {
      name: newSkill.trim(),
      level: 50, // Default level
      category: activeCategory || "Other",
    };

    setSkills([...skills, skill]);
    if (onSkillAdd) onSkillAdd(newSkill.trim());
    setNewSkill("");
  };

  const handleRemoveSkill = (skillName: string) => {
    setSkills(skills.filter((skill) => skill.name !== skillName));
    if (onSkillRemove) onSkillRemove(skillName);
  };

  const getLevelLabel = (level: number): string => {
    if (level < 25) return "Beginner";
    if (level < 50) return "Intermediate";
    if (level < 75) return "Advanced";
    return "Expert";
  };

  const getProgressColor = (level: number): string => {
    if (level < 25) return "bg-orange-400";
    if (level < 50) return "bg-yellow-400";
    if (level < 75) return "bg-blue-400";
    return "bg-green-500";
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Skills Analysis</h3>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          variant={activeCategory === null ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveCategory(null)}
          className={activeCategory === null ? "bg-jobright-blue" : ""}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category === activeCategory ? null : category)}
            className={activeCategory === category ? "bg-jobright-blue" : ""}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="flex items-center mb-6">
        <Input
          placeholder="Add a skill..."
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="flex-1"
        />
        <Button 
          className="ml-2" 
          onClick={handleAddSkill}
          disabled={!newSkill.trim()}
        >
          <Plus size={16} className="mr-1" /> Add
        </Button>
      </div>

      <div className="space-y-5">
        {filteredSkills.map((skill) => (
          <div key={skill.name} className="border border-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{skill.name}</h4>
                  <Badge variant="outline" className="bg-gray-50">
                    {skill.category}
                  </Badge>
                </div>
                <div className="flex items-center mt-1">
                  <Progress 
                    value={skill.level} 
                    className={`h-2 w-36 ${getProgressColor(skill.level)}`} 
                  />
                  <span className="ml-2 text-sm text-gray-500">
                    {getLevelLabel(skill.level)}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveSkill(skill.name)}
              >
                <Trash2 size={16} className="text-gray-400 hover:text-red-500" />
              </Button>
            </div>

            {skill.suggestions && skill.suggestions.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <h5 className="text-sm text-gray-500 mb-2">Suggested Improvements:</h5>
                <ul className="space-y-1">
                  {skill.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <ArrowUpRight size={14} className="mr-1 mt-1 text-jobright-blue" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {filteredSkills.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            {activeCategory
              ? `No skills found in ${activeCategory} category`
              : "No skills found. Add skills to get started."
            }
          </div>
        )}
      </div>
    </Card>
  );
};

export default SkillsAnalysis;
