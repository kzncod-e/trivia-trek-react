import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Question as QuestionType } from '@/types/quiz';
import { Check, X } from 'lucide-react';

interface QuestionProps {
  question: QuestionType;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  disabled?: boolean;
}

export const Question = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  disabled = false,
}: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer || disabled) return;

    const isCorrect = answer === question.correct_answer;
    setSelectedAnswer(answer);
    setShowFeedback(true);

    // Auto-advance after showing feedback
    setTimeout(() => {
      onAnswer(answer, isCorrect);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }, 800);
  };

  const getButtonVariant = (answer: string) => {
    if (!showFeedback) return 'outline';
    if (answer === question.correct_answer) return 'default';
    if (answer === selectedAnswer) return 'destructive';
    return 'outline';
  };

  return (
    <motion.div
      key={questionNumber}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-card rounded-2xl shadow-xl p-6 md:p-8 border border-border/50">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-xs font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full capitalize">
              {question.difficulty}
            </span>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-foreground leading-relaxed">
            {question.question}
          </h2>
          
          <p className="text-sm text-muted-foreground mt-2">{question.category}</p>
        </div>

        <div className="space-y-3">
          {question.allAnswers?.map((answer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => handleAnswerClick(answer)}
                disabled={disabled || showFeedback}
                variant={getButtonVariant(answer)}
                className={`w-full h-auto min-h-[60px] text-left justify-start p-4 text-base transition-all ${
                  selectedAnswer === answer && showFeedback
                    ? answer === question.correct_answer
                      ? 'bg-success hover:bg-success text-success-foreground'
                      : 'bg-destructive hover:bg-destructive text-destructive-foreground'
                    : ''
                } ${
                  showFeedback && answer === question.correct_answer && answer !== selectedAnswer
                    ? 'bg-success/20 border-success text-success'
                    : ''
                }`}
              >
                <span className="flex items-center gap-3 w-full">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-semibold text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{answer}</span>
                  <AnimatePresence>
                    {showFeedback && selectedAnswer === answer && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        {answer === question.correct_answer ? (
                          <Check className="w-6 h-6" />
                        ) : (
                          <X className="w-6 h-6" />
                        )}
                      </motion.span>
                    )}
                    {showFeedback &&
                      answer === question.correct_answer &&
                      answer !== selectedAnswer && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check className="w-6 h-6" />
                        </motion.span>
                      )}
                  </AnimatePresence>
                </span>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
