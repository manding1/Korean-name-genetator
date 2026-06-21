import { Question } from '@/types/quiz';
import OptionButton from './OptionButton';

interface QuestionCardProps {
  question: Question;
  onSelect: (letter: string) => void;
  selectedLetter?: string;
}

function getGridCols(count: number): string {
  if (count <= 3) return 'grid-cols-3';
  if (count === 6) return 'grid-cols-3';
  return 'grid-cols-2';
}

export default function QuestionCard({ question, onSelect, selectedLetter }: QuestionCardProps) {
  const gridCols = getGridCols(question.options.length);

  return (
    <div className="flex flex-col min-h-[calc(100vh-80px)]">
      {/* Question text */}
      <div className="px-5 pt-6 pb-5">
        <h2 className="font-display font-semibold text-[var(--ink)] leading-snug"
          style={{ fontSize: '22px', letterSpacing: '-0.01em' }}>
          {question.text}
          {question.subtext && (
            <span className="block">{question.subtext}</span>
          )}
        </h2>
      </div>

      {/* Options grid */}
      <div className={`px-4 pb-8 grid gap-3 ${gridCols}`}>
        {question.options.map((option) => (
          <OptionButton
            key={option.letter}
            option={option}
            onSelect={onSelect}
            selected={selectedLetter === option.letter}
          />
        ))}
      </div>
    </div>
  );
}
