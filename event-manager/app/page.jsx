'use client'

import { Button } from "@/components/ui/button"
import Link from "next/link"


function LandingPage() {
  return (
  <>
      <main className="h-screen flex flex-col items-center justify-center text-center ">
        <h1 className="lg:text-6xl font-bold font-mono sm:text-4xl">Welcome to Event-Maker</h1>
        <p className="lg:text-lg  sm:text-sm  mt-4 text-muted-foreground">Create and join events</p>
          <div className="flex gap-4 mt-20">
            <Button asChild className="bg-transparent text-current w-[180px] h-12 rounded-full font-semibold hover:bg-blue-500 border-2 border-blue-500">
              <Link href="/sign-up" >Sign up</Link>
            </Button>
            <Button asChild className=" bg-transparent text-current w-[180px] h-12 rounded-full font-semibold hover:bg-blue-500 border-2 border-blue-500">
              <Link href="/sign-in" >Sign in</Link>
            </Button>
          </div>
      </main>
   </>
  )
}
export default LandingPage

