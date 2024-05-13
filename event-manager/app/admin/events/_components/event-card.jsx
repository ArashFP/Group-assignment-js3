import Image from "next/image"
import Link from "next/link"

const EventCard = ({ id, name, price, imageURL}) => {
  return (
    <Link href={`/events/${id}`} className="">
      <div className="h-full aspect-video">
        <Image 
          src={imageURL || "/image-placeholder.png"} 
          alt={name}
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex pr-10 gap-10">
        <p className="text-xl font-semibold">{name}</p>
        <p>{price}</p>
      </div>
    </Link>
  )
}
export default EventCard
