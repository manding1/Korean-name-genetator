import Image from 'next/image';
import { AnswerOption } from '@/types/quiz';

interface OptionButtonProps {
  option: AnswerOption;
  onSelect: (letter: string) => void;
  selected?: boolean;
}

export default function OptionButton({ option, onSelect, selected }: OptionButtonProps) {
  return (
    <button
      onClick={() => onSelect(option.letter)}
      className="group flex flex-col items-center gap-2 p-2 transition-all duration-200 active:scale-95"
      style={{
        borderRadius: 'var(--r-card)',
        background: selected ? 'var(--pink-tint)' : 'var(--paper-2)',
        outline: selected ? '2px solid var(--pink)' : '2px solid transparent',
        outlineOffset: '0px',
      }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: '1', borderRadius: 'calc(var(--r-card) - 4px)' }}
      >
        <Image
          src={option.imageUrl}
          alt={option.label}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 40vw, 200px"
        />
        {selected && (
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(250,164,181,0.25)' }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: 'var(--pink)' }}>
              ✓
            </div>
          </div>
        )}
      </div>
      <span className="text-xs text-center leading-tight px-1 font-semibold"
        style={{ color: selected ? 'var(--pink-deep)' : 'var(--ink-2)' }}>
        {option.emoji} {option.label}
      </span>
    </button>
  );
}
