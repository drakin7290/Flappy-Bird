import React from 'react';
import { useNProgress } from '@tanem/react-nprogress';
import { Bar } from './Bar';
import { Container } from './Container';

//gen IF for Progress
export interface ProgressProps {
  isAnimating: boolean;
}

export const Progress: React.FC<ProgressProps> = ({ isAnimating }) => {
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });
  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
    </Container>
  );
};
