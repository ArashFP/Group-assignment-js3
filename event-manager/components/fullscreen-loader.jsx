import { Loader2 } from "lucide-react"

export const FullscreenLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader2 className="size-10 stroke-[3] animate-spin" />
    </div>
  )
}