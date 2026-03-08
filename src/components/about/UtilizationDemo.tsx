import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export const UtilizationDemo = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const timeline = [
      { time: 0, step: 0 },
      { time: 500, step: 1 },
      { time: 1500, step: 2 },
      { time: 2000, step: 3 },
      { time: 2200, step: 4 },
      { time: 2400, step: 5 },
      { time: 2600, step: 6 },
      { time: 2800, step: 7 },
      { time: 3000, step: 8 },
      { time: 3500, step: 0 },
    ];
    let timers: NodeJS.Timeout[] = [];
    const runTimeline = () => {
      timers = timeline.map(({ time, step: targetStep }) =>
        setTimeout(() => setStep(targetStep), time)
      );
    };
    runTimeline();
    const loopInterval = setInterval(runTimeline, 4000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loopInterval);
    };
  }, []);

  const processing = step === 1;
  const outputShown = step >= 2;
  const evaluating = step >= 3;

  const dimensions = [
    { id: 'pa', abbr: 'PA', name: 'Persona Awareness', color: 'green', activeStep: 4 },
    { id: 'pf', abbr: 'PF', name: 'Preference Following', color: 'yellow', activeStep: 5 },
    { id: 'vra', abbr: 'VRA', name: 'Virtual-Reality Awareness', color: 'cyan', activeStep: 6 },
    { id: 'cf', abbr: 'CF', name: 'Constraint Following', color: 'orange', activeStep: 7 },
    { id: 'ei', abbr: 'EI', name: 'Emotional Intelligence', color: 'pink', activeStep: 8 },
  ];

  const getColorClasses = (color: string, isActive: boolean) => {
    const baseInactiveBg = theme === 'light' ? 'bg-slate-100/30' : 'bg-slate-800/30';
    const baseInactiveBorder = theme === 'light' ? 'border-slate-300' : 'border-slate-700';
    const baseInactiveText = theme === 'light' ? 'text-slate-400' : 'text-slate-500';
    const colors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
      green: { bg: isActive ? 'bg-green-500/20' : baseInactiveBg, border: isActive ? 'border-green-500' : baseInactiveBorder, text: isActive ? 'text-green-400' : baseInactiveText, glow: 'shadow-green-500/50' },
      yellow: { bg: isActive ? 'bg-yellow-500/20' : baseInactiveBg, border: isActive ? 'border-yellow-500' : baseInactiveBorder, text: isActive ? 'text-yellow-400' : baseInactiveText, glow: 'shadow-yellow-500/50' },
      cyan: { bg: isActive ? 'bg-cyan-500/20' : baseInactiveBg, border: isActive ? 'border-cyan-500' : baseInactiveBorder, text: isActive ? 'text-cyan-400' : baseInactiveText, glow: 'shadow-cyan-500/50' },
      orange: { bg: isActive ? 'bg-orange-500/20' : baseInactiveBg, border: isActive ? 'border-orange-500' : baseInactiveBorder, text: isActive ? 'text-orange-400' : baseInactiveText, glow: 'shadow-orange-500/50' },
      pink: { bg: isActive ? 'bg-pink-500/20' : baseInactiveBg, border: isActive ? 'border-pink-500' : baseInactiveBorder, text: isActive ? 'text-pink-400' : baseInactiveText, glow: 'shadow-pink-500/50' },
    };
    return colors[color] || colors.green;
  };

  const relevantMemories = [
    { icon: '🌹', label: 'Graham Thomas rose', type: 'PLANT' },
    { icon: '☀️', label: 'Balcony / Sunlight', type: 'LOCATION' },
    { icon: '🎨', label: 'Yellow flowers', type: 'PREFERENCE' },
    { icon: '💧', label: 'Low maintenance', type: 'CONSTRAINT' },
  ];

  const bgMain = theme === 'light' ? 'bg-white' : 'bg-slate-950';
  const bgCard = theme === 'light' ? 'bg-slate-50' : 'bg-slate-900/40';
  const borderCard = theme === 'light' ? 'border-slate-300' : 'border-slate-700/50';
  const textPrimary = theme === 'light' ? 'text-slate-800' : 'text-slate-300';
  const textSecondary = theme === 'light' ? 'text-slate-600' : 'text-slate-300';
  const textMuted = theme === 'light' ? 'text-slate-500' : 'text-slate-400';
  const textBody = theme === 'light' ? 'text-slate-700' : 'text-slate-200';
  const textBodyMuted = theme === 'light' ? 'text-slate-600' : 'text-slate-300';
  const bgContext = theme === 'light' ? 'bg-white/50 border-slate-300/50' : 'bg-slate-800/50 border-slate-700/50';
  const bgQuery = theme === 'light' ? 'bg-white border-slate-300' : 'bg-slate-800 border-slate-700';
  const bgQueryProcessing = theme === 'light' ? 'bg-white border-blue-400/50 shadow-lg shadow-blue-500/20' : 'bg-slate-800 border-blue-400/50 shadow-lg shadow-blue-500/20';
  const bgMemoryPool = theme === 'light' ? 'bg-slate-100/50' : 'bg-slate-950/50';
  const borderMemoryPool = theme === 'light' ? 'border-slate-300/50' : 'border-slate-700/30';
  const borderMemoryPoolProcessing = theme === 'light' ? 'border-blue-400/50 shadow-lg shadow-blue-500/20' : 'border-blue-400/50 shadow-lg shadow-blue-500/20';
  const bgMemoryCard = theme === 'light' ? 'bg-white/60 border-slate-300/50' : 'bg-slate-800/40 border-slate-700/50';
  const bgMemoryCardProcessing = theme === 'light' ? 'bg-blue-100/80 border-blue-500/50 animate-pulse' : 'bg-slate-800/60 border-blue-500/50 animate-pulse';
  const bgOutput = theme === 'light' ? 'bg-slate-100/50' : 'bg-slate-950/50';
  const borderOutput = theme === 'light' ? 'border-slate-300/50' : 'border-slate-700/30';
  const textOutput = theme === 'light' ? 'text-blue-800' : 'text-blue-100';
  const scanningText = theme === 'light' ? 'text-amber-600' : 'text-yellow-400';
  const highlightYellow = theme === 'light' ? 'text-amber-600' : 'text-yellow-300';
  const highlightPink = theme === 'light' ? 'text-pink-600' : 'text-pink-300';
  const highlightCyan = theme === 'light' ? 'text-cyan-600' : 'text-cyan-300';
  const highlightEmerald = theme === 'light' ? 'text-emerald-600' : 'text-emerald-300';
  const iconInactive = theme === 'light' ? 'border-slate-300 bg-slate-100/30 text-slate-400' : 'border-slate-700 bg-slate-800/30 text-slate-600';

  return (
    <div className={`flex flex-col h-full min-h-0 gap-3 p-3 text-xs font-sans overflow-hidden ${bgMain}`}>
      <div className={`rounded-xl ${bgCard} p-3 border ${borderCard} h-[60%]`}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className={`text-[9px] uppercase tracking-widest ${textPrimary} font-bold`}>Input</div>
          {processing && <span className={`${scanningText} animate-pulse text-[9px]`}>● PROCESSING...</span>}
        </div>
        <div className="grid grid-cols-2 gap-3 h-[calc(100%-28px)]">
          <div className="space-y-2.5 flex flex-col justify-center">
            <div className={`text-[7px] ${textPrimary} font-bold mb-1`}>Context & Query</div>
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-[11px] text-white font-bold">U</div>
              <div className={`${bgContext} p-2.5 rounded-xl border ${textBodyMuted} text-[11px] leading-relaxed flex-1`}>"I love gardening on my balcony."</div>
            </div>
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-[11px] text-white font-bold">U</div>
              <div className={`p-2.5 rounded-xl border ${textBody} text-[11px] leading-relaxed transition-all duration-500 flex-1 ${processing ? bgQueryProcessing : bgQuery}`}>
                Looking for a <span className={`${highlightYellow} font-semibold`}>yellow rose</span>, worried about <span className={`${highlightPink} font-semibold`}>maintenance</span>.
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className={`text-[7px] ${textPrimary} font-bold mb-2`}>Relevant Memories</div>
            <div className={`rounded-xl ${bgMemoryPool} p-2 border transition-all duration-500 flex-1 ${processing ? borderMemoryPoolProcessing : borderMemoryPool}`}>
              <div className="grid grid-cols-2 gap-1.5 h-full">
                {relevantMemories.map((memory, index) => (
                  <div key={index} className={`rounded-lg p-2 border transition-all duration-300 flex flex-col items-center justify-center gap-1 ${processing ? bgMemoryCardProcessing : bgMemoryCard}`}>
                    <div className="text-xl">{memory.icon}</div>
                    <div className="flex-1 min-w-0 text-center">
                      <div className={`text-[6px] uppercase tracking-wider font-bold ${textMuted}`}>{memory.type}</div>
                      <div className={`text-[9px] leading-tight font-medium ${textBody}`}>{memory.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`rounded-xl ${bgCard} p-2.5 border ${borderCard} h-[40%] flex flex-col`}>
        <div className="mb-1.5">
          <div className="flex items-center gap-1.5 mb-1">
            <div className={`text-[9px] uppercase tracking-widest ${textPrimary} font-bold`}>Output</div>
            <div className={`text-[7px] ${textSecondary}`}>Generated Response</div>
          </div>
          <div className={`rounded-lg ${bgOutput} p-2 border transition-all duration-700 ${
            evaluating ? 'border-emerald-400/50 shadow-lg shadow-emerald-500/20' : outputShown ? 'border-blue-400/50 shadow-lg shadow-blue-500/20' : borderOutput
          }`}>
            <div className={`flex gap-2 items-center transition-all duration-500 ${outputShown ? 'opacity-100 blur-0' : 'opacity-30 blur-sm'}`}>
              <div className="w-5 h-5 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-[9px] text-white font-bold">AI</div>
              <div className={`flex-1 text-[10px] leading-relaxed ${textOutput}`}>
                Perfect! The <span className={`${highlightYellow} font-semibold`}>Graham Thomas rose</span> would be ideal for your <span className={`${highlightCyan} font-semibold`}>sunny balcony</span>. It's quite <span className={`${highlightEmerald} font-semibold`}>low-maintenance</span> - perfect for busy schedules.
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center min-h-0">
          <div className={`text-[7px] uppercase tracking-widest ${textPrimary} font-bold mb-1 text-center`}>Multi-Dimensional Evaluation</div>
          <div className="flex items-center justify-center gap-3">
            {dimensions.map((dim) => {
              const isActive = step >= dim.activeStep;
              const colors = getColorClasses(dim.color, isActive);
              return (
                <div key={dim.id} className="flex flex-col items-center gap-0.5">
                  <div className={`relative w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    isActive ? `${colors.border} ${colors.bg} scale-110 shadow-lg ${colors.glow}` : `${iconInactive} scale-100 opacity-40`
                  }`}>
                    <CheckCircle2 className={`w-3 h-3 transition-colors duration-300 ${isActive ? colors.text : (theme === 'light' ? 'text-slate-400' : 'text-slate-600')}`} strokeWidth={2.5} />
                    {isActive && <div className={`absolute inset-0 rounded-full ${colors.border} animate-ping opacity-20`} />}
                  </div>
                  <div className={`text-[5.5px] font-black tracking-wider transition-colors ${isActive ? colors.text : (theme === 'light' ? 'text-slate-400' : 'text-slate-600')}`}>{dim.abbr}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
