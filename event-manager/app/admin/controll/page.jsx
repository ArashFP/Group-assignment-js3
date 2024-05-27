"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { auth, db } from "@/firebase/config";
import { doc, deleteDoc, collection, getDoc, getDocs } from "firebase/firestore";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


function ControllAdminPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);


  
  
  useEffect(() => {
    const fetchUsers = async () => {
      const colRef = collection(db, 'users');
      const querySnapshot = await getDocs(colRef);
      const users = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
  
      const currentUser = auth.currentUser;
      if (currentUser) {
        const currentUserData = users.find(user => user.uid === currentUser.uid);
        if (currentUserData && currentUserData.role === 'admin') {
          console.log('Current user is an admin');
        } else {
          console.log('Current user is not an admin');
          router.push('/')
        }
      } else {
        console.log('No user is signed in.');
      }
    };
  
    fetchUsers();
  }, []);
  

  const deleteEvent = async (id, name) => {
    try {
      await deleteDoc(doc(db, "events", id));
      toast.success(`Event "${name}" deleted successfully`);
      fetchEvents();
    } catch (error) {
      toast.error(`Error deleting event "${name}": ${error.message}`);
      console.error("Error deleting event: ", error);
    }
  };

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/events");

      const eventData = response.data.map((event) => {
        return {
          ...event,
          eventDate: new Date(event.eventDate?.seconds * 1000).toLocaleString(),
        };
      });
      setEvents(eventData);
      setLoading(false);
      console.log(eventData);
    } catch (err) {
      console.log("Error", err);
      setLoading(false);
      toast.error("Something went wrong!!");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-6xl font-bold flex justify-center py-14 font-mono">Admin Page</h2>

      <h2 className="text-4xl font-bold text-center font-mono py-14">
        Event List
      </h2>
      <div className="grid grid-cols-3 gap-10">
        {events.map((event) => (
          <div key={event.id}>
            <Link
              key={event.id}
              href={`/admin/controll/events/${event.id}`}
              className="p-6 rounded-lg border-2 shadow-lg cursor-pointer pb flex flex-col gap-4"
            >
              <h1 className=" text-center uppercase font-bold text-2xl">{event.eventName}</h1>
              <img className="object-cover max-h-40 max-w-60 rounded mx-auto"
                src={event.imageURL}
                alt={event.eventName}
              />
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="font-semibold">Date:</span> {event.eventDate}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="font-semibold">Price:</span>{event.eventPrice}
              </p>

              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span className="font-semibold">Location:</span>{event.eventLocation}
              </p>
              <div className="flex justify-center items-center p-4px mt-4 mb-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteEvent(event.id, event.eventName);
                  }}
                  className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete Event
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ControllAdminPage;
