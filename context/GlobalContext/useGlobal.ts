import { useContext } from 'react';
import { GlobalContext } from './GlobalProvider';

const useGlobal = () => {
  const global = useContext(GlobalContext);
  return global;
};

export default useGlobal;
