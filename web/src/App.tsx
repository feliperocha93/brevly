import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Redirect from "./pages/Redirect"
import NotFound from "./pages/NotFound"

export function App() {
  return (
    <main className='bg-gray-200 min-h-screen'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
