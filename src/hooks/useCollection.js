import { useState, useEffect, useRef } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const useCollection = (collectionName, options = {}) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const unsubscribeRef = useRef(null);

  useEffect(() => {
    const getCollection = async () => {
      try {
        let colRef = collection(db, collectionName);

        // Add where clause based on conditions
        if (options.conditions) {
          options.conditions.forEach(condition => {
            const { field, operator, value } = condition;
            colRef = query(colRef, where(field, operator, value));
          });
        }

        // Add sorting options based on the selected field and direction
        if (options.field && options.direction) {
          colRef = query(colRef, orderBy(options.field, options.direction));
        }

        unsubscribeRef.current = onSnapshot(colRef, (snapshot) => {
          let results = [];
          snapshot.docs.forEach((doc) => {
            results.push({ ...doc.data(), id: doc.id });
          });

          setDocuments(results);
          setError(null);
        }, (err) => {
          console.error('Error fetching documents:', err.message);
          setError(err.message);
        });
      } catch (err) {
        console.error('Error setting up collection listener:', err.message);
        setError(err.message);
      }
    };

    getCollection();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, [collectionName, options]);

  return { documents, error };
};

export default useCollection;
