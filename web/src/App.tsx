import { Route, Routes } from "react-router-dom"
import { CustomToaster } from "./components/toast/CustomToaster";
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Redirect from "./pages/Redirect"
import { SpeedInsights } from "@vercel/speed-insights/react"

export function App() {
  return (
    <main className='bg-gray-200 min-h-screen'>
      <CustomToaster />
      <SpeedInsights />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":path" element={<Redirect />} />
        <Route path="/url-not-found" element={<NotFound />} /> {/* Risk of conflict */}
      </Routes>
    </main>
  )
}

export default App
