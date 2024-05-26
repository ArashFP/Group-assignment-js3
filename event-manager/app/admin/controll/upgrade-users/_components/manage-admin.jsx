'use client'


import { Button } from "@/components/ui/button"
import { db } from "@/firebase/config"  
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

export const ManageAdmins = () => {

  const [admins, setAdmins] = useState([]);
  const [users, setUsers] = useState([])

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
  
  

  return (
    <>
      <div className="flex gap-4">
        <div className="flex-1">
          <p className="mg-2 semibold text-lg"> Admins </p>
          <div className="border rounded-xl min-h-96">
          {
              admins && admins.map(admin => (
                <div key={admin.id}> {admin.firstName} {admin.lastName} {admin.email} </div>
              ))
            }
          </div>
        </div>
        <div className="flex-1">
          <p className="mg-2 semibold text-lg"> Users </p>
          <div className="border rounded-xl min-h-96">
          {
              users && users.map(user => (
                <div key={user.id}> {user.firstName} {user.lastName} {user.email} </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button> Select admin </Button>

      </div>
    </>
  )
}

