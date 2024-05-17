'use client'

import { cn } from "@/lib/utils"
import { CalendarPlus2, SquarePen, UserPlus } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"


export const Sidebar = () => {

  const pathname =usePathname()

  return (
    <div className="bg-slate-500 border-r flex flex-col h-full">
      <div className="flex-1">
      <Link href="/admin/controll/upgrade-users" className={cn("flex items-center justify-between p-2 hover:bg-slate-50/10 border-r-4 border-transparent",
            pathname.startsWith("/admin/controll/upgrade-users") && "bg-slate-50/5 border-slate-500"
        )}>
            <p className="font-mono">Upgrade Users</p>
            <UserPlus className="size-5"/>
        </Link>
        <Link href="/admin/controll/events/create-event" className={cn("flex items-center justify-between p-2 hover:bg-slate-50/10 border-r-4 border-transparent",
            pathname.startsWith("/admin/controll/events/create-event") && "bg-slate-50/5 border-slate-500"
        )}>
            <p className="font-mono">Create Event</p>
            <CalendarPlus2 className="size-5"/>
        </Link>
        <Link href="/admin/controll/change-landingpage" className={cn("flex items-center justify-between p-2 hover:bg-slate-50/10 border-r-4 border-transparent",
            pathname.startsWith("/admin/controll/change-landingpage") && "bg-slate-50/5 border-slate-500"
        )}>
            <p className="font-mono">Change Landingpage</p>
            <SquarePen className="size-5"/>
        </Link>
        
      </div>
    </div>
  )
}