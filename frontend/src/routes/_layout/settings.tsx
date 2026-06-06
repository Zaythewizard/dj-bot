import { createFileRoute } from "@tanstack/react-router"

const SettingsPlaceholder = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-[120px] w-[360px] items-center justify-center rounded-md border border-white/10 bg-white/5">
        <p className="text-sm uppercase tracking-[0.35em] text-white/70">
          Settings
        </p>
      </div>
    </div>
  )
}

export const Route = createFileRoute("/_layout/settings")({
  component: SettingsPlaceholder,
  head: () => ({
    meta: [
      {
        title: "Settings - FastAPI Template",
      },
    ],
  }),
})
