import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

import { isLoggedIn } from "@/hooks/useAuth"

const Layout = () => {
  return (
    <div className="h-screen w-screen bg-neutral-950 text-white">
      <div className="h-screen w-screen">
        <Outlet />
      </div>
    </div>
  )
}

export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
      })
    }
  },
})

export default Layout
