'use client'

import { useEffect, useState } from 'react';
import { doc, getDocs, collection, getDoc } from 'firebase/firestore';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { db } from '@/firebase/config';
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DetailEventPage({ params }) {
  const [event, setEvent] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookedUsersEmails, setBookedUsersEmails] = useState([]);

  useEffect(() => {
    const fetchEventData = async () => {
      const eventDoc = doc(db, 'events', params.id);
      const eventSnapshot = await getDoc(eventDoc);
      if (eventSnapshot.exists()) {
        console.log("Event data:", eventSnapshot.data());
        setEvent(eventSnapshot.data());
      } else {
        console.log("No such event!");
      }
    };

    const fetchUsersData = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("Users data:", usersData);
      setUsers(usersData);
    };

    const fetchAllData = async () => {
      await fetchEventData();
      await fetchUsersData();
    };

    fetchAllData();
  }, [params.id]);

  useEffect(() => {
    const fetchBookedUsersEmails = () => {
      if (event && event.users && users.length > 0) {
        console.log("Event users:", event.users);
        const emails = users
          .filter(user => {
            const match = event.users.includes(user.id) || event.users.includes(user.uid);
            console.log(`Checking user: ${user.id} (${user.uid}), match: ${match}`);
            return match;
          })
          .map(user => user.email);
        console.log("Booked users' emails:", emails);
        setBookedUsersEmails(emails);
      }
    };

    fetchBookedUsersEmails();
  }, [event, users]);

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="bg-slate-800 px-5 py-5 rounded-2xl w-1/3 flex flex-col">
        <h1 className="text-4xl text-center mb-8 ">{event?.eventName}</h1>
        <p className="mb-1">Date: {event?.eventDate?.toDate().toLocaleDateString('en-GB')}</p>
        <p className="mb-1">Description: {event?.eventDescription}</p>
        <p className="mb-1">Location: {event?.eventLocation}</p>
        <p className="mb-1">Price: {event?.eventPrice}</p>
        <p className="mb-1">Total Tickets: {event?.eventQuantity}</p>
        <p className="mb-5">Tickets Remaining: {event?.availableTickets}</p>
        <img src={event?.imageURL} alt={event?.eventName} className="rounded-3xl w-full object-cover mx-auto max-w-52" />
        <p className='font-semibold pt-2 pb-2'>People booked:</p>
        <ScrollArea>
          <ul>
            {bookedUsersEmails.length > 0 ? (
              bookedUsersEmails.map((email, index) => (
                <li key={index}>{email}</li>
              ))
            ) : (
              <li>No booked users found</li>
            )}
          </ul>
        </ScrollArea>
        <Link href={`/admin/controll/events/${params.id}/EditEvent`} as={`/admin/controll/events/${params.id}/EditEvent`}>
          <Button
            className="w-full mt-5 bg-slate-100/50 transform transition-transform duration-200 hover:scale-105 active:bg-green-500">
            Edit Event
          </Button>
        </Link>
      </div>
    </div>
  )
}
