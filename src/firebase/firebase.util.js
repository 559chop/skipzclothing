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

firebase.initializeApp(firebaseConfig)

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  //uses userAuth to query for a document reference object in firestore
  const userRef = firestore.doc(`users/${userAuth.uid}`)

  //get the snapshot object with .get
  const snapshot = await userRef.get()

  //if it doesn't exist , creates a new user with .set()
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

//util to add data to firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey)

  //groups all of our alls together into a batch and fire it whenever we're done adding our calls
  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollections = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

//export .auth() method from firebase
export const auth = firebase.auth()

export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase

// addCollectionAndDocuments(
//         'collections',
//         CollectionsForPreview.map(({ title, items }) => ({ title, items }))
//       )
