
import { useState } from "react";
import ResumeUploader from "@/components/ResumeUploader";
import AnalyzingState from "@/components/resume/AnalyzingState";
import ResultsState from "@/components/resume/ResultsState";
import SkillsAnalysis from "@/components/SkillsAnalysis";
import ImprovementSuggestions from "@/components/resume/ImprovementSuggestions";
import ResumeMatchScore from "@/components/resume/ResumeMatchScore";
import KeywordMatches from "@/components/resume/KeywordMatches";
import { 
  improvementSuggestions, 
  resumeMatchScore,
  keywordMatches 
} from "@/data/resumeData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Upload, BrainCircuit, FileSearch, BriefcaseBusiness } from "lucide-react";
import { ParsedResume } from "@/services/resumeParserService";

type AnalysisState = "idle" | "analyzing" | "results";

const ResumeAnalyzer = () => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [parsedResume, setParsedResume] = useState<ParsedResume | null>(null);
  
  const handleUploadSuccess = (file: File, parsedData: ParsedResume) => {
    setResumeFile(file);
    setParsedResume(parsedData);
    setAnalysisState("analyzing");
    
    // Simulate analysis delay
    setTimeout(() => {
      setAnalysisState("results");
    }, 1500);
  };
  
  const handleStartOver = () => {
    setAnalysisState("idle");
    setResumeFile(null);
    setParsedResume(null);
  };
  
  return (
    <div className="container mx-auto px-4 pt-24 pb-12">
      {analysisState === "idle" && (
        <div className="max-w-3xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-jobright-blue border-jobright-blue/20 hover:bg-blue-200">
            AI-Powered Resume Analysis
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-jobright-blue to-jobright-purple">
            Upload Your Resume
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Our AI will analyze your resume to find your perfect job matches from Naukri, LinkedIn, Glassdoor, and Indeed.
          </p>
          
          <ResumeUploader onUploadSuccess={handleUploadSuccess} />
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-4 transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="pt-6 pb-2">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-50 p-3 rounded-full mb-4">
                    <BrainCircuit className="text-jobright-blue h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Smart Resume Parsing</h3>
                  <p className="text-gray-500 text-sm">
                    Our AI extracts your skills, experience, and qualifications automatically
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-4 transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="pt-6 pb-2">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-purple-50 p-3 rounded-full mb-4">
                    <FileSearch className="text-jobright-purple h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Personalized Job Matches</h3>
                  <p className="text-gray-500 text-sm">
                    Get matched with relevant jobs based on your unique skills and experience
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-4 transition-all hover:-translate-y-1 hover:shadow-md">
              <CardContent className="pt-6 pb-2">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-50 p-3 rounded-full mb-4">
                    <BriefcaseBusiness className="text-green-600 h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">Multi-Platform Search</h3>
                  <p className="text-gray-500 text-sm">
                    Find jobs across Naukri, LinkedIn, Glassdoor, and Indeed in one place
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-none">
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-3">Supported Formats</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">PDF</Badge>
                <Badge variant="secondary">DOCX</Badge>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                For best results, ensure your resume includes relevant skills, experience, and job titles.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
      
      {analysisState === "analyzing" && (
        <AnalyzingState fileName={resumeFile?.name || "resume.pdf"} />
      )}
      
      {analysisState === "results" && parsedResume && (
        <div className="animate-fade-in">
          <div className="mb-6">
            <Button variant="outline" size="sm" onClick={handleStartOver}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Upload Another Resume
            </Button>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-jobright-blue to-jobright-purple">
            Your Resume Analysis
          </h1>
          <p className="text-gray-600 mb-8">
            Here's what we found in {resumeFile?.name || "your resume"}
          </p>
          
          <Card className="mb-8 p-6 border-2 border-dashed border-blue-200 bg-blue-50/20">
            <h2 className="text-lg font-semibold mb-4">Your Skills</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {parsedResume.skills.map((skill, index) => (
                <Badge key={index} className="bg-white text-jobright-blue border border-blue-200">
                  {skill.name}
                </Badge>
              ))}
            </div>
            <Button className="bg-gradient-to-r from-jobright-blue to-jobright-purple" onClick={() => window.location.href = "/jobs"}>
              Find Matching Jobs <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <ResumeMatchScore 
              overall={resumeMatchScore.overall} 
              categories={resumeMatchScore.categories} 
            />
            <div className="lg:col-span-2">
              <KeywordMatches keywords={keywordMatches} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ImprovementSuggestions suggestions={improvementSuggestions} />
            </div>
            <div>
              <SkillsAnalysis 
                skills={parsedResume.skills}
                onSkillAdd={(skill) => console.log("Added skill:", skill)}
                onSkillRemove={(skill) => console.log("Removed skill:", skill)}
              />
            </div>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Button size="lg" className="bg-gradient-to-r from-jobright-blue to-jobright-purple">
              Find Matching Jobs <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzer;
