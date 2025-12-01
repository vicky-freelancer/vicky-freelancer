import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-semibold text-slate-200 mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition-colors">Discord</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-800">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} vid2txt. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
             <span className="text-slate-500 text-sm">Powered by Gemini API</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;