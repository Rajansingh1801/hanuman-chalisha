import { useEffect, useRef, useState } from 'react';
import { Share2, Volume2, VolumeX } from 'lucide-react';
import { aartiText, doha } from '../data/verses';

const AartiSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'Hanuman Chalisa',
      text: 'Read the divine Hanuman Chalisa - Forty verses of devotion',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowShareToast(true);
        setTimeout(() => setShowShareToast(false), 3000);
      }
    } catch (err) {
      console.log('Share cancelled');
    }
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      ref={sectionRef}
      id="aarti-section"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden py-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-divine-blue via-divine-blue/95 to-divine-blue" />
      
      {/* Radial glow */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(255, 107, 0, 0.15) 0%, transparent 60%)',
        }}
      />

      {/* Floating lotus petals decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-particle-float"
            style={{
              width: '30px',
              height: '30px',
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
              borderRadius: '50%',
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.5}s`,
              animationDuration: `${8 + i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Diya Image */}
        <div 
          className={`flex justify-center mb-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <div className="relative">
            {/* Glow behind diya */}
            <div 
              className="absolute inset-0 animate-glow-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(255, 107, 0, 0.4) 0%, transparent 70%)',
                transform: 'scale(2)',
                filter: 'blur(30px)',
              }}
            />
            
            {/* Rotating container */}
            <div className="relative animate-rotate-slow" style={{ animationDuration: '60s' }}>
              <img
                src="/images/aarti-diya.png"
                alt="Aarti Diya"
                className="w-32 h-32 sm:w-40 sm:h-40 object-contain"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(255, 107, 0, 0.6))',
                }}
              />
            </div>
            
            {/* Flame flicker effect */}
            <div 
              className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-16 animate-flame-flicker"
              style={{
                background: 'linear-gradient(to top, rgba(255, 107, 0, 0.8), rgba(255, 215, 0, 0.4), transparent)',
                filter: 'blur(8px)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
              }}
            />
          </div>
        </div>

        {/* Aarti Title */}
        <div 
          className={`text-center mb-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <h2 className="font-sanskrit text-3xl sm:text-4xl lg:text-5xl text-gradient-saffron mb-2 text-shadow-glow">
            {aartiText.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
            <span className="font-cinzel text-gold/60 text-xs tracking-widest">AARTI</span>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </div>
        </div>

        {/* Aarti Verses */}
        <div 
          className={`verse-card rounded-2xl p-6 sm:p-8 lg:p-10 mb-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
            {aartiText.verses.map((verse, index) => (
              <p
                key={index}
                className={`font-sanskrit text-lg sm:text-xl text-gold/90 leading-relaxed text-center whitespace-pre-line transition-all duration-500 ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: `${500 + index * 100}ms` }}
              >
                {verse}
              </p>
            ))}
          </div>
        </div>

        {/* Doha */}
        <div 
          className={`text-center mb-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="inline-block verse-card rounded-xl p-6">
            <p className="font-sanskrit text-xl sm:text-2xl text-gradient-gold mb-3 whitespace-pre-line">
              {doha.first.sanskrit}
            </p>
            <p className="font-devanagari text-sm text-cream/60">
              {doha.first.hindi}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="group flex items-center gap-3 px-8 py-4 btn-divine rounded-full font-cinzel text-sm tracking-wider"
          >
            <Share2 className="w-5 h-5" />
            <span>Share Blessings</span>
          </button>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className="flex items-center gap-3 px-6 py-4 bg-divine-blue/80 border border-saffron/30 rounded-full font-cinzel text-sm text-cream/80 hover:text-gold hover:border-gold/50 transition-all duration-300"
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-5 h-5 text-saffron" />
                <span>Music Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-5 h-5" />
                <span>Enable Music</span>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
            <span className="text-gold/40 text-2xl">ॐ</span>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </div>
          <p className="font-cinzel text-cream/40 text-xs tracking-widest">
            Jai Shri Ram • Jai Hanuman
          </p>
        </div>
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-divine-blue/90 border border-gold/30 text-gold px-6 py-3 rounded-full font-cinzel text-sm animate-fade-in-up">
            Link copied to clipboard!
          </div>
        </div>
      )}
    </section>
  );
};

export default AartiSection;
