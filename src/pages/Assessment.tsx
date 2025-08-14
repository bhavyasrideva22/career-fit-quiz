import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { LikertScale } from '@/components/assessment/LikertScale';
import { MultipleChoice } from '@/components/assessment/MultipleChoice';

const Assessment = () => {
  const navigate = useNavigate();
  const { state, getCurrentQuestion, answerQuestion, nextQuestion, completeAssessment, getProgress } = useAssessment();
  const currentQuestion = getCurrentQuestion();
  const progress = getProgress();

  useEffect(() => {
    if (!currentQuestion && !state.assessment.completed) {
      completeAssessment();
      navigate('/results');
    }
  }, [currentQuestion, state.assessment.completed, completeAssessment, navigate]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center text-foreground">
          <h2 className="text-2xl font-bold mb-4">Completing Assessment...</h2>
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  const handleAnswer = (answer: number) => {
    answerQuestion(currentQuestion.id, answer);
  };

  const handleNext = () => {
    if (state.assessment.currentQuestionIndex < 16) { // Total questions - 1
      nextQuestion();
    } else {
      completeAssessment();
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (state.assessment.currentQuestionIndex > 0) {
      navigate(-1);
    }
  };

  const isAnswered = state.assessment.answers[currentQuestion.id] !== undefined;
  const questionNumber = state.assessment.currentQuestionIndex + 1;
  const totalQuestions = 17;

  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'psychometric': return '🧠 Psychological Readiness';
      case 'technical': return '🔧 Technical Aptitude';
      case 'wiscar': return '🎯 WISCAR Framework';
      default: return 'Assessment';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit Assessment
            </Button>
            <div className="text-sm text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </div>
          </div>
          
          <Progress value={progress} className="h-2 mb-2" />
          <div className="text-xs text-muted-foreground">
            {Math.round(progress)}% Complete
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-3xl mx-auto">
          <Card className="bg-gradient-card border border-primary/20 shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span className="px-2 py-1 bg-primary/10 rounded-full text-primary">
                  {getSectionTitle(currentQuestion.section)}
                </span>
              </div>
              <CardTitle className="text-xl text-foreground leading-relaxed">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Question Component */}
              {currentQuestion.type === 'likert' || currentQuestion.type === 'rating' ? (
                <LikertScale
                  question={currentQuestion}
                  value={state.assessment.answers[currentQuestion.id]}
                  onChange={handleAnswer}
                />
              ) : (
                <MultipleChoice
                  question={currentQuestion}
                  value={state.assessment.answers[currentQuestion.id]}
                  onChange={handleAnswer}
                />
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={state.assessment.currentQuestionIndex === 0}
                  className="text-muted-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  variant="hero"
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className="min-w-[120px]"
                >
                  {questionNumber === totalQuestions ? 'Complete' : 'Next'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Assessment;