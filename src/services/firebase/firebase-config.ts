import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

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
export const auth = getAuth(app)
