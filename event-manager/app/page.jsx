'use client';

import { FullscreenLoader } from "@/components/fullscreen-loader";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";


function LandingPage() {

  const getDocumentById = async (collectionName, docId) => {
  const docRef = doc(db, collectionName, docId)
  const docSnap = await getDoc(docRef)

  if(docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    return null
  }
}

const [pageData, setPageData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const data = await getDocumentById('landingPageContent', 'SmtSJZhsEtgOrXbR2FDS')
      setPageData(data)
    }
    getData()
  }, [])

  if(!pageData) return <FullscreenLoader />

  return (
    <main className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="lg:text-6xl font-bold font-mono sm:text-4xl">{pageData.title}</h1>
      <p className="lg:text-lg sm:text-sm mt-4 text-muted-foreground">{pageData.description}</p>
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
