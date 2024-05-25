import React from 'react';
import Link from 'next/link';
import { cn } from '~/utils/base';

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
  to?: string;
  disabled?: boolean;
  outline?: string;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  children,
  onClick = function () {},
  style = {},
  to = '',
  disabled,
  outline = '',
  ...props
}) => {
  return (
    <button
      className={cn(
        'rounded-[24px] bg-primary font-[400] text-white text-[1.4rem] leading-[1] px-[12px] py-[16px] border-none cursor-pointer no-underline w-max relative flex flex-wrap text-center items-center justify-center gap-x-[8px]',
        className,
        {
          'cursor-default opacity-[0.6] pointer-events-none select-none': disabled,
          'border-solid border background-transparent': outline !== '',
        }
      )}
      onClick={(e) => {
        onClick(e);
      }}
      style={{
        color: outline,
        borderColor: outline,
        ...style,
      }}
      {...props}
    >
      {children}
      {to != '' && (
        <Link href={to}>
          <a className="absolute top-0 left-0 right-0 bottom-0"></a>
        </Link>
      )}
    </button>
  );
};

export default Button;
