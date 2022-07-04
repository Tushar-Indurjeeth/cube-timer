import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDX_SEfrh_5-FTWKR582z2-CrDTrGBYNfU',
  authDomain: 'cube-timer-8323e.firebaseapp.com',
  projectId: 'cube-timer-8323e',
  storageBucket: 'cube-timer-8323e.appspot.com',
  messagingSenderId: '379683188326',
  appId: '1:379683188326:web:b4e04dd3a5a9dde15d47a7',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore();

const provider = new GoogleAuthProvider();

export { app, auth, provider, db };
