import { CustomToaster } from "@/components/toast/CustomToaster";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Redirect from "@/pages/Redirect";
import { Theme } from "@radix-ui/themes";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Route, Routes } from "react-router-dom";

export function App() {
  return (
    <Theme>
      <main className='bg-gray-200 min-h-screen'>
        <CustomToaster />
        <SpeedInsights />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path=":path" element={<Redirect />} />
          <Route path="/url-not-found" element={<NotFound />} />
        </Routes>
      </main>
    </Theme>
  )
}

export default App
