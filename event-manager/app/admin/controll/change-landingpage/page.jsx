'use client'

import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { db } from '@/firebase/config';


function ControllAdminPage() {


  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, 'landingPageContent', 'SmtSJZhsEtgOrXbR2FDS');
    try {
      await setDoc(docRef, { title, description });
      toast.success('Landingpage updated successfully');
    } catch (err) {
      toast.error('Failed to update landingpage.')
    }
  };


    return (
      // <div>
      // </div>
      <div className="p-4">
      <h2 className="text-6xl font-bold flex justify-center py-14 font-mono">Change Landingpage</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          ></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
      </form>
    </div>
  );
}
  export default ControllAdminPage