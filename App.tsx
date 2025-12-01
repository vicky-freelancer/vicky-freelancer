import React, { useState } from 'react';
import { Sparkles, Zap, Shield } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import FileUploader from './components/FileUploader';
import TranscriptionResult from './components/TranscriptionResult';
import { TranscriptionStatus, TranscriptionResult as ResultType } from './types';
import { readFileAsBase64, transcribeMedia } from './services/geminiService';

const App: React.FC = () => {
  const [status, setStatus] = useState<TranscriptionStatus>(TranscriptionStatus.IDLE);
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    try {
      setStatus(TranscriptionStatus.UPLOADING);
      setError(null);

      // Convert file to Base64
      const base64Data = await readFileAsBase64(file);

      setStatus(TranscriptionStatus.PROCESSING);

      // Call Gemini API
      const transcriptionText = await transcribeMedia(base64Data, file.type);

      setResult({
        text: transcriptionText,
        fileName: file.name,
        timestamp: new Date()
      });
      setStatus(TranscriptionStatus.COMPLETED);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during transcription.");
      setStatus(TranscriptionStatus.ERROR);
    }
  };

  const handleReset = () => {
    setStatus(TranscriptionStatus.IDLE);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          {/* Abstract Background Effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight mb-8 drop-shadow-sm">
              Convert Video <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">to Text with AI</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 font-light">
              Transform your audio and video content into accurate, editable text instantly. 
              Powered by advanced Gemini AI models for lightning-fast transcription.
            </p>

            {/* Error Display */}
            {status === TranscriptionStatus.ERROR && (
              <div className="max-w-2xl mx-auto mb-8 bg-red-900/20 border border-red-800 text-red-200 px-6 py-4 rounded-xl flex items-center justify-center gap-3">
                <span className="font-semibold">Error:</span> {error}
                <button onClick={handleReset} className="underline hover:text-white ml-4">Try Again</button>
              </div>
            )}

            {/* Main Interaction Area */}
            <div className="mb-20">
              {status === TranscriptionStatus.COMPLETED && result ? (
                <TranscriptionResult result={result} onReset={handleReset} />
              ) : (
                <FileUploader onFileSelect={handleFileSelect} status={status} />
              )}
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all duration-300 group">
                <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-900/50 transition-colors">
                  <Zap className="h-6 w-6 text-indigo-400 group-hover:text-indigo-300" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Lightning Fast</h3>
                <p className="text-slate-400 leading-relaxed">
                  Experience near-instant transcription. Our optimized AI pipeline processes lengthy video and audio files in seconds, not minutes.
                </p>
              </div>
              
              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all duration-300 group">
                <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-900/50 transition-colors">
                  <Sparkles className="h-6 w-6 text-indigo-400 group-hover:text-indigo-300" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Precision Accuracy</h3>
                <p className="text-slate-400 leading-relaxed">
                  Leveraging Gemini 1.5 Flash Vision capabilities to understand context, accents, and specialized terminology with high fidelity.
                </p>
              </div>

              <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all duration-300 group">
                <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-900/50 transition-colors">
                  <Shield className="h-6 w-6 text-indigo-400 group-hover:text-indigo-300" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">Secure & Private</h3>
                <p className="text-slate-400 leading-relaxed">
                  Your files are processed in a secure environment and are never stored permanently or used for model training.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-slate-900 py-24 border-y border-slate-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/10 via-slate-900 to-slate-900"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white">How it works</h2>
              <p className="text-slate-400 mt-4 text-lg">Three simple steps to perfect transcription</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
               <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-800 z-0"></div>
               
               <div className="relative z-10 text-center group">
                 <div className="bg-slate-900 border border-slate-700 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-indigo-400 mx-auto mb-6 shadow-lg shadow-indigo-900/20 group-hover:scale-110 transition-transform duration-300 group-hover:border-indigo-500">1</div>
                 <h3 className="text-xl font-semibold mb-3 text-white">Upload Media</h3>
                 <p className="text-slate-400 leading-relaxed">Select your video or audio file. We support all common formats like MP4, MP3, WAV, and more.</p>
               </div>

               <div className="relative z-10 text-center group">
                 <div className="bg-slate-900 border border-slate-700 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-indigo-400 mx-auto mb-6 shadow-lg shadow-indigo-900/20 group-hover:scale-110 transition-transform duration-300 group-hover:border-indigo-500">2</div>
                 <h3 className="text-xl font-semibold mb-3 text-white">AI Analysis</h3>
                 <p className="text-slate-400 leading-relaxed">Our advanced multimodal AI listens to the audio track and accurately transcribes speech to text.</p>
               </div>

               <div className="relative z-10 text-center group">
                 <div className="bg-slate-900 border border-slate-700 w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-indigo-400 mx-auto mb-6 shadow-lg shadow-indigo-900/20 group-hover:scale-110 transition-transform duration-300 group-hover:border-indigo-500">3</div>
                 <h3 className="text-xl font-semibold mb-3 text-white">Get Result</h3>
                 <p className="text-slate-400 leading-relaxed">Copy the text to your clipboard or download the transcript as a .txt file instantly.</p>
               </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;