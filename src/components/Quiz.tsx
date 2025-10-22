import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Question } from './Question';
import { Timer } from './Timer';
import { ProgressBar } from './ProgressBar';
import { QuizState } from '@/types/quiz';
import { useTimer } from '@/hooks/useTimer';
import { saveQuizState } from '@/utils/storage';

interface QuizProps {
  quizState: QuizState;
  onUpdateState: (state: QuizState) => void;
  onFinish: () => void;
}

export const Quiz = ({ quizState, onUpdateState, onFinish }: QuizProps) => {
  const [isAnswering, setIsAnswering] = useState(false);

  const handleTimeUp = () => {
    const updatedState: QuizState = {
      ...quizState,
      isFinished: true,
      remainingTime: 0,
    };
    saveQuizState(updatedState);
    onUpdateState(updatedState);
    onFinish();
  };

  const { remainingTime, updateRemainingTime } = useTimer(
    quizState.remainingTime,
    handleTimeUp,
    isAnswering
  );

  useEffect(() => {
    // Update remaining time in state periodically
    const interval = setInterval(() => {
      if (!isAnswering) {
        const updatedState = { ...quizState, remainingTime };
        saveQuizState(updatedState);
        onUpdateState(updatedState);
      }
    }, 5000); // Save every 5 seconds

    return () => clearInterval(interval);
  }, [remainingTime, isAnswering]);

  const handleAnswer = (answer: string, isCorrect: boolean) => {
    setIsAnswering(false);
    
    const newAnswers = [...quizState.answers];
    newAnswers[quizState.currentQuestionIndex] = answer;

    const nextIndex = quizState.currentQuestionIndex + 1;
    const isLastQuestion = nextIndex >= quizState.questions.length;

    const updatedState: QuizState = {
      ...quizState,
      answers: newAnswers,
      currentQuestionIndex: isLastQuestion ? quizState.currentQuestionIndex : nextIndex,
      isFinished: isLastQuestion,
      remainingTime,
    };

    saveQuizState(updatedState);
    onUpdateState(updatedState);

    if (isLastQuestion) {
      onFinish();
    }
  };

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent p-4 py-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
        >
          <div className="w-full md:flex-1">
            <ProgressBar
              current={quizState.currentQuestionIndex}
              total={quizState.questions.length}
            />
          </div>
          <Timer remainingTime={remainingTime} totalTime={quizState.config.timerSeconds} />
        </motion.div>

        <Question
          question={currentQuestion}
          questionNumber={quizState.currentQuestionIndex + 1}
          totalQuestions={quizState.questions.length}
          onAnswer={handleAnswer}
          disabled={isAnswering}
        />
      </div>
    </div>
  );
};
