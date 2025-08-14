import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  RefreshCw, 
  ArrowRight,
  TrendingUp,
  Target,
  Lightbulb,
  Award
} from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const { state, resetAssessment } = useAssessment();

  useEffect(() => {
    if (!state.result) {
      navigate('/');
    }
  }, [state.result, navigate]);

  if (!state.result) {
    return null;
  }

  const { result } = state;
  const getRecommendationIcon = () => {
    switch (result.recommendation) {
      case 'yes': return <CheckCircle className="h-6 w-6 text-secondary" />;
      case 'maybe': return <AlertCircle className="h-6 w-6 text-accent" />;
      case 'no': return <XCircle className="h-6 w-6 text-destructive" />;
    }
  };

  const getRecommendationText = () => {
    switch (result.recommendation) {
      case 'yes': return 'Strong Fit - Recommended';
      case 'maybe': return 'Moderate Fit - Conditional';
      case 'no': return 'Poor Fit - Not Recommended';
    }
  };

  const getRecommendationColor = () => {
    switch (result.recommendation) {
      case 'yes': return 'text-secondary';
      case 'maybe': return 'text-accent';
      case 'no': return 'text-destructive';
    }
  };

  const handleRetakeAssessment = () => {
    resetAssessment();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-slide-up">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Cloud DevOps Assessment Results
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive analysis of your readiness and fit for Cloud DevOps Engineering
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="mb-8 bg-gradient-card border border-primary/20 shadow-intense animate-slide-up">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getRecommendationIcon()}
                <div>
                  <CardTitle className={`text-2xl ${getRecommendationColor()}`}>
                    {getRecommendationText()}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Overall Score: {result.overallScore}/100 • Confidence: {result.confidence}%
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary">
                  {result.overallScore}
                </div>
                <div className="text-sm text-muted-foreground">
                  Overall Score
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Detailed Scores */}
          <div className="space-y-6">
            {/* WISCAR Breakdown */}
            <Card className="bg-gradient-card border border-primary/20 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  WISCAR Framework Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(state.assessment.scores.wiscar).map(([key, score]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize text-foreground">
                        {key === 'realWorld' ? 'Real World Alignment' : key}
                      </span>
                      <span className="text-muted-foreground">{Math.round(score)}/100</span>
                    </div>
                    <Progress value={score} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Section Scores */}
            <Card className="bg-gradient-card border border-primary/20 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Section Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>🧠 Psychological Readiness</span>
                    <span>{Math.round(state.assessment.scores.psychometric)}/100</span>
                  </div>
                  <Progress value={state.assessment.scores.psychometric} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>🔧 Technical Aptitude</span>
                    <span>{Math.round(state.assessment.scores.technical)}/100</span>
                  </div>
                  <Progress value={state.assessment.scores.technical} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Strengths & Weaknesses */}
            <Card className="bg-gradient-card border border-primary/20 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Strengths & Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {result.strengths.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-secondary mb-2">Strengths</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.strengths.map((strength, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {result.weakAreas.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-accent mb-2">Areas for Improvement</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.weakAreas.map((area, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-accent/50">
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recommendations & Next Steps */}
          <div className="space-y-6">
            {/* Career Paths */}
            <Card className="bg-gradient-card border border-primary/20 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-primary" />
                  Recommended Career Paths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {result.careerPaths.slice(0, 4).map((path, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{path.title}</h4>
                      <p className="text-xs text-muted-foreground">{path.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">{path.match}%</div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Insights */}
            <Card className="bg-gradient-card border border-primary/20 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Key Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {result.insights.map((insight, index) => (
                    <li key={index} className="text-sm text-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-gradient-card border border-primary/20 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Recommended Next Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2">
                  {result.nextSteps.map((step, index) => (
                    <li key={index} className="text-sm text-foreground flex items-start gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button variant="outline" onClick={handleRetakeAssessment}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retake Assessment
          </Button>
          <Button variant="hero" onClick={() => navigate('/')}>
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;