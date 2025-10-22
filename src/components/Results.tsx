import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { QuizState, QuizResults as QuizResultsType } from '@/types/quiz';
import { Trophy, Target, CheckCircle2, XCircle, Clock, RotateCcw } from 'lucide-react';

interface ResultsProps {
  quizState: QuizState;
  results: QuizResultsType;
  onRestart: () => void;
}

export const Results = ({ quizState, results, onRestart }: ResultsProps) => {
  const percentage = (results.correct / results.totalQuestions) * 100;
  const timeTakenMinutes = Math.floor(results.timeTaken / 60);
  const timeTakenSeconds = results.timeTaken % 60;

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: 'Outstanding!', icon: Trophy, color: 'text-success' };
    if (percentage >= 70) return { text: 'Great Job!', icon: Target, color: 'text-primary' };
    if (percentage >= 50) return { text: 'Good Effort!', icon: Target, color: 'text-accent' };
    return { text: 'Keep Practicing!', icon: Target, color: 'text-muted-foreground' };
  };

  const performance = getPerformanceMessage();
  const PerformanceIcon = performance.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent p-4 py-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Summary Card */}
        <div className="bg-card rounded-2xl shadow-2xl p-8 mb-6 border border-border/50">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-full mb-4 ${performance.color}`}>
              <PerformanceIcon className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Quiz Complete!</h1>
            <p className={`text-xl font-semibold ${performance.color}`}>{performance.text}</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-muted rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">
                {results.correct}/{results.totalQuestions}
              </div>
              <div className="text-sm text-muted-foreground">Correct Answers</div>
              <div className="mt-2 text-2xl font-semibold text-foreground">{percentage.toFixed(0)}%</div>
            </div>

            <div className="bg-muted rounded-xl p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  Correct
                </span>
                <span className="font-semibold text-foreground">{results.correct}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-destructive" />
                  Incorrect
                </span>
                <span className="font-semibold text-foreground">{results.incorrect}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time Taken
                </span>
                <span className="font-semibold text-foreground">
                  {timeTakenMinutes}:{timeTakenSeconds.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          <Button
            onClick={onRestart}
            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Start New Quiz
          </Button>
        </div>

        {/* Review Section */}
        <div className="bg-card rounded-2xl shadow-2xl p-6 md:p-8 border border-border/50">
          <h2 className="text-2xl font-bold text-foreground mb-6">Review Answers</h2>
          <div className="space-y-4">
            {quizState.questions.map((question, index) => {
              const userAnswer = quizState.answers[index];
              const isCorrect = userAnswer === question.correct_answer;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-xl border-2 ${
                    isCorrect
                      ? 'bg-success/5 border-success/20'
                      : userAnswer
                      ? 'bg-destructive/5 border-destructive/20'
                      : 'bg-muted border-border'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      ) : userAnswer ? (
                        <XCircle className="w-5 h-5 text-destructive" />
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-muted" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-1 text-sm">
                        {userAnswer && (
                          <p className={isCorrect ? 'text-success' : 'text-destructive'}>
                            <span className="font-medium">Your answer:</span> {userAnswer}
                          </p>
                        )}
                        {!isCorrect && (
                          <p className="text-success">
                            <span className="font-medium">Correct answer:</span> {question.correct_answer}
                          </p>
                        )}
                        {!userAnswer && (
                          <p className="text-muted-foreground italic">Not answered</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
