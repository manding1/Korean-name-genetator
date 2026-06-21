interface KoreanNameProps {
  surnameKorean: string;
  surnameRomanized: string;
  nameKorean: string;
  nameRomanized: string;
}

export default function KoreanName({ surnameKorean, surnameRomanized, nameKorean, nameRomanized }: KoreanNameProps) {
  return (
    <section className="py-14 px-6 text-center relative"
      style={{ borderBottom: '1px solid var(--line)' }}>

      {/* Blob glow — behind all text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0 }}>
        <div style={{
          width: '220px', height: '220px', borderRadius: '50%',
          background: 'radial-gradient(circle, var(--pink-tint) 0%, transparent 70%)',
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-8"
          style={{ color: 'var(--ink-2)' }}>
          Your Korean Name
        </p>

        <h1 className="font-korean"
          style={{ fontSize: '80px', fontWeight: 400, color: 'var(--ink)', lineHeight: 1, marginBottom: 8 }}>
          {surnameKorean}{nameKorean}
        </h1>

        <p className="font-display font-semibold"
          style={{ fontSize: '28px', color: 'var(--ink-2)', letterSpacing: '-0.01em' }}>
          {surnameRomanized} {nameRomanized}
        </p>
      </div>
    </section>
  );
}
