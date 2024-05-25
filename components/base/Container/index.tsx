import React from 'react';
import { cn } from '~/utils/base';
import styles from './styles.module.scss';

//gen interface container
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  classNameContainer?: string;
  styleContainer?: React.CSSProperties;
}

//change below function to arrow function type
const Container: React.FC<ContainerProps> = ({
  children,
  className,
  style = {},
  classNameContainer,
  styleContainer = {},
}) => {
  return (
    <div className={cn(styles.container, classNameContainer)} style={{ ...styleContainer }}>
      <div className={cn(className)} style={{ ...style }}>
        {children}
      </div>
    </div>
  );
};

export default Container;
