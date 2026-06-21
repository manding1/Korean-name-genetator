interface CompatibilityScoreProps {
  score: number;
}

export default function CompatibilityScore({ score }: CompatibilityScoreProps) {
  return (
    <section className="py-10 px-6" style={{ borderBottom: '1px solid var(--line)' }}>
      <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
        style={{ color: 'var(--ink-2)' }}>
        Compatibility Score
      </p>

      {/* Score display */}
      <div className="flex items-center gap-4 mb-5">
        <div className="text-center">
          <div className="font-display font-bold"
            style={{ fontSize: '54px', color: 'var(--ink)', lineHeight: 1, letterSpacing: '-0.03em' }}>
            {score}
            <span style={{ fontSize: '24px', color: 'var(--ink-2)' }}>%</span>
          </div>
        </div>
        <div>
          <span className="inline-block text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{ background: 'var(--olive-tint)', color: 'var(--olive)' }}>
            {score}% match
          </span>
        </div>
      </div>

      {/* Segmented bar */}
      <div className="flex gap-1">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 h-2 rounded-full transition-all duration-700"
            style={{
              background: i < Math.round(score / 10) ? 'var(--pink)' : 'var(--line)',
            }}
          />
        ))}
      </div>
    </section>
  );
}
