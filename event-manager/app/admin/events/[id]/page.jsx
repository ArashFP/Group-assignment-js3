"use client"
import { Button } from "@/components/ui/button";
import getDocument from "@/lib/getDocument";
import { auth, db } from "@/firebase/config";

import axios from "axios";
import Link from "next/link";

export default async function DetailEventPage({ params }) {
  const event = await getDocument("events", params.id);

  // let isUserAlreadyRegistered = event?.users?.includes( auth.currentUser?.uid);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}/${month}/${year} Time: ${hours}:${minutes}`;
  };
  

  // const handleEvent = async () => {
  //   let userBody = {
  //     user: auth.currentUser.uid,
  //   };
  //   if (isUserAlreadyRegistered) {
  //     userBody.cancel = true;
  //   }
  //   try {
  //    let data= await axios.patch(`/api/events/${params.id}`, userBody);
  //    alert(data.data.message)
    
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="bg-slate-800 px-5 py-5 rounded-2xl w-1/3 flex flex-col ">
        <h1 className="text-4xl text-center mb-8 ">{event?.eventName}</h1>
        <p className="mb-1">Date: {formatDate(event.eventDate)}</p>
        <p className="mb-1">Description: {event?.eventDescription}</p>
        <p className="mb-1">Location: {event?.eventLocation}</p>
        <p className="mb-1">Price: {event?.eventPrice}</p>
        <p className="mb-1">Total Tickets: {event?.eventQuantity}</p>
        <p className="mb-5">Tickets Remaining: {event?.availableTickets}</p>
        <img
          src={event?.imageURL}
          alt={event?.eventName}
          className="rounded-3xl w-full object-cover mx-auto max-w-52"
        />

        {/* <Button
          onClick={handleEvent}
          className="w-full mt-5 bg-slate-100/50 transform transition-transform duration-200 hover:scale-105 active:bg-green-500"
        >
          {isUserAlreadyRegistered ? "Cancel Event" : "Book Event"}
        </Button> */}
      </div>
    </div>
  );
}
