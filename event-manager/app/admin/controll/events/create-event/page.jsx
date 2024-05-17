import { CreateEventForm } from "./_components/create-event-form"

function CreateEvent() {
  return (
    <div>
        <h2 className="text-6xl font-bold flex justify-center py-14 font-mono">Create Event</h2>
        <CreateEventForm />
    </div>
  )
}
export default CreateEvent