// Home page — LP otimizada para conversão
import PageTransition from '../components/PageTransition'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'

import Reveal from '../components/Reveal'

import Marquee from '../components/Marquee'

const marqueeItems = ['Fotografia', 'Wedding', 'Filmaker', 'Events', 'Corporate', 'Gastronomy']

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <Reveal width="100%"><About /></Reveal>
      <Reveal width="100%"><Services /></Reveal>
      <Marquee items={marqueeItems} speed={40} />
      <Reveal width="100%"><Portfolio preview /></Reveal>
      <Reveal width="100%"><Testimonials /></Reveal>
      <Reveal width="100%"><FAQ /></Reveal>
      <Reveal width="100%"><Contact /></Reveal>
    </PageTransition>
  )
}
