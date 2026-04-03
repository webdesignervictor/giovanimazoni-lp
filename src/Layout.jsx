import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import CustomCursor from './components/CustomCursor'
import TopBarLoader from './components/TopBarLoader'
import LenisProvider from './components/LenisProvider'

export default function Layout() {
  // The scroll reset is now handled inside LenisProvider
  return (
    <LenisProvider>
      <div className="min-h-screen flex flex-col bg-ink">
        <TopBarLoader />
        <CustomCursor />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </LenisProvider>
  )
}
