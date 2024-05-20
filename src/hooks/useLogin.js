import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // sign the user in
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (!res.user) {
        throw new Error('Login failed');
      }

      // update online status
      const { uid } = res.user;
      await updateDoc(doc(db, 'users', uid), { online: true });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      console.error("Error during login: ", err);  // Enhanced error logging
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
};
