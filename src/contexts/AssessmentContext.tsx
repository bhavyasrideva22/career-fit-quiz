import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Assessment, AssessmentResult } from '@/types/assessment';
import { questions, correctAnswers } from '@/data/questions';

interface AssessmentState {
  assessment: Assessment;
  result: AssessmentResult | null;
}

type AssessmentAction = 
  | { type: 'START_ASSESSMENT' }
  | { type: 'ANSWER_QUESTION'; questionId: string; answer: number }
  | { type: 'NEXT_QUESTION' }
  | { type: 'COMPLETE_ASSESSMENT' }
  | { type: 'RESET_ASSESSMENT' };

const initialAssessment: Assessment = {
  id: crypto.randomUUID(),
  currentQuestionIndex: 0,
  answers: {},
  scores: {
    psychometric: 0,
    technical: 0,
    wiscar: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    }
  },
  completed: false
};

const initialState: AssessmentState = {
  assessment: initialAssessment,
  result: null
};

function calculateScores(answers: Record<string, number>): Assessment['scores'] {
  const scores = {
    psychometric: 0,
    technical: 0,
    wiscar: {
      will: 0,
      interest: 0,
      skill: 0,
      cognitive: 0,
      ability: 0,
      realWorld: 0
    }
  };

  let psychometricTotal = 0;
  let psychometricCount = 0;
  let technicalTotal = 0;
  let technicalCount = 0;
  const wiscarTotals = { will: 0, interest: 0, skill: 0, cognitive: 0, ability: 0, realWorld: 0 };
  const wiscarCounts = { will: 0, interest: 0, skill: 0, cognitive: 0, ability: 0, realWorld: 0 };

  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;

    let normalizedScore = answer;
    
    // For technical questions, check if answer is correct
    if (question.section === 'technical' && correctAnswers[questionId] !== undefined) {
      normalizedScore = answer === correctAnswers[questionId] ? 5 : 1;
    }
    
    // Apply weight
    const weightedScore = normalizedScore * question.weight;

    if (question.section === 'psychometric') {
      psychometricTotal += weightedScore;
      psychometricCount += question.weight;
    } else if (question.section === 'technical') {
      technicalTotal += weightedScore;
      technicalCount += question.weight;
    } else if (question.section === 'wiscar') {
      const category = question.category as keyof typeof wiscarTotals;
      wiscarTotals[category] += weightedScore;
      wiscarCounts[category] += question.weight;
    }
  });

  scores.psychometric = psychometricCount > 0 ? (psychometricTotal / psychometricCount) * 20 : 0;
  scores.technical = technicalCount > 0 ? (technicalTotal / technicalCount) * 20 : 0;
  
  Object.keys(wiscarTotals).forEach(key => {
    const category = key as keyof typeof wiscarTotals;
    scores.wiscar[category] = wiscarCounts[category] > 0 ? 
      (wiscarTotals[category] / wiscarCounts[category]) * 20 : 0;
  });

  return scores;
}

