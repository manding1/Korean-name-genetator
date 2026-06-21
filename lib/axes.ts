export type Gender = 'male' | 'female' | 'neutral';

export interface AxisScores {
  creative: number;
  warm: number;
  urban: number;
  independent: number;
  elegant: number;
}

type AxisDeltas = Partial<AxisScores>;

// Q2–Q10 answer → axis point contributions
const WEIGHTS: Record<number, Record<string, AxisDeltas>> = {
  2: { // You just arrived in Korea
    A: { creative: 2, independent: 2 },
    B: { creative: 1, urban: 2 },
    C: { independent: 1 },
    D: { creative: 2, warm: 1 },
    E: { urban: 2, independent: 1 },
  },
  3: { // Friends describe you as
    A: { warm: 3 },
    B: { creative: 3 },
    C: { independent: 2 },
    D: { warm: 3 },
    E: { elegant: 2, independent: 1 },
  },
  4: { // Life in Korea
    A: { creative: 3 },
    B: { warm: 3 },
    C: { elegant: 2, independent: 1 },
    D: { elegant: 2, urban: 1 },
    E: { creative: 2, warm: 1 },
  },
  5: { // Place feels like home
    A: { urban: 3 },
    B: { warm: 1 },
    C: { independent: 2 },
    D: { creative: 2, urban: 1 },
    E: { elegant: 3 },
  },
  6: { // Most important
    A: { independent: 3 },
    B: { warm: 3 },
    C: { elegant: 2, urban: 1 },
    D: { creative: 3 },
    E: { warm: 1, elegant: 1 },
  },
  7: { // First impression
    A: { elegant: 3 },
    B: { elegant: 2, independent: 1 },
    C: { independent: 2 },
    D: { warm: 3 },
    E: { independent: 3 },
  },
  8: { // Korean city
    A: { urban: 3 },
    B: { urban: 2, warm: 1 },
    C: { independent: 2 },
    D: { elegant: 2 },
    E: { independent: 1, warm: 1 },
    F: { warm: 2 },
  },
  9: { // Free day in Korea
    A: { creative: 2, independent: 1, elegant: 1 },
    B: { creative: 2, urban: 1, independent: 1 },
    C: { creative: 3, elegant: 1 },
    D: { warm: 2, urban: 2 },
    E: { independent: 2 },
  },
  10: { // Happiest place
    A: { creative: 2, independent: 1, elegant: 1 },
    B: { urban: 3 },
    C: { warm: 1, independent: 1 },
    D: { creative: 2, warm: 2 },
    E: { independent: 3 },
  },
};

// Maximum achievable raw score per axis (sum of highest option per question)
const MAX_RAW: AxisScores = {
  creative:    18, // Q2(2) Q3(3) Q4(3) Q5(2) Q6(3) Q9(3) Q10(2)
  warm:        20, // Q2(1) Q3(3) Q4(3) Q5(1) Q6(3) Q7(3) Q8(2) Q9(2) Q10(2)
  urban:       15, // Q2(2) Q4(1) Q5(3) Q6(1) Q8(3) Q9(2) Q10(3)
  independent: 20, // Q2(2) Q3(2) Q4(1) Q5(2) Q6(3) Q7(3) Q8(2) Q9(2) Q10(3)
  elegant:     16, // Q3(2) Q4(2) Q5(3) Q6(2) Q7(3) Q8(2) Q9(1) Q10(1)
};

/**
 * Converts quiz answers into normalized 0–10 axis scores.
 * answers[0] = Q1 gender (skipped here)
 * answers[1..9] = Q2..Q10
 */
export function computeAxes(answers: string[]): AxisScores {
  const raw: AxisScores = { creative: 0, warm: 0, urban: 0, independent: 0, elegant: 0 };

  for (let i = 1; i < answers.length; i++) {
    const qId = i + 1;
    const deltas = WEIGHTS[qId]?.[answers[i]];
    if (!deltas) continue;
    for (const axis of Object.keys(deltas) as (keyof AxisScores)[]) {
      raw[axis] += deltas[axis] ?? 0;
    }
  }

  return {
    creative:    Math.round((raw.creative    / MAX_RAW.creative)    * 10),
    warm:        Math.round((raw.warm        / MAX_RAW.warm)        * 10),
    urban:       Math.round((raw.urban       / MAX_RAW.urban)       * 10),
    independent: Math.round((raw.independent / MAX_RAW.independent) * 10),
    elegant:     Math.round((raw.elegant     / MAX_RAW.elegant)     * 10),
  };
}

/** Extracts gender from Q1 answer (answers[0]). */
export function getGender(answers: string[]): Gender {
  if (answers[0] === 'A') return 'male';
  if (answers[0] === 'B') return 'female';
  return 'neutral';
}
