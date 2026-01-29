import { useEffect, useRef, useState } from 'react';
import type { VerseGroup } from '../data/verses';

interface VerseSectionProps {
  verseGroup: VerseGroup;
  index: number;
}

const VerseSection = ({ verseGroup, index }: VerseSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '-50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on section position
      const progress = Math.max(0, Math.min(1, 
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculations
  const imageY = (scrollProgress - 0.5) * 100;
  const contentY = (scrollProgress - 0.5) * -30;
  const scale = 1 + Math.sin(scrollProgress * Math.PI) * 0.05;

  return (
    <section
      ref={sectionRef}
      id={`verse-${verseGroup.id}`}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background Image with Parallax */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{
          transform: `translateY(${imageY}px) scale(${scale})`,
          transition: 'transform 0.1s linear',
        }}
      >
        <img
          src={verseGroup.image}
          alt={`Hanuman - Section ${verseGroup.id}`}
          className="w-full h-full object-cover"
          style={{
            filter: 'brightness(0.4) saturate(1.2)',
          }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-divine-blue via-divine-blue/60 to-divine-blue/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-divine-blue/50 via-transparent to-divine-blue/50" />
      </div>

      {/* Content Card */}
      <div 
        className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          transform: `translateY(${contentY}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        <div 
          className={`verse-card rounded-2xl p-6 sm:p-10 lg:p-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
        >
          {/* Section number */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              <span className="font-cinzel text-gold/60 text-sm tracking-widest">
                Section {index + 1} of 10
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            </div>
          </div>

          {/* Verses */}
          <div className="space-y-8">
            {verseGroup.verses.map((verse, verseIndex) => (
              <div
                key={verseIndex}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
                style={{
                  transitionDelay: `${verseIndex * 150 + 200}ms`,
                }}
              >
                {/* Sanskrit Text */}
                <p className="font-sanskrit text-xl sm:text-2xl lg:text-3xl text-gradient-gold leading-relaxed mb-4 whitespace-pre-line">
                  {verse.sanskrit}
                </p>
                
                {/* Hindi Meaning */}
                <p className="font-devanagari text-sm sm:text-base text-cream/70 leading-relaxed pl-4 border-l-2 border-saffron/30">
                  {verse.hindi}
                </p>
              </div>
            ))}
          </div>

          {/* Decorative footer */}
          <div className="mt-10 flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-saffron/40" />
              <div className="w-2 h-2 rounded-full bg-gold/60" />
              <div className="w-2 h-2 rounded-full bg-saffron/40" />
            </div>
          </div>
        </div>
      </div>

      {/* Side glow effects */}
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-64 opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(255, 107, 0, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-64 opacity-30"
        style={{
          background: 'radial-gradient(ellipse, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
    </section>
  );
};

export default VerseSection;
