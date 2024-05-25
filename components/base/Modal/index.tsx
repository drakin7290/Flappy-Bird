import React, { useEffect } from 'react';
import { cn } from '~/utils/base';

//gen IF Modal and change below function to arrow function
interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  centerChild?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, open, onClose, centerChild = true }) => {
  useEffect(() => {
    if (open) {
      document.querySelector('body').classList.add('!overflow-hidden');
    } else {
      document.querySelector('body').classList.remove('!overflow-hidden');
    }
  });
  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black bg-opacity-25 z-50 flex justify-center items-center overflow-auto opacity-0 transition-all invisible',
          {
            'visible opacity-100': open,
          }
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
