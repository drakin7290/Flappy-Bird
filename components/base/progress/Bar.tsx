import React from 'react';
import styles from './styles.module.scss';

//gen IF for Bar
export interface BarProps {
  animationDuration: number;
  progress: number;
}

export const Bar: React.FC<BarProps> = ({ animationDuration, progress }) => {
  return (
    <div
      className={styles.bar}
      style={{ marginLeft: `${(-1 + progress) * 100}%`, transition: `margin-left ${animationDuration}ms linear` }}
    />
  );
};
