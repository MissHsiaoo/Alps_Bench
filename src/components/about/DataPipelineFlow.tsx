import React from 'react';
import { ArrowRight, ExternalLink, Github, FileText, Grid3x3 } from 'lucide-react';

interface DataPipelineFlowProps {
  onOverviewClick?: () => void;
}

export const DataPipelineFlow: React.FC<DataPipelineFlowProps> = ({ onOverviewClick }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border-2 border-slate-600/50 rounded-xl p-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Data Processing Pipeline</h3>
        <p className="text-sm text-slate-400">Four-step benchmark construction based on real human-LLM dialogues</p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-center gap-4 mb-8 max-lg:grid-cols-1 max-lg:gap-6">
        {/* Step 1: WildChat */}
        <div className="bg-slate-800/80 border-2 border-blue-500/50 rounded-xl p-5 hover:scale-105 transition-transform duration-200">
          <div className="text-center mb-3">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">Step 1</div>
            <div className="text-white font-bold text-base mb-1">WildChat</div>
            <div className="text-slate-400 text-xs mb-3">Data Collection</div>
          </div>
          <div className="text-center mb-3">
            <div className="text-2xl font-bold text-white">1M</div>
            <div className="text-xs text-blue-400">Conversations</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <a
              href="https://arxiv.org/html/2512.04259v1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
            >
              <FileText className="w-3 h-3" />
              <span>Paper</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
            <a
              href="https://huggingface.co/datasets/allenai/WildChat-1M"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-orange-500/80 to-pink-500/80 hover:from-orange-500 hover:to-pink-500 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200"
            >
              <span>🤗</span>
              <span>HuggingFace</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center max-lg:hidden">
          <ArrowRight className="w-6 h-6 text-blue-400" strokeWidth={3} />
        </div>

        {/* Step 2: Machine Extraction */}
        <div className="bg-slate-800/80 border-2 border-purple-500/50 rounded-xl p-5 hover:scale-105 transition-transform duration-200">
          <div className="text-center mb-3">
            <div className="text-3xl mb-2">🤖</div>
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">Step 2</div>
            <div className="text-white font-bold text-base mb-1">Machine Extraction</div>
            <div className="text-slate-400 text-xs mb-3">LLM-based extraction</div>
          </div>
          <div className="text-center mb-3">
            <div className="text-2xl font-bold text-white">90K</div>
            <div className="text-xs text-purple-400">Selected Dialogues</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <a
              href="https://github.com/ThisIsCosine/AlpsBench"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200"
            >
              <Github className="w-3 h-3" />
              <span>GitHub</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center max-lg:hidden">
          <ArrowRight className="w-6 h-6 text-purple-400" strokeWidth={3} />
        </div>

        {/* Step 3: Human Annotation */}
        <div className="bg-slate-800/80 border-2 border-emerald-500/50 rounded-xl p-5 hover:scale-105 transition-transform duration-200">
          <div className="text-center mb-3">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">Step 3</div>
            <div className="text-white font-bold text-base mb-1">Human Annotation</div>
            <div className="text-slate-400 text-xs mb-3">Expert review</div>
          </div>
          <div className="text-center mb-3">
            <div className="text-2xl font-bold text-white">2.5K</div>
            <div className="text-xs text-emerald-400">High-quality samples</div>
          </div>
          <div className="flex flex-col gap-1.5">
            <a
              href="https://misshsiaoo.github.io/DataAnnotation/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200"
            >
              <span>🌐</span>
              <span>Annotation Web</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center max-lg:hidden">
          <ArrowRight className="w-6 h-6 text-emerald-400" strokeWidth={3} />
        </div>

        {/* Step 4: AlpsBench */}
        <div className="bg-slate-800/80 border-2 border-amber-500/50 rounded-xl p-6 hover:scale-105 transition-transform duration-200">
          <div className="text-center mb-4">
            <div className="text-4xl mb-2">🎯</div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Step 4</div>
            <div className="text-white font-bold text-xl mb-1">AlpsBench</div>
            <div className="text-slate-400 text-xs mb-3">Task Construction</div>
          </div>
          <div className="text-center mb-4">
            <div className="text-white text-sm font-semibold mb-2">4 Evaluation Tasks</div>
            <div className="text-slate-400 text-xs leading-relaxed mb-3">
              Extraction • Updating<br />Retrieval • Utilization
            </div>
            {onOverviewClick && (
              <button
                onClick={onOverviewClick}
                className="inline-flex items-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 hover:scale-105"
              >
                <Grid3x3 className="w-3 h-3" />
                <span>View Overview</span>
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <a
              href="https://huggingface.co/datasets/Cosineyx/Alpsbench/tree/main/dataset"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:scale-105 shadow-lg"
            >
              <span>🤗</span>
              <span>Dataset</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/ThisIsCosine/AlpsBench"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Code</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://github.com/ThisIsCosine/AlpsBench/blob/main/paper/PersonalizationBench__Arxiv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-slate-700/50 hover:bg-slate-600/50 border border-slate-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Paper</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      <div className="text-center pt-4 border-t border-slate-600/50">
        <a
          href="https://github.com/ThisIsCosine/AlpsBench"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105"
        >
          <Github className="w-4 h-4" />
          <span>Test Your Model Performance</span>
          <ExternalLink className="w-4 h-4" />
        </a>
        <p className="text-xs text-slate-400 mt-2">
          Evaluate your model on AlpsBench benchmark
        </p>
      </div>
    </div>
  );
};
