import { deleteDoc, doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase/config";

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
