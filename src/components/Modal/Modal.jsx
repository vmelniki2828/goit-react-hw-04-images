import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import stylesLoader from '../Loader/Loader.module.css'
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({children, onClose}) => {

  useEffect(()=>{
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose])

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

    return createPortal(
      <div className={stylesLoader.backdrop} onClick={handleBackdropClick}>
        <div className={styles.modal} >
          {children}
        </div>
      </div>
      ,
      modalRoot
    );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;