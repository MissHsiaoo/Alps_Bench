import React, { useState, useMemo } from 'react';
import { 
  Trophy, 
  BarChart3, 
  Table as TableIcon, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Info,
  ExternalLink,
  Cpu,
  BrainCircuit,
  Database,
  Layers,
  Medal
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Task3Chart } from './components/Task3Chart';
import { 
  BENCHMARK_DATA, 
  getModelColor, 
  getRankMedal, 
  getRankStyle,
  type BenchmarkData,
  type Task3Metrics,
  type Task4Metrics
} from './data/benchmark-data';

// --- Components ---

const Header = () => {
  const stats = [
    { label: 'Evaluated Models', value: '7', icon: Cpu, color: 'text-blue-500' },
    { label: 'Core Tasks', value: '4', icon: Layers, color: 'text-purple-500' },
    { label: 'Dialogue Sessions', value: '2.5K', icon: Database, color: 'text-emerald-500' },
    { label: 'Max Distractors', value: '1000', icon: BrainCircuit, color: 'text-amber-500' },
  ];

  return (
    <header className="relative w-full overflow-hidden bg-slate-950 py-16 text-white">
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1652212976547-16d7e2841b8c?auto=format&fit=crop&q=80" 
          alt="Background" 
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative mx-auto max-w-[120rem] px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20"
          >
            <Trophy className="h-4 w-4" />
            <span>AlpsBench: Real-World LLM Personalization Benchmark</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            AlpsBench <span className="text-blue-500">Leaderboard</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg"
          >
            A comprehensive benchmark for evaluating LLM personalization capabilities derived from real-world human-LLM dialogues. 
            AlpsBench assesses the entire lifecycle of personalized memory management across extraction, updating, retrieval, and utilization tasks.
          </motion.p>

          {/* Stats integrated into header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 grid w-full max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-3 rounded-xl border border-slate-700/50 bg-slate-900/50 p-5 backdrop-blur-sm"
              >
                <div className={`rounded-lg bg-slate-800 p-3 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </header>
  );
};

const Task1Chart = ({ data }: { data: BenchmarkData[] }) => {
  // Sort by task1 score in descending order (highest at top)
  const task1Data = [...data]
    .sort((a, b) => b.task1 - a.task1)
    .map(d => ({ 
      name: d.model, 
      score: d.task1,
      fill: getModelColor(d.model)
    }));

  const topScore = task1Data[0].score;

  return (
    <section>
      <div className="mb-6 flex items-center gap-3 text-white">
        <BarChart3 className="h-7 w-7 text-blue-500" />
        <h2 className="text-3xl font-bold">Task 1: Extraction</h2>
      </div>
      <p className="mb-6 text-base text-slate-300">Evaluate model's ability to precisely extract personalized information from context.</p>
      
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Chart Block */}
        <div className="lg:flex-[2] rounded-2xl border-2 border-slate-600/70 bg-slate-800/70 p-6 shadow-2xl backdrop-blur-sm">
          <ResponsiveContainer width="100%" height={500} minWidth={0}>
            <BarChart data={task1Data} layout="vertical" margin={{ left: 10, right: 50, top: 10, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#475569" />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                label={{ 
                  value: 'Precise Extraction of Personalized Information', 
                  position: 'bottom', 
                  offset: 15,
                  style: { fontSize: 14, fontWeight: 600, fill: '#94a3b8' }
                }}
                tick={{ fontSize: 13, fill: '#94a3b8' }}
              />
              <YAxis dataKey="name" type="category" width={180} fontSize={15} fontWeight={600} tick={{ fill: '#e2e8f0' }} />
              <Tooltip 
                cursor={{ fill: 'rgba(123, 163, 208, 0.1)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#e2e8f0' }}
              />
              <Bar 
                dataKey="score" 
                radius={[0, 8, 8, 0]} 
                barSize={50}
                label={{ 
                  position: 'right', 
                  fill: '#e2e8f0',
                  fontSize: 16,
                  fontWeight: 700,
                  formatter: (value: number) => value.toFixed(2)
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard Block */}
        <div className="lg:flex-[1] rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-300">
            <Trophy className="h-4 w-4 text-amber-500" />
            Leaderboard
          </div>
          <div className="space-y-2">
            {task1Data.map((item, idx) => (
              <div 
                key={item.name}
                className={`flex items-center justify-between rounded-lg p-3 transition-all ${
                  idx === 0 
                    ? 'bg-gradient-to-r from-amber-900/40 to-yellow-900/40 ring-2 ring-amber-500/50' 
                    : 'bg-slate-700/30 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    idx === 0 ? 'bg-amber-500 text-white' : 
                    idx === 1 ? 'bg-slate-400 text-white' : 
                    idx === 2 ? 'bg-orange-600 text-white' : 
                    'bg-slate-600 text-slate-300'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      {item.name}
                      {idx === 0 && <span className="text-xs">👑</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${idx === 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                    {item.score.toFixed(2)}
                  </div>
                  {idx === 0 && <div className="text-xs text-amber-500">TOP SCORE</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Task2Chart = ({ data }: { data: BenchmarkData[] }) => {
  // Sort by task2 score in descending order (highest at top)
  const task2Data = [...data]
    .sort((a, b) => b.task2 - a.task2)
    .map(d => ({ 
      name: d.model, 
      score: d.task2,
      fill: getModelColor(d.model)
    }));

  const topScore = task2Data[0].score;

  return (
    <section>
      <div className="mb-6 flex items-center gap-3 text-white">
        <Layers className="h-7 w-7 text-purple-500" />
        <h2 className="text-3xl font-bold">Task 2: Updating</h2>
      </div>
      <p className="mb-6 text-base text-slate-300">Test model's real-time memory updating and overwrite capabilities.</p>
      
      <div className="flex flex-col gap-4 lg:flex-row">
        {/* Chart Block */}
        <div className="lg:flex-[2] rounded-2xl border-2 border-slate-600/70 bg-slate-800/70 p-6 shadow-2xl backdrop-blur-sm">
          <ResponsiveContainer width="100%" height={500} minWidth={0}>
            <BarChart data={task2Data} layout="vertical" margin={{ left: 10, right: 50, top: 10, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#475569" />
              <XAxis 
                type="number" 
                domain={[0, 100]} 
                label={{ 
                  value: 'Real-Time Memory Updating & Overwrite', 
                  position: 'bottom', 
                  offset: 15,
                  style: { fontSize: 14, fontWeight: 600, fill: '#94a3b8' }
                }}
                tick={{ fontSize: 13, fill: '#94a3b8' }}
              />
              <YAxis dataKey="name" type="category" width={180} fontSize={15} fontWeight={600} tick={{ fill: '#e2e8f0' }} />
              <Tooltip 
                cursor={{ fill: 'rgba(160, 148, 199, 0.1)' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#e2e8f0' }}
              />
              <Bar 
                dataKey="score" 
                radius={[0, 8, 8, 0]} 
                barSize={50}
                label={{ 
                  position: 'right', 
                  fill: '#e2e8f0',
                  fontSize: 16,
                  fontWeight: 700,
                  formatter: (value: number) => value.toFixed(2)
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leaderboard Block */}
        <div className="lg:flex-[1] rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-300">
            <Trophy className="h-4 w-4 text-amber-500" />
            Leaderboard
          </div>
          <div className="space-y-2">
            {task2Data.map((item, idx) => (
              <div 
                key={item.name}
                className={`flex items-center justify-between rounded-lg p-3 transition-all ${
                  idx === 0 
                    ? 'bg-gradient-to-r from-amber-900/40 to-yellow-900/40 ring-2 ring-amber-500/50' 
                    : 'bg-slate-700/30 hover:bg-slate-700/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    idx === 0 ? 'bg-amber-500 text-white' : 
                    idx === 1 ? 'bg-slate-400 text-white' : 
                    idx === 2 ? 'bg-orange-600 text-white' : 
                    'bg-slate-600 text-slate-300'
                  }`}>
                    {idx + 1}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-2">
                      {item.name}
                      {idx === 0 && <span className="text-xs">👑</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${idx === 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                    {item.score.toFixed(2)}
                  </div>
                  {idx === 0 && <div className="text-xs text-amber-500">TOP SCORE</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Task4Chart = ({ data, compact = false }: { data: BenchmarkData[], compact?: boolean }) => {
  if (compact) {
    // Compact version for overview 2x2 grid - sorted by average score
    const avgScores = data
      .map(model => ({
        name: model.model,
        average: parseFloat((Object.values(model.task4).reduce((a, b) => a + b, 0) / 5).toFixed(3)),
        fill: getModelColor(model.model)
      }))
      .sort((a, b) => b.average - a.average); // Sort by average score descending

    return (
      <section>
        <div className="mb-6 flex items-center gap-3 text-white">
          <BrainCircuit className="h-7 w-7 text-amber-500" />
          <h2 className="text-3xl font-bold">Task 4: Utilization</h2>
        </div>
        <p className="mb-6 text-base text-slate-300">Average capability utilization across 5 dimensions (PA, PF, VRA, CF, EI).</p>
        
        <div className="flex flex-col gap-4 lg:flex-row">
          {/* Chart Block */}
          <div className="lg:flex-[2] rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
            <ResponsiveContainer width="100%" height={500} minWidth={0}>
              <BarChart data={avgScores} layout="vertical" margin={{ left: 10, right: 50, top: 10, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#475569" />
                <XAxis 
                  type="number" 
                  domain={[0, 1.0]} 
                  ticks={[0, 0.2, 0.4, 0.6, 0.8, 1.0]} 
                  label={{ 
                    value: 'Multi-Dimensional Capability Utilization (PA, PF, VRA, CF, EI)', 
                    position: 'bottom', 
                    offset: 15,
                    style: { fontSize: 14, fontWeight: 600, fill: '#94a3b8' }
                  }}
                  tick={{ fontSize: 13, fill: '#94a3b8' }}
                />
                <YAxis dataKey="name" type="category" width={180} fontSize={15} fontWeight={600} tick={{ fill: '#e2e8f0' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(229, 185, 143, 0.1)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#e2e8f0' }}
                />
                <Bar 
                  dataKey="average" 
                  radius={[0, 8, 8, 0]} 
                  barSize={50}
                  label={{ 
                    position: 'right', 
                    fill: '#e2e8f0',
                    fontSize: 16,
                    fontWeight: 700,
                    formatter: (value: number) => value.toFixed(3)
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Leaderboard Block */}
          <div className="lg:flex-[1] rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
            <div className="mb-4 flex items-center gap-2 text-sm font-bold text-slate-300">
              <Trophy className="h-4 w-4 text-amber-500" />
              Leaderboard
            </div>
            <div className="space-y-2">
              {avgScores.map((item, idx) => (
                <div 
                  key={item.name}
                  className={`flex items-center justify-between rounded-lg p-3 transition-all ${
                    idx === 0 
                      ? 'bg-gradient-to-r from-amber-900/40 to-yellow-900/40 ring-2 ring-amber-500/50' 
                      : 'bg-slate-700/30 hover:bg-slate-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      idx === 0 ? 'bg-amber-500 text-white' : 
                      idx === 1 ? 'bg-slate-400 text-white' : 
                      idx === 2 ? 'bg-orange-600 text-white' : 
                      'bg-slate-600 text-slate-300'
                    }`}>
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white flex items-center gap-2">
                        {item.name}
                        {idx === 0 && <span className="text-xs">👑</span>}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${idx === 0 ? 'text-amber-400' : 'text-slate-300'}`}>
                      {item.average.toFixed(3)}
                    </div>
                    {idx === 0 && <div className="text-xs text-amber-500">TOP SCORE</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Full version for dedicated task page
  return (
    <section className="mx-auto w-full max-w-[90rem] px-6">
      <div className="mb-8 flex items-center gap-2">
        <BrainCircuit className="h-6 w-6 text-amber-500" />
        <h2 className="text-2xl font-bold">Task 4: Capability Utilization (0.0 - 1.0 Normalized)</h2>
      </div>
      <p className="mb-8 text-slate-500">
        Complex utilization capabilities across five dimensions: Persona Awareness (PA), Preference Following (PF), Virtual-Reality Awareness (VRA), Consistency/Factuality (CF), and Emotional Intelligence (EI).
      </p>
      
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr,500px]">
        {/* Radar Charts Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map(model => (
            <div key={model.model} className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
              <h3 className="mb-6 text-center font-bold text-lg text-white">{model.model}</h3>
              <UtilizationRadar model={model} />
              <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
                <div>
                  <div className="font-semibold text-slate-400">PA</div>
                  <div className="font-mono font-bold text-white">{model.task4.PA.toFixed(2)}</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-400">PF</div>
                  <div className="font-mono font-bold text-white">{model.task4.PF.toFixed(2)}</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-400">VRA</div>
                  <div className="font-mono font-bold text-white">{model.task4.VRA.toFixed(2)}</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-400">CF</div>
                  <div className="font-mono font-bold text-white">{model.task4.CF.toFixed(2)}</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-400">EI</div>
                  <div className="font-mono font-bold text-white">{model.task4.EI.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Comparison Table */}
        <div className="rounded-2xl border border-slate-700/50 bg-slate-800/50 p-6 shadow-xl backdrop-blur-sm">
          <div className="mb-6 flex items-center gap-2">
            <TableIcon className="h-5 w-5 text-amber-500" />
            <h3 className="text-lg font-bold text-white">Overall Comparison</h3>
          </div>
          
          {/* Calculate best scores for each dimension */}
          {(() => {
            const bestScores = {
              PA: Math.max(...data.map(m => m.task4.PA)),
              PF: Math.max(...data.map(m => m.task4.PF)),
              VRA: Math.max(...data.map(m => m.task4.VRA)),
              CF: Math.max(...data.map(m => m.task4.CF)),
              EI: Math.max(...data.map(m => m.task4.EI))
            };
            
            const sortedData = [...data].sort((a, b) => {
              const avgA = (a.task4.PA + a.task4.PF + a.task4.VRA + a.task4.CF + a.task4.EI) / 5;
              const avgB = (b.task4.PA + b.task4.PF + b.task4.VRA + b.task4.CF + b.task4.EI) / 5;
              return avgB - avgA;
            });

            return (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-slate-600 bg-slate-900/80">
                      <th className="px-3 py-3 text-left font-semibold text-white">Model</th>
                      <th className="px-2 py-3 text-center font-semibold text-slate-300">PA</th>
                      <th className="px-2 py-3 text-center font-semibold text-slate-300">PF</th>
                      <th className="px-2 py-3 text-center font-semibold text-slate-300">VRA</th>
                      <th className="px-2 py-3 text-center font-semibold text-slate-300">CF</th>
                      <th className="px-2 py-3 text-center font-semibold text-slate-300">EI</th>
                      <th className="px-2 py-3 text-center font-semibold text-slate-300">Avg</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {sortedData.map((model, idx) => {
                      const avg = (model.task4.PA + model.task4.PF + model.task4.VRA + model.task4.CF + model.task4.EI) / 5;
                      return (
                        <tr key={model.model} className="transition-colors hover:bg-slate-700/30">
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-2">
                              <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                idx === 0 ? 'bg-amber-500 text-white' : 
                                idx === 1 ? 'bg-slate-400 text-white' : 
                                idx === 2 ? 'bg-orange-600 text-white' : 
                                'bg-slate-600 text-slate-300'
                              }`}>
                                {idx + 1}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <div 
                                  className="h-2.5 w-2.5 shrink-0 rounded-full" 
                                  style={{ backgroundColor: getModelColor(model.model) }}
                                />
                                <span className="text-xs font-semibold text-white">
                                  {model.model}
                                </span>
                                {idx === 0 && <span className="text-xs">👑</span>}
                              </div>
                            </div>
                          </td>
                          {(['PA', 'PF', 'VRA', 'CF', 'EI'] as const).map(dim => {
                            const score = model.task4[dim];
                            const isBest = score === bestScores[dim];
                            return (
                              <td key={dim} className="px-2 py-3 text-center">
                                <span className={`font-mono text-xs font-semibold ${
                                  isBest 
                                    ? 'text-amber-400' 
                                    : 'text-slate-300'
                                }`}>
                                  {score.toFixed(3)}
                                </span>
                                {isBest && <div className="text-amber-500">●</div>}
                              </td>
                            );
                          })}
                          <td className="px-2 py-3 text-center">
                            <span className={`font-mono text-xs font-bold ${
                              idx === 0 
                                ? 'text-amber-400' 
                                : 'text-slate-300'
                            }`}>
                              {avg.toFixed(3)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                
                {/* Legend */}
                <div className="mt-6 space-y-2 rounded-lg border border-slate-600/50 bg-slate-800/50 p-4 text-xs">
                  <div className="font-semibold text-slate-300">Dimensions:</div>
                  <div className="grid grid-cols-1 gap-1 text-slate-400">
                    <div><strong>PA:</strong> Persona Awareness</div>
                    <div><strong>PF:</strong> Preference Following</div>
                    <div><strong>VRA:</strong> Virtual-Reality Awareness</div>
                    <div><strong>CF:</strong> Consistency/Factuality</div>
                    <div><strong>EI:</strong> Emotional Intelligence</div>
                  </div>
                  <div className="mt-3 border-t border-slate-600/50 pt-2">
                    <span className="text-amber-500">●</span> = Best score in dimension
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

const ComparisonCharts = ({ data }: { data: BenchmarkData[] }) => {
  const task1Data = data.map(d => ({ name: d.model, score: d.task1 }));
  const task2Data = data.map(d => ({ name: d.model, score: d.task2 }));

  return (
    <section className="mx-auto mt-12 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-2">
        <BarChart3 className="h-6 w-6 text-blue-500" />
        <h2 className="text-2xl font-bold">Task 1 & 2 Performance Comparison (Score Range: 0-100)</h2>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-6 text-lg font-semibold">Task 1: Extraction</h3>
          <div className="w-full min-w-0">
            <ResponsiveContainer width="100%" height={400} minWidth={0}>
              <BarChart data={task1Data} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={120} fontSize={11} tick={{ fill: 'currentColor' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="score" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-6 text-lg font-semibold">Task 2: Updating</h3>
          <div className="w-full min-w-0">
            <ResponsiveContainer width="100%" height={400} minWidth={0}>
              <BarChart data={task2Data} layout="vertical" margin={{ left: 10, right: 30, top: 10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={120} fontSize={11} tick={{ fill: 'currentColor' }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="score" fill="#8b5cf6" radius={[0, 6, 6, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

const UtilizationRadar = ({ model }: { model: BenchmarkData }) => {
  const radarData = [
    { subject: 'PA', A: model.task4.PA, fullMark: 1 },
    { subject: 'PF', A: model.task4.PF, fullMark: 1 },
    { subject: 'VRA', A: model.task4.VRA, fullMark: 1 },
    { subject: 'CF', A: model.task4.CF, fullMark: 1 },
    { subject: 'EI', A: model.task4.EI, fullMark: 1 },
  ];

  const modelColor = getModelColor(model.model);

  return (
    <div className="w-full min-w-0">
      <ResponsiveContainer width="100%" height={300} minWidth={0}>
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
          <PolarGrid stroke="#475569" />
          <PolarAngleAxis dataKey="subject" fontSize={11} tick={{ fill: '#94a3b8' }} />
          <PolarRadiusAxis angle={30} domain={[0, 1.0]} tick={false} axisLine={false} />
          <Radar
            name={model.model}
            dataKey="A"
            stroke={modelColor}
            fill={modelColor}
            fillOpacity={0.4}
            dot={{ r: 3, fill: modelColor }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

const LeaderboardTable = ({ data, compact = false }: { data: BenchmarkData[], compact?: boolean }) => {
  // Calculate normalized total score for each model
  const dataWithTotal = data.map(model => {
    const task1Norm = model.task1 / 100; // Normalize 0-100 to 0-1
    const task2Norm = model.task2 / 100; // Normalize 0-100 to 0-1
    const task3Norm = Object.values(model.task3).reduce((a, b) => a + b, 0) / 5; // Already 0-1
    const task4Norm = Object.values(model.task4).reduce((a, b) => a + b, 0) / 5; // Already 0-1
    const totalScore = task1Norm + task2Norm + task3Norm + task4Norm;
    
    return { ...model, totalScore };
  });

  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' }>({ key: 'totalScore', direction: 'desc' });
  const [searchQuery, setSearchQuery] = useState('');

  const sortedData = useMemo(() => {
    let items = [...dataWithTotal];
    if (searchQuery) {
      items = items.filter(m => m.model.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    
    items.sort((a, b) => {
      let aValue: any, bValue: any;
      
      if (sortConfig.key === 'totalScore') {
        aValue = a.totalScore;
        bValue = b.totalScore;
      } else {
        aValue = a[sortConfig.key as keyof BenchmarkData] || 0;
        bValue = b[sortConfig.key as keyof BenchmarkData] || 0;
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });
    return items;
  }, [dataWithTotal, sortConfig, searchQuery]);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-white">
          <TableIcon className="h-7 w-7 text-purple-500" />
          <h2 className="text-3xl font-bold">Comprehensive Metrics</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input 
            type="text"
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border-2 border-slate-600/70 bg-slate-800/70 shadow-2xl backdrop-blur-sm">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-slate-600 bg-slate-900/80">
              <th className="px-5 py-4 text-center font-bold text-white" style={{ fontSize: '15px' }}>
                Rank
              </th>
              <th className="px-5 py-4 text-left font-bold text-white" style={{ fontSize: '15px' }}>
                Model
              </th>
              <th 
                className="cursor-pointer px-4 py-4 text-center font-bold text-white transition-colors hover:bg-slate-800"
                onClick={() => handleSort('task1')}
                style={{ fontSize: '15px' }}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <span>Task 1</span>
                  <span className="text-xs text-slate-300">Extraction</span>
                  {sortConfig.key === 'task1' && (sortConfig.direction === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />)}
                </div>
              </th>
              <th 
                className="cursor-pointer px-4 py-4 text-center font-bold text-white transition-colors hover:bg-slate-800"
                onClick={() => handleSort('task2')}
                style={{ fontSize: '15px' }}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <span>Task 2</span>
                  <span className="text-xs text-slate-300">Update</span>
                  {sortConfig.key === 'task2' && (sortConfig.direction === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />)}
                </div>
              </th>
              
              {/* Task 3: Retrieval - multiple distractor columns */}
              <th colSpan={5} className="border-l-2 border-slate-600 px-4 py-2 text-center font-bold text-emerald-400" style={{ fontSize: '15px' }}>
                Task 3 Retrieval
              </th>
              
              {/* Task 4: Utilization - multiple dimension columns */}
              <th colSpan={5} className="border-l-2 border-slate-600 px-4 py-2 text-center font-bold text-amber-400" style={{ fontSize: '15px' }}>
                Task 4 Utilization
              </th>
              
              <th className="border-l-2 border-slate-600 px-4 py-4 text-center font-bold text-blue-400" style={{ fontSize: '15px' }}>
                Total<br/>Score
              </th>
            </tr>
            <tr className="border-b border-slate-600 bg-slate-900/60">
              <th className="px-5 py-3"></th>
              <th className="px-5 py-3"></th>
              <th className="px-4 py-3"></th>
              <th className="px-4 py-3"></th>
              
              {/* Task 3 sub-headers */}
              {[100, 300, 500, 700, 1000].map(num => (
                <th key={num} className="px-3 py-3 text-center text-xs font-semibold text-slate-300">
                  {num}
                </th>
              ))}
              
              {/* Task 4 sub-headers */}
              {['PA', 'PF', 'VRA', 'CF', 'EI'].map(dim => (
                <th key={dim} className="px-3 py-3 text-center text-xs font-semibold text-slate-300">
                  {dim}
                </th>
              ))}
              
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {sortedData.map((row, idx) => {
              const totalScore = row.totalScore || 0;
              return (
                <motion.tr 
                  key={row.model}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`transition-colors hover:bg-slate-700/30 ${
                    idx === 0 ? 'bg-amber-900/20' : 
                    idx === 1 ? 'bg-slate-700/20' : 
                    idx === 2 ? 'bg-orange-900/20' : ''
                  }`}
                >
                  <td className="px-5 py-4 text-center">
                    <span className={`text-xl font-bold ${
                      idx === 0 ? 'text-amber-400' : 
                      idx === 1 ? 'text-slate-400' : 
                      idx === 2 ? 'text-orange-500' : 
                      'text-slate-500'
                    }`}>
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-3 w-3 rounded-full shrink-0" 
                        style={{ backgroundColor: getModelColor(row.model) }}
                      />
                      <span className="font-bold text-white" style={{ fontSize: '15px' }}>
                        {row.model}
                      </span>
                      {row.isPopular && (
                        <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs font-bold text-blue-300">
                          TOP
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-bold text-white" style={{ fontSize: '14px' }}>
                      {row.task1.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className="font-bold text-white" style={{ fontSize: '14px' }}>
                      {row.task2.toFixed(2)}
                    </span>
                  </td>
                  
                  {/* Task 3 distractor columns */}
                  {[100, 300, 500, 700, 1000].map(num => {
                    const score = row.task3[num as keyof Task3Metrics];
                    const bestScore = Math.max(...sortedData.map(m => m.task3[num as keyof Task3Metrics]));
                    const isBest = score === bestScore;
                    return (
                      <td key={num} className="px-3 py-4 text-center">
                        <span className={`font-mono font-semibold ${
                          isBest ? 'text-emerald-400' : 'text-slate-300'
                        }`} style={{ fontSize: '13px' }}>
                          {score.toFixed(4)}
                        </span>
                      </td>
                    );
                  })}
                  
                  {/* Task 4 dimension columns */}
                  {['PA', 'PF', 'VRA', 'CF', 'EI'].map(dim => {
                    const score = row.task4[dim as keyof Task4Metrics];
                    const bestScore = Math.max(...sortedData.map(m => m.task4[dim as keyof Task4Metrics]));
                    const isBest = score === bestScore;
                    return (
                      <td key={dim} className="px-3 py-4 text-center">
                        <span className={`font-mono font-semibold ${
                          isBest ? 'text-amber-400' : 'text-slate-300'
                        }`} style={{ fontSize: '13px' }}>
                          {score.toFixed(4)}
                        </span>
                      </td>
                    );
                  })}
                  
                  <td className="border-l-2 border-slate-600 px-4 py-4 text-center">
                    <span className={`font-bold ${
                      idx === 0 ? 'text-amber-400' : 'text-blue-400'
                    }`} style={{ fontSize: '15px' }}>
                      {totalScore.toFixed(3)}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-600/50 bg-slate-800/50 p-4">
          <div className="mb-2 font-bold text-emerald-400" style={{ fontSize: '14px' }}>Task 3: Retrieval</div>
          <div className="text-xs text-slate-300 leading-relaxed">
            Performance under different distractor counts (100, 300, 500, 700, 1000). Higher scores indicate better retrieval robustness.
          </div>
        </div>
        <div className="rounded-lg border border-slate-600/50 bg-slate-800/50 p-4">
          <div className="mb-2 font-bold text-amber-400" style={{ fontSize: '14px' }}>Task 4: Utilization</div>
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong>PA</strong>: Persona Awareness | <strong>PF</strong>: Preference Following | <strong>VRA</strong>: Virtual-Reality Awareness | <strong>CF</strong>: Consistency/Factuality | <strong>EI</strong>: Emotional Intelligence
          </div>
        </div>
        <div className="rounded-lg border border-slate-600/50 bg-slate-800/50 p-4">
          <div className="mb-2 font-bold text-blue-400" style={{ fontSize: '14px' }}>Scoring</div>
          <div className="text-xs text-slate-300 leading-relaxed">
            <strong>Total Score</strong>: Sum of normalized T1-T4 (max 4.00)
          </div>
        </div>
      </div>
    </section>
  );
};

const ModelRow = ({ row, index, compact }: { row: BenchmarkData & { totalScore?: number }, index: number, compact?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t3Avg = (Object.values(row.task3).reduce((a, b) => a + b, 0) / 5).toFixed(4);
  const t4Avg = (Object.values(row.task4).reduce((a, b) => a + b, 0) / 5).toFixed(4);
  const medal = getRankMedal(row.rank);
  const totalScore = row.totalScore || 0;

  return (
    <>
      <motion.tr 
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className={`group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 ${isOpen ? 'bg-slate-50 dark:bg-slate-800/50' : ''}`}
      >
        <td className="px-6 py-4">
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold ${index === 0 ? 'text-amber-600' : index === 1 ? 'text-slate-500' : index === 2 ? 'text-orange-600' : 'text-slate-500'}`}>
              {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
            </span>
          </div>
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: getModelColor(row.model) }}
            />
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              {row.model}
              {row.isPopular && (
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  TOP
                </span>
              )}
            </div>
          </div>
        </td>
        <td className="px-4 py-4 font-medium text-slate-600 dark:text-slate-300">{row.task1.toFixed(2)}</td>
        <td className="px-4 py-4 font-medium text-slate-600 dark:text-slate-300">{row.task2.toFixed(2)}</td>
        <td className="px-4 py-4 text-slate-500">{t3Avg}</td>
        <td className="px-4 py-4 text-slate-500">{t4Avg}</td>
        <td className="px-4 py-4">
          <div className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
            {totalScore.toFixed(3)}
          </div>
        </td>
        <td className="px-6 py-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-slate-400 transition-colors hover:text-blue-500"
          >
            {isOpen ? 'Close' : 'View'}
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </td>
      </motion.tr>
      {isOpen && (
        <tr>
          <td colSpan={8} className="px-6 py-0">
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden py-8"
            >
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <Layers className="h-4 w-4 text-emerald-500" />
                    Task 3: Retrieval Robustness
                  </h4>
                  <div className="space-y-2">
                    {Object.entries(row.task3).map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800">
                        <span className="text-slate-500">{k} Distractors</span>
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{v.toFixed(4)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <BrainCircuit className="h-4 w-4 text-blue-500" />
                    Task 4: Utilization Radar
                  </h4>
                  <UtilizationRadar model={row} />
                </div>

                <div className="space-y-6">
                  <div className="rounded-xl bg-blue-600 p-6 text-white">
                    <p className="text-sm font-medium opacity-80">Total Normalized Score</p>
                    <div className="mt-1 text-3xl font-bold">{totalScore.toFixed(3)} / 4.00</div>
                    <div className="mt-2 text-xs opacity-70">Sum of normalized tasks (T1-T4)</div>
                    <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-white py-2 text-sm font-bold text-blue-600 transition-transform active:scale-95">
                      Full Report <ExternalLink className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </td>
        </tr>
      )}
    </>
  );
};

const Footer = () => (
  <footer className="mt-24 border-t border-slate-200 bg-white py-12 dark:border-slate-800 dark:bg-slate-950">
    <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white">
          <BrainCircuit className="h-6 w-6 text-blue-500" />
          MemBench
        </div>
        <p className="max-w-md text-sm text-slate-500">
          Open-source memory benchmark for large language models. Providing transparency and empirical data for the AI research community.
        </p>
        <div className="mt-4 flex gap-6 text-sm font-medium text-slate-500">
          <a href="#" className="hover:text-blue-500 transition-colors">Documentation</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Methodology</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Submit Model</a>
        </div>
      </div>
      <div className="mt-12 text-xs text-slate-400">
        © 2026 Memory Benchmark Lab. All rights reserved. Data based on Table 1: Overall evaluation results.
      </div>
    </div>
  </footer>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'task1', name: 'Task 1 (Extraction)', icon: BarChart3 },
    { id: 'task2', name: 'Task 2 (Updating)', icon: Layers },
    { id: 'task3', name: 'Task 3 (Retrieval)', icon: Database },
    { id: 'task4', name: 'Task 4 (Utilization)', icon: BrainCircuit },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-900 selection:bg-blue-100 selection:text-blue-700 dark:text-white dark:selection:bg-blue-900 dark:selection:text-blue-200">
      <Header />
      <main className="pb-24 pt-12">
        <div className="mx-auto w-[90%] px-6">
          <div className="flex flex-col gap-8">
            {/* Task Switcher Bar */}
            <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-slate-800/70 p-3 shadow-xl ring-2 ring-slate-700/70 backdrop-blur-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 rounded-xl px-6 py-3.5 text-base font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-500 text-white shadow-lg scale-105'
                      : 'text-slate-300 hover:bg-slate-700/70 hover:scale-105 hover:text-white dark:text-slate-400 dark:hover:bg-slate-700'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="whitespace-nowrap">{tab.name}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === 'overview' && (
                    <div className="space-y-8">
                      {/* 2x2 Grid for 4 Tasks - Each Task has chart+leaderboard internally */}
                      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        <Task1Chart data={BENCHMARK_DATA} />
                        <Task2Chart data={BENCHMARK_DATA} />
                        <Task3Chart data={BENCHMARK_DATA} />
                        <Task4Chart data={BENCHMARK_DATA} compact />
                      </div>
                      
                      {/* Overall Comprehensive Table at bottom */}
                      <LeaderboardTable data={BENCHMARK_DATA} />
                    </div>
                  )}
                  {activeTab === 'task1' && <Task1Chart data={BENCHMARK_DATA} />}
                  {activeTab === 'task2' && <Task2Chart data={BENCHMARK_DATA} />}
                  {activeTab === 'task3' && <Task3Chart data={BENCHMARK_DATA} />}
                  {activeTab === 'task4' && <Task4Chart data={BENCHMARK_DATA} />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* About AlpsBench - Compact footer-style section */}
        <section className="mt-16 w-full border-t border-slate-700/50 bg-slate-950/50 py-8 text-white backdrop-blur-sm">
          <div className="mx-auto max-w-[120rem] px-6">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Info className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-bold">About AlpsBench</h3>
            </div>
            
            <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-slate-400">
              <strong className="text-white">AlpsBench</strong> is a comprehensive LLM personalization benchmark derived from <strong className="text-blue-400">real-world human-LLM dialogues</strong>. 
              Built on 2,500 interaction sequences from WildChat with human-verified memories, it evaluates four core tasks (Extraction, Updating, Retrieval, Utilization) 
              across five dimensions: Persona Awareness, Preference Following, Virtual-Reality Awareness, Consistency/Factuality, and Emotional Intelligence.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}