import { storage } from "@/firebase/config";
import { updateDocument } from "@/lib/getDocument"
import { updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { useRouter } from "next/navigation"
import { useState } from "react"

const EditEventForm = ({ event: oldEvent}) => {

  const router = useRouter()
  const [formError, setFormError] = useState()

  const date = new Date(oldEvent.eventDate.seconds * 1000);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  const dateString = `${year}-${month}-${day}`;
  const [formData, setFormData] = useState({
      eventName: oldEvent.eventName,
      eventDescription: oldEvent.eventDescription,
      eventLocation: oldEvent.eventLocation,
      eventDate: oldEvent.eventDate,
      eventPrice: oldEvent.eventPrice,
      eventQuantity: oldEvent.eventQuantity,
      imageURL: oldEvent.imageURL
  })

  const [selectedImage, setSelectedImage] = useState(oldEvent.imageURL)
  const [imageError, setImageError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    console.log(formData)
    if(!formData.eventName || !formData.eventDescription || !formData.eventLocation || !formData.eventDate || !formData.eventPrice || !formData.eventQuantity) {
      setFormError('Please fill in all fields')
      setTimeout(() => { setFormError(null) }, 4000)
      return
    }

  console.log('Form Data before submission:', formData);

  if(oldEvent.imageURL !== selectedImage) {

    if(oldEvent.imageRef) {
      const fileRef = ref(storage, `events/${oldEvent.id}/${oldEvent.imageRef}`)
      await deleteObject(fileRef)
    } else {
      console.log('No imageRef found for oldEvent');
    }

    const reader = new FileReader()
    reader.onabort = () => setFormError('file reading was aborted')
    reader.onerror = () => setFormError('file reading has failed')
    
    reader.onload = async () => {
        await uploadFile(selectedImage)
    }

    reader.readAsArrayBuffer(selectedImage)
  } else {
      const res = await updateDocument('events', oldEvent.id, {...formData, attendees: oldEvent.attendees || []})
      router.push('/admin/controll')
    }
  }

    const uploadFile = async (file) => {
      try {
        const fileRef = ref(storage, `events/${oldEvent.id}/${file.name}`)

        const result = await uploadBytes(fileRef, file)
        if(!result) return
        
        const downloadUrl = await getDownloadURL(fileRef)
        

        await updateDocument('events', oldEvent.id, {...formData, attendees: oldEvent.attendees || [], imageURL: downloadUrl, imageRef: file.name })
        
        router.push('/admin/controll')
        console.log('upload file success:', downloadUrl)
    } catch (err) {
      console.log(err.message)
      setFormError('Failed to upload image')
    }
  }   
  const onChange = (e) => {
    setFormData(data => ({
      ...data,
      [e.target.id]: e.target.value
    }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="w-full">
          <label htmlFor="eventName">
            Name:
            <input id="eventName"type="text" value={formData.eventName} onChange={onChange} className="w-full" />
          </label>
        </div>
        <div className="w-full">
          <label htmlFor="eventDescription">
            Description:
            <input id="eventDescription" type="text" value={formData.eventDescription} onChange={onChange} className="w-full" />
          </label>
        </div>
        <div className="w-full">
          <label htmlFor="eventLocation">
            Location:
            <input id="eventLocation" type="text" value={formData.eventLocation} onChange={onChange} className="w-full" />
          </label>
        </div>
        <div className="w-full">
          <label htmlFor="eventDate">
            Date:
            <input id="eventDate" type="date" value={dateString} onChange={onChange} className="w-full" />
          </label>
        </div>
        <div className="w-full">
          <label htmlFor="eventPrice">
            Price:
            <input id="eventPrice" type="number" value={formData.eventPrice} onChange={onChange} className="w-full" />
          </label>
        </div>
        <div className="w-full">
          <label htmlFor="eventQuantity">
            Quantity:
            <input id="eventQuantity" type="number" value={formData.eventQuantity} onChange={onChange} className="w-full" />
          </label>
        </div>
        <div className="w-full">
          <label>
            Image:
            <input type="file" onChange={e => {
              console.log(e.target.files)
              setSelectedImage(e.target.files[0])
            }} className="w-full" />
          </label>
        </div>
        <input type="submit" value="Submit" />
      </form>
      {formError && <p>{formError}</p>}
    </div>
  )
}
export default EditEventForm;