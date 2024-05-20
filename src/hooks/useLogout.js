import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
import { signOut } from 'firebase/auth';
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();

  const logout = async () => {
    try {
        if (!user) {
        throw new Error('No user is currently signed in');
        }

        // update online status
        const { uid } = user;
        await updateDoc(doc(db, 'users', uid), { online: false });


        // sign the user out
        await signOut(auth)

        // dispatch logout action
        dispatch({ type: 'LOGOUT' })

        // update state
        if (!isCancelled) {
        setIsPending(false)
        setError(null)
        } 
 
    } catch (err) {
        if (!isCancelled) {
            setError(err.message)
            setIsPending(false)
          }
    } finally {
        setIsPending(false);
    }
  }
    
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending }

};