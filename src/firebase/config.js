import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

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