import { Outlet, Navigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";

export default function AuthLayout() {
  const { isAuthenticated } = useUserContext();

  return (
    <div>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <div className="flex flex-col lg:flex-row w-full min-h-screen">
          <section className="flex flex-1 justify-center items-center flex-col py-6 sm:py-10 px-4 w-full lg:w-1/2">
            <Outlet />
          </section>

          <iframe
        src="https://lottie.host/embed/f1bd2f53-840f-4f20-a00b-2e1339df3593/LscoOIXSV9.lottie"

        className='hidden xl:block h-screen w-1/2'
        style={{ border: 'none' }}
        />
      </div>
    )}
    </div>
  );
}