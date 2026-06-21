'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AlternativeName, KoreanNameResult } from '@/types/result';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import KoreanName from '@/components/result/KoreanName';
import CompatibilityScore from '@/components/result/CompatibilityScore';
import NameMeaning from '@/components/result/NameMeaning';
import YourKorea from '@/components/result/YourKorea';
import KDramaRecs from '@/components/result/KDramaRecs';
import MovieRecs from '@/components/result/MovieRecs';
import ShareCard from '@/components/result/ShareCard';
import OtherNames from '@/components/result/OtherNames';

interface SelectedName {
  surname_korean: string;
  surname_romanized: string;
  name_korean: string;
  name_romanized: string;
  compatibility_score: number;
  name_meaning: string;
}

export default function ResultPage() {
  const [result, setResult] = useState<KoreanNameResult | null>(null);
  const [selectedName, setSelectedName] = useState<SelectedName | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const answersJson = sessionStorage.getItem('quiz_answers');
    if (!answersJson) {
      setError('no_answers');
      setLoading(false);
      return;
    }

    const answers = JSON.parse(answersJson);
    const userName = sessionStorage.getItem('user_name') ?? undefined;

    fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers, userName }),
    })
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((data: KoreanNameResult) => {
        setResult(data);
        setSelectedName({
          surname_korean: data.surname_korean,
          surname_romanized: data.surname_romanized,
          name_korean: data.name_korean,
          name_romanized: data.name_romanized,
          compatibility_score: data.compatibility_score,
          name_meaning: data.name_meaning,
        });
        setLoading(false);
      })
      .catch(() => {
        setError('fetch_failed');
        setLoading(false);
      });
  }, []);

  const handleSelectAlternative = (alt: AlternativeName) => {
    if (!result) return;
    setSelectedName({
      surname_korean: result.surname_korean,
      surname_romanized: result.surname_romanized,
      name_korean: alt.name_korean,
      name_romanized: alt.name_romanized,
      compatibility_score: alt.compatibility_score,
      name_meaning: alt.name_meaning,
    });
  };

  if (loading) return <LoadingSpinner />;

  if (error === 'no_answers') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--color-bg)] text-center">
        <p className="text-[var(--color-muted)] text-sm mb-6">
          Please take the quiz first to discover your Korean name.
        </p>
        <Link
          href="/quiz"
          className="text-sm tracking-wider text-[var(--color-text)] underline underline-offset-4"
        >
          Start the Quiz
        </Link>
      </div>
    );
  }

  if (error === 'fetch_failed' || !result || !selectedName) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--color-bg)] text-center">
        <p className="text-[var(--color-muted)] text-sm mb-6">
          Something went wrong. Please try again.
        </p>
        <Link
          href="/quiz"
          className="text-sm tracking-wider text-[var(--color-text)] underline underline-offset-4"
        >
          Retake the Quiz
        </Link>
      </div>
    );
  }

  const shareResult: KoreanNameResult = { ...result, ...selectedName };

  return (
    <main className="min-h-screen bg-[var(--color-bg)] max-w-lg mx-auto">
      <KoreanName
        surnameKorean={result.surname_korean}
        surnameRomanized={result.surname_romanized}
        nameKorean={result.name_korean}
        nameRomanized={result.name_romanized}
      />
      <CompatibilityScore score={result.compatibility_score} />
      <NameMeaning
        characters={result.name_characters}
        surnameKorean={result.surname_korean}
        surnameRomanized={result.surname_romanized}
      />
      <YourKorea places={result.your_korea} />
      <KDramaRecs recommendations={result.kdrama_recommendations} />
      <MovieRecs recommendations={result.movie_recommendations} />
      <ShareCard result={shareResult} />
      <OtherNames
        alternatives={result.alternative_names}
        surnameKorean={result.surname_korean}
        surnameRomanized={result.surname_romanized}
        selectedNameKorean={selectedName.name_korean}
        onSelect={handleSelectAlternative}
      />

      <div className="py-12 px-6 text-center border-t border-[var(--color-border)]">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3 rounded-[var(--r-btn)] text-sm font-semibold transition-all hover:scale-105 active:scale-95"
          style={{ background: 'var(--pink)', color: '#fff', boxShadow: '0 4px 16px rgba(250,164,181,0.45)' }}
          onClick={() => {
            sessionStorage.removeItem('quiz_answers');
            sessionStorage.removeItem('user_name');
          }}
        >
          Take the Quiz Again →
        </Link>
      </div>
    </main>
  );
}
