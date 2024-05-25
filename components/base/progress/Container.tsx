import React from 'react';
import styles from './styles.module.scss';

//gen IF for Container
export interface ContainerProps {
  animationDuration: number;
  isFinished: boolean;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ animationDuration, children, isFinished }) => {
  return (
    <div
      className={styles.container}
      style={{ opacity: isFinished ? 0 : 1, transition: `opacity ${animationDuration}ms linear` }}
    >
      {children}
    </div>
  );
};
