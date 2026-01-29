import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      
      setMousePosition({ x: x * 15, y: y * 15 });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const scrollToVerses = () => {
    const versesSection = document.getElementById('verses-section');
    if (versesSection) {
      versesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-divine-blue via-divine-blue/95 to-divine-blue" />
      
      {/* Radial glow effect */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, rgba(255, 107, 0, 0.2) 0%, transparent 60%)`
        }}
      />
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 animate-glow-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 107, 0, 0.4) 0%, transparent 70%)',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 animate-glow-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
            bottom: '20%',
            right: '10%',
            filter: 'blur(50px)',
            animationDelay: '1.5s',
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col items-center text-center">
          
          {/* Title - appears first */}
          <div 
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="font-cinzel text-gold/80 text-lg sm:text-xl tracking-[0.3em] mb-4">
              श्री हनुमान चालीसा
            </h2>
          </div>

          {/* Hanuman Image with 3D tilt */}
          <div 
            ref={imageRef}
            className={`relative mb-8 transition-all duration-1200 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
            style={{
              transitionDelay: '200ms',
              transform: `perspective(1000px) rotateY(${mousePosition.x}deg) rotateX(${-mousePosition.y}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Glow behind image */}
            <div 
              className="absolute inset-0 animate-glow-pulse"
              style={{
                background: 'radial-gradient(circle, rgba(255, 107, 0, 0.5) 0%, transparent 70%)',
                transform: 'scale(1.3)',
                filter: 'blur(40px)',
              }}
            />
            
            {/* Hanuman image */}
            <img
              src="/images/hero-hanuman.png"
              alt="Lord Hanuman"
              className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain animate-float"
              style={{
                filter: 'drop-shadow(0 0 40px rgba(255, 107, 0, 0.4))',
              }}
            />
          </div>

          {/* Main Title */}
          <div 
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            <h1 className="font-sanskrit text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-gradient-saffron mb-4 text-shadow-glow">
              हनुमान चालीसा
            </h1>
          </div>

          {/* Subtitle */}
          <div 
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            <p className="font-cinzel text-cream/70 text-base sm:text-lg lg:text-xl tracking-wider max-w-2xl mx-auto mb-2">
              Forty Verses of Divine Devotion
            </p>
            <p className="font-devanagari text-cream/60 text-sm sm:text-base mb-10">
              चालीसा चौपाइयों की एक भक्तिपूर्ण रचना
            </p>
          </div>

          {/* CTA Button */}
          <div 
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <button
              onClick={scrollToVerses}
              className="group relative px-8 py-4 btn-divine rounded-full font-cinzel text-sm sm:text-base tracking-wider overflow-hidden"
            >
              <span className="relative z-10">Begin Sacred Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-saffron/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          {/* Decorative line */}
          <div 
            className={`mt-12 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transitionDelay: '1000ms' }}
          >
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? 'opacity-60' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <button 
          onClick={scrollToVerses}
          className="flex flex-col items-center text-cream/50 hover:text-gold transition-colors duration-300"
        >
          <span className="font-cinzel text-xs tracking-widest mb-2">Scroll</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>

      {/* Side decorations */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:block opacity-30">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-gold to-transparent" />
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:block opacity-30">
        <div className="w-px h-32 bg-gradient-to-b from-transparent via-gold to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
