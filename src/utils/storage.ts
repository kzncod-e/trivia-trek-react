import { QuizState } from '@/types/quiz';

const QUIZ_STATE_KEY = 'quiz_state';

export const saveQuizState = (state: QuizState): void => {
  try {
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving quiz state:', error);
  }
};

export const loadQuizState = (): QuizState | null => {
  try {
    const saved = localStorage.getItem(QUIZ_STATE_KEY);
    if (!saved) return null;
    return JSON.parse(saved);
  } catch (error) {
    console.error('Error loading quiz state:', error);
    return null;
  }
};

export const clearQuizState = (): void => {
  try {
    localStorage.removeItem(QUIZ_STATE_KEY);
  } catch (error) {
    console.error('Error clearing quiz state:', error);
  }
};
