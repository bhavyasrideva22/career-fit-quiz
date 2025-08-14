import { Question } from '@/types/assessment';
import { cn } from '@/lib/utils';

interface LikertScaleProps {
  question: Question;
  value?: number;
  onChange: (value: number) => void;
}

export function LikertScale({ question, value, onChange }: LikertScaleProps) {
  const scale = [1, 2, 3, 4, 5];
  const labels = question.likertLabels || { min: 'Strongly Disagree', max: 'Strongly Agree' };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-xs text-muted-foreground px-2">
        <span>{labels.min}</span>
        <span>{labels.max}</span>
      </div>
      
      <div className="flex justify-between gap-2">
        {scale.map((option) => (
          <div key={option} className="flex flex-col items-center gap-2 flex-1">
            <button
              onClick={() => onChange(option)}
              className={cn(
                "w-12 h-12 rounded-full border-2 transition-all duration-200 flex items-center justify-center font-semibold",
                value === option
                  ? "border-primary bg-primary text-primary-foreground shadow-glow scale-110"
                  : "border-border hover:border-primary/60 hover:scale-105 bg-card text-card-foreground"
              )}
            >
              {option}
            </button>
            <div className="text-xs text-center text-muted-foreground">
              {option === 1 && 'Never'}
              {option === 2 && 'Rarely'}
              {option === 3 && 'Sometimes'}
              {option === 4 && 'Often'}
              {option === 5 && 'Always'}
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        {value && (
          <div className="text-sm text-primary font-medium">
            Selected: {value} - {
              value === 1 ? 'Never' :
              value === 2 ? 'Rarely' :
              value === 3 ? 'Sometimes' :
              value === 4 ? 'Often' : 'Always'
            }
          </div>
        )}
      </div>
    </div>
  );
}