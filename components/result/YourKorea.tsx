'use client';

import { useState } from 'react';
import { PlaceRecommendation } from '@/types/result';

const SVG_W = 310;
const SVG_H = 310;
const LAND  = '#f0ece2';
const STEM  = '#4a5260';

function toSVG(lat: number, lng: number): [number, number] {
  const x = Math.min(302, Math.max(6, 8 + (lng - 124.5) / 8 * 290));
  const y = Math.min(302, Math.max(6, 10 + (38.7 - lat) / 5.7 * 285));
  return [x, y];
}

// Push pins apart so closely-clustered places (e.g., all Seoul) don't overlap
function spreadPins(raw: [number, number][]): [number, number][] {
  const pts = raw.map(([x, y]) => [x, y] as [number, number]);
  const MIN_D = 26;
  for (let iter = 0; iter < 30; iter++) {
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[j][0] - pts[i][0];
        const dy = pts[j][1] - pts[i][1];
        const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
        if (d < MIN_D) {
          const push = (MIN_D - d) / 2 + 0.5;
          const nx = dx / d, ny = dy / d;
          pts[i][0] -= nx * push; pts[i][1] -= ny * push;
          pts[j][0] += nx * push; pts[j][1] += ny * push;
        }
      }
    }
  }
  return pts;
}

const MAINLAND =
  'M62,30 L179,15 L188,35 L204,56 L219,85 L228,148 ' +
  'L223,173 L211,193 ' +
  'C198,200 186,205 174,207 ' +
  'C160,213 146,217 132,212 ' +
  'L111,226 L93,232 L75,226 ' +
  'L71,212 L76,175 L88,153 ' +
  'L76,110 L85,69 L74,57 Z';

function Mountains({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x},${y})`} style={{ pointerEvents: 'none' }} opacity="0.5">
      <polygon points={`${-12 * s},0 ${-1 * s},${-14 * s} ${10 * s},0`} fill="#b8c8b2" />
      <polygon points={`${-2 * s},0 ${9 * s},${-11 * s} ${19 * s},0`}  fill="#a8baa4" />
    </g>
  );
}

function Buildings({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`} style={{ pointerEvents: 'none' }} opacity="0.38">
      <rect x={-9} y={-14} width={6} height={14} fill="#c8d0d8" rx="0.5" />
      <rect x={-1} y={-19} width={6} height={19} fill="#bcc4cc" rx="0.5" />
      <rect x={7}  y={-11} width={6} height={11} fill="#c8d0d8" rx="0.5" />
    </g>
  );
}

