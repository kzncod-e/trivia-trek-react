import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Login } from '@/components/Login';
import { QuizSettings } from '@/components/QuizSettings';
import { Quiz } from '@/components/Quiz';
import { Results } from '@/components/Results';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { QuizConfig, QuizState, QuizResults } from '@/types/quiz';
import { fetchQuestions } from '@/utils/api';
import { saveQuizState, loadQuizState, clearQuizState } from '@/utils/storage';
import { useToast } from '@/hooks/use-toast';

type Screen = 'login' | 'settings' | 'quiz' | 'results';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('login');
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved quiz state on mount
    const savedState = loadQuizState();
    if (savedState && !savedState.isFinished) {
      // Resume quiz
      setQuizState(savedState);
      setScreen('quiz');
      toast({
        title: 'Quiz Resumed',
        description: 'Continuing from where you left off!',
      });
    }
  }, []);

  const handleLogin = (userName: string) => {
    setQuizState({ ...quizState, userName } as QuizState);
    setScreen('settings');
  };

  const handleStartQuiz = async (config: QuizConfig) => {
    setIsLoading(true);
    try {
      const questions = await fetchQuestions(config);
      
      if (questions.length === 0) {
        throw new Error('No questions available for the selected configuration');
      }

      const newState: QuizState = {
        userName: quizState?.userName || 'Player',
        config,
        questions,
        currentQuestionIndex: 0,
        answers: new Array(questions.length).fill(null),
        startTime: Date.now(),
        remainingTime: config.timerSeconds,
        isFinished: false,
      };

      saveQuizState(newState);
      setQuizState(newState);
      setScreen('quiz');
      
      toast({
        title: 'Quiz Started!',
        description: `Good luck, ${newState.userName}!`,
      });
    } catch (error) {
      console.error('Error starting quiz:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch questions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinishQuiz = () => {
    setScreen('results');
  };

  const handleRestart = () => {
    clearQuizState();
    setQuizState(null);
    setScreen('login');
  };

  const handleBackToSettings = () => {
    setScreen('settings');
  };

  const calculateResults = (): QuizResults => {
    if (!quizState) {
      return {
        totalQuestions: 0,
        answered: 0,
        correct: 0,
        incorrect: 0,
        timeTaken: 0,
      };
    }

    const answered = quizState.answers.filter((a) => a !== null).length;
    const correct = quizState.answers.filter(
      (answer, index) => answer === quizState.questions[index].correct_answer
    ).length;
    const timeTaken = quizState.config.timerSeconds - quizState.remainingTime;

    return {
      totalQuestions: quizState.questions.length,
      answered,
      correct,
      incorrect: answered - correct,
      timeTaken,
    };
  };

  if (isLoading) {
    return <LoadingScreen message="Fetching quiz questions..." />;
  }

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        {screen === 'login' && <Login onLogin={handleLogin} />}
        
        {screen === 'settings' && quizState && (
          <QuizSettings
            userName={quizState.userName}
            onStart={handleStartQuiz}
            onBack={handleRestart}
          />
        )}
        
        {screen === 'quiz' && quizState && (
          <Quiz
            quizState={quizState}
            onUpdateState={setQuizState}
            onFinish={handleFinishQuiz}
          />
        )}
        
        {screen === 'results' && quizState && (
          <Results
            quizState={quizState}
            results={calculateResults()}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default Index;
