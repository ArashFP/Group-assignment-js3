'use client'

import { getDocumentById } from "@/lib/getDocument"
import { useEffect, useState } from "react"
import EditEventForm from "./_component/edit-event-form"

export default function EditEventPage({ params }) {

  const [event, setEvent] = useState(null)

  useEffect (() => {
    const getEvent = async () => {
      const event = await getDocumentById('events', params.id)
      setEvent(event)
    }
    getEvent()
  } , [])

  const renderEventDate = (eventDate) => {
    if (eventDate && eventDate.seconds) {
      return new Date(eventDate.seconds * 1000).toLocaleDateString('en-GB');
    }
    return new Date(eventDate).toLocaleDateString('en-GB');
  };

  if (!event) return null 

  return (
    <div className="flex h-screen justify-start items-start m-10 gap-10">
      <div className="bg-slate-800 px-5 py-5 rounded-2xl w-1/3 flex flex-col">
        <h1  className="text-4xl text-center mb-8 ">{event?.eventName}</h1>
        <p className="mb-1">Date: {event?.eventDate ? renderEventDate(event.eventDate) : 'Invalid Date'}</p>
        <p className="mb-1">Description: {event?.eventDescription}</p>
        <p className="mb-1">Location: {event?.eventLocation}</p>
        <p className="mb-1">Price: {event?.eventPrice}</p>
        <p className="mb-5">Tickets remaining: {event?.eventQuantity}</p>
        <img src={event?.imageURL} alt={event?.eventName} className="rounded-3xl w-full object-cover mx-auto max-w-52"/>
      </div>
      <div className="bg-slate-800 px-5 py-5 rounded-2xl w-full flex flex-col">
        <EditEventForm event={event}/>
      </div>
    </div>
  )
}