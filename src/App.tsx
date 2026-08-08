import { CustomCursor } from './components/CustomCursor'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'

export default function App() {
  return (
    <div className="min-h-screen bg-[#08080c] text-white antialiased selection:bg-purple-500/30 selection:text-purple-200 overflow-x-hidden relative">
      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Sticky Translucent Navbar */}
      <Navbar />

      {/* Main Hero Section */}
      <main>
        <Hero />
      </main>
    </div>
  )
}
