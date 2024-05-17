import Image from "next/image";
import Link from "next/link";
import { db } from "@/firebase/config";

const EventCard = ({ id, name, price, imageURL }) => {
  
  return (
    <div className="relative">
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
    </div>
  );
};
export default EventCard;
