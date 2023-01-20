import React, { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/store';
import { showToast } from '../redux/slices/layoutSlice';

const SnackBar = ({ children }:any) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { message, type } = useTypedSelector((state) => state.toast);
  useEffect(() => {
    setShow(true);
  }, [message]);

  setTimeout(() => {
    setShow(false);
  }, 3000);
  return (
    <>
      <Toast
        style={{
          zIndex: 9999, position: 'fixed', bottom: 34, right: 35, backgroundColor: type === 'success' ? 'rgb(8, 163, 145)' : type === 'danger' ? '#e03e3e' : 'orange', padding: 2,
        }}
        show={show}
        onClose={() => {
          dispatch(showToast({
            message: '',
            type: '',
          }));
        }}
      >
        <Toast.Body className="text-white lead">
          {message}
        </Toast.Body>
      </Toast>
      {children}
    </>
  );
};

export default SnackBar;
