# AlpsBench Leaderboard

This is the official public leaderboard for **AlpsBench**, a comprehensive benchmark for evaluating LLM personalization derived from real-world human–LLM dialogues. The leaderboard presents evaluation results of frontier LLMs across four core personalization tasks, enabling transparent and continuous comparison across models.

Live page: https://misshsiaoo.github.io/Alps_Bench/

## Evaluated Tasks

AlpsBench defines four tasks that collectively cover the full lifecycle of personalized information management:

| Task | Name | Description |
|------|------|-------------|
| Task 1 | **Extraction** | Distilling structured personalized memory from raw multi-turn dialogues. |
| Task 2 | **Updating** | Accurately retaining, adding, or modifying memory entries given new dialogue evidence. |
| Task 3 | **Retrieval** | Selecting relevant memory from a candidate pool under varying distractor scales (100, 300, 500, 700, 1000). |
| Task 4 | **Utilization** | Generating responses aligned with user preferences, evaluated across five capability dimensions. |

## Metrics and Abbreviations

### Task 3: Distractor Scale

Retrieval performance is reported at five distractor pool sizes: **100**, **300**, **500**, **700**, and **1000**. Larger pools introduce more irrelevant candidates, testing retrieval robustness.

### Task 4: Capability Dimensions

| Abbreviation | Full Name | Description |
|--------------|-----------|-------------|
| **PA** | Persona Awareness | Whether the model recognizes and reflects the user's identity and background. |
| **PF** | Preference Following | Whether the model aligns its output with the user's stated or inferred preferences. |
| **VRA** | Virtual-Reality Awareness | Whether the model distinguishes between factual reality and hypothetical or role-play scenarios. |
| **CF** | Constraint Following | Whether the model adheres to explicit constraints or instructions given by the user. |
| **EI** | Emotional Intelligence | Whether the model produces emotionally appropriate and empathetic responses. |

### Global Scores

| Column | Description |
|--------|-------------|
| **Total Score** | Aggregated score across all four tasks. |
| **Global (EN / CN)** | Overall quality ratings evaluated in English and Chinese respectively. |

## Page Navigation

The leaderboard page is organized by a top-level tab bar with the following views:

- **Overview** — A summary view containing a 2×2 grid of per-task charts and a comprehensive full-metric table at the bottom.
- **Task 1 (Extraction)** — Bar chart and ranking for extraction performance.
- **Task 2 (Updating)** — Bar chart and ranking for memory update accuracy.
- **Task 3 (Retrieval)** — Line chart (or table) showing retrieval accuracy as distractor count increases, with a side panel ranking that can be filtered by distractor scale.
- **Task 4 (Utilization)** — Radar chart and per-dimension breakdown of the five capability scores.

### Interactive Features

- **Model search**: In the comprehensive table (Overview), use the search bar to filter by model name.
- **Chart / Table toggle**: In the Task 3 detail view, switch between a line chart and a tabular view.
- **Distractor selector**: In the Task 3 detail view, select a specific distractor count (100–1000) to update the side-panel leaderboard ranking.

## Citation

If you use AlpsBench or this leaderboard in your research, please cite:

> *AlpsBench: An LLM Personalization Benchmark Derived from Real-World Human–LLM Dialogues.* (Full citation to be provided upon publication.)

## Links

- Benchmark code and data: https://github.com/ThisIsCosine/AlpsBench
- Leaderboard page: https://misshsiaoo.github.io/Alps_Bench/
