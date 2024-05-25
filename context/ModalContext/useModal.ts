import { useContext } from 'react';
import { ModalContext } from './ModalProvider';

const useModal = (key = '') => {
  const context = useContext(ModalContext);
  let modal = context?.state;
  if (key !== '') {
    let modalNow = modal?.[key];
    const setIsOpen = (value: boolean, data: any = {}) => {
      context?.setState((prev) => {
        let newVal = value;
        let newObj = { ...prev, [key]: { ...modalNow, isOpen: newVal, data: data } };
        return newObj;
      });
    };

    return { ...modalNow, setIsOpen, isOpen: modalNow?.isOpen, data: modalNow?.data || {} };
  }
  return context;
};

export default useModal;
