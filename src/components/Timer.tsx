import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';

interface TimerProps {
  remainingTime: number;
  totalTime: number;
}

export const Timer = ({ remainingTime, totalTime }: TimerProps) => {
  const percentage = (remainingTime / totalTime) * 100;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  const isLowTime = remainingTime < 30;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${
        isLowTime
          ? 'bg-destructive/10 border-destructive text-destructive'
          : 'bg-card border-border text-foreground'
      }`}
    >
      <div className="relative">
        {isLowTime ? (
          <AlertCircle className="w-5 h-5 animate-pulse" />
        ) : (
          <Clock className="w-5 h-5" />
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-baseline gap-1 font-mono text-lg font-bold">
          <span>{minutes.toString().padStart(2, '0')}</span>
          <span className="text-sm">:</span>
          <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
        <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${isLowTime ? 'bg-destructive' : 'bg-primary'}`}
            initial={{ width: '100%' }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
