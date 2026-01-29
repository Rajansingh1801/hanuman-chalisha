import { useEffect, useState } from 'react';
import './App.css';
import HeroSection from './sections/HeroSection';
import VerseSection from './sections/VerseSection';
import AartiSection from './sections/AartiSection';
import FloatingParticles from './components/effects/FloatingParticles';
import { verseGroups } from './data/verses';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
      setShowScrollTop(window.scrollY > window.innerHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-divine-blue overflow-x-hidden">
      {/* Global floating particles */}
      <FloatingParticles />

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div 
          className="h-full bg-gradient-to-r from-saffron via-gold to-saffron"
          style={{ 
            width: `${scrollProgress * 100}%`,
            boxShadow: '0 0 10px rgba(255, 107, 0, 0.5)',
          }}
        />
      </div>

      {/* Corner decorations */}
      <div className="fixed top-4 left-4 z-40 hidden lg:block">
        <div className="w-16 h-16 border-l-2 border-t-2 border-gold/20 rounded-tl-lg" />
      </div>
      <div className="fixed top-4 right-4 z-40 hidden lg:block">
        <div className="w-16 h-16 border-r-2 border-t-2 border-gold/20 rounded-tr-lg" />
      </div>
      <div className="fixed bottom-4 left-4 z-40 hidden lg:block">
        <div className="w-16 h-16 border-l-2 border-b-2 border-gold/20 rounded-bl-lg" />
      </div>
      <div className="fixed bottom-4 right-4 z-40 hidden lg:block">
        <div className="w-16 h-16 border-r-2 border-b-2 border-gold/20 rounded-br-lg" />
      </div>

      {/* Main content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Verses Section Container */}
        <div id="verses-section" className="relative">
          {/* Section divider */}
          <div className="relative h-32 flex items-center justify-center">
            <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-saffron/30 to-transparent" />
            <div className="relative z-10 bg-divine-blue px-6">
              <span className="font-cinzel text-gold/60 text-sm tracking-[0.3em]">
                THE SACRED VERSES
              </span>
            </div>
          </div>

          {/* Verse Sections */}
          {verseGroups.map((verseGroup, index) => (
            <VerseSection 
              key={verseGroup.id} 
              verseGroup={verseGroup} 
              index={index}
            />
          ))}
        </div>

        {/* Section divider before Aarti */}
        <div className="relative h-32 flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="relative z-10 bg-divine-blue px-6">
            <span className="font-cinzel text-gold/60 text-sm tracking-[0.3em]">
              AARTI
            </span>
          </div>
        </div>

        {/* Aarti Section */}
        <AartiSection />
      </main>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-saffron/20 border border-saffron/40 
                   flex items-center justify-center text-gold hover:bg-saffron/30 hover:border-gold/60
                   transition-all duration-500 ${
                     showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                   }`}
        aria-label="Scroll to top"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6"/>
        </svg>
      </button>

      {/* Background ambient glow */}
      <div 
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background: `radial-gradient(ellipse at 50% ${scrollProgress * 100}%, rgba(255, 107, 0, 0.05) 0%, transparent 50%)`,
        }}
      />
    </div>
  );
}

export default App;
