'use client';

import { Button } from "@/components/ui/button";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

function LandingPage() {
  const [content, setContent] = useState({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        console.log("Fetching document...");
        const docRef = doc(db, 'landingPageContent', 'SmtSJZhsEtgOrXbR2FDS');
        const docSnap = await getDoc(docRef);
        console.log("Document fetched:", docSnap.exists());
        if (docSnap.exists()) {
          setContent(docSnap.data());
          console.log("Document data:", docSnap.data());
        } else {
          setError('Document does not exist');
        }
      } catch (error) {
        setError('Failed to fetch content');
        console.error("Error fetching document:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (isLoading) {
    return (
      <main className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="h-screen flex items-center justify-center">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="lg:text-6xl font-bold font-mono sm:text-4xl">{content.title}</h1>
      <p className="lg:text-lg sm:text-sm mt-4 text-muted-foreground">{content.description}</p>
      <div className="flex gap-4 mt-20">
        <Button asChild className="bg-transparent text-current w-[180px] h-12 rounded-full font-semibold hover:bg-blue-500 border-2 border-blue-500">
          <Link href="/sign-up">Sign up</Link>
        </Button>
        <Button asChild className="bg-transparent text-current w-[180px] h-12 rounded-full font-semibold hover:bg-blue-500 border-2 border-blue-500">
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    </main>
  );
}

export default LandingPage;
