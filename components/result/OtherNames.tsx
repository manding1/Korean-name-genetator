'use client';

import { AlternativeName } from '@/types/result';

interface OtherNamesProps {
  alternatives: AlternativeName[];
  surnameKorean: string;
  surnameRomanized: string;
  selectedNameKorean: string;
  onSelect: (alt: AlternativeName) => void;
}

const ACCENT_COLORS = [
  { tint: 'var(--sky-tint)', accent: 'var(--sky-deep)' },
  { tint: 'var(--fawn-tint)', accent: 'var(--fawn-deep)' },
  { tint: 'var(--maize-tint)', accent: 'var(--maize-text)' },
  { tint: 'var(--olive-tint)', accent: 'var(--olive-deep)' },
];

export default function OtherNames({
  alternatives,
  surnameKorean,
  surnameRomanized,
  selectedNameKorean,
  onSelect,
}: OtherNamesProps) {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <section className="py-10 px-6" style={{ borderBottom: '1px solid var(--line)' }}>
      <p
        className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
        style={{ color: 'var(--ink-2)' }}
      >
        Other Names You May Like
      </p>

      <div className="flex flex-col gap-3">
        {alternatives.map((alt, i) => {
          const color = ACCENT_COLORS[i % ACCENT_COLORS.length];
          const isSelected = alt.name_korean === selectedNameKorean;

          return (
            <div
              key={alt.name_korean + i}
              className="p-4 rounded-2xl"
              style={{
                background: color.tint,
                outline: isSelected ? `2px solid ${color.accent}` : 'none',
              }}
            >
              {/* Row 1: name + button */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <div>
                  <p
                    className="font-korean leading-none"
                    style={{ fontSize: 26, color: 'var(--ink)' }}
                  >
                    {surnameKorean}{alt.name_korean}
                  </p>
                  <p
                    className="font-display font-semibold mt-0.5"
                    style={{ fontSize: 11, color: 'var(--ink-2)' }}
                  >
                    {surnameRomanized} {alt.name_romanized}
                  </p>
                </div>

                {isSelected ? (
                  <div
                    className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold"
                    style={{ background: color.accent, color: '#fff' }}
                  >
                    ✓ 선택됨
                  </div>
                ) : (
                  <button
                    onClick={() => onSelect(alt)}
                    className="shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-opacity hover:opacity-80 active:scale-95"
                    style={{
                      border: `1.5px solid ${color.accent}`,
                      color: color.accent,
                      background: 'transparent',
                    }}
                  >
                    Use This Name
                  </button>
                )}
              </div>

              {/* Row 2: meaning */}
              <p
                className="text-xs leading-snug mb-2"
                style={{ color: 'var(--ink-2)' }}
              >
                {alt.name_meaning}
              </p>

              {/* Row 3: score bar */}
              <div className="flex items-center gap-2">
                <div
                  className="flex-1 rounded-full overflow-hidden"
                  style={{ height: 4, background: 'var(--line-2)' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${alt.compatibility_score}%`,
                      background: color.accent,
                    }}
                  />
                </div>
                <span
                  className="text-xs font-bold shrink-0"
                  style={{ color: color.accent }}
                >
                  {alt.compatibility_score}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
