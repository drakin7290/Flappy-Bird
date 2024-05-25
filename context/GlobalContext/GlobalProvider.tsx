import kaboom from 'kaboom';
import { createContext, useEffect } from 'react';
import { setStoreGlobal } from '~/store/useStoreGlobal';

interface GlobalIF {}

const defaultGlobal: GlobalIF = {};

const GlobalContext = createContext<GlobalIF>(defaultGlobal);

const GlobalProvider = ({ children }) => {
  useEffect(() => {
    const kb = kaboom({
      width: Math.min(window.innerWidth, 560), // width of canvas
      height: Math.min(window.innerHeight, 780), // height of canvas
    });
    setStoreGlobal({ kb });
    return () => {
      document.querySelectorAll('canvas').forEach((canvas) => {
        canvas.remove();
      });
    };
  }, []);
  return (
    <>
      <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
    </>
  );
};

export { GlobalContext };
export default GlobalProvider;
