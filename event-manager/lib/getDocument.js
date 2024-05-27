import { db } from "@/firebase/config";
import { collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";


export default async function getDocument(collectionName, docId) {
  const docSnap = await getDoc(doc(db, collectionName, docId))

  if(!docSnap.exists()) {
    return { error: 'Document does not exist' }
  }

  return { id: docSnap.id, ...docSnap.data() }
} 

export const addDocument = async (collectionName, data, id = null) => {
  let docRef

  if(id) 
    docRef = doc(db, collectionName, id)
  else 
    docRef = doc(db, collectionName)

  await setDoc(docRef, data)
  return docRef
}

export const removeDocument = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId)

  await deleteDoc(docRef)
}