import { useState, useCallback } from "react";
import { Upload, File, X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FileUpload = ({ onFileUpload }: { onFileUpload: (file: File) => void }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFile = files.find(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );

    if (validFile) {
      handleFileUpload(validFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setUploadedFile(file);
    setIsUploading(false);
    onFileUpload(file);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3">
          <span className="gradient-text">Upload Company Documents</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload company profiles, preferences, or additional requirements to help our AI 
          generate more targeted search prompts.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Upload Area */}
        {!uploadedFile && (
          <div
            className={`drag-zone glass-card p-8 text-center ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isUploading ? (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center animate-pulse">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Uploading...</h3>
                  <div className="w-32 h-2 bg-secondary rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-primary rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-white" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Drag & drop your files here
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse and upload
                  </p>
                  
                  <input
                    type="file"
                    accept=".pdf,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="btn-gradient" asChild>
                      <span className="cursor-pointer">
                        Choose Files
                      </span>
                    </Button>
                  </label>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>Supported formats: PDF, DOCX</p>
                  <p>Maximum file size: 10MB</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Uploaded File Display */}
        {uploadedFile && (
          <div className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">{uploadedFile.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Uploaded successfully
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={removeFile}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* File Analysis Preview */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <File className="h-4 w-4 mr-2 text-brand-purple" />
                Document Analysis
              </h4>
              <div className="bg-secondary/50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  ✓ Company preferences extracted<br/>
                  ✓ Industry context identified<br/>
                  ✓ Culture keywords detected
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;