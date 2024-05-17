import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBgOfrRemQoBobncbjsnMM5Ukzioq14Hag",
    authDomain: "workflow-tracker-26d81.firebaseapp.com",
    projectId: "workflow-tracker-26d81",
    storageBucket: "workflow-tracker-26d81.appspot.com",
    messagingSenderId: "263451888287",
    appId: "1:263451888287:web:9587a0db172acf544670aa"
  };

// init firebase
initializeApp(firebaseConfig)

// init services
const db = getFirestore()
const auth = getAuth()

export { db, auth }