'use client'

import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

const Header = () => {
  return (
    <nav>
    <ul className="flex justify-between items-center bg-blue-500 py-8 px-4">
        <Link href="/" className="font-semibold text-white ">Event-Maker</Link>
        <div className="flex gap-4 items-center  ">
        <li className="flex ">
            <Link className="text-white px-4 font-semibold hover:text-blue-800" href="/admin">Event List</Link>
            <Link  className="text-white px-4 font-semibold hover:text-blue-800" href="/admin/create-event">Create Event</Link>
            <SignedOut>
              <SignInButton className="text-white px-4 font-semibold hover:text-blue-800"/>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/"/>
            </SignedIn>
        </li>
            <ModeToggle className="" />
        </div>
    </ul>
</nav>
  )
}
export default Header