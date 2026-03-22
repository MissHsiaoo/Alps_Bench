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

type CsvRow = Record<string, string>;

const DATA_DIRECTORY = `${import.meta.env.BASE_URL}benchmark-data`;

const POPULAR_MODELS = new Set([
  'DeepSeek Reasoner',
  'Gemini-3 Flash',
  'GPT-5.2',
  'Claude Sonnet 4.5',
]);

const MODEL_NAME_ALIASES: Record<string, string> = {
  'GPT-5.2': 'GPT-5.2',
  'GPT-4.1-mini': 'GPT-4.1-mini',
  'DeepSeek Reasoner': 'DeepSeek Reasoner',
  'gemini-3-flash-preview': 'Gemini-3 Flash',
  'Gemini-3 Flash': 'Gemini-3 Flash',
  'llama-4-maverick': 'Llama-4 Maverick',
  'Llama-4 Maverick': 'Llama-4 Maverick',
  'claude-sonnet-4-5-20250929': 'Claude Sonnet 4.5',
  'Claude Sonnet 4.5': 'Claude Sonnet 4.5',
  'Qwen3-max': 'Qwen3-max',
};

const resolveDataUrl = (fileName: string): string => `${DATA_DIRECTORY}/${fileName}`;

const normalizeModelName = (modelName: string): string => MODEL_NAME_ALIASES[modelName.trim()] || modelName.trim();

const roundTo = (value: number, digits: number): number => Number(value.toFixed(digits));

const splitCsvLine = (line: string): string[] => {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];

    if (char === '"') {
      const escapedQuote = inQuotes && line[index + 1] === '"';
      if (escapedQuote) {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
};

const parseCsvRows = (csvText: string): CsvRow[] => {
  const lines = csvText
    .replace(/^\uFEFF/, '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length === 0) {
    return [];
  }

  const headers = splitCsvLine(lines[0]);
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    return headers.reduce<CsvRow>((row, header, index) => {
      row[header] = values[index] ?? '';
      return row;
    }, {});
  });
};

const fetchCsvRows = async (fileName: string): Promise<CsvRow[]> => {
  const response = await fetch(resolveDataUrl(fileName));

  if (!response.ok) {
    throw new Error(`Failed to load ${fileName}: ${response.status} ${response.statusText}`);
  }

  return parseCsvRows(await response.text());
};

const parseNumber = (value: string, fileName: string, rowLabel: string, columnName: string): number => {
  const parsedValue = Number(value);

  if (Number.isNaN(parsedValue)) {
    throw new Error(`Invalid numeric value in ${fileName} for row "${rowLabel}" column "${columnName}"`);
  }

  return parsedValue;
};

const getRowByLabel = (rows: CsvRow[], labelColumn: string, labelValue: string, fileName: string): CsvRow => {
  const row = rows.find((item) => item[labelColumn] === labelValue);

  if (!row) {
    throw new Error(`Missing row "${labelValue}" in ${fileName}`);
  }

  return row;
};

const getMetricValue = (row: CsvRow, modelName: string, fileName: string, rowLabel: string): number => {
  const matchedEntry = Object.entries(row).find(([columnName]) => normalizeModelName(columnName) === modelName);
  const rawColumnName = matchedEntry?.[0] ?? modelName;
  const rawValue = matchedEntry?.[1];

  if (rawValue == null || rawValue === '') {
    throw new Error(`Missing model "${modelName}" in ${fileName} row "${rowLabel}"`);
  }

  return parseNumber(rawValue, fileName, rowLabel, rawColumnName);
};

const getPrimaryModels = (rows: CsvRow[], labelColumn: string): string[] => {
  if (rows.length === 0) {
    return [];
  }

  return Object.keys(rows[0])
    .filter((column) => column !== labelColumn)
    .map(normalizeModelName)
    .filter((modelName) => !['nltk+bm25', 'all-MiniLM-L6-v2', 'grd'].includes(modelName));
};

const loadEiScoreMap = (
  englishRows: CsvRow[],
  chineseRows: CsvRow[],
  canonicalModels: string[],
): Record<string, number> => {
  const englishMethods = ['Resonation', 'Expression', 'Reception'];
  const chineseMethods = ['Resonation', 'Expression', 'Reception'];

  return canonicalModels.reduce<Record<string, number>>((accumulator, modelName) => {
    const englishValues = englishMethods.map((method) => {
      const row = getRowByLabel(englishRows, 'Method', method, 'task4-ei-english.csv');
      return getMetricValue(row, modelName, 'task4-ei-english.csv', method);
    });

    const chineseValues = chineseMethods.map((method) => {
      const row = getRowByLabel(chineseRows, 'Method', method, 'task4-ei-chinese.csv');
      return getMetricValue(row, modelName, 'task4-ei-chinese.csv', method);
    });

    const combinedAverage = [...englishValues, ...chineseValues].reduce((sum, value) => sum + value, 0) / 6;
    accumulator[modelName] = roundTo(combinedAverage / 4, 4);
    return accumulator;
  }, {});
};

