import React from 'react';
import dynamic from 'next/dynamic';

const Img: React.FC<{ errorImage?: string; src?: string; className?: string; style?: React.CSSProperties }> = ({
  errorImage = '',
  src = '',
  ...props
}) => {
  const imageBase = '/imgs/avatar.png';
  return (
    <img
      {...props}
      src={src || errorImage || imageBase}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = errorImage || imageBase;
      }}
    />
  );
};

export default dynamic(() => Promise.resolve(Img), {
  ssr: false,
});