function Waves({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x},${y})`} style={{ pointerEvents: 'none' }} opacity="0.42">
      <path d="M0,0 Q3.5,-4 7,0 Q10.5,4 14,0" fill="none" stroke="#a4bcc8" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M0,6 Q3.5,2 7,6 Q10.5,10 14,6"  fill="none" stroke="#a4bcc8" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

const ACCENTS = [
  { deep: '#7aa0b8', tint: 'var(--sky-tint)'  },
  { deep: '#ac9878', tint: 'var(--fawn-tint)' },
  { deep: '#7aaa80', tint: 'var(--olive-tint)' },
];

interface YourKoreaProps {
  places: PlaceRecommendation[];
}

export default function YourKorea({ places }: YourKoreaProps) {
  const [active, setActive] = useState(0);
  const place  = places[active];
  const accent = ACCENTS[active % ACCENTS.length];

  const pinPositions = spreadPins(places.map(p => toSVG(p.lat, p.lng)));

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ', South Korea')}`;
  const naverMapUrl   = `https://map.naver.com/p/search/${encodeURIComponent(place.name_ko)}`;

  return (
    <section className="py-10 px-6" style={{ borderBottom: '1px solid var(--line)', background: 'linear-gradient(180deg, var(--sky-tint) 0%, var(--paper) 100%)' }}>
      <p
        className="text-xs font-semibold tracking-[0.25em] uppercase mb-1"
        style={{ color: 'var(--sky-deep)' }}
      >
        Your Korea
      </p>
      <p className="text-sm mb-5" style={{ color: 'var(--ink-2)' }}>
        Places that match your energy
      </p>

      {/* Map */}
      <div className="rounded-2xl overflow-hidden mb-4" style={{ border: '1px solid var(--line)' }}>
        <svg
          viewBox="15 5 280 300"
          className="w-full"
          style={{ display: 'block' }}
          aria-label="Map of South Korea"
        >
          {/* Sea */}
          <rect width={SVG_W} height={SVG_H} fill="#c8dce8" />

          {/* Land */}
          <path d={MAINLAND} fill={LAND} stroke="none" />
          <ellipse cx="80"  cy="275" rx="20" ry="11" fill={LAND} stroke="none" />
          <ellipse cx="238" cy="70"  rx="9"  ry="8"  fill={LAND} stroke="none" />
          <circle  cx="271" cy="84"  r="3.5"          fill={LAND} />
          <circle  cx="277" cy="82"  r="2.5"          fill={LAND} />

          {/* Decorative icons */}
          <Mountains x={153} y={72} />
          <Mountains x={120} y={175} s={0.85} />
          <Buildings x={103} y={80} />
          <Buildings x={167} y={190} />
          <Waves x={18}  y={154} />
          <Waves x={228} y={218} />

          {/* Pins — stems + circles + numbers (no labels here) */}
          {places.map((p, i) => {
            const [px, py] = pinPositions[i];
            const isActive = active === i;
            const col = ACCENTS[i % ACCENTS.length].deep;
            const r   = isActive ? 8 : 7;
            return (
              <g
                key={i}
                onClick={() => setActive(i)}
                style={{ cursor: 'pointer' }}
                role="button"
                aria-label={p.name}
              >
                <line
                  x1={px} y1={py + r}
                  x2={px} y2={py + r + 11}
                  stroke={STEM} strokeWidth="1.2" strokeLinecap="round"
                />
                <circle cx={px} cy={py} r={r} fill={col} />
                <text
                  x={px} y={py + 0.5}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={6} fill="white" fontWeight="bold"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {i + 1}
                </text>
              </g>
            );
          })}

          {/* Active pin label — rendered last so it appears above all pins */}
          {(() => {
            const [px, py] = pinPositions[active];
            const r = 8;
            const labelRight = px < SVG_W / 2;
            const labelX = labelRight ? px + r + 6 : px - r - 6;
            const labelAnchor = labelRight ? 'start' : 'end';
            return (
              <text
                x={labelX} y={py + 1}
                textAnchor={labelAnchor}
                dominantBaseline="middle"
                fontSize={8.5} fontWeight="700" fill={STEM}
                stroke="rgba(255,255,255,0.95)" strokeWidth="4" paintOrder="stroke"
                style={{ pointerEvents: 'none', userSelect: 'none' }}
              >
                {places[active].name_ko}
              </text>
            );
          })()}
        </svg>
      </div>

      {/* Pin selector tabs */}
      <div className="flex gap-2 mb-4">
        {places.map((p, i) => {
          const col = ACCENTS[i % ACCENTS.length];
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex-1 py-2 px-2 rounded-xl text-xs font-semibold transition-all"
              style={{
                background: active === i ? col.deep : col.tint,
                color:      active === i ? '#fff'  : col.deep,
              }}
            >
              {i + 1}. {p.name_ko}
            </button>
          );
        })}
      </div>

      {/* Location card */}
      <div className="p-5 rounded-2xl" style={{ background: accent.tint }}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-base leading-tight" style={{ color: 'var(--ink)' }}>
              {place.name}
            </h4>
            <p className="font-korean mt-0.5" style={{ fontSize: 13, color: accent.deep }}>
              {place.name_ko}
            </p>
          </div>
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ml-3"
            style={{ background: accent.deep, color: '#fff' }}
          >
            #{active + 1}
          </span>
        </div>

        <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--ink-2)' }}>
          {place.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {place.keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ background: accent.tint, color: accent.deep }}
            >
              {kw}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <a
            href={googleMapsUrl}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center py-2.5 rounded-xl text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ background: accent.deep, color: '#fff' }}
          >
            Open in Google Maps
          </a>
          <a
            href={naverMapUrl}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center py-2.5 rounded-xl text-xs font-semibold transition-opacity hover:opacity-80"
            style={{ border: `1.5px solid ${accent.deep}`, color: accent.deep, background: 'transparent' }}
          >
            Open in Naver Map
          </a>
        </div>
      </div>
    </section>
  );
}
