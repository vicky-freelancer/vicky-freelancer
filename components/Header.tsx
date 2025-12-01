import React from 'react';
import { Video, Menu } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.location.reload()}>
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-500 transition-colors">
              <Video className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">vid2<span className="text-indigo-400">txt</span></span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-slate-400 hover:text-white font-medium transition-colors">How it works</a>
            <a href="#" className="text-slate-400 hover:text-white font-medium transition-colors">Pricing</a>
            <a href="#" className="text-slate-400 hover:text-white font-medium transition-colors">API</a>
            <a href="#" className="text-slate-400 hover:text-white font-medium transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-4">
             <button className="hidden md:block px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Login
            </button>
            <button className="bg-white text-slate-900 px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-all shadow-md hover:shadow-lg hover:shadow-indigo-500/20">
              Get Started
            </button>
            <div className="md:hidden">
              <Menu className="h-6 w-6 text-slate-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;