import { Dispatch, SetStateAction, createContext } from 'react';

import { useState } from 'react';

interface defaultModalIF {
  state: object;
  setState: Dispatch<SetStateAction<{}>>;
}

const defaultModal: defaultModalIF = {
  state: {},
  setState: () => {},
};

const ModalContext = createContext<defaultModalIF>(defaultModal);

const ModalProvider = ({ children }) => {
  const [modal, setModal] = useState({});

  return (
    <ModalContext.Provider
      value={{
        state: modal,
        setState: setModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext };
export default ModalProvider;
