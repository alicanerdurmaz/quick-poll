import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// var firebaseConfig = {
//   apiKey: FIREBASE_CONFIG.API_KEY,
//   authDomain: FIREBASE_CONFIG.AUTH_DOMAIN,
//   databaseURL: FIREBASE_CONFIG.DATABASE_URL,
//   projectId: FIREBASE_CONFIG.PROJECT_ID,
//   storageBucket: FIREBASE_CONFIG.STORAGE_BUCKET,
//   messagingSenderId: FIREBASE_CONFIG.MESSAGING_SENDER_ID,
//   appId: FIREBASE_CONFIG.ID,
//   measurementId: FIREBASE_CONFIG.MEASUREMENT_ID,
// }
var firebaseConfig = {
  apiKey: 'AIzaSyBzh0QqM3wuDhQgOvCqB-KTTQ9nhWVdMt0',
  authDomain: 'testproject-506b0.firebaseapp.com',
  databaseURL: 'https://testproject-506b0.firebaseio.com',
  projectId: 'testproject-506b0',
  storageBucket: 'testproject-506b0.appspot.com',
  messagingSenderId: '145239376301',
  appId: '1:145239376301:web:530039b8ad433bcbd26124',
  measurementId: 'G-8JDWRXDJD8',
}
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const auth = firebase.auth()
export const fs = firebase.firestore
// export const googleProvider = new firebase.auth.GoogleAuthProvider()
