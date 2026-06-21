import { NameCharacter } from '@/types/result';

interface NameMeaningProps {
  characters: NameCharacter[];
  surnameKorean: string;
  surnameRomanized: string;
}

const COLORS = [
  { bg: 'var(--pink-tint)', text: 'var(--pink-deep)', border: 'var(--pink)' },
  { bg: 'var(--sky-tint)', text: 'var(--sky)', border: 'var(--sky)' },
  { bg: 'var(--fawn-tint)', text: 'var(--fawn)', border: 'var(--fawn)' },
];

const SURNAME_COLOR = { bg: 'var(--olive-tint)', text: 'var(--olive)', border: 'var(--olive)' };

export default function NameMeaning({ characters, surnameKorean, surnameRomanized }: NameMeaningProps) {
  if (!characters || characters.length === 0) return null;

  return (
    <section className="py-10 px-6" style={{ borderBottom: '1px solid var(--line)' }}>
      <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
        style={{ color: 'var(--ink-2)' }}>
        Name Meaning
      </p>
      <div className="flex gap-4">
        {/* Surname card */}
        <div
          className="flex-1 p-4 rounded-[var(--r-card)]"
          style={{ background: SURNAME_COLOR.bg, border: `1.5px solid ${SURNAME_COLOR.border}20` }}
        >
          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-korean" style={{ fontSize: '40px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1 }}>
              {surnameKorean}
            </span>
            <span className="text-xs font-semibold" style={{ color: SURNAME_COLOR.text }}>{surnameRomanized}</span>
          </div>
          <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
            성 · Surname
          </p>
        </div>

        {/* Given name character cards */}
        {characters.map((c, i) => {
          const color = COLORS[i % COLORS.length];
          return (
            <div
              key={c.char + i}
              className="flex-1 p-4 rounded-[var(--r-card)]"
              style={{ background: color.bg, border: `1.5px solid ${color.border}20` }}
            >
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-korean" style={{ fontSize: '40px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1 }}>
                  {c.char}
                </span>
                <span className="text-xs font-semibold" style={{ color: color.text }}>{c.romanized}</span>
              </div>
              <p className="text-sm font-semibold" style={{ color: 'var(--ink)' }}>
                {c.meaning}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
