import React from 'react';
import { Play, Pause } from 'lucide-react';
import { ExtractionDemo } from './ExtractionDemo';
import { UpdatingDemo } from './UpdatingDemo';
import { RetrievalDemo } from './RetrievalDemo';
import { UtilizationDemo } from './UtilizationDemo';

interface AllTasksOverviewProps {
  onBack?: () => void;
}

export const AllTasksOverview = ({ onBack }: AllTasksOverviewProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [key, setKey] = React.useState(0);

  const handlePlayToggle = () => {
    if (!isPlaying) setKey((prev) => prev + 1);
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full min-h-screen p-6 bg-slate-900/30 rounded-2xl border border-slate-700/50">
      {onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-20 px-4 py-2 rounded-lg bg-slate-800/80 border border-slate-700/50 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 text-slate-200 text-sm font-medium flex items-center gap-2"
        >
          ← Back to Benchmark Introduction
        </button>
      )}
      <button
        onClick={handlePlayToggle}
        className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full bg-slate-700/60 border border-slate-600/80 hover:bg-slate-600 hover:border-slate-500 transition-all duration-300 flex items-center justify-center group opacity-60 hover:opacity-100"
        title={isPlaying ? 'Pause all demos' : 'Play all demos'}
      >
        {isPlaying ? <Pause className="w-4 h-4 text-slate-300" /> : <Play className="w-4 h-4 text-slate-300 ml-0.5" />}
      </button>
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-white mb-1">AlpsBench 4 Tasks Visualization</h1>
        <p className="text-xs text-slate-400">Interactive demonstrations of all evaluation tasks</p>
      </div>
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 gap-4" style={{ gridAutoRows: 'minmax(480px, auto)' }}>
          <div className="rounded-2xl border-2 border-slate-600 bg-slate-800/50 overflow-hidden flex flex-col">
            <div className="h-10 bg-slate-800/80 border-b border-slate-600 flex items-center justify-between px-4 flex-shrink-0">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Task 1: Extraction</h2>
              <div className="text-[10px] text-slate-500">Extract personalized info</div>
            </div>
            <div className="flex-1 min-h-0" key={`extraction-${key}`}>
              <ExtractionDemo theme="dark" />
            </div>
          </div>
          <div className="rounded-2xl border-2 border-slate-600 bg-slate-800/50 overflow-hidden flex flex-col">
            <div className="h-10 bg-slate-800/80 border-b border-slate-600 flex items-center justify-between px-4 flex-shrink-0">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Task 2: Updating</h2>
              <div className="text-[10px] text-slate-500">Update memory state</div>
            </div>
            <div className="flex-1 min-h-0" key={`updating-${key}`}>
              <UpdatingDemo theme="dark" />
            </div>
          </div>
          <div className="rounded-2xl border-2 border-slate-600 bg-slate-800/50 overflow-hidden flex flex-col">
            <div className="h-10 bg-slate-800/80 border-b border-slate-600 flex items-center justify-between px-4 flex-shrink-0">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Task 3: Retrieval</h2>
              <div className="text-[10px] text-slate-500">Retrieve relevant memory</div>
            </div>
            <div className="flex-1 min-h-0" key={`retrieval-${key}`}>
              <RetrievalDemo theme="dark" />
            </div>
          </div>
          <div className="rounded-2xl border-2 border-slate-600 bg-slate-800/50 overflow-hidden flex flex-col">
            <div className="h-10 bg-slate-800/80 border-b border-slate-600 flex items-center justify-between px-4 flex-shrink-0">
              <h2 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Task 4: Utilization</h2>
              <div className="text-[10px] text-slate-500">Generate & evaluate response</div>
            </div>
            <div className="flex-1 min-h-0" key={`utilization-${key}`}>
              <UtilizationDemo theme="dark" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
