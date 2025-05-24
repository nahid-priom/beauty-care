// src/components/AuthListener.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../src/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { loginUser, logout } from './redux/features/auth/AuthSlice';


const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(loginUser.fulfilled({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthListener;