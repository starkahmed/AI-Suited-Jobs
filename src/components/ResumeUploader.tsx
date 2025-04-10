
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileUp, FileText, CheckCircle, AlertCircle, Loader2, Upload, XCircle } from "lucide-react";
import { parseResume, ParsedResume } from "@/services/resumeParserService"; 

interface ResumeUploaderProps {
  onUploadSuccess?: (file: File, parsedData: ParsedResume) => void;
  onUploadError?: (error: string) => void;
}

const ResumeUploader = ({ onUploadSuccess, onUploadError }: ResumeUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "parsing" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (uploadStatus === "uploading" || uploadStatus === "parsing") return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [uploadStatus]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (uploadStatus === "uploading" || uploadStatus === "parsing") return;
    
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [uploadStatus]);

  const processFile = (file: File) => {
    setFile(file);
    setUploadStatus("uploading");
    setUploadProgress(0);
    setErrorMessage("");
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          parseResumeFile(file);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  const parseResumeFile = async (file: File) => {
    setUploadStatus("parsing");
    
    try {
      const parsedData = await parseResume(file);
      
      // Set success state
      setUploadStatus("success");
      
      // Notify parent component
      if (onUploadSuccess) {
        onUploadSuccess(file, parsedData);
      }
      
      toast({
        title: "Resume parsed successfully",
        description: `We've extracted ${parsedData.skills.length} skills from your resume.`,
      });
      
    } catch (error) {
      setUploadStatus("error");
      let message = "Failed to parse resume";
      
      if (error instanceof Error) {
        message = error.message;
      }
      
      setErrorMessage(message);
      
      if (onUploadError) {
        onUploadError(message);
      }
    }
  };

  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus("idle");
    setErrorMessage("");
  };

  return (
    <Card className={`p-6 transition-all duration-300 ${isDragging ? "border-dashed border-2 border-jobright-blue bg-blue-50/50 shadow-md transform -translate-y-1" : "hover:shadow-md"}`}>
      <div
        className="flex flex-col items-center justify-center min-h-[250px] cursor-pointer rounded-lg"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (uploadStatus !== "uploading" && uploadStatus !== "parsing" && !file) {
            document.getElementById("resume-upload")?.click();
          }
        }}
      >
        {uploadStatus === "idle" && !file && (
          <>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-full mb-5 animate-pulse">
              <Upload size={40} className="text-jobright-blue" />
            </div>
            <h3 className="font-semibold text-xl mb-3">Upload Your Resume</h3>
            <p className="text-gray-500 text-center mb-4 max-w-sm">
              Drag and drop your resume file here, or click to browse
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Supported formats: PDF, DOCX (max 5MB)
            </p>
            <Button variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 text-jobright-blue">
              Select File
            </Button>
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileInput}
            />
          </>
        )}

        {uploadStatus === "uploading" && (
          <div className="w-full max-w-sm animate-fade-in">
            <div className="flex items-center mb-4">
              <Loader2 className="animate-spin mr-2 text-jobright-blue" size={20} />
              <span className="font-medium">Uploading resume...</span>
            </div>
            <Progress value={uploadProgress} className="h-2 bg-gray-100" />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500 truncate max-w-[200px]">
                {file?.name}
              </span>
              <span className="text-sm font-medium">
                {uploadProgress}%
              </span>
            </div>
          </div>
        )}
        
        {uploadStatus === "parsing" && (
          <div className="text-center animate-fade-in">
            <div className="mb-4">
              <Loader2 size={40} className="animate-spin mx-auto text-jobright-blue" />
            </div>
            <h3 className="font-semibold text-xl mb-2">Analyzing Your Resume</h3>
            <p className="text-gray-500 mb-4">
              Our AI is extracting skills from your resume...
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              <div className="px-3 py-1 bg-gray-100 rounded-full animate-pulse">
                <span className="text-xs text-gray-500">JavaScript</span>
              </div>
              <div className="px-3 py-1 bg-gray-100 rounded-full animate-pulse delay-75">
                <span className="text-xs text-gray-500">React</span>
              </div>
              <div className="px-3 py-1 bg-gray-100 rounded-full animate-pulse delay-150">
                <span className="text-xs text-gray-500">TypeScript</span>
              </div>
              <div className="px-3 py-1 bg-gray-100 rounded-full animate-pulse delay-300">
                <span className="text-xs text-gray-500">UX Design</span>
              </div>
            </div>
            <p className="text-sm text-gray-400">This may take a moment...</p>
          </div>
        )}

        {uploadStatus === "success" && (
          <div className="text-center animate-fade-in">
            <div className="bg-green-50 p-4 rounded-full mb-4 mx-auto w-fit">
              <CheckCircle size={36} className="text-green-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Analysis Complete!</h3>
            <p className="text-gray-500 mb-4 truncate max-w-[250px] mx-auto">
              {file?.name}
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Skills extracted successfully. View your results below.
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                resetUpload();
              }}
            >
              Upload a different file
            </Button>
          </div>
        )}

        {uploadStatus === "error" && (
          <div className="text-center animate-fade-in">
            <div className="bg-red-50 p-4 rounded-full mb-4 mx-auto w-fit">
              <XCircle size={36} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Upload Failed</h3>
            <p className="text-gray-500 mb-4">
              {errorMessage || "There was a problem analyzing your resume."}
            </p>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                resetUpload();
              }}
              className="bg-gradient-to-r from-jobright-blue to-jobright-purple"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResumeUploader;
