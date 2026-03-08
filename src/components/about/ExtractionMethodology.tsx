import React from 'react';
import { ArrowRight, MessageCircle, Database, Sparkles } from 'lucide-react';

export const ExtractionMethodology = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 sm:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-1">Evaluation Methodology</h3>
        <p className="text-xs text-slate-500">Input → Process → Output</p>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-4 w-full overflow-x-auto">
        <div className="flex-1 min-w-0 max-w-md">
          <div className="bg-gradient-to-br from-blue-600/80 to-cyan-600/80 rounded-xl p-3 sm:p-4 shadow-lg border-2 border-blue-500/30">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/30">
              <MessageCircle className="w-4 h-4 text-white" />
              <div className="font-bold text-sm text-white">Input</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
              <div className="text-xs text-white/90 font-medium mb-1">Dialogue</div>
              <div className="text-[11px] text-white/90 leading-relaxed italic">"I'm replacing the gardenias on the balcony with roses. I love white flowers..."</div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400" strokeWidth={2.5} />
        </div>
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-br from-indigo-600/80 to-purple-600/80 rounded-2xl w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg border-2 border-indigo-500/30 relative">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white absolute top-0.5 right-0.5 opacity-60" />
            <div className="text-xl sm:text-2xl md:text-3xl">🤖</div>
          </div>
          <div className="text-center text-[9px] sm:text-[10px] font-bold text-slate-400 mt-1 sm:mt-2 uppercase tracking-wider">Extract</div>
        </div>
        <div className="flex-shrink-0">
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0 max-w-md">
          <div className="bg-gradient-to-br from-emerald-600/80 to-teal-600/80 rounded-xl p-3 sm:p-4 shadow-lg border-2 border-emerald-500/30">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/30">
              <Database className="w-4 h-4 text-white" />
              <div className="font-bold text-sm text-white">Output</div>
            </div>
            <div className="bg-slate-800/80 rounded-lg p-2.5 border border-slate-600/50">
              <div className="space-y-1">
                <div className="text-[10px] text-slate-300"><span className="font-semibold">Type:</span> indirect</div>
                <div className="text-[10px] text-slate-300"><span className="font-semibold">Label:</span> preference/music</div>
                <div className="text-[10px] text-slate-500">...</div>
                <div className="text-[10px] text-slate-300"><span className="font-semibold">Confidence:</span> 0.8</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
