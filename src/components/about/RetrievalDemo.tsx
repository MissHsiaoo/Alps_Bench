import React from 'react';

const memoryPool = [
  { icon: '👤', label: 'Software Engineer', type: 'PERSONA', selected: false, order: 1, borderColor: 'border-blue-400', bgColor: 'bg-blue-500/30', shadowColor: 'shadow-blue-500/40', labelColor: 'text-blue-300' },
  { icon: '🎯', label: 'Early adopter', type: 'PERSONA', selected: false, order: 2, borderColor: 'border-blue-400', bgColor: 'bg-blue-500/30', shadowColor: 'shadow-blue-500/40', labelColor: 'text-blue-300' },
  { icon: '🎓', label: 'CS degree, MIT', type: 'EDUCATION', selected: false, order: 3, borderColor: 'border-blue-400', bgColor: 'bg-blue-500/30', shadowColor: 'shadow-blue-500/40', labelColor: 'text-blue-300' },
  { icon: '📚', label: 'Self-taught ML', type: 'EDUCATION', selected: false, order: 4, borderColor: 'border-blue-400', bgColor: 'bg-blue-500/30', shadowColor: 'shadow-blue-500/40', labelColor: 'text-blue-300' },
  { icon: '😊', label: 'Optimistic tone', type: 'EMOTION', selected: false, order: 5, borderColor: 'border-blue-400', bgColor: 'bg-blue-500/30', shadowColor: 'shadow-blue-500/40', labelColor: 'text-blue-300' },
  { icon: '🤔', label: 'Analytical mindset', type: 'EMOTION', selected: false, order: 6, borderColor: 'border-blue-400', bgColor: 'bg-blue-500/30', shadowColor: 'shadow-blue-500/40', labelColor: 'text-blue-300' },
  { icon: '☕', label: 'Morning person', type: 'PREFERENCE', selected: false, order: 7, borderColor: 'border-blue-400', bgColor: 'bg-blue-500/30', shadowColor: 'shadow-blue-500/40', labelColor: 'text-blue-300' },
  { icon: '☀️', label: 'Balcony / High Sunlight', type: 'LOCATION', selected: true, order: 8, borderColor: 'border-blue-400', bgColor: 'bg-blue-500/30', shadowColor: 'shadow-blue-500/40', labelColor: 'text-blue-300' },
];

export const RetrievalDemo = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const timeline = [
      { time: 0, step: 0 },
      { time: 400, step: 1 },
      { time: 1200, step: 2 },
      { time: 2000, step: 3 },
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

  const bgMain = theme === 'light' ? 'bg-white' : 'bg-slate-950';
  const bgCard = theme === 'light' ? 'bg-slate-50' : 'bg-slate-900/40';
  const borderCard = theme === 'light' ? 'border-slate-300' : 'border-slate-700/50';
  const textPrimary = theme === 'light' ? 'text-slate-800' : 'text-slate-300';
  const textSecondary = theme === 'light' ? 'text-slate-600' : 'text-slate-300';
  const textMuted = theme === 'light' ? 'text-slate-400' : 'text-slate-600';
  const textBody = theme === 'light' ? 'text-slate-700' : 'text-slate-200';
  const scanningText = theme === 'light' ? 'text-amber-600' : 'text-yellow-400';
  const successText = theme === 'light' ? 'text-emerald-600' : 'text-emerald-400';
  const highlightYellow = theme === 'light' ? 'text-amber-600' : 'text-yellow-300';
  const highlightCyan = theme === 'light' ? 'text-cyan-600' : 'text-cyan-300';
  const borderPoolInactive = theme === 'light' ? 'border-slate-300/50 bg-slate-100/30' : 'border-slate-700/50 bg-slate-800/30';
  const textPoolInactive = theme === 'light' ? 'text-slate-400' : 'text-slate-600';
  const bgOutputInactive = theme === 'light' ? 'border-slate-300/50 bg-slate-100/50' : 'border-slate-700/30 bg-slate-950/50';
  const textOutputInactive = theme === 'light' ? 'text-slate-400' : 'text-slate-600';
  const textOutputActive = theme === 'light' ? 'text-emerald-700' : 'text-emerald-50';
  const bgQueryHighlight = theme === 'light' ? 'bg-white border-blue-400/50 shadow-lg shadow-blue-500/20' : 'bg-slate-800 border-blue-400/50 shadow-lg shadow-blue-500/20';
  const bgQueryNormal = theme === 'light' ? 'bg-white border-slate-300' : 'bg-slate-800 border-slate-700';

  return (
    <div className={`flex flex-col h-full min-h-0 gap-3 p-3 text-xs font-sans overflow-hidden ${bgMain}`}>
      <div className={`rounded-xl ${bgCard} p-3 border ${borderCard} h-[60%]`}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className={`text-[9px] uppercase tracking-widest ${textPrimary} font-bold`}>Input</div>
          {step === 1 && <span className={`${scanningText} animate-pulse text-[9px]`}>● ANALYZING...</span>}
        </div>
        <div className="grid grid-cols-[35%_65%] gap-3 h-[calc(100%-28px)]">
          <div className="space-y-1.5">
            <div className={`text-[7px] ${textPrimary} font-bold`}>Query Context</div>
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-[10px] text-white font-bold">U</div>
              <div className={`p-2 rounded-xl border ${textBody} text-[11px] leading-relaxed flex-1 transition-all duration-500 ${step === 1 ? bgQueryHighlight : bgQueryNormal}`}>
                It's been so cloudy lately... I'm worried if <span className={`${highlightYellow} font-semibold`}>new plant</span> will have enough light for the <span className={`${highlightCyan} font-semibold`}>balcony</span>.
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className={`text-[7px] ${textPrimary} font-bold mb-1.5`}>Memory Pool</div>
            <div className="grid grid-cols-4 gap-1 flex-1">
              {memoryPool.map((memory, index) => (
                <div
                  key={index}
                  className={`rounded-lg border transition-all duration-300 flex flex-col items-center justify-center p-1 ${
                    step >= 2 && memory.selected
                      ? `${memory.borderColor} ${memory.bgColor} shadow-lg ${memory.shadowColor} scale-105`
                      : `${borderPoolInactive} scale-100 opacity-50`
                  }`}
                >
                  <div className={`text-xl mb-0.5 transition-all duration-300 ${step >= 2 && memory.selected ? 'scale-110' : 'scale-100'}`}>
                    {memory.icon}
                  </div>
                  <div className={`text-[5.5px] uppercase font-bold tracking-wider text-center transition-colors duration-300 ${step >= 2 && memory.selected ? memory.labelColor : textPoolInactive}`}>
                    {memory.type}
                  </div>
                  <div className={`text-[7px] font-medium text-center leading-tight mt-0.5 transition-colors duration-300 ${step >= 2 && memory.selected ? textBody : textPoolInactive}`}>
                    {memory.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`rounded-xl ${bgCard} p-3 border ${borderCard} h-[40%]`}>
        <div className="flex items-center gap-1.5 mb-2">
          <div className={`text-[9px] uppercase tracking-widest ${textPrimary} font-bold`}>Output</div>
          <div className={`text-[7px] ${textSecondary}`}>Retrieved Memory</div>
          {step >= 3 && <span className={`${successText} text-[8px] ml-auto`}>✓ Retrieved</span>}
        </div>
        <div className={`h-[calc(100%-24px)] rounded-xl border-2 transition-all duration-700 flex flex-col items-center justify-center p-3 ${
          step >= 3
            ? 'border-emerald-500 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 shadow-2xl shadow-emerald-500/30 scale-100 opacity-100'
            : `${bgOutputInactive} scale-95 opacity-30`
        }`}>
          <div className={`text-4xl mb-2 transition-all duration-700 ${step >= 3 ? 'scale-110 animate-bounce' : 'scale-100'}`}>☀️</div>
          <div className={`text-[7px] uppercase tracking-widest font-bold mb-1 transition-colors duration-700 ${step >= 3 ? 'text-emerald-300' : textOutputInactive}`}>LOCATION</div>
          <div className={`text-sm font-bold text-center transition-colors duration-700 ${step >= 3 ? textOutputActive : textOutputInactive}`}>Balcony / High Sunlight</div>
          {step >= 3 && (
            <div className="mt-2 flex items-center gap-1 text-[7px] text-emerald-300 opacity-0 animate-[fadeIn_0.5s_ease-out_0.7s_forwards]">
              <div className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>High Relevance Match</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
