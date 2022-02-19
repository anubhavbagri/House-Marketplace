import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBW5u-RH9aFIjytlcuc6tKXNxfYSV6Kyz8',
  authDomain: 'the-house-marketplace.firebaseapp.com',
  projectId: 'the-house-marketplace',
  storageBucket: 'the-house-marketplace.appspot.com',
  messagingSenderId: '627990516726',
  appId: '1:627990516726:web:71d2ca452ed1ca83692dd7',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
