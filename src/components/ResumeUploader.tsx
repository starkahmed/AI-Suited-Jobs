
import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileUp, FileText, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ResumeUploaderProps {
  onUploadSuccess?: (file: File) => void;
  onUploadError?: (error: string) => void;
}

const ResumeUploader = ({ onUploadSuccess, onUploadError }: ResumeUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
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
    
    if (uploadStatus === "uploading") return;
    
    const files = e.dataTransfer.files;
    processFile(files[0]);
  }, [uploadStatus]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (uploadStatus === "uploading") return;
    
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [uploadStatus]);

  const processFile = (file: File) => {
    if (!validateFile(file)) {
      toast({
        title: "Invalid file",
        description: "Please upload a PDF, DOCX, or TXT file (max 5MB)",
        variant: "destructive",
      });
      
      if (onUploadError) onUploadError("Invalid file format or size");
      return;
    }

    setFile(file);
    simulateUpload(file);
  };

  const validateFile = (file: File): boolean => {
    const validTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain"];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  const simulateUpload = (file: File) => {
    setUploadStatus("uploading");
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("success");
          
          // Simulate backend processing
          setTimeout(() => {
            toast({
              title: "Resume uploaded successfully",
              description: "We're analyzing your resume...",
            });
            
            if (onUploadSuccess) onUploadSuccess(file);
          }, 500);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadProgress(0);
    setUploadStatus("idle");
  };

  return (
    <Card className={`p-6 ${isDragging ? "border-dashed border-2 border-jobright-blue bg-blue-50/50" : ""}`}>
      <div
        className="flex flex-col items-center justify-center min-h-[250px] cursor-pointer"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => {
          if (uploadStatus !== "uploading" && !file) {
            document.getElementById("resume-upload")?.click();
          }
        }}
      >
        {uploadStatus === "idle" && !file && (
          <>
            <div className="bg-blue-50 p-4 rounded-full mb-4">
              <FileUp size={36} className="text-jobright-blue" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Upload Your Resume</h3>
            <p className="text-gray-500 text-center mb-4 max-w-sm">
              Drag and drop your resume file here, or click to browse
            </p>
            <p className="text-sm text-gray-400">
              Supported formats: PDF, DOCX, TXT (max 5MB)
            </p>
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              onChange={handleFileInput}
            />
          </>
        )}

        {uploadStatus === "uploading" && (
          <div className="w-full max-w-sm">
            <div className="flex items-center mb-4">
              <Loader2 className="animate-spin mr-2 text-jobright-blue" size={20} />
              <span className="font-medium">Uploading resume...</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-gray-500">
                {file?.name}
              </span>
              <span className="text-sm font-medium">
                {uploadProgress}%
              </span>
            </div>
          </div>
        )}

        {uploadStatus === "success" && (
          <div className="text-center">
            <div className="bg-green-50 p-4 rounded-full mb-4 mx-auto w-fit">
              <CheckCircle size={36} className="text-green-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Upload Complete!</h3>
            <p className="text-gray-500 mb-4">
              {file?.name}
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
          <div className="text-center">
            <div className="bg-red-50 p-4 rounded-full mb-4 mx-auto w-fit">
              <AlertCircle size={36} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Upload Failed</h3>
            <p className="text-gray-500 mb-4">
              There was a problem uploading your file.
            </p>
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                resetUpload();
              }}
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
