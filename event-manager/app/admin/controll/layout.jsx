import { Sidebar } from "./_components/sidebar"

function ControllLayout({children}) {
  return (
    <div className="h-screen grid grid-cols-[250px_1fr]">
        <Sidebar />
        {children}
    </div>
  )
}
export default ControllLayout