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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="gradient-text">Upload Company Documents</span>
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          Upload company profiles, preferences, or additional requirements to help our AI 
          generate more targeted and personalized search prompts.
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Upload Area */}
        {!uploadedFile && (
          <div
            className={`drag-zone glass-card p-12 text-center transition-all duration-500 ${
              isDragOver ? 'drag-over scale-105' : ''
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isUploading ? (
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center animate-pulse shadow-lg">
                  <Upload className="h-10 w-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">Uploading Document...</h3>
                  <div className="w-48 h-3 bg-gray-200 rounded-full mx-auto overflow-hidden">
                    <div className="h-full bg-gradient-primary rounded-full animate-pulse shadow-sm"></div>
                  </div>
                  <p className="text-gray-500 mt-3">Analyzing content with AI</p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg">
                  <Upload className="h-10 w-10 text-white" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    Drag & drop your files here
                  </h3>
                  <p className="text-gray-600 mb-6 text-lg">
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
                    <Button className="btn-gradient text-lg px-8 py-3 rounded-xl font-semibold" asChild>
                      <span className="cursor-pointer hover:scale-105 transition-all duration-300">
                        Choose Files
                      </span>
                    </Button>
                  </label>
                </div>

                <div className="flex justify-center space-x-8 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span>PDF, DOCX supported</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>Max 10MB</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Uploaded File Display */}
        {uploadedFile && (
          <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-green-100 border border-green-200 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{uploadedFile.name}</h3>
                  <p className="text-gray-600">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Uploaded successfully
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={removeFile}
                className="hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            {/* File Analysis Preview */}
            <div className="border-t border-gray-200 pt-6">
              <h4 className="text-lg font-bold mb-4 flex items-center text-gray-900">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                  <File className="h-4 w-4 text-purple-600" />
                </div>
                Document Analysis Complete
              </h4>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-gray-700 font-medium">Company preferences extracted</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-gray-700 font-medium">Industry context identified</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </span>
                    <span className="text-gray-700 font-medium">Culture keywords detected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;