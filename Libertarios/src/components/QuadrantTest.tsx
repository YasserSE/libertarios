"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { quadrantQuestions, answerOptions } from "@/data/quadrantQuestions";
import { ArrowLeft, ArrowRight, RotateCcw, Lightbulb } from "lucide-react";

interface QuadrantTestProps {
  onComplete: (economic: number, social: number) => void;
}

export function QuadrantTest({ onComplete }: QuadrantTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showInsight, setShowInsight] = useState(false);
  
  const question = quadrantQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quadrantQuestions.length) * 100;
  
  // Reset insight when question changes
  useEffect(() => {
    setShowInsight(false);
  }, [currentQuestion]);
  
  const handleAnswer = (value: number) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
    // Show insight after a brief delay
    setTimeout(() => setShowInsight(true), 300);
  };
  
  const handleNext = () => {
    if (currentQuestion < quadrantQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResults();
    }
  };
  
  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowInsight(false);
  };
  
  const calculateResults = () => {
    let economicScore = 0;
    let socialScore = 0;
    let economicCount = 0;
    let socialCount = 0;
    
    for (const q of quadrantQuestions) {
      const answer = answers[q.id] || 0;
      const adjustedScore = answer * q.direction;
      
      if (q.axis === 'economic') {
        economicScore += adjustedScore;
        economicCount++;
      } else {
        socialScore += adjustedScore;
        socialCount++;
      }
    }
    
    // Normalize to -100 to 100 scale
    const economic = Math.round((economicScore / (economicCount * 2)) * 100);
    const social = Math.round((socialScore / (socialCount * 2)) * 100);
    
    onComplete(economic, social);
  };
  
  const currentAnswer = answers[question.id];
  const canProceed = currentAnswer !== undefined;
  
  return (
    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-card max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Pregunta {currentQuestion + 1} de {quadrantQuestions.length}</span>
          <button 
            onClick={handleReset}
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar
          </button>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full gradient-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Question */}
      <div className="mb-8">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground mb-4">
          {question.axis === 'economic' ? '💰 Reflexión económica' : '🗽 Reflexión social'}
        </div>
        <h3 className="font-display text-lg md:text-xl lg:text-2xl font-semibold text-foreground leading-relaxed">
          {question.text}
        </h3>
      </div>
      
      {/* Answer options */}
      <div className="space-y-3 mb-6">
        {answerOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
              currentAnswer === option.value
                ? 'border-primary bg-accent shadow-md'
                : 'border-border hover:border-primary/50 bg-background hover:bg-muted/30'
            }`}
          >
            <span className={`font-medium ${
              currentAnswer === option.value ? 'text-primary' : 'text-foreground'
            }`}>
              {option.label}
            </span>
          </button>
        ))}
      </div>
      
      {/* Insight - shown after answering */}
      {showInsight && question.insight && (
        <div className="mb-8 p-4 rounded-xl bg-primary/5 border border-primary/20 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary mb-1">Reflexión</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {question.insight}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentQuestion === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>
        
        <Button
          variant="cta"
          onClick={handleNext}
          disabled={!canProceed}
        >
          {currentQuestion === quadrantQuestions.length - 1 ? 'Ver resultados' : 'Siguiente'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
