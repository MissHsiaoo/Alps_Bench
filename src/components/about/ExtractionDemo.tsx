import React from 'react';
import { Sparkles, Palette, Home, Star } from 'lucide-react';

export const ExtractionDemo = ({ theme = 'dark' }: { theme?: 'dark' | 'light' }) => {
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    const timeline = [
      { time: 0, step: 0 },
      { time: 200, step: 1 },
      { time: 400, step: 2 },
      { time: 600, step: 3 },
      { time: 800, step: 4 },
      { time: 1000, step: 5 },
      { time: 1200, step: 6 },
      { time: 1400, step: 7 },
      { time: 1600, step: 8 },
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

  const userText = "I'm thinking of replacing the gardenias on the balcony with roses. I love white flowers, but I'm not sure if there's a fragrant white rose variety.";
  const highlights = [
    { text: "gardenias on the balcony", start: 29, end: 55, memoryStep: 2, color: "purple" },
    { text: "roses", start: 60, end: 65, memoryStep: 4, color: "orange" },
    { text: "I love white flowers", start: 67, end: 87, memoryStep: 6, color: "blue" },
    { text: "a fragrant white rose", start: 118, end: 139, memoryStep: 8, color: "pink" },
  ];

  const getHighlightClasses = (color: string, isCurrentlyHighlighting: boolean) => {
    const baseClasses = "rounded px-0.5 transition-all duration-300";
    const ringClass = isCurrentlyHighlighting ? "ring-2 shadow-lg" : "";
    if (theme === 'light') {
      const colorClasses: Record<string, string> = {
        purple: `bg-purple-400/50 ${isCurrentlyHighlighting ? 'ring-purple-500 shadow-purple-500/50' : ''}`,
        orange: `bg-orange-400/50 ${isCurrentlyHighlighting ? 'ring-orange-500 shadow-orange-500/50' : ''}`,
        blue: `bg-blue-400/50 ${isCurrentlyHighlighting ? 'ring-blue-500 shadow-blue-500/50' : ''}`,
        pink: `bg-pink-400/50 ${isCurrentlyHighlighting ? 'ring-pink-500 shadow-pink-500/50' : ''}`,
      };
      return `${baseClasses} ${ringClass} ${colorClasses[color] || ''}`;
    }
    const colorClasses: Record<string, string> = {
      purple: `bg-purple-500/40 ${isCurrentlyHighlighting ? 'ring-purple-400 shadow-purple-400/50' : ''}`,
      orange: `bg-orange-500/40 ${isCurrentlyHighlighting ? 'ring-orange-400 shadow-orange-400/50' : ''}`,
      blue: `bg-blue-500/40 ${isCurrentlyHighlighting ? 'ring-blue-400 shadow-blue-400/50' : ''}`,
      pink: `bg-pink-500/40 ${isCurrentlyHighlighting ? 'ring-pink-400 shadow-pink-400/50' : ''}`,
    };
    return `${baseClasses} ${ringClass} ${colorClasses[color] || ''}`;
  };

  const getHighlightedText = () => {
    let result: (JSX.Element | string)[] = [];
    let lastIndex = 0;
    highlights.forEach((highlight, idx) => {
      const highlightStep = 1 + idx * 2;
      const shouldShow = step >= highlight.memoryStep;
      const isCurrentlyHighlighting = step === highlightStep;
      if (lastIndex < highlight.start) {
        result.push(userText.slice(lastIndex, highlight.start));
      }
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

  const memories = [
    { Icon: Home, title: "GARDEN CONTEXT", content: "Replacing gardenias on balcony", appearStep: 2, borderColor: 'border-purple-500/50', bgColor: 'bg-purple-500/20', iconColor: 'text-purple-400' },
    { Icon: Sparkles, title: "PLANTING PREFERENCE", content: "Roses", appearStep: 4, borderColor: 'border-orange-500/50', bgColor: 'bg-orange-500/20', iconColor: 'text-orange-400' },
    { Icon: Palette, title: "COLOR PREFERENCE", content: "White flowers", appearStep: 6, borderColor: 'border-blue-500/50', bgColor: 'bg-blue-500/20', iconColor: 'text-blue-400' },
    { Icon: Star, title: "SPECIFIC INTEREST", content: "'White O'Hara' rose", appearStep: 8, borderColor: 'border-pink-500/50', bgColor: 'bg-pink-500/20', iconColor: 'text-pink-400' },
  ];

  const bgMain = theme === 'light' ? 'bg-white' : 'bg-slate-950';
  const bgCard = theme === 'light' ? 'bg-slate-50' : 'bg-slate-900/40';
  const borderCard = theme === 'light' ? 'border-slate-300' : 'border-slate-700/50';
  const textPrimary = theme === 'light' ? 'text-slate-800' : 'text-slate-300';
  const textSecondary = theme === 'light' ? 'text-slate-600' : 'text-slate-300';
  const textMuted = theme === 'light' ? 'text-slate-400' : 'text-slate-600';
  const textBody = theme === 'light' ? 'text-slate-700' : 'text-slate-200';
  const bgBubble = theme === 'light' ? 'bg-white border-slate-300' : 'bg-slate-800 border-slate-700';
  const bgBubbleAI = theme === 'light' ? 'bg-blue-100/80 border-blue-300' : 'bg-blue-600/20 border-blue-500/30';
  const textBubbleAI = theme === 'light' ? 'text-blue-900' : 'text-blue-100';
  const scanningText = theme === 'light' ? 'text-amber-600' : 'text-yellow-400';
  const successText = theme === 'light' ? 'text-emerald-600' : 'text-emerald-400';
  const borderInactive = theme === 'light' ? 'border-slate-300/50 bg-slate-100/30' : 'border-slate-700/30 bg-slate-800/20';

  return (
    <div className={`flex flex-col h-full min-h-0 gap-3 p-3 text-xs font-sans overflow-hidden ${bgMain}`}>
      <div className={`rounded-xl ${bgCard} p-3 border ${borderCard} h-[60%] min-h-0 shrink-0 overflow-hidden`}>
        <div className={`text-[9px] uppercase tracking-widest ${textPrimary} font-bold mb-2 flex items-center justify-between`}>
          <div className="flex items-center gap-1.5">
            <span>Input</span>
            {step === 1 && <span className={`${scanningText} animate-pulse text-xs`}>● SCANNING...</span>}
          </div>
          <div className={`text-[8px] ${textSecondary}`}>Dialogue</div>
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
              Of course! The cream-toned <strong>'White O'Hara'</strong> rose is a great choice with beautiful white appearance and few thorns.
            </div>
          </div>
        </div>
      </div>
      <div className={`rounded-xl ${bgCard} p-3 border ${borderCard} h-[40%] min-h-0 flex flex-col overflow-hidden`}>
        <div className={`text-[9px] uppercase tracking-widest ${textPrimary} font-bold mb-2 flex items-center justify-between flex-shrink-0`}>
          <div className="flex items-center gap-1.5">
            <span>Output</span>
            <span className={`text-[8px] transition-opacity duration-300 ${step >= 2 ? `${successText} opacity-100` : `${textMuted} opacity-0`}`}>
              {step >= 8 ? '4 Extracted' : step >= 6 ? '3 Extracted' : step >= 4 ? '2 Extracted' : step >= 2 ? '1 Extracted' : ''}
            </span>
          </div>
          <div className={`text-[8px] ${textSecondary}`}>Extracted Memories</div>
        </div>
        <div className="grid grid-cols-2 gap-2 flex-1 min-h-0 overflow-hidden">
          {memories.map((memory, index) => (
            <div
              key={index}
              className={`rounded-lg border-2 p-2 transition-all duration-500 ${
                step >= memory.appearStep
                  ? `${memory.borderColor} ${memory.bgColor} opacity-100 scale-100`
                  : `${borderInactive} opacity-0 scale-95`
              }`}
            >
              <div className="flex items-start gap-2 h-full">
                <div className={`transition-all duration-500 ${step >= memory.appearStep ? 'scale-110' : 'scale-100'}`}>
                  <memory.Icon className={`w-5 h-5 transition-colors ${step >= memory.appearStep ? memory.iconColor : textMuted}`} />
                </div>
                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className={`text-[7px] font-bold uppercase tracking-wider ${textSecondary} mb-0.5 truncate`}>{memory.title}</div>
                  <div className={`text-[10px] font-medium leading-tight ${textBody} truncate`}>{memory.content}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
