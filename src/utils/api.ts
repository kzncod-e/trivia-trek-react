import axios from 'axios';
import { Question, QuizConfig } from '@/types/quiz';
import { decodeHtmlEntities } from './decode';

const BASE_URL = 'https://opentdb.com/api.php';

export const fetchQuestions = async (config: QuizConfig): Promise<Question[]> => {
  try {
    const params: Record<string, string | number> = {
      amount: config.numberOfQuestions,
    };

    if (config.category) {
      params.category = config.category;
    }

    if (config.difficulty) {
      params.difficulty = config.difficulty;
    }

    if (config.type !== 'any') {
      params.type = config.type;
    }

    const response = await axios.get(BASE_URL, { params });

    if (response.data.response_code !== 0) {
      throw new Error('Failed to fetch questions from API');
    }

    // Decode HTML entities and shuffle answers
    const questions: Question[] = response.data.results.map((q: any) => {
      const allAnswers = [...q.incorrect_answers, q.correct_answer]
        .map(decodeHtmlEntities)
        .sort(() => Math.random() - 0.5); // Shuffle answers

      return {
        category: decodeHtmlEntities(q.category),
        type: q.type,
        difficulty: q.difficulty,
        question: decodeHtmlEntities(q.question),
        correct_answer: decodeHtmlEntities(q.correct_answer),
        incorrect_answers: q.incorrect_answers.map(decodeHtmlEntities),
        allAnswers,
      };
    });

    return questions;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get('https://opentdb.com/api_category.php');
    return response.data.trivia_categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
