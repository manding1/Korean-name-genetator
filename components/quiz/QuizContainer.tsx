'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { questions } from '@/lib/quizData';
import { AnswerLetter } from '@/types/quiz';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export default function QuizContainer() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswerLetter[]>([]);
  const [direction, setDirection] = useState(1);

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSelect = (letter: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = letter as AnswerLetter;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setDirection(1);
        setCurrentStep((prev) => prev + 1);
      } else {
        sessionStorage.setItem('quiz_answers', JSON.stringify(newAnswers));
        router.push('/result');
      }
    }, 350);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--paper)' }}>
      {/* Top bar */}
      <div className="px-5 pt-5 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {currentStep > 0 ? (
              <button
                onClick={handleBack}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-70 active:scale-95"
                style={{ background: 'var(--line-2)' }}
                aria-label="Previous question"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 2L4 7L9 12" stroke="var(--ink-2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ) : (
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm"
                style={{ background: 'var(--pink-tint)' }}>
                🌸
              </div>
            )}
            <span className="text-xs font-semibold tracking-wider uppercase"
              style={{ color: 'var(--ink-2)', fontFamily: 'var(--font-mono)' }}>
              Ireum
            </span>
          </div>
          <span className="text-xs font-semibold" style={{ color: 'var(--ink-2)' }}>
            {currentStep + 1} / {questions.length}
          </span>
        </div>
        <ProgressBar current={currentStep + 1} total={questions.length} />
      </div>

      {/* Question area */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.28, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-y-auto"
          >
            <QuestionCard
              question={questions[currentStep]}
              onSelect={handleSelect}
              selectedLetter={answers[currentStep]}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
