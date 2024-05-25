import { create } from 'zustand';

type ProgressStoreType = {
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
};

export const useProgressStore = create<ProgressStoreType>((set) => ({
  isAnimating: false,
  setIsAnimating: (isAnimating: boolean) => set(() => ({ isAnimating })),
}));
