import { addDoc, collection, getDocs } from "firebase/firestore";

import { db } from "@/firebase/config";

// get all events from db
export async function GET(req, res) {
  try {
    const querySnapshot = await getDocs(collection(db, "events"));
    const events = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
    });
  }
}

// add a new event in db
export async function POST(req) {
  try {
    const body = await req.text(); // Get the raw text body

    const data = JSON.parse(body); // Parse the raw text body as JSON

    const docRef = await addDoc(collection(db, "events"), data);
    return new Response(JSON.stringify({ id: docRef.id, ...data }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error adding document:", error);
    return new Response(
      JSON.stringify({ error: "Failed to add events", details: error.message }),
      {
        status: 500,
      }
    );
  }
}
