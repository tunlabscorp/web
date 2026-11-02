// Copyright (c) Tunlabs Corp. All rights reserved.

import { Navbar } from './components/Navbar'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-svh bg-white font-sans dark:bg-slate-950">
      <Navbar />
      <ScrollProgress />
      <main>
        <Hero />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
