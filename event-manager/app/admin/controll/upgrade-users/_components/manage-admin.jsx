'use client'


import { Button } from "@/components/ui/button"
import { db } from "@/firebase/config"  
import { collection, doc, getDocs, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { AdminListItem } from "./admin-list-item"
import { UserListItem } from "./user-list-item" 
import { useAuth } from "@/components/auth-provider"





export const ManageAdmins = () => {

  const { userId } = useAuth()

  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState([])
  const [error, setError] = useState(null)
  
  

  useEffect(() => {
    const fetchUsers = async () => {
      const colRef = collection(db, 'users');
      const querySnapshot = await getDocs(colRef);
      const users = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})); 
      console.log(users)

      const adminUsers = users.filter(user => user.role === 'admin');
      setAdmins(adminUsers);
      const Users = users.filter(user => user.role === 'user');
      setUsers(Users);

      
    };  
  
    fetchUsers();
  }, []);
  
  const handleMakeAdmin = async () => {
    await Promise.all(selected.map(userId => {
      const userDocRef = doc(db, 'users', userId);
      return updateDoc(userDocRef, { role: 'admin' });
    }));
    // Refresh the users and admins list after updating roles
    const updatedUsers = users.map(user => selected.includes(user.id) ? { ...user, role: 'admin' } : user);
    const updatedAdmins = [...admins, ...selected.map(userId => users.find(user => user.id === userId))];
    setUsers(updatedUsers.filter(user => user.role !== 'admin'));
    setAdmins(updatedAdmins);
    setSelected([]); // Clear selection after updating
  }

  const handleSelect = (user) => {
    if (selected.includes(user.id)) {
      setSelected(selected.filter(userId => userId !== user.id));
    } else {
      setSelected([...selected, user.id]);
    }
  }

  const handleRemoveAdmin = async (userId) => {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, { role: 'user' });
    // Remove the admin from the list of admins
    setAdmins(admins.filter(admin => admin.id !== userId));
  }



  
  return (
    <>
    { error && (
      <div  className="flex justify-center mg-10"> 
        <p className="text-red-500 px-10 bg-black-500/5 py-5 roundend-lg">{error}</p>
      </div>
    )
    }
      <div className="flex gap-4">
        <div className="flex-1">
          <p className="mg-2 semibold text-lg"> Admins </p>
          <div className="border rounded-xl min-h-96">
            {
              admins && admins.map(admin => (
                <AdminListItem key={admin.id} onClick={() => handleRemoveAdmin(admin.id)} imageUrl={admin.imageUrl} email={admin.email}/>
              ))
            }
          </div>
              
        </div>
        <div className="flex-1">
          <p className="mg-2 semibold text-lg"> Users </p>
          <div className="border rounded-xl min-h-96">
          {
              users && users.map(user => (
                <UserListItem key={user.id} onClick={() => handleSelect(user)} imageUrl={user.imageUrl} email={user.email} isSelected={selected.includes(user)}/>
              ))
            }
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button disabled={selected.length === 0} onClick={handleMakeAdmin}> Select admin </Button>

      </div>
    </>
  )
}

