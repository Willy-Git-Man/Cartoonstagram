import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, [])

  return (
    <>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal({ onClose, children }) {
  const modalNode = useContext(ModalContext);
  if (!modalNode) return null;

  return ReactDOM.createPortal(
    <div id="modal">
      <div id="modal-background" onClick={onClose}>
        <div className='xButtonDiv'><FontAwesomeIcon className='xButton' size='2x' icon="xmark" onClick={onClose}/></div>
      </div>
      <div id="modal-content">
        {children}
      </div>
    </div>,
    modalNode
  );
}
