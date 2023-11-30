import SideBar from "./components/sidebar"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex flex-col md:flex-row container my-20"
    >
      <SideBar />
      {children}
    </div>
  )
}

export default AdminLayout