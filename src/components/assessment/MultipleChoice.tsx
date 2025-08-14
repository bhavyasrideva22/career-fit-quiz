import { Question } from '@/types/assessment';
import { cn } from '@/lib/utils';

interface MultipleChoiceProps {
  question: Question;
  value?: number;
  onChange: (value: number) => void;
}

export function MultipleChoice({ question, value, onChange }: MultipleChoiceProps) {
  if (!question.options) return null;

  return (
    <div className="space-y-3">
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={cn(
            "w-full p-4 text-left rounded-lg border-2 transition-all duration-200 hover:scale-[1.02]",
            value === index
              ? "border-primary bg-primary/10 text-foreground shadow-card"
              : "border-border bg-card hover:border-primary/40 hover:bg-card/80 text-card-foreground"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all duration-200",
                value === index
                  ? "border-primary bg-primary"
                  : "border-border"
              )}
            >
              {value === index && (
                <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
              )}
            </div>
            <span className="text-sm leading-relaxed">{option}</span>
          </div>
        </button>
      ))}
    </div>
  );
}