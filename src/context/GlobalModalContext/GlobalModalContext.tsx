'use client';

import { ModalProps } from '@mui/material';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { GlobalModal } from './GlobalModal';

interface GlobalModalProps extends Omit<ModalProps, 'children' | 'open' | 'onClose'> {
  body: ReactNode | null;
  open: boolean;
  title?: string;
  onClose?: () => void;
  closeCallback?: () => void;
}
export interface OpenModalParams extends Omit<GlobalModalProps, 'open' | 'onClose'> {}
type ModalStateContextType = GlobalModalProps;
type ModalActionContextType = {
  openModal: (params: OpenModalParams) => void;
  closeModal: (callbackfn?: () => void) => void;
};

const ModalStateContext = createContext<ModalStateContextType | undefined>(undefined);
const ModalActionContext = createContext<ModalActionContextType | undefined>(undefined);

interface ModalContextProviderProps {
  children: ReactNode;
}

export const GlobalModalProvider = ({ children }: ModalContextProviderProps) => {
  const [modalProps, setModalProps] = useState<GlobalModalProps>({
    open: false,
    onClose: undefined,
    body: null,
    title: undefined,
  });
  const cleanUp = () => {
    setModalProps({ open: false, onClose: undefined, body: null, title: undefined });
  };
  const closeModal = useCallback((callback?: () => void) => {
    cleanUp();
    if (typeof callback === 'function') {
      callback();
    }
  }, []);
  const openModal = useCallback(({ closeCallback, body, ...rest }: OpenModalParams) => {
    const modalProps: GlobalModalProps = {
      ...rest,
      open: true,
      onClose: () => closeModal(closeCallback),
      body,
    };
    setModalProps(modalProps);
  }, []);
  const stateValue = useMemo(() => modalProps, [modalProps]);
  const actionsValue = useMemo(() => ({ openModal, closeModal }), [openModal, closeModal]);
  return (
    <ModalActionContext.Provider value={actionsValue}>
      {children}
      <ModalStateContext.Provider value={stateValue}>
        <GlobalModal />
      </ModalStateContext.Provider>
    </ModalActionContext.Provider>
  );
};

export const useModalState = () => {
  const context = useContext(ModalStateContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalContextProvider');
  }
  return context;
};

export const useModal = () => {
  const context = useContext(ModalActionContext);
  if (context === undefined) {
    throw new Error('useModalAction must be used within a ModalContextProvider');
  }
  return context;
};
