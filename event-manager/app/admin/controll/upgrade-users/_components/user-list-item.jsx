import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Trash2 } from "lucide-react"


export const UserListItem = ({email, imageUrl, onClick, isSelected}) => {
  return (
    <div onClick={onClick} className={cn("flex items-center justify-between p-2 hover: bg-slate-500/10 cursor-pointer",
      isSelected && "hover: bg-slate-500/55"
    )}>
      <div className="flex items-center gap-4">
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/shadcn.png"/>
        </Avatar>
        <p>{email}</p>  
      </div>
    </div>
  )
} 