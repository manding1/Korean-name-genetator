'use client';

import { MediaRecommendation } from '@/types/result';

const POSTER_COLORS: [string, string][] = [
  ['#c8aab8', '#ddc0cc'],
  ['#c8b49a', '#dccaba'],
  ['#98b8c8', '#b4ccd8'],
];

const RANK_BADGES = ['🥇', '🥈', '🥉'];
const RANK_LABELS = ['Your Best Match', 'Second Match', 'Third Match'];

function platformUrl(platform: string, titleEn: string): string {
  const q = encodeURIComponent(titleEn);
  if (platform === 'Netflix')  return `https://www.netflix.com/search?q=${q}`;
  if (platform === 'Disney+')  return `https://www.disneyplus.com/search?q=${q}`;
  if (platform === 'Viki')     return `https://www.viki.com/explore?q=${q}`;
  return `https://www.google.com/search?q=watch+${q}+streaming`;
}

interface KDramaRecsProps {
  recommendations: MediaRecommendation[];
}

export default function KDramaRecs({ recommendations }: KDramaRecsProps) {
  const [best, ...rest] = recommendations;
  if (!best) return null;

  const genres = (rec: MediaRecommendation) => rec.genre.split(', ').filter(Boolean);

  return (
    <section className="py-10 px-6" style={{ borderBottom: '1px solid var(--line)', background: 'linear-gradient(180deg, var(--fawn-tint) 0%, var(--paper) 100%)' }}>
      <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-6" style={{ color: 'var(--fawn-deep)' }}>
        Recommended K-Dramas
      </p>

      {/* 1st — large card */}
      <div className="rounded-2xl overflow-hidden mb-4" style={{ border: '1px solid var(--line)' }}>
        {/* Poster */}
        <div
          className="w-full h-44 flex flex-col items-center justify-end pb-5 px-5 relative"
          style={{ background: `linear-gradient(135deg, ${POSTER_COLORS[0][0]}, ${POSTER_COLORS[0][1]})` }}
        >
          <div className="absolute top-3 left-4 flex items-center gap-1.5">
            <span className="text-base leading-none">{RANK_BADGES[0]}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--ink-2)' }}>
              {RANK_LABELS[0]}
            </span>
          </div>
          <h3 className="font-korean text-2xl font-bold text-center leading-tight" style={{ color: 'var(--ink)' }}>
            {best.title}
          </h3>
          <p className="text-sm mt-1" style={{ color: 'var(--ink-2)' }}>{best.year}</p>
        </div>

        {/* Body */}
        <div className="p-5" style={{ background: 'var(--paper)' }}>
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-semibold text-base leading-tight" style={{ color: 'var(--ink)' }}>
                {best.title}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: 'var(--ink-2)' }}>
                {best.title_en} · {best.year}
              </p>
            </div>
            <div className="shrink-0 ml-3 text-right">
              <span className="text-lg font-bold" style={{ color: 'var(--fawn-deep)' }}>
                {best.match_score}%
              </span>
              <p className="text-[10px]" style={{ color: 'var(--ink-3)' }}>Match</p>
            </div>
          </div>

          <div className="flex gap-1.5 flex-wrap mb-3">
            {genres(best).map((g) => (
              <span
                key={g}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'var(--fawn-tint)', color: 'var(--fawn-deep)' }}
              >
                {g}
              </span>
            ))}
          </div>

          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--ink-2)' }}>
            {best.reason}
          </p>

          <a
            href={platformUrl(best.platform, best.title_en)}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ background: 'var(--fawn-deep)', color: '#fff' }}
          >
            Watch on {best.platform} →
          </a>
        </div>
      </div>

      {/* 2nd & 3rd — small cards */}
      <div className="space-y-3">
        {rest.map((rec, i) => {
          const idx = i + 1;
          const [c1, c2] = POSTER_COLORS[idx] ?? POSTER_COLORS[0];
          return (
            <div
              key={rec.title}
              className="flex rounded-xl overflow-hidden"
              style={{ border: '1px solid var(--line)' }}
            >
              {/* Mini poster */}
              <div
                className="w-[72px] flex-shrink-0 flex flex-col items-center justify-center gap-1.5 py-4 px-2"
                style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}
              >
                <span className="text-base leading-none">{RANK_BADGES[idx]}</span>
                <p className="font-korean text-[11px] font-bold text-center leading-tight" style={{ color: 'var(--ink)', wordBreak: 'keep-all' }}>
                  {rec.title}
                </p>
              </div>

              {/* Content */}
              <div className="flex-1 p-3.5" style={{ background: 'var(--paper)' }}>
                <div className="flex items-start justify-between mb-0.5">
                  <h4 className="font-semibold text-sm leading-tight" style={{ color: 'var(--ink)' }}>
                    {rec.title}
                  </h4>
                  <span className="text-sm font-bold shrink-0 ml-2" style={{ color: 'var(--fawn-deep)' }}>
                    {rec.match_score}%
                  </span>
                </div>
                <p className="text-[11px] mb-2" style={{ color: 'var(--ink-3)' }}>
                  {rec.title_en} · {rec.year}
                </p>
                <div className="flex gap-1 flex-wrap mb-2">
                  {genres(rec).map((g) => (
                    <span
                      key={g}
                      className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                      style={{ background: 'var(--fawn-tint)', color: 'var(--fawn-deep)' }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] leading-relaxed mb-2" style={{ color: 'var(--ink-2)' }}>
                  {rec.reason}
                </p>
                <a
                  href={platformUrl(rec.platform, rec.title_en)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold transition-opacity hover:opacity-70"
                  style={{ color: 'var(--fawn-deep)' }}
                >
                  Watch on {rec.platform} →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
