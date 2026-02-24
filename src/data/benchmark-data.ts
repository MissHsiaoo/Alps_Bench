// Benchmark Data Types
export interface Task3Metrics {
  '100': number;
  '300': number;
  '500': number;
  '700': number;
  '1000': number;
}

export interface Task4Metrics {
  PA: number;
  PF: number;
  VRA: number;
  CF: number;
  EI: number;
}

export interface BenchmarkData {
  rank: number;
  model: string;
  task1: number;
  task2: number;
  task3: Task3Metrics;
  task4: Task4Metrics;
  genInt: number;
  en: number;
  cn: number;
  isPopular?: boolean;
}

// Benchmark Results - Sorted by General Intelligence (genInt) in descending order
export const BENCHMARK_DATA: BenchmarkData[] = [
  {
    rank: 1,
    model: "Qwen3-max",
    task1: 39.01,
    task2: 76.28,
    task3: { '100': 0.9180, '300': 0.8669, '500': 0.8314, '700': 0.7871, '1000': 0.7542 },
    task4: { PA: 0.6228, PF: 0.6901, VRA: 0.6574, CF: 0.6834, EI: 0.8267 },
    genInt: 3.68,
    en: 3.84,
    cn: 3.84
  },
  {
    rank: 2,
    model: "DeepSeek Reasoner",
    task1: 47.79,
    task2: 80.91,
    task3: { '100': 0.9569, '300': 0.9484, '500': 0.9376, '700': 0.9083, '1000': 0.9273 },
    task4: { PA: 0.5825, PF: 0.6483, VRA: 0.6120, CF: 0.5825, EI: 0.9602 },
    genInt: 3.66,
    en: 4.00,
    cn: 4.00,
    isPopular: true
  },
  {
    rank: 3,
    model: "Gemini-3 Flash",
    task1: 51.67,
    task2: 68.85,
    task3: { '100': 0.9538, '300': 0.9419, '500': 0.9342, '700': 0.9268, '1000': 0.9269 },
    task4: { PA: 0.6895, PF: 0.7655, VRA: 0.7052, CF: 0.6895, EI: 0.8328 },
    genInt: 3.49,
    en: 3.58,
    cn: 3.58,
    isPopular: true
  },
  {
    rank: 4,
    model: "GPT-5.2",
    task1: 41.43,
    task2: 81.49,
    task3: { '100': 0.9254, '300': 0.9052, '500': 0.8884, '700': 0.8733, '1000': 0.8572 },
    task4: { PA: 0.5702, PF: 0.6983, VRA: 0.7680, CF: 0.5702, EI: 0.5702 },
    genInt: 3.42,
    en: 3.90,
    cn: 3.90,
    isPopular: true
  },
  {
    rank: 5,
    model: "Claude Sonnet 4.5",
    task1: 41.64,
    task2: 51.25,
    task3: { '100': 0.9542, '300': 0.9030, '500': 0.9222, '700': 0.8999, '1000': 0.8855 },
    task4: { PA: 0.5614, PF: 0.6045, VRA: 0.5498, CF: 0.5933, EI: 0.9514 },
    genInt: 3.10,
    en: 3.05,
    cn: 3.05,
    isPopular: true
  },
  {
    rank: 6,
    model: "GPT-4.1-mini",
    task1: 33.69,
    task2: 54.66,
    task3: { '100': 0.8802, '300': 0.8156, '500': 0.7761, '700': 0.7482, '1000': 0.7295 },
    task4: { PA: 0.4018, PF: 0.4995, VRA: 0.5240, CF: 0.4018, EI: 0.4018 },
    genInt: 2.79,
    en: 2.92,
    cn: 2.92
  },
  {
    rank: 7,
    model: "Llama-4 Maverick",
    task1: 22.07,
    task2: 58.84,
    task3: { '100': 0.8729, '300': 0.6005, '500': 0.5616, '700': 0.5141, '1000': 0.4811 },
    task4: { PA: 0.2684, PF: 0.1152, VRA: 0.3080, CF: 0.1552, EI: 0.8720 },
    genInt: 2.48,
    en: 2.38,
    cn: 2.38
  }
];

// Model Color Palette - Japanese-inspired soft colors
export const MODEL_COLORS: Record<string, string> = {
  "GPT-5.2": "#7BA3D0",           // Soft Blue (浅葱色)
  "GPT-4.1-mini": "#88C5CC",      // Soft Cyan (水色)
  "DeepSeek Reasoner": "#A094C7", // Soft Purple (藤色)
  "Gemini-3 Flash": "#8FBE9F",    // Soft Green (青磁色)
  "Llama-4 Maverick": "#E5B98F",  // Soft Amber (砂色)
  "Claude Sonnet 4.5": "#D4A5B3", // Soft Pink (桃色)
  "Qwen3-max": "#7DB5B0"          // Soft Teal (青緑)
};

export const getModelColor = (modelName: string): string => {
  return MODEL_COLORS[modelName] || "#9CA3AF"; // Default to soft gray if not found
};

// Helper function to get medal emoji based on rank
export const getRankMedal = (rank: number): string => {
  switch (rank) {
    case 1: return "🥇";
    case 2: return "🥈";
    case 3: return "🥉";
    default: return "";
  }
};

// Helper function to get rank display style
export const getRankStyle = (rank: number): string => {
  if (rank <= 3) return "text-amber-600 font-bold";
  return "text-slate-500 font-semibold";
};
