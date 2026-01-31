import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <Outlet />
    </div>
  )
}

export default RootLayout