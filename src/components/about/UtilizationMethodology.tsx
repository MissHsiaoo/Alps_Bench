import React from 'react';
import { ArrowRight, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';

// Task 4: 5 evaluation dimensions (PA, PF, VRA, CF, EI) - same CheckCircle2 + colors as UtilizationDemo
const DIMENSIONS = [
  { abbr: 'PA', color: 'from-green-500 to-emerald-600' },
  { abbr: 'PF', color: 'from-yellow-500 to-amber-600' },
  { abbr: 'VRA', color: 'from-cyan-500 to-teal-600' },
  { abbr: 'CF', color: 'from-orange-500 to-red-600' },
  { abbr: 'EI', color: 'from-pink-500 to-rose-600' },
];

export const UtilizationMethodology = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-800/50 rounded-xl border border-slate-700/50 p-4 sm:p-6">
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-1">Evaluation Methodology</h3>
        <p className="text-xs text-slate-500">5 Dimensions: PA, PF, VRA, CF, EI</p>
      </div>
      <div className="flex items-center justify-center gap-2 sm:gap-4 w-full overflow-x-auto">
        <div className="flex-1 min-w-0 max-w-md">
          <div className="bg-gradient-to-br from-blue-600/80 to-cyan-600/80 rounded-xl p-3 sm:p-4 shadow-lg border-2 border-blue-500/30">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/30">
              <MessageCircle className="w-4 h-4 text-white" />
              <div className="font-bold text-sm text-white">Input</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
              <div className="text-[10px] text-white/90 font-medium mb-2">Dialogue</div>
              <div className="text-[10px] text-white/90 leading-relaxed italic mb-2">"What should I plant?"</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {DIMENSIONS.map((dim, idx) => (
                  <div key={idx} className={`bg-gradient-to-br ${dim.color} rounded-lg p-2 flex flex-col items-center justify-center border border-white/30 shadow-sm`}>
                    <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                    <span className="text-[8px] font-bold text-white/90 mt-0.5">{dim.abbr}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0">
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400" strokeWidth={2.5} />
        </div>
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-br from-indigo-600/80 to-purple-600/80 rounded-2xl w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center shadow-lg border-2 border-indigo-500/30 relative">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white absolute top-0.5 right-0.5 opacity-60" />
            <div className="text-xl sm:text-2xl md:text-3xl">🤖</div>
          </div>
          <div className="text-center text-[9px] sm:text-[10px] font-bold text-slate-400 mt-1 sm:mt-2 uppercase tracking-wider">Utilize</div>
        </div>
        <div className="flex-shrink-0">
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-amber-400" strokeWidth={2.5} />
        </div>
        <div className="flex-1 min-w-0 max-w-md">
          <div className="bg-gradient-to-br from-purple-600/80 to-pink-600/80 rounded-xl p-3 sm:p-4 shadow-lg border-2 border-purple-500/30">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/30">
              <Sparkles className="w-4 h-4 text-white" />
              <div className="font-bold text-sm text-white">Output</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/20">
              <div className="text-[10px] text-white/90 font-medium mb-2">Response (5-Dim Evaluation)</div>
              <div className="flex flex-wrap gap-2 justify-center">
                {DIMENSIONS.map((dim, idx) => (
                  <div key={idx} className={`bg-gradient-to-br ${dim.color} rounded-lg p-2 flex flex-col items-center justify-center border border-white/30 shadow-sm`}>
                    <CheckCircle2 className="w-4 h-4 text-white" strokeWidth={2.5} />
                    <span className="text-[8px] font-bold text-white/90 mt-0.5">{dim.abbr}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
