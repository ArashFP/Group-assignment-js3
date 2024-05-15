"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";


function AdminPage() {
  const [events, setEvents] = useState([]);
  const [isLoading, setLoading] = useState(true);

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
      <h2 className="text-6xl font-bold text-center py-14">Event List</h2>
      <div className="flex flex-col space-y-8">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/admin/events/${event.id}`}
            className="p-6 rounded-lg border-2 shadow-lg cursor-pointer pb flex flex-col gap-4"
          >
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
        ))}
      </div>
    </div>
  );
}

export default AdminPage;
