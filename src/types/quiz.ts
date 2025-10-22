export interface Question {
  category: string;
  type: 'multiple' | 'boolean';
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  allAnswers?: string[];
}

export interface QuizConfig {
  numberOfQuestions: number;
  category?: string;
  difficulty?: string;
  type: 'multiple' | 'boolean' | 'any';
  timerSeconds: number;
}

export interface QuizState {
  userName: string;
  config: QuizConfig;
  questions: Question[];
  currentQuestionIndex: number;
  answers: (string | null)[];
  startTime: number;
  remainingTime: number;
  isFinished: boolean;
}

export interface QuizResults {
  totalQuestions: number;
  answered: number;
  correct: number;
  incorrect: number;
  timeTaken: number;
}
