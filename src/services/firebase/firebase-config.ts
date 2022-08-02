import { initializeApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCnDWJQ5C2UHWUL-Ag23d9vjb-G1T-OEUA',
  authDomain: 'instaclone-ba493.firebaseapp.com',
  projectId: 'instaclone-ba493',
  storageBucket: 'instaclone-ba493.appspot.com',
  messagingSenderId: '832953174299',
  appId: '1:832953174299:web:88181062389be2f5bd2bbe'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
connectFirestoreEmulator(db, 'localhost', 4000)
export const auth = getAuth(app)
connectAuthEmulator(auth, 'http://localhost:3000')