export const loadBenchmarkData = async (): Promise<BenchmarkData[]> => {
  const [task1Rows, task2Rows, task3Rows, task4AbilityRows, task4EiEnglishRows, task4EiChineseRows] = await Promise.all([
    fetchCsvRows('task1-metrics.csv'),
    fetchCsvRows('task2-metrics.csv'),
    fetchCsvRows('task3-retrieval.csv'),
    fetchCsvRows('task4-abilities.csv'),
    fetchCsvRows('task4-ei-english.csv'),
    fetchCsvRows('task4-ei-chinese.csv'),
  ]);

  const canonicalModels = getPrimaryModels(task1Rows, 'Metric');
  const task1ScoreRow = getRowByLabel(task1Rows, 'Metric', 'score', 'task1-metrics.csv');
  const task2ScoreRow = getRowByLabel(task2Rows, 'Metric', 'score', 'task2-metrics.csv');
  const task3Row100 = getRowByLabel(task3Rows, 'Metric', 'd100', 'task3-retrieval.csv');
  const task3Row300 = getRowByLabel(task3Rows, 'Metric', 'd300', 'task3-retrieval.csv');
  const task3Row500 = getRowByLabel(task3Rows, 'Metric', 'd500', 'task3-retrieval.csv');
  const task3Row700 = getRowByLabel(task3Rows, 'Metric', 'd700', 'task3-retrieval.csv');
  const task3Row1000 = getRowByLabel(task3Rows, 'Metric', 'd1000', 'task3-retrieval.csv');
  const task4Ability1 = getRowByLabel(task4AbilityRows, 'Metric', 'Ability1', 'task4-abilities.csv');
  const task4Ability2 = getRowByLabel(task4AbilityRows, 'Metric', 'Ability2', 'task4-abilities.csv');
  const task4Ability3 = getRowByLabel(task4AbilityRows, 'Metric', 'Ability3', 'task4-abilities.csv');
  const task4Ability4 = getRowByLabel(task4AbilityRows, 'Metric', 'Ability4', 'task4-abilities.csv');
  const eiScoreByModel = loadEiScoreMap(task4EiEnglishRows, task4EiChineseRows, canonicalModels);

  const data = canonicalModels.map((modelName) => {
    const task1 = getMetricValue(task1ScoreRow, modelName, 'task1-metrics.csv', 'score');
    const task2 = getMetricValue(task2ScoreRow, modelName, 'task2-metrics.csv', 'score');
    const task3: Task3Metrics = {
      '100': getMetricValue(task3Row100, modelName, 'task3-retrieval.csv', 'd100'),
      '300': getMetricValue(task3Row300, modelName, 'task3-retrieval.csv', 'd300'),
      '500': getMetricValue(task3Row500, modelName, 'task3-retrieval.csv', 'd500'),
      '700': getMetricValue(task3Row700, modelName, 'task3-retrieval.csv', 'd700'),
      '1000': getMetricValue(task3Row1000, modelName, 'task3-retrieval.csv', 'd1000'),
    };
    const task4: Task4Metrics = {
      PA: getMetricValue(task4Ability1, modelName, 'task4-abilities.csv', 'Ability1'),
      PF: getMetricValue(task4Ability2, modelName, 'task4-abilities.csv', 'Ability2'),
      VRA: getMetricValue(task4Ability3, modelName, 'task4-abilities.csv', 'Ability3'),
      CF: getMetricValue(task4Ability4, modelName, 'task4-abilities.csv', 'Ability4'),
      EI: eiScoreByModel[modelName],
    };

    const task3Average = Object.values(task3).reduce((sum, value) => sum + value, 0) / 5;
    const task4Average = Object.values(task4).reduce((sum, value) => sum + value, 0) / 5;
    const totalScore = task1 / 100 + task2 / 100 + task3Average + task4Average;

    return {
      rank: 0,
      model: modelName,
      task1,
      task2,
      task3,
      task4,
      genInt: roundTo(totalScore, 2),
      en: roundTo(task4.EI, 2),
      cn: roundTo(task4.EI, 2),
      isPopular: POPULAR_MODELS.has(modelName),
      totalScore,
    };
  });

  return data
    .sort((a, b) => b.totalScore - a.totalScore)
    .map(({ totalScore: _totalScore, ...item }, index) => ({
      ...item,
      rank: index + 1,
    }));
};

export const MODEL_COLORS: Record<string, string> = {
  'GPT-5.2': '#7BA3D0',
  'GPT-4.1-mini': '#88C5CC',
  'DeepSeek Reasoner': '#A094C7',
  'Gemini-3 Flash': '#8FBE9F',
  'Llama-4 Maverick': '#E5B98F',
  'Claude Sonnet 4.5': '#D4A5B3',
  'Qwen3-max': '#7DB5B0',
};

export const getModelColor = (modelName: string): string => {
  return MODEL_COLORS[modelName] || '#9CA3AF';
};

export const getRankMedal = (rank: number): string => {
  switch (rank) {
    case 1:
      return '🥇';
    case 2:
      return '🥈';
    case 3:
      return '🥉';
    default:
      return '';
  }
};

export const getRankStyle = (rank: number): string => {
  if (rank <= 3) return 'text-amber-600 font-bold';
  return 'text-slate-500 font-semibold';
};
