import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QuizConfig } from '@/types/quiz';
import { fetchCategories } from '@/utils/api';
import { Settings, Clock } from 'lucide-react';

interface QuizSettingsProps {
  userName: string;
  onStart: (config: QuizConfig) => void;
  onBack: () => void;
}

export const QuizSettings = ({ userName, onStart, onBack }: QuizSettingsProps) => {
  const [config, setConfig] = useState<QuizConfig>({
    numberOfQuestions: 10,
    type: 'multiple',
    timerSeconds: 300, // 5 minutes default
  });
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(config);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary-glow to-accent p-4">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-card rounded-2xl shadow-2xl p-8 border border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-xl">
              <Settings className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Quiz Settings</h2>
              <p className="text-sm text-muted-foreground">Welcome back, {userName}!</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="questions" className="text-foreground font-medium">
                  Number of Questions
                </Label>
                <Input
                  id="questions"
                  type="number"
                  min="5"
                  max="50"
                  value={config.numberOfQuestions}
                  onChange={(e) =>
                    setConfig({ ...config, numberOfQuestions: parseInt(e.target.value) || 10 })
                  }
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" className="text-foreground font-medium">
                  Question Type
                </Label>
                <Select
                  value={config.type}
                  onValueChange={(value: any) => setConfig({ ...config, type: value })}
                >
                  <SelectTrigger id="type" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Type</SelectItem>
                    <SelectItem value="multiple">Multiple Choice</SelectItem>
                    <SelectItem value="boolean">True/False</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty" className="text-foreground font-medium">
                  Difficulty
                </Label>
                <Select
                  value={config.difficulty || 'any'}
                  onValueChange={(value) =>
                    setConfig({ ...config, difficulty: value === 'any' ? undefined : value })
                  }
                >
                  <SelectTrigger id="difficulty" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Difficulty</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground font-medium">
                  Category
                </Label>
                <Select
                  value={config.category || 'any'}
                  onValueChange={(value) =>
                    setConfig({ ...config, category: value === 'any' ? undefined : value })
                  }
                >
                  <SelectTrigger id="category" className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-60">
                    <SelectItem value="any">Any Category</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id.toString()}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timer" className="text-foreground font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Timer (seconds)
              </Label>
              <Input
                id="timer"
                type="number"
                min="30"
                max="3600"
                step="30"
                value={config.timerSeconds}
                onChange={(e) =>
                  setConfig({ ...config, timerSeconds: parseInt(e.target.value) || 300 })
                }
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                {Math.floor(config.timerSeconds / 60)}:{(config.timerSeconds % 60).toString().padStart(2, '0')} minutes
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                className="flex-1 h-11"
              >
                Back
              </Button>
              <Button
                type="submit"
                className="flex-1 h-11 bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity font-semibold"
              >
                Start Quiz
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
