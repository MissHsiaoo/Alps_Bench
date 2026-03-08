# AlpsBench Leaderboard

> **Real-world LLM personalization benchmark** — Evaluate models across extraction, updating, retrieval, and utilization.

[![Live Demo](https://img.shields.io/badge/Live_Demo-Open-4F46E5?style=for-the-badge)](https://misshsiaoo.github.io/Alps_Bench/)

---

## See it in action

The leaderboard includes an interactive **Benchmark Introduction** with:

- **Data Pipeline** — Visual flow: WildChat → Machine Extraction → Human Annotation → AlpsBench
- **Task Overview** — 2×2 grid of all four tasks at a glance
- **Task Demos** — Animated demonstrations for each task:
  - **Extraction**: Dialogue → highlighted spans → structured memory output
  - **Updating**: New dialogue + original memory → update action → updated memory
  - **Retrieval**: Query + memory pool → retrieved subset with relevance
  - **Utilization**: Context + query → response → 5-dimension evaluation (PA, PF, VRA, CF, EI)
- **Methodology** — Input → Process → Output schematics per task

👉 **[Open the live page →](https://misshsiaoo.github.io/Alps_Bench/)** — Switch to the *Benchmark Introduction* tab to explore.

---

## Four core tasks

| Task | Name | What it measures |
|------|------|------------------|
| **Task 1** | Extraction | Distilling structured memory from raw multi-turn dialogues |
| **Task 2** | Updating | Retaining, adding, or modifying memory given new evidence |
| **Task 3** | Retrieval | Selecting relevant memory under 100–1000 distractors |
| **Task 4** | Utilization | Response quality across 5 capability dimensions |

### Task 4 dimensions (PA, PF, VRA, CF, EI)

| Abbr | Full name |
|------|-----------|
| **PA** | Persona Awareness |
| **PF** | Preference Following |
| **VRA** | Virtual-Reality Awareness |
| **CF** | Constraint Following |
| **EI** | Emotional Intelligence |

---

## Page structure

Each task has its own dedicated ranking visualization page (parallel to Benchmark Introduction):

| Tab | Content |
|-----|---------|
| **Overview** | 2×2 task charts + full-metric table with search |
| **Task 1–4** | Per-task ranking charts and detailed visualizations |
| **Benchmark Introduction** | Pipeline, demos, methodology (see above) |

---

## Citation

> *AlpsBench: An LLM Personalization Benchmark Derived from Real-World Human–LLM Dialogues.* (Full citation to be provided upon publication.)

---

## Links

- **Benchmark code & data**: [github.com/ThisIsCosine/AlpsBench](https://github.com/ThisIsCosine/AlpsBench)
- **Leaderboard**: [misshsiaoo.github.io/Alps_Bench](https://misshsiaoo.github.io/Alps_Bench/)

---

