import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'
import Layout from './Layout'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Servicos from './pages/Servicos'
import Sobre from './pages/Sobre'
import Contato from './pages/Contato'
import Gallery from './pages/Gallery'

function AppContent() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/"          element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/servicos"  element={<Servicos />} />
          <Route path="/sobre"     element={<Sobre />} />
          <Route path="/contato"   element={<Contato />} />
          {/* MVP Phase 2: Client Gallery */}
          <Route path="/galeria/:id" element={<Gallery />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
