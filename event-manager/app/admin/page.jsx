"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { db } from "@/firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

function AdminPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const deleteEvent = async (id) => {
    try {
      await deleteDoc(doc(db, "events", id));
      console.log(`Event with id ${id} deleted successfully`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event: ', error);
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
      alert("Something goes wrong!!");
    }
  };


  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-6xl font-bold text-center font-mono py-14">
        Event List
      </h2>
      <div className="grid grid-cols-3 gap-10">
        {events.map((event) => (
            <div key={event.id}>

            <Link
              key={event.id}
              href={`/admin/events/${event.id}`}
              className="p-6 rounded-lg border-2 shadow-lg cursor-pointer pb flex flex-col gap-4"
            >
              <img
                src={event.imageURL}
                alt={event.eventName}
                className="object-cover max-h-52 max-w-60 rounded"
              />
              <h1 className="font-bold text-2xl">{event.eventName}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span>{event.eventDate}</span>
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <span>{event.eventPrice}</span>
              </p>

              <p className="text-sm text-muted-foreground flex items-center gap-2">
                {event.eventLocation}
              </p>
            </Link>
              
            <button
              onClick={ () => deleteEvent(event.id)}
              className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
