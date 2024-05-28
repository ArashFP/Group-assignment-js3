import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "@/firebase/config";
import { message } from "antd";

export async function GET(req, res) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Assuming the id is the last segment in the path
  try {
    const event = await getDoc(doc(db, "events", id));

    if (event.exists()) {
      return new Response(JSON.stringify({ id: event.id, ...event.data() }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ message: "Event not found" }), {
        status: 404,
      });
    }
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch event. Server Error" }),
      {
        status: 500,
      }
    );
  }
}

// delete event
export async function DELETE(req, res) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Assuming the id is the last segment in the path

  try {
    const event = await deleteDoc(doc(db, "events", id));
    return new Response(JSON.stringify({ message: "Deleted Successfully!!" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to delete event" }), {
      status: 500,
    });
  }
}

export async function PATCH(req, res) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Assuming the id is the last segment in the path
  const body = await req.json();
  console.log(id);
  /*
  //// when user is coming in the body that means he is tryig to register an event
  {
    user:"^user id"
  }
  // when use is trying to cancel and  regsiterst   fo the event 

  {
    user:"user id",
    cancel:true	
  }
  //if someone is tryingto just updatethe event 
  {`
    eventName: z.string().min(2).max(50),
  }
  */

  try {
    const currenteventDoc = await getDoc(doc(db, "events", id));
    if (currenteventDoc.exists() && body.user) {
      const currentevent = currenteventDoc.data();

      if (!currentevent.users) {
        currentevent.users = [];
      }
      if (body.cancel) {
        const users = currentevent.users.filter((user) => user !== body.user);
        const event = await updateDoc(doc(db, "events", id), {
          users,
          availableTickets:currentevent.availableTickets+1
        });
        return new Response(
          JSON.stringify({ message: "event cancelation done" }),
          {
            status: 200,
          }
        );
      }
      if (currentevent.eventQuantity == currentevent.users.length) {
        return new Response(JSON.stringify({ message: "Event is full" }), {
          status: 200,
        });
      } else {
        let isUserAlreadyRegistered = currentevent.users.includes(body.user);
        if (isUserAlreadyRegistered) {
          return new Response(
            JSON.stringify({ message: "User already registered" }),
            {
              status: 200,
            }
          );
        }
        const event = await updateDoc(doc(db, "events", id), {
          users: [...currentevent.users, body.user],
          availableTickets:currentevent.availableTickets-1
        });
        return new Response(
          JSON.stringify({ message: "event registeration done" }),
          {
            status: 200,
          }
        );
      }
    }
    const event = await updateDoc(doc(db, "events", id), body);
    return new Response(JSON.stringify({ message: "!Upodate  event done!" }), {
      status: 200,
    });
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "Failed to delupdateete event",
        message: err.message,
      }),
      {
        status: 500,
      }
    );
  }
}
