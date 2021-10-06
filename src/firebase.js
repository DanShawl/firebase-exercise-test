import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyB8wJJk4-e4suF-YG-fVCTmdcAX6L80dZo',

  authDomain: 'fir-test-9d865.firebaseapp.com',

  projectId: 'fir-test-9d865',

  storageBucket: 'fir-test-9d865.appspot.com',

  messagingSenderId: '797285768975',

  appId: '1:797285768975:web:ea6dd742c3679a8bc9287a',
});

// Initialize Firebase
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
export { db, auth };

// const app = initializeApp(firebaseConfig);
