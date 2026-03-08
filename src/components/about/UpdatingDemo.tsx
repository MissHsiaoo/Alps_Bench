import React from 'react';
import { Palette, MapPin, RefreshCw, Plus } from 'lucide-react';

export const UpdatingDemo = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const timeline = [
      { time: 0, step: 0 },
      { time: 500, step: 1 },
      { time: 1000, step: 2 },
      { time: 1500, step: 3 },
      { time: 2000, step: 4 },
      { time: 2500, step: 5 },
      { time: 3500, step: 0 },
    ];
    let timers: NodeJS.Timeout[] = [];
    const runTimeline = () => {
      timers = timeline.map(({ time, step: targetStep }) => setTimeout(() => setStep(targetStep), time));
    };
    runTimeline();
    const loopInterval = setInterval(runTimeline, 4000);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loopInterval);
    };
  }, []);

  const userText = "Actually, I've been thinking yellow roses might be better for me. They feel more cheerful. Oh, and I'd like to put one on the window sill too.";
  const highlights = [
    { text: "yellow roses might be better", start: 28, end: 57, memoryStep: 2, color: "amber" },
    { text: "put one on the window sill", start: 102, end: 132, memoryStep: 5, color: "cyan" },
  ];

  const getHighlightClasses = (color: string, isCurrentlyHighlighting: boolean) => {
    const baseClasses = "rounded px-0.5 transition-all duration-300";
    const ringClass = isCurrentlyHighlighting ? "ring-2 shadow-lg" : "";
    if (theme === 'light') {
      const colorClasses: Record<string, string> = {
        amber: `bg-amber-400/50 ${isCurrentlyHighlighting ? 'ring-amber-500 shadow-amber-500/50' : ''}`,
        cyan: `bg-cyan-400/50 ${isCurrentlyHighlighting ? 'ring-cyan-500 shadow-cyan-500/50' : ''}`,
      };
      return `${baseClasses} ${ringClass} ${colorClasses[color] || ''}`;
    }
    const colorClasses: Record<string, string> = {
      amber: `bg-amber-500/40 ${isCurrentlyHighlighting ? 'ring-amber-400 shadow-amber-400/50' : ''}`,
      cyan: `bg-cyan-500/40 ${isCurrentlyHighlighting ? 'ring-cyan-400 shadow-cyan-400/50' : ''}`,
    };
    return `${baseClasses} ${ringClass} ${colorClasses[color] || ''}`;
  };

  const getHighlightedText = () => {
    let result: (JSX.Element | string)[] = [];
    let lastIndex = 0;
    highlights.forEach((highlight, idx) => {
      const highlightStep = 1 + idx * 3;
      const shouldShow = step >= highlight.memoryStep;
      const isCurrentlyHighlighting = step === highlightStep;
      if (lastIndex < highlight.start) result.push(userText.slice(lastIndex, highlight.start));
      if (shouldShow || isCurrentlyHighlighting) {
        result.push(
          <span key={`highlight-${idx}`} className={getHighlightClasses(highlight.color, isCurrentlyHighlighting)}>
            {userText.slice(highlight.start, highlight.end)}
          </span>
        );
      } else {
        result.push(userText.slice(highlight.start, highlight.end));
      }
      lastIndex = highlight.end;
    });
    if (lastIndex < userText.length) result.push(userText.slice(lastIndex));
    return result;
  };

  const bgMain = theme === 'light' ? 'bg-white' : 'bg-slate-950';
  const bgCard = theme === 'light' ? 'bg-slate-50' : 'bg-slate-900/40';
  const borderCard = theme === 'light' ? 'border-slate-300' : 'border-slate-700/50';
  const textPrimary = theme === 'light' ? 'text-slate-800' : 'text-slate-300';
  const textSecondary = theme === 'light' ? 'text-slate-600' : 'text-slate-300';
  const textMuted = theme === 'light' ? 'text-slate-400' : 'text-slate-400';
  const textBody = theme === 'light' ? 'text-slate-700' : 'text-slate-200';
  const textBodyStrong = theme === 'light' ? 'text-slate-900' : 'text-slate-100';
  const bgBubble = theme === 'light' ? 'bg-white border-slate-300' : 'bg-slate-800 border-slate-700';
  const bgBubbleAI = theme === 'light' ? 'bg-blue-100/80 border-blue-300' : 'bg-blue-600/20 border-blue-500/30';
  const textBubbleAI = theme === 'light' ? 'text-blue-900' : 'text-blue-100';
  const scanningText = theme === 'light' ? 'text-amber-600' : 'text-yellow-400';
  const successText = theme === 'light' ? 'text-emerald-600' : 'text-emerald-400';
  const bgMemoryCard = theme === 'light' ? 'bg-white/80' : 'bg-slate-800/80';
  const borderMemory = theme === 'light' ? 'border-slate-400/50' : 'border-slate-600/50';
  const borderMemoryDashed = theme === 'light' ? 'border-slate-400' : 'border-slate-600';
  const bgEmpty = theme === 'light' ? 'bg-slate-100/50' : 'bg-slate-800/20';
  const borderInactive = theme === 'light' ? 'border-slate-300/50 bg-slate-100/30' : 'border-slate-700/30 bg-slate-800/20';
  const arrowColor = theme === 'light' ? 'text-slate-500' : 'text-slate-400';

  return (
    <div className={`flex flex-col h-full min-h-0 gap-3 p-3 text-xs font-sans overflow-hidden ${bgMain}`}>
      <div className={`rounded-xl ${bgCard} p-3 border ${borderCard} h-[60%]`}>
        <div className={`text-[9px] uppercase tracking-widest ${textPrimary} font-bold mb-2 flex items-center justify-between`}>
          <div className="flex items-center gap-1.5">
            <span>Input</span>
            {step === 1 && <span className={`${scanningText} animate-pulse text-xs`}>● ANALYZING...</span>}
          </div>
          <div className={`text-[8px] ${textSecondary}`}>New Dialogue</div>
        </div>
        <div className="space-y-2.5 h-[calc(100%-28px)] flex flex-col justify-center">
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-indigo-500 flex-shrink-0 flex items-center justify-center text-[12px] text-white font-bold">U</div>
            <div className={`${bgBubble} p-3 rounded-2xl rounded-tl-none border ${textBody} leading-relaxed text-[12px] flex-1`}>
              {getHighlightedText()}
            </div>
          </div>
          <div className="flex gap-2.5 flex-row-reverse">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex-shrink-0 flex items-center justify-center text-[12px] text-white font-bold">AI</div>
            <div className={`${bgBubbleAI} p-3 rounded-2xl rounded-tr-none border ${textBubbleAI} leading-relaxed text-[12px] flex-1`}>
              Yellow roses are wonderful! They symbolize friendship and joy. I'll help you find the perfect variety for your window sill.
            </div>
          </div>
        </div>
      </div>
      <div className={`rounded-xl ${bgCard} p-2 border ${borderCard} h-[40%] flex flex-col`}>
        <div className={`text-[8px] uppercase tracking-widest ${textPrimary} font-bold mb-1.5 flex items-center justify-between flex-shrink-0`}>
          <span>OUTPUT</span>
          {step >= 3 && <span className={`${successText} text-[7px] flex items-center gap-0.5`}><RefreshCw className="w-2 h-2" />{step >= 5 ? '2 Updates' : '1 Update'}</span>}
        </div>
        <div className="space-y-1 flex-1 min-h-0 flex flex-col justify-center">
          <div className={`rounded-lg border-2 p-1.5 transition-all duration-500 ${step >= 3 ? 'border-amber-500/50 bg-amber-500/20 opacity-100 scale-100' : `${borderInactive} opacity-0 scale-95`}`}>
            <div className="flex items-center gap-1 mb-1">
              <RefreshCw className="w-2 h-2 text-amber-400" />
              <span className={`text-[6px] uppercase tracking-wider ${textPrimary} font-bold`}>Update: Preference Changed</span>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5 items-center">
              <div className={`rounded-md ${bgMemoryCard} p-1.5 border transition-all duration-300 ${step >= 2 ? `${borderMemory} opacity-40` : `${borderMemory} opacity-100`}`}>
                <div className="flex items-start gap-1">
                  <Palette className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className={`text-[6px] font-bold uppercase tracking-wider ${textSecondary} mb-0.5`}>COLOR PREFERENCE</div>
                    <div className={`text-[8px] font-medium leading-tight ${textBodyStrong}`}>White flowers</div>
                  </div>
                </div>
              </div>
              <div className={`${arrowColor} transition-opacity duration-300 text-[10px] ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>→</div>
              <div className={`rounded-md border-2 p-1.5 transition-all duration-500 ${step >= 3 ? 'border-amber-500/50 bg-amber-500/30 opacity-100 scale-100' : `${borderInactive} opacity-30 scale-95`}`}>
                <div className="flex items-start gap-1">
                  <Palette className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className={`text-[6px] font-bold uppercase tracking-wider ${textSecondary} mb-0.5`}>COLOR PREFERENCE</div>
                    <div className={`text-[8px] font-medium leading-tight ${textBodyStrong}`}>Yellow roses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={`rounded-lg border-2 p-1.5 transition-all duration-500 ${step >= 5 ? 'border-cyan-500/50 bg-cyan-500/20 opacity-100 scale-100' : `${borderInactive} opacity-0 scale-95`}`}>
            <div className="flex items-center gap-1 mb-1">
              <Plus className="w-2 h-2 text-cyan-400" />
              <span className={`text-[6px] uppercase tracking-wider ${textPrimary} font-bold`}>Insert: New Information</span>
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-1.5 items-center">
              <div className={`rounded-md border border-dashed p-1.5 transition-all duration-300 ${step >= 4 ? `${borderMemoryDashed} ${bgEmpty} opacity-40` : `${borderMemoryDashed} ${bgEmpty} opacity-100`}`}>
                <div className={`rounded-lg p-1 border border-dashed ${borderMemoryDashed} ${bgEmpty}`}>
                  <div className={`text-[7px] ${textMuted} text-center`}>No previous</div>
                </div>
              </div>
              <div className={`${arrowColor} transition-opacity duration-300 text-[10px] ${step >= 5 ? 'opacity-100' : 'opacity-0'}`}>→</div>
              <div className={`rounded-md border-2 p-1.5 transition-all duration-500 ${step >= 5 ? 'border-cyan-500/50 bg-cyan-500/30 opacity-100 scale-100' : `${borderInactive} opacity-30 scale-95`}`}>
                <div className="flex items-start gap-1">
                  <MapPin className="w-3 h-3 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className={`text-[6px] font-bold uppercase tracking-wider ${textSecondary} mb-0.5`}>LOCATION PREFERENCE</div>
                    <div className={`text-[8px] font-medium leading-tight ${textBodyStrong}`}>Window sill</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