function generateResult(scores: Assessment['scores']): AssessmentResult {
  const wiscarAverage = Object.values(scores.wiscar).reduce((a, b) => a + b, 0) / 6;
  const overallScore = (scores.psychometric + scores.technical + wiscarAverage) / 3;
  
  let recommendation: 'yes' | 'no' | 'maybe' = 'maybe';
  let confidence = 0;
  
  if (overallScore >= 80) {
    recommendation = 'yes';
    confidence = Math.min(95, overallScore + 10);
  } else if (overallScore >= 60) {
    recommendation = 'maybe';
    confidence = overallScore;
  } else {
    recommendation = 'no';
    confidence = Math.max(20, overallScore - 10);
  }

  const insights = [];
  const nextSteps = [];
  const weakAreas = [];
  const strengths = [];

  // Generate insights based on scores
  if (scores.psychometric >= 75) {
    insights.push("You show strong psychological alignment with DevOps principles");
    strengths.push("Problem-solving mindset");
  } else if (scores.psychometric < 50) {
    insights.push("Consider developing your systematic thinking and collaboration skills");
    weakAreas.push("Collaborative problem-solving");
  }

  if (scores.technical >= 70) {
    insights.push("Your technical foundation is solid for starting DevOps learning");
    strengths.push("Technical aptitude");
  } else if (scores.technical < 50) {
    insights.push("Start with fundamental Linux, networking, and cloud concepts");
    weakAreas.push("Technical prerequisites");
    nextSteps.push("Complete Linux essentials course");
  }

  if (scores.wiscar.will >= 75) {
    strengths.push("Persistence and determination");
  } else {
    weakAreas.push("Goal consistency");
  }

  if (scores.wiscar.interest >= 80) {
    strengths.push("Genuine interest in DevOps");
  } else if (scores.wiscar.interest < 60) {
    insights.push("Explore more DevOps content to develop genuine interest");
  }

  // Default next steps based on recommendation
  if (recommendation === 'yes') {
    nextSteps.push("Start with AWS/Azure fundamentals", "Learn Git and basic CI/CD", "Practice with Docker containers");
  } else if (recommendation === 'maybe') {
    nextSteps.push("Strengthen weak areas identified", "Complete prerequisite courses", "Gain more hands-on experience");
  } else {
    nextSteps.push("Consider related fields like QA automation", "Build foundational technical skills", "Explore system administration first");
  }

  const careerPaths = [
    {
      title: "Cloud DevOps Engineer",
      match: Math.round(overallScore),
      description: "Build and maintain CI/CD pipelines, automate deployments"
    },
    {
      title: "Site Reliability Engineer",
      match: Math.round((scores.technical + scores.wiscar.cognitive + scores.wiscar.will) / 3),
      description: "Ensure system reliability, performance, and scalability"
    },
    {
      title: "Platform Engineer",
      match: Math.round((scores.technical + scores.wiscar.skill + scores.psychometric) / 3),
      description: "Build internal platforms and developer tools"
    },
    {
      title: "Infrastructure Engineer",
      match: Math.round((scores.technical + scores.wiscar.realWorld) / 2),
      description: "Manage cloud infrastructure and automation"
    }
  ].sort((a, b) => b.match - a.match);

  return {
    overallScore: Math.round(overallScore),
    confidence: Math.round(confidence),
    recommendation,
    insights,
    nextSteps,
    careerPaths,
    weakAreas,
    strengths
  };
}

function assessmentReducer(state: AssessmentState, action: AssessmentAction): AssessmentState {
  switch (action.type) {
    case 'START_ASSESSMENT':
      return {
        ...state,
        assessment: { ...initialAssessment, id: crypto.randomUUID() },
        result: null
      };
    
    case 'ANSWER_QUESTION':
      const newAnswers = {
        ...state.assessment.answers,
        [action.questionId]: action.answer
      };
      return {
        ...state,
        assessment: {
          ...state.assessment,
          answers: newAnswers,
          scores: calculateScores(newAnswers)
        }
      };
    
    case 'NEXT_QUESTION':
      return {
        ...state,
        assessment: {
          ...state.assessment,
          currentQuestionIndex: Math.min(
            state.assessment.currentQuestionIndex + 1,
            questions.length - 1
          )
        }
      };
    
    case 'COMPLETE_ASSESSMENT':
      const finalScores = calculateScores(state.assessment.answers);
      const result = generateResult(finalScores);
      return {
        ...state,
        assessment: {
          ...state.assessment,
          completed: true,
          scores: finalScores
        },
        result
      };
    
    case 'RESET_ASSESSMENT':
      return initialState;
    
    default:
      return state;
  }
}

interface AssessmentContextType {
  state: AssessmentState;
  startAssessment: () => void;
  answerQuestion: (questionId: string, answer: number) => void;
  nextQuestion: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
  getCurrentQuestion: () => typeof questions[0] | null;
  getProgress: () => number;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const startAssessment = () => dispatch({ type: 'START_ASSESSMENT' });
  const answerQuestion = (questionId: string, answer: number) => 
    dispatch({ type: 'ANSWER_QUESTION', questionId, answer });
  const nextQuestion = () => dispatch({ type: 'NEXT_QUESTION' });
  const completeAssessment = () => dispatch({ type: 'COMPLETE_ASSESSMENT' });
  const resetAssessment = () => dispatch({ type: 'RESET_ASSESSMENT' });

  const getCurrentQuestion = () => {
    if (state.assessment.currentQuestionIndex >= questions.length) return null;
    return questions[state.assessment.currentQuestionIndex];
  };

  const getProgress = () => {
    return (state.assessment.currentQuestionIndex / questions.length) * 100;
  };

  return (
    <AssessmentContext.Provider value={{
      state,
      startAssessment,
      answerQuestion,
      nextQuestion,
      completeAssessment,
      resetAssessment,
      getCurrentQuestion,
      getProgress
    }}>
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}