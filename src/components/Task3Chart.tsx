import React, { useState } from 'react';
import { 
  Database, 
  Trophy, 
  BarChart3, 
  Table as TableIcon 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  BenchmarkData, 
  Task3Metrics, 
  getModelColor 
} from '../data/benchmark-data';

export const Task3Chart = ({ data }: { data: BenchmarkData[] }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [selectedDistractor, setSelectedDistractor] = useState<number>(500);
  
  const lineData = [100, 300, 500, 700, 1000].map(distractor => {
    const point: any = { distractor: `${distractor}` };
    data.forEach(model => {
      point[model.model] = model.task3[distractor as keyof Task3Metrics];
    });
    return point;
  });

  // Calculate Y-axis range based on actual data
  const allScores = data.flatMap(model => Object.values(model.task3));
  const minScore = Math.min(...allScores);
  const maxScore = Math.max(...allScores);
  const padding = (maxScore - minScore) * 0.1; // 10% padding
  const yMin = Math.max(0, minScore - padding); // Don't go below 0
  const yMax = Math.min(1.0, maxScore + padding); // Don't exceed 1.0

  // Calculate best score for each distractor level
  const bestScores = [100, 300, 500, 700, 1000].reduce((acc, distractor) => {
    acc[distractor] = Math.max(...data.map(m => m.task3[distractor as keyof Task3Metrics]));
    return acc;
  }, {} as Record<number, number>);

  // Sort by selected distractor score for leaderboard
  const sortedData = [...data].sort((a, b) => {
    const scoreA = a.task3[selectedDistractor as keyof Task3Metrics];
    const scoreB = b.task3[selectedDistractor as keyof Task3Metrics];
    return scoreB - scoreA;
  });

  return (
    <section>
      <div className="mb-6 flex items-center gap-3 text-white">
        <Database className="h-7 w-7 text-emerald-500" />
        <h2 className="text-3xl font-bold">Task 3: Retrieval Robustness</h2>
      </div>
      <p className="mb-6 text-base text-slate-300">Model performance decay as distractors increase from 100 to 1000.</p>
      
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Chart/Table Block */}
        <div className="lg:flex-[2] rounded-2xl border-2 border-slate-600/70 bg-slate-800/70 p-6 shadow-2xl backdrop-blur-sm">
          {/* Toggle Buttons */}
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={() => setViewMode('chart')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                viewMode === 'chart'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              Chart
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                viewMode === 'table'
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <TableIcon className="h-4 w-4" />
              Table
            </button>
          </div>

          {/* Chart View */}
          {viewMode === 'chart' && (
            <ResponsiveContainer width="100%" height={500} minWidth={0}>
              <LineChart data={lineData} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#475569" />
                <XAxis 
                  dataKey="distractor" 
                  label={{ 
                    value: 'Retrieval Performance Under Distractor Stress', 
                    position: 'bottom', 
                    offset: 15,
                    style: { fontSize: 14, fontWeight: 600, fill: '#94a3b8' }
                  }} 
                  tick={{ fontSize: 13, fill: '#94a3b8' }}
                />
                <YAxis domain={[yMin, yMax]} tick={{ fontSize: 13, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#e2e8f0' }}
                />
                <Legend verticalAlign="top" height={50} iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 600, color: '#e2e8f0' }} />
                {data.map((model) => (
                  <Line 
                    key={model.model}
                    type="monotone" 
                    dataKey={model.model} 
                    stroke={getModelColor(model.model)}
                    strokeWidth={3.5}
                    dot={{ r: 5, strokeWidth: 3, fill: '#1e293b' }}
                    activeDot={{ r: 7 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="overflow-x-auto" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-white dark:bg-slate-900">
                  <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300">Model</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-300">100</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-300">300</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-300">500</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-300">700</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-300">1000</th>
                    <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-300">Avg</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {sortedData.map((model, idx) => {
                    const avg = Object.values(model.task3).reduce((sum, val) => sum + val, 0) / 5;
                    return (
                      <tr key={model.model} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                              idx === 0 ? 'bg-amber-500 text-white' : 
                              idx === 1 ? 'bg-slate-400 text-white' : 
                              idx === 2 ? 'bg-orange-600 text-white' : 
                              'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                            }`}>
                              {idx + 1}
                            </span>
                            <div className="flex items-center gap-2">
                              <div 
                                className="h-3 w-3 rounded-full" 
                                style={{ backgroundColor: getModelColor(model.model) }}
                              />
                              <span className="font-semibold text-slate-900 dark:text-white">
                                {model.model}
                              </span>
                              {idx === 0 && <span className="text-xs">👑</span>}
                            </div>
                          </div>
                        </td>
                        {[100, 300, 500, 700, 1000].map(distractor => {
                          const score = model.task3[distractor as keyof Task3Metrics];
                          const isBest = score === bestScores[distractor];
                          return (
                            <td key={distractor} className="px-4 py-3 text-center">
                              <span className={`font-mono text-sm font-semibold ${
                                isBest 
                                  ? 'text-emerald-600 dark:text-emerald-400' 
                                  : 'text-slate-600 dark:text-slate-400'
                              }`}>
                                {score.toFixed(4)}
                              </span>
                              {isBest && <span className="ml-1 text-emerald-500">●</span>}
                            </td>
                          );
                        })}
                        <td className="px-4 py-3 text-center">
                          <span className={`font-mono text-sm font-bold ${
                            idx === 0 
                              ? 'text-amber-600 dark:text-amber-400' 
                              : 'text-slate-700 dark:text-slate-300'
                          }`}>
                            {avg.toFixed(4)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Leaderboard Block */}
        <div className="lg:flex-[1] rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
          <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-300">
            <Trophy className="h-4 w-4 text-amber-500" />
            Leaderboard
          </div>
          
          {/* Distractor Selector */}
          <div className="mb-3">
            <div className="mb-1.5 text-xs font-medium text-slate-400">Distractor Count</div>
            <div className="flex flex-wrap gap-1.5">
              {[100, 300, 500, 700, 1000].map(distractor => (
                <button
                  key={distractor}
                  onClick={() => setSelectedDistractor(distractor)}
                  className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all ${
                    selectedDistractor === distractor
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {distractor}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-1.5">
            {sortedData.map((item, idx) => {
              const score = item.task3[selectedDistractor as keyof Task3Metrics];
              return (
                <div 
                  key={item.model}
                  className={`flex items-center justify-between rounded-lg p-2.5 transition-all ${
                    idx === 0 
                      ? 'bg-gradient-to-r from-amber-900/40 to-yellow-900/40 ring-2 ring-amber-500/50' 
                      : 'bg-slate-700/30 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
                      idx === 0 ? 'bg-amber-500 text-white' : 
                      idx === 1 ? 'bg-slate-400 text-white' : 
                      idx === 2 ? 'bg-orange-600 text-white' : 
                      'bg-slate-600 text-slate-300'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                        {item.model}
                        {idx === 0 && <span className="text-xs">👑</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-base font-bold ${idx === 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                      {score.toFixed(4)}
                    </div>
                    {idx === 0 && <div className="text-[10px] text-amber-500">TOP SCORE</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};