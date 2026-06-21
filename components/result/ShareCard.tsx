'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { KoreanNameResult } from '@/types/result';

interface ShareCardProps {
  result: KoreanNameResult;
}

export default function ShareCard({ result }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [sharing, setSharing] = useState(false);

  const generateCanvas = async () => {
    if (!cardRef.current) return null;
    await document.fonts.ready;
    const { default: html2canvas } = await import('html2canvas');
    return html2canvas(cardRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#FFFFFF',
      logging: false,
    });
  };

  const handleDownload = async () => {
    setSharing(true);
    try {
      const canvas = await generateCanvas();
      if (!canvas) return;
      const link = document.createElement('a');
      link.download = `ireum-${result.surname_romanized.toLowerCase()}${result.name_romanized.toLowerCase().replace(/[\s-]/g, '')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setSharing(false);
    }
  };

  const handleShare = async () => {
    setSharing(true);
    try {
      const canvas = await generateCanvas();
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'my-korean-name.png', { type: 'image/png' });
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `My Korean name is ${result.surname_romanized} ${result.name_romanized}!`,
            text: `${result.surname_korean}${result.name_korean} (${result.surname_romanized} ${result.name_romanized}) — ${result.compatibility_score}% match`,
          });
        } else {
          handleDownload();
        }
      }, 'image/png');
    } finally {
      setSharing(false);
    }
  };

  return (
    <section className="py-10 px-6">
      <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
        style={{ color: 'var(--ink-2)' }}>
        Share Your Name
      </p>

      {/* Capturable card — 9:16 ratio for IG Story */}
      <div className="flex justify-center mb-8">
        <div
          ref={cardRef}
          className="flex flex-col justify-between"
          style={{
            width: 280,
            height: 497,
            background: '#FFFFFF',
            borderRadius: 28,
            padding: '28px 24px 24px',
            fontFamily: "'Nunito Sans', sans-serif",
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background blobs */}
          <div style={{
            position: 'absolute', top: -60, right: -60,
            width: 200, height: 200, borderRadius: '50%',
            background: 'radial-gradient(circle, #FDE8ED 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute', bottom: -40, left: -40,
            width: 160, height: 160, borderRadius: '50%',
            background: 'radial-gradient(circle, #DCF2FB 0%, transparent 70%)',
          }} />

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#6E6862', textTransform: 'uppercase', fontWeight: 700 }}>
              Ireum · 이름
            </div>
          </div>

          {/* Name — center */}
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{
              fontFamily: "'LXGWWenKaiKR', 'Gowun Dodum', serif",
              fontSize: 64, fontWeight: 400,
              color: '#2C2A27', lineHeight: 1,
              marginBottom: 8,
            }}>
              {result.surname_korean}{result.name_korean}
            </div>
            <div style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: 20, fontWeight: 600,
              color: '#6E6862', letterSpacing: '-0.01em',
              marginBottom: 16,
            }}>
              {result.surname_romanized} {result.name_romanized}
            </div>
            <div style={{
              display: 'inline-block',
              background: '#FAA4B5', color: 'white',
              padding: '6px 16px', borderRadius: 999,
              fontSize: 12, fontWeight: 700,
            }}>
              ✦ {result.compatibility_score}% match
            </div>
          </div>

          {/* Footer */}
          <div style={{ position: 'relative' }}>
            <div style={{ fontSize: 12, color: '#6E6862', marginBottom: 12, lineHeight: 1.5 }}>
              {result.name_meaning}
            </div>
            <div style={{ fontSize: 9, color: '#FAA4B5', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>
              ireum.app
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleShare}
          disabled={sharing}
          className="w-full py-4 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
          style={{ background: 'var(--pink)', borderRadius: 'var(--r-pill)', boxShadow: '0 4px 16px rgba(250,164,181,0.4)' }}
        >
          {sharing ? 'Preparing...' : 'Share Your Name ✨'}
        </button>
        <button
          onClick={handleDownload}
          disabled={sharing}
          className="w-full py-4 text-sm font-semibold transition-all hover:opacity-80 disabled:opacity-50"
          style={{
            border: '2px solid var(--line)',
            borderRadius: 'var(--r-pill)',
            color: 'var(--ink)',
            background: 'transparent',
          }}
        >
          Download Image
        </button>
      </div>

      {/* Platform hints */}
      <div className="flex justify-center gap-4 mt-5">
        {['Instagram', 'X', 'TikTok', 'Pinterest'].map((platform) => (
          <span key={platform} className="text-xs font-semibold" style={{ color: 'var(--ink-2)' }}>
            {platform}
          </span>
        ))}
      </div>
    </section>
  );
}
