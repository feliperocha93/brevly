import { Route, Routes } from "react-router-dom"
import { CustomToaster } from "./components/toast/CustomToaster";
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Redirect from "./pages/Redirect"

export function App() {
  return (
    <main className='bg-gray-200 min-h-screen'>
      <CustomToaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/redirect" element={<Redirect />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </main>
  )
}

export default App
