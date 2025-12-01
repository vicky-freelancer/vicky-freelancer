import React, { useState } from 'react';
import { Copy, Check, Download, RotateCcw } from 'lucide-react';
import { TranscriptionResult as ResultType } from '../types';

interface TranscriptionResultProps {
  result: ResultType;
  onReset: () => void;
}

const TranscriptionResult: React.FC<TranscriptionResultProps> = ({ result, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([result.text], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${result.fileName.split('.')[0]}_transcript.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in-up">
      <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
        <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-100">Transcription Result</h3>
            <span className="text-xs text-slate-400 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full truncate max-w-[200px]">
              {result.fileName}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-indigo-500 rounded-lg transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-800 border border-slate-700 hover:border-indigo-500 rounded-lg transition-all"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
            <button 
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-all shadow-lg shadow-indigo-500/20"
            >
              <RotateCcw className="w-4 h-4" />
              New File
            </button>
          </div>
        </div>
        
        <div className="p-0">
          <textarea 
            className="w-full h-96 p-6 bg-slate-950/50 text-slate-300 leading-relaxed focus:outline-none resize-none text-base font-mono"
            defaultValue={result.text}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
};

export default TranscriptionResult;