export interface Question {
  id: string;
  type: 'likert' | 'multiple-choice' | 'scenario' | 'rating';
  section: 'psychometric' | 'technical' | 'wiscar';
  category: string;
  question: string;
  options?: string[];
  likertLabels?: {
    min: string;
    max: string;
  };
  weight: number;
}

export interface Assessment {
  id: string;
  currentQuestionIndex: number;
  answers: Record<string, number>;
  scores: {
    psychometric: number;
    technical: number;
    wiscar: {
      will: number;
      interest: number;
      skill: number;
      cognitive: number;
      ability: number;
      realWorld: number;
    };
  };
  completed: boolean;
}

export interface AssessmentResult {
  overallScore: number;
  confidence: number;
  recommendation: 'yes' | 'no' | 'maybe';
  insights: string[];
  nextSteps: string[];
  careerPaths: Array<{
    title: string;
    match: number;
    description: string;
  }>;
  weakAreas: string[];
  strengths: string[];
}