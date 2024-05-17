'use-client'

import { db } from "@/firebase/config"
import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import EventCard from "./event-card"

const EventList = () => {

  const [eventList, setEventList] = useState([])

  useEffect(() => {
    const q = query(collection(db,'events'))
    const unsub = onSnapshot(q, querySnapshot => {
      const _events = []
      querySnapshot.forEach(doc => {
        _events.push({id: doc.id, ...doc.data()})
      })

      setEventList(_events)
    })

    return () => unsub()
  
  }, [])
  


  return (
    <div className="space-y-2">
      {
        events.map(event => {
          <EventCard key={event.id} imageURL={event.imageURL} id={event.id} price={event.price} />
        })
      }
    </div>
  )
}
export default EventList
