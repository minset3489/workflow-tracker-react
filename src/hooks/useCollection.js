import { useEffect, useState, useRef } from "react";
import { db } from "../firebase/config";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";

const useCollection = (collectionName, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  const queryRef = useRef(_query).current;
  const orderByRef = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, collectionName);

    if (queryRef && orderByRef) {
      ref = query(ref, where(...queryRef), orderBy(...orderByRef));
    } else if (queryRef) {
      ref = query(ref, where(...queryRef));
    } else if (orderByRef) {
      ref = query(ref, orderBy(...orderByRef));
    }

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      let results = [];
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id });
      });

      // update state
      setDocuments(results);
      setError(null);
    }, (error) => {
      console.log(error);
      setError('Could not fetch the data');
    });

    // unsubscribe on unmount
    return () => unsubscribe();

  }, [collectionName, queryRef, orderByRef]);

  return { documents, error };
};

export default useCollection;