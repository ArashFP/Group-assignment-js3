"use client"

import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { app } from '@/firebase/config'; // Import your Firebase configuration

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email,
        firstName,
        lastName,
        role: 'user', // Default role
      });
      // You might want to handle navigation or other state updates here
    } catch (error) {
      console.error('Error signing up:', error);
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

      <input type="text" 
      placeholder='First Name'
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      required
      className="p-2 border border-gray-300 rounded"
      />

      <input type="text"
      placeholder='Last Name'
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      required
      className="p-2 border border-gray-300 rounded"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="p-2 border border-gray-300 rounded"
      />

      <input type="password" 
      placeholder='Confirm Password'
      value={confirmPassword}
      onChange={(e) => setConfirmPassword(e.target.value)}
      required
      className="p-2 border border-gray-300 rounded"
      />

      <button type="submit" className="p-2 bg-blue-500 text-white rounded">Sign Up</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default SignupForm;
