import { useNavigate } from 'react-router-dom';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Brain, 
  Code, 
  Target, 
  TrendingUp, 
  Clock, 
  Award,
  CheckCircle,
  Cloud,
  Zap
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { startAssessment } = useAssessment();

  const handleStartAssessment = () => {
    startAssessment();
    navigate('/assessment');
  };

  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Psychological Readiness",
      description: "Evaluate your mindset, motivation, and personality fit for DevOps culture"
    },
    {
      icon: <Code className="h-6 w-6" />,
      title: "Technical Aptitude", 
      description: "Test prerequisite knowledge in Linux, networking, cloud, and scripting"
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "WISCAR Framework",
      description: "Comprehensive analysis across Will, Interest, Skill, Cognitive readiness, Ability, and Real-world alignment"
    }
  ];

  const outcomes = [
    {
      icon: <TrendingUp className="h-5 w-5" />,
      text: "Detailed scoring across all dimensions"
    },
    {
      icon: <Award className="h-5 w-5" />,
      text: "Personalized career path recommendations"
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      text: "Actionable next steps for learning"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      text: "Strengths and improvement areas identified"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="mb-8 animate-slide-up">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-2">
              <Cloud className="h-4 w-4 mr-2" />
              AI-Powered Career Assessment
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              Should I Learn
              <span className="text-primary block mt-2">Cloud DevOps?</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Discover your fit for Cloud DevOps Engineering with our comprehensive assessment. 
              Get personalized insights on your readiness, career alignment, and next steps.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleStartAssessment}
              className="text-lg px-8 py-6 h-auto animate-glow-pulse"
            >
              <Play className="h-5 w-5 mr-3" />
              Start Assessment
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">20-30 minutes • 17 questions</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gradient-card border border-primary/20 shadow-card hover:shadow-intense transition-all duration-300 hover:scale-105 animate-slide-up">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* What You'll Get Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-card border border-primary/20 shadow-card">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                What You'll Discover
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center text-secondary flex-shrink-0">
                      {outcome.icon}
                    </div>
                    <span className="text-foreground">{outcome.text}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Career Paths Preview */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">
            Potential Career Paths
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Cloud DevOps Engineer", desc: "CI/CD pipelines & automation" },
              { title: "Site Reliability Engineer", desc: "System reliability & performance" },
              { title: "Platform Engineer", desc: "Internal tools & platforms" },
              { title: "Infrastructure Engineer", desc: "Cloud infrastructure & governance" }
            ].map((path, index) => (
              <Card key={index} className="bg-gradient-card border border-primary/20 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 text-center">
                  <h4 className="font-semibold text-foreground mb-2">{path.title}</h4>
                  <p className="text-xs text-muted-foreground">{path.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Find Your Path?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Take our scientifically-designed assessment to get personalized insights 
            about your DevOps career potential and next steps.
          </p>
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleStartAssessment}
            className="text-lg px-8 py-6 h-auto"
          >
            <Play className="h-5 w-5 mr-3" />
            Begin Your Assessment
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;