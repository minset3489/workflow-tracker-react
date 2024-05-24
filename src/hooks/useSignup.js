import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import useStorage from './useStorage';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const { uploadImage } = useStorage();

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);

    try {
      // signup
      const res = await createUserWithEmailAndPassword(auth, email, password);

      if (!res) {
        throw new Error('Could not complete signup');
      }

      // upload user thumbnail 
      const photoURL = await uploadImage(thumbnail, 'thumbnail', res.user.uid);

      // add display name to user
      await updateProfile(res.user, { displayName, photoURL });

      // create a user document
      await setDoc(doc(db, 'users', res.user.uid), { 
        online: true,
        displayName,
        photoURL,
      });

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
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

  return { signup, error, isPending };
};