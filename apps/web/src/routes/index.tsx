import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: App
})

function App() {
  return <div className="flex h-screen w-full flex-col items-center justify-center">hello</div>
}
