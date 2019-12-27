import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAbZRajh3WwkdHdWhjCtjI_UZv2I9mWBpc',
  authDomain: 'skipzclothing-4d887.firebaseapp.com',
  databaseURL: 'https://skipzclothing-4d887.firebaseio.com',
  projectId: 'skipzclothing-4d887',
  storageBucket: 'skipzclothing-4d887.appspot.com',
  messagingSenderId: '911857072663',
  appId: '1:911857072663:web:f23385bc0272fa8e8dfa52',
  measurementId: 'G-RPD5NTS925'
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapshot = await userRef.get()

  console.log(snapshot)

  if (!snapshot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(firebaseConfig)

//export .auth() method from firebase
export const auth = firebase.auth()

export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
