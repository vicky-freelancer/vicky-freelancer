import React, { useCallback, useState } from 'react';
import { UploadCloud, FileAudio, FileVideo, AlertCircle, Loader2 } from 'lucide-react';
import { TranscriptionStatus } from '../types';

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  status: TranscriptionStatus;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileSelect, status }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const validateFile = (file: File): boolean => {
    // Basic validation for audio/video MIME types
    const validTypes = [
      'audio/mpeg', 'audio/wav', 'audio/mp3', 'audio/x-m4a', 'audio/aac',
      'video/mp4', 'video/mpeg', 'video/webm', 'video/quicktime'
    ];
    
    // Check approximate size (50MB limit)
    const maxSize = 50 * 1024 * 1024; 

    if (!validTypes.some(type => file.type.includes(type) || file.type.startsWith('audio/') || file.type.startsWith('video/'))) {
      setDragError("Unsupported file type. Please upload audio or video files.");
      return false;
    }

    if (file.size > maxSize) {
      setDragError("File too large. Please upload files smaller than 50MB.");
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setDragError(null);

    if (status === TranscriptionStatus.PROCESSING || status === TranscriptionStatus.UPLOADING) return;

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      if (validateFile(files[0])) {
        onFileSelect(files[0]);
      }
    }
  }, [onFileSelect, status]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDragError(null);
    const files = e.target.files;
    if (files && files.length > 0) {
      if (validateFile(files[0])) {
        onFileSelect(files[0]);
      }
    }
  }, [onFileSelect]);

  const isLoading = status === TranscriptionStatus.PROCESSING || status === TranscriptionStatus.UPLOADING;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ease-in-out
          ${isDragging 
            ? 'border-indigo-500 bg-slate-800 scale-[1.02] shadow-xl shadow-indigo-500/10' 
            : 'border-slate-700 hover:border-indigo-500 hover:bg-slate-800/50'
          }
          ${isLoading ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'cursor-pointer'}
          bg-slate-900 shadow-lg
        `}
      >
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileInput}
          accept="audio/*,video/*"
          disabled={isLoading}
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          {isLoading ? (
             <div className="bg-slate-800 p-4 rounded-full animate-pulse ring-1 ring-indigo-500/50">
                <Loader2 className="h-10 w-10 text-indigo-400 animate-spin" />
             </div>
          ) : (
            <div className="bg-slate-800 p-4 rounded-full group-hover:scale-110 transition-transform duration-300 ring-1 ring-slate-700">
               <UploadCloud className={`h-10 w-10 text-indigo-400 ${isDragging ? 'animate-bounce' : ''}`} />
            </div>
          )}

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white">
              {isLoading ? 'Processing File...' : 'Click to upload or drag and drop'}
            </h3>
            <p className="text-slate-400 text-sm">
              MP3, MP4, WAV, M4A (Max 50MB)
            </p>
          </div>

          {!isLoading && (
            <div className="flex gap-4 pt-4">
              <span className="inline-flex items-center text-xs font-medium text-slate-400 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
                <FileAudio className="w-3 h-3 mr-1.5 text-indigo-400" /> Audio
              </span>
              <span className="inline-flex items-center text-xs font-medium text-slate-400 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full">
                <FileVideo className="w-3 h-3 mr-1.5 text-indigo-400" /> Video
              </span>
            </div>
          )}
        </div>
      </div>

      {dragError && (
        <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center gap-3 text-red-300 animate-fade-in">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm font-medium">{dragError}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;