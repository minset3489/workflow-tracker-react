import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const useDocument = (collectionName, documentId) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const getDocument = async () => {
      try {
        const documentRef = doc(db, collectionName, documentId);

        unsubscribeRef.current = onSnapshot(documentRef, (snapshot) => {
          if (snapshot.exists()) {
            setDocument({ ...snapshot.data(), id: snapshot.id });
            setError(null);
          } else {
            console.error('Document does not exist');
            setError('Document not found');
          }
        }, (err) => {
          console.error('Error fetching document:', err.message);
          setError(err.message);
        });
      } catch (err) {
        console.error('Error setting up document listener:', err.message);
        setError(err.message);
      }
    };

    getDocument();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [collectionName, documentId]);

  return { document, error };
};

export default useDocument;
