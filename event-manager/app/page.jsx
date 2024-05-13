'use client'

import { useState } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/config"; 

export default function FirebaseUI() {
  const { getToken } = useAuth();
  const [userData, setUserData] = useState(null);

  const signInWithClerk = async () => {
    console.log("Sign in with clerk");
    
    const googleProvider = new GoogleAuthProvider();
    try {
      // Sign in with Firebase using Google authentication
      const userCredential = await signInWithPopup(auth, googleProvider);
      console.log("User:", userCredential.user);
      setUserData(userCredential.user); // Update user information
    } catch (error) {
      console.error("Error signing in with Firebase:", error);
    }

    // Get token from Clerk for Firebase integration
    const token = await getToken({ template: "integration_firebase" });
    try {
      // Sign in to Firebase with the token from Clerk
      const userCredentials = await signInWithCustomToken(auth, token || "");
      console.log("User:", userCredentials.user);
      setUserData(userCredentials.user); // Update user information
    } catch (error) {
      console.error("Error signing in with Firebase:", error);
    }
  };

  return (
    <>
      <h1 className="text-6xl font-bold flex justify-center py-[160px]">Welcome to Event-Maker</h1>
      <main className="flex justify-center text-center ">
        <SignInButton forceRedirectUrl="/admin" onClick={signInWithClerk} className="w-[200px] h-12 rounded-full font-semibold hover:bg-blue-500 border-2 border-blue-500"/>
      </main>
    </>
  );
}






// 'use client'
// import { db } from '../firebase/config.js'
// import { collection, addDoc } from 'firebase/firestore'
// import React, { useState } from 'react'

// async function addDataToFirestore(name, email, message) {
//   try {
//     const docRef = await addDoc(collection(db, "messages"), {
//       name: name,
//       email: email,
//       message: message
//     });
//     console.log("Document written with ID: ", docRef.id);
//     return true;
//   } catch (error) {
//     console.error("Error adding document: ", error);
//     return false;
//   }
// }


// function LandingPage() {

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Handling submit:', { name, email, message }); 
//     const added = await addDataToFirestore(name, email, message);
//     console.log('Added:', added); 
//     if (added) {
//       setName('');
//       setEmail('');
//       setMessage('');
  
//       alert('Data added to Firestore');
//     } else {
//       alert('Failed to add data. Check the console for errors.');
//     }
//   }

//   return (
//       <main className="flex min-h-screen felx-col items-center p-24 ">
//         <h1
//         className="text-5xl font-bold m-10"> 
//           Add Data to Firestore Database 
//         </h1>
//         <form onSubmit={handleSubmit} className='max-w-md mx-auto p-4 bg-white shadow-md rounded-lg'> 
//         <div className='mb-4'>
//           <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
//           <input type="text" id='name'
//           className='mt-1 p-2 w-full border border-gray-300 rounded-md'
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           />
//         </div>

//         <div className='mb-4'>
//           <label htmlFor='email' className='block text-sm font-medium text-gray-700'>email</label>
//           <input type="text" id='email'
//           className='mt-1 p-2 w-full border border-gray-300 rounded-md'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>

//         <div className='mb-4'>
//           <label htmlFor='message' className='block text-sm font-medium text-gray-700'>message</label>
//           <textarea
//            rows={5}
//            id='message'
//           className='mt-1 p-2 w-full border border-gray-300 rounded-md'
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           ></textarea>
//         </div>
//         <div className='text-center'>
//         <button type='submit'
//         className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
//           Submit
//          </button>
//         </div>
//         </form>
//       </main>
//   )
// }
// export default LandingPage

