'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LandingPage() {
  const router = useRouter();
  const [name, setName] = useState('');

  const handleStart = () => {
    const trimmed = name.trim();
    if (trimmed) {
      sessionStorage.setItem('user_name', trimmed);
    } else {
      sessionStorage.removeItem('user_name');
    }
    router.push('/quiz');
  };

  return (
    <main className="min-h-screen bg-[var(--paper)] flex flex-col overflow-hidden">
      {/* Blob light background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-20%] w-[80vw] h-[80vw] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--pink-tint) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-20%] w-[60vw] h-[60vw] rounded-full"
          style={{ background: 'radial-gradient(circle, var(--sky-tint) 0%, transparent 70%)' }} />
      </div>

      {/* Hero */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
        {/* Mascot */}
        <div className="mb-6">
          <Image
            src="/mascot.png"
            alt="Ireum mascot"
            width={96}
            height={96}
            unoptimized
            className="mx-auto object-contain"
            style={{ filter: 'drop-shadow(0 8px 20px rgba(180,100,120,0.28))' }}
          />
        </div>

        {/* Brand */}
        <p className="text-xs text-[var(--ink-2)] tracking-[0.25em] uppercase mb-4">
          Ireum · 이름
        </p>

        {/* Headline */}
        <h1 className="font-display text-5xl font-semibold text-[var(--ink)] leading-tight mb-3"
          style={{ letterSpacing: '-0.02em' }}>
          What&apos;s your<br />Korean name?
        </h1>
        <p className="font-korean text-2xl text-[var(--pink-deep)] mb-8">
          한국 이름 찾기
        </p>

        <p className="text-base text-[var(--ink-2)] leading-relaxed mb-8 max-w-[260px] mx-auto">
          Answer 10 questions and discover the Korean name that feels truly <em>you</em>.
        </p>

        {/* Name input */}
        <div className="w-full max-w-[260px] mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStart()}
            placeholder="Your name (optional)"
            maxLength={40}
            className="w-full text-center text-sm outline-none"
            style={{
              background: 'var(--paper-2)',
              border: '1.5px solid var(--line)',
              borderRadius: '999px',
              padding: '12px 20px',
              color: 'var(--ink)',
              fontFamily: 'var(--font-body)',
            }}
          />
        </div>

        <button
          onClick={handleStart}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-[var(--r-pill)] text-base font-semibold text-white transition-all hover:scale-105 active:scale-95"
          style={{ background: 'var(--pink)', boxShadow: '0 4px 20px rgba(250,164,181,0.5)' }}
        >
          See my name →
        </button>

        <p className="text-xs text-[var(--ink-2)] mt-5">
          30–60 seconds · free
        </p>
      </div>

      {/* Feature strip */}
      <div className="relative border-t border-[var(--line)] px-6 py-7 bg-[var(--paper-2)]">
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto text-center">
          {[
            { emoji: '🎯', label: '10 Questions', sub: 'Quick & personal' },
            { emoji: '✨', label: 'Smart Match', sub: 'Personality Engine' },
            { emoji: '📲', label: 'Share Ready', sub: 'Instagram & more' },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xl mb-1">{item.emoji}</p>
              <p className="text-xs font-semibold text-[var(--ink)] mb-0.5">{item.label}</p>
              <p className="text-[10px] text-[var(--ink-2)]">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
