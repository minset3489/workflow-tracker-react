import { useEffect, useState } from "react";
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export const useDocument = (collectionName, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, collectionName, id), (snapshot) => {
      if (snapshot.exists()) {
        setDocument({ ...snapshot.data(), id: snapshot.id });
        setError(null);
      } else {
        setError('No such document exists');
      }
    }, (err) => {
      console.error('Error fetching document: ', err);
      setError('Failed to get document');
    });

    return () => unsub();
  }, [collectionName, id]);

  return { document, error };
};
