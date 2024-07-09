import React from 'react';

const Modal = ({ show, handleClose, children }) => {
  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={handleClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
