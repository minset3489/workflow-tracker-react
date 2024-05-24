import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// const firebaseConfig = {
//     apiKey: "AIzaSyBgOfrRemQoBobncbjsnMM5Ukzioq14Hag",
//     authDomain: "workflow-tracker-26d81.firebaseapp.com",
//     projectId: "workflow-tracker-26d81",
//     storageBucket: "workflow-tracker-26d81.appspot.com",
//     messagingSenderId: "263451888287",
//     appId: "1:263451888287:web:9587a0db172acf544670aa"
//   };

const firebaseConfig = {
  apiKey: "AIzaSyAHcnLbeH_nJrFMjX6XcyTIm1aJdHL-wQ4",
  authDomain: "workflow-tracker-dba59.firebaseapp.com",
  projectId: "workflow-tracker-dba59",
  storageBucket: "workflow-tracker-dba59.appspot.com",
  messagingSenderId: "233327107376",
  appId: "1:233327107376:web:d280dac9315590812bbcf5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };