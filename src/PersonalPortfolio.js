import React, { useState, useEffect, useRef } from 'react';

const PersonalPortfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [typedTexts, setTypedTexts] = useState({
    about: '', education: '', projects: '', skills: '', experience: '', contact: ''
  });
  const [isTyping, setIsTyping] = useState({
    about: false, education: false, projects: false, skills: false, experience: false, contact: false
  });
  const [hasTyped, setHasTyped] = useState({
    about: false, education: false, projects: false, skills: false, experience: false, contact: false
  });
  const aboutRef = useRef(null);
  const educationRef = useRef(null);
  const projectsRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const contactRef = useRef(null);

useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
  
      const sections = [
        { ref: aboutRef, name: 'about', text: 'About Me' },
        { ref: educationRef, name: 'education', text: 'Education' },
        { ref: projectsRef, name: 'projects', text: 'Projects' },
        { ref: skillsRef, name: 'skills', text: 'Skills' },
        { ref: experienceRef, name: 'experience', text: 'Experience' },
        { ref: contactRef, name: 'contact', text: "Let's Connect" }
      ];
  
      sections.forEach(section => {
        if (section.ref.current) {
          const rect = section.ref.current.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;
          
          if (isInView && !isTyping[section.name]) {
            setIsTyping(prev => ({ ...prev, [section.name]: true }));
            setHasTyped(prev => ({ ...prev, [section.name]: true }));
            typeText(section.text, section.name);
          } else if (!isInView && hasTyped[section.name]) {
            setTypedTexts(prev => ({ ...prev, [section.name]: '' }));
            setIsTyping(prev => ({ ...prev, [section.name]: false }));
            setHasTyped(prev => ({ ...prev, [section.name]: false }));
          }
        }
      });
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isTyping, hasTyped]);

  const typeText = (text, sectionName) => {
    let i = 0;
    const timer = setInterval(() => {
      setTypedTexts(prev => ({ ...prev, [sectionName]: text.slice(0, i + 1) }));
      i++;
      if (i === text.length) {
        clearInterval(timer);
        setIsTyping(prev => ({ ...prev, [sectionName]: false }));
      }
    }, 150);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Create animated dots
  const createDots = (count, className) => {
    return [...Array(count)].map((_, i) => (
      <div
        key={i}
        className={`absolute rounded-full ${className}`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          transform: `translateY(${-scrollY * (0.1 + Math.random() * 0.2)}px)`,
          animationDelay: `${Math.random() * 2}s`,
        }}
      />
    ));
  };

  return (
    <div className="relative min-h-screen bg-[#f5f2ed]">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 bg-[#f5f2ed]/90 backdrop-blur-sm border-b border-[#d4a574]/20 transition-transform duration-300 ${
          showNavbar ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-[#8B4513]">Jess</div>
            <div className="hidden md:flex space-x-8">
              {['About', 'Education', 'Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-[#8B4513] hover:text-[#A0522D] transition-colors duration-300 font-medium hover:underline"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Background texture and animated elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Wavy lines background pattern with gradient */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%23e8dcc6;stop-opacity:1' /%3E%3Cstop offset='50%25' style='stop-color:%23d4a574;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%238B4513;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='M0 10 Q25 0 50 10 T100 10' stroke='url(%23grad)' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 60px',
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
        
        {/* Animated dots */}
        {createDots(15, 'w-2 h-2 bg-[#d4a574]/30 animate-pulse')}
        {createDots(10, 'w-1 h-1 bg-[#8B4513]/20 animate-ping')}
        
        {/* Sparkles */}
        <div 
          className="absolute w-4 h-4 bg-[#d4a574] rotate-45 animate-pulse"
          style={{
            top: '20%',
            right: '15%',
            transform: `rotate(${45 + scrollY * 0.05}deg) translateY(${-scrollY * 0.1}px)`,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          }}
        />
        <div 
          className="absolute w-3 h-3 bg-[#8B4513] rotate-12 animate-ping"
          style={{
            top: '25%',
            right: '20%',
            transform: `rotate(${12 + scrollY * 0.08}deg) translateY(${-scrollY * 0.15}px)`,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          }}
        />
        <div 
          className="absolute w-2 h-2 bg-[#e8dcc6] animate-pulse"
          style={{
            top: '30%',
            right: '12%',
            transform: `translateY(${-scrollY * 0.12}px)`,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          }}
        />
        <div 
          className="absolute w-3 h-3 bg-[#d4a574] animate-ping"
          style={{
            bottom: '40%',
            left: '10%',
            transform: `translateY(${-scrollY * 0.18}px)`,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          }}
        />
        <div 
          className="absolute w-4 h-4 bg-[#8B4513] animate-pulse"
          style={{
            bottom: '35%',
            left: '8%',
            transform: `rotate(${scrollY * 0.1}deg) translateY(${-scrollY * 0.14}px)`,
            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 pt-20">
          <div 
            className="text-center"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: Math.max(0, 1 - scrollY / 600),
            }}
          >
           
            <div className="relative mb-8">
              <div className="w-100 h-25 mx-auto bg-cover bg-center bg-no-repeat flex items-center justify-center">
                <img 
                  src="/jess.PNG" 
                  alt="Jess" 
                  className="max-w-full max-h-full object-contain"
                  style={{
                    filter: 'drop-shadow(2px 2px 4px rgba(139, 69, 19, 0.3))',
                  }}
                />
             <p className="absolute bottom-60 text-xl md:text-2xl text-[#8B4513] font-medium bg-[#f5f2ed]/80 px-4 py-2 rounded-lg backdrop-blur-sm"
   style={{ right: '15rem' }}>
  Computer Science & Innovation Major
</p>
                {/* Fallback text if image doesn't load */}
                <noscript>
                  <h1 
                    className="text-8xl md:text-9xl font-bold text-[#8B4513] opacity-90"
                    style={{
                      textShadow: '2px 2px 4px rgba(139, 69, 19, 0.3)',
                      background: 'linear-gradient(45deg, #8B4513, #A0522D, #CD853F)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Jess
                  </h1>
                </noscript>
              </div>
            </div>
            
            
            
            <div className="mt-12 animate-bounce">
              <div className="w-6 h-10 border-2 border-[#8B4513]/50 rounded-full flex justify-center mx-auto">
                <div className="w-1 h-3 bg-[#8B4513]/70 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20" ref={aboutRef}>
          <div className="max-w-6xl mx-auto">
            <div 
              className="text-center mb-16"
              style={{
                opacity: scrollY > 400 ? Math.min(1, (scrollY - 400) / 300) : 0,
              }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-[#8B4513] mb-8">
                {typedTexts.about}<span className="animate-pulse">|</span>
              </h2>
            </div>
            
            <div 
              className="grid md:grid-cols-2 gap-12 items-center"
              style={{
                transform: `translateY(${Math.max(0, (800 - scrollY) * 0.2)}px)`,
                opacity: scrollY > 600 ? Math.min(1, (scrollY - 600) / 300) : 0,
              }}
            >
                          {/* Frame container for PNG overlay */}
                          <div className="flex justify-center">
                              <div className="relative w-96 h-[28rem]">
                                  <img
                                      src="/me.jpg"
                                      alt="Your Photo"
                                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                                  />

                                  {/* Frame PNG ON TOP */}
                                  <img
                                      src="/frame1.png"
                                      alt="Frame"
                                      className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                                      style={{ transform: 'scale(1.6)' }}
                                  />
                              </div>
                          </div>
              
              <div className="space-y-6">
                <p className="text-lg text-[#8B4513]/80 leading-relaxed">
                  I'm a passionate creative professional who loves bringing ideas to life through innovative design and development. 
                  My journey combines technical expertise with artistic vision to create meaningful digital experiences.
                </p>
                <p className="text-lg text-[#8B4513]/80 leading-relaxed">
                  When I'm not coding or designing, you can find me exploring new technologies, sketching ideas, or diving into the latest creative trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen flex items-center justify-center px-6 py-20" ref={educationRef}>
          <div className="max-w-6xl mx-auto">
            <div 
              className="text-center mb-16"
              style={{
                opacity: scrollY > 1200 ? Math.min(1, (scrollY - 1200) / 300) : 0,
              }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-[#8B4513] mb-8">
              {typedTexts.education}<span className="animate-pulse">|</span>
              </h2>
            </div>
            
            <div 
              className="grid md:grid-cols-2 gap-12 items-center"
              style={{
                opacity: scrollY > 1400 ? Math.min(1, (scrollY - 1400) / 300) : 0,
              }}
            >
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-[#8B4513]">Your University</h3>
                <p className="text-xl text-[#8B4513]/80">Bachelor's Degree in Your Field</p>
                <p className="text-lg text-[#8B4513]/70 leading-relaxed">
                  Describe your educational journey, key achievements, favorite courses, and how your education shaped your career path. 
                  Mention any honors, relevant projects, or experiences that stand out.
                </p>
                <div className="space-y-2">
                  <p className="text-[#8B4513]/80"><strong>Graduation:</strong> Year</p>
                  <p className="text-[#8B4513]/80"><strong>GPA:</strong> Your GPA (if you want to include)</p>
                </div>
              </div>
              
              {/* Frame container for PNG overlay */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-72 h-72 bg-[#f5f2ed] flex items-center justify-center shadow-xl">
                    <p className="text-[#8B4513] text-center font-medium">Education Photo</p>
                  </div>
                  
                  {/* Simple wooden frame PNG overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: 'url(/path-to-your-simple-frame.png)',
                      backgroundSize: 'contain',
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-20" ref={projectsRef}>
          <div className="max-w-6xl mx-auto">
            <div 
              className="text-center mb-16"
              style={{
                opacity: scrollY > 2000 ? Math.min(1, (scrollY - 2000) / 300) : 0,
              }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-[#8B4513] mb-8">
              {typedTexts.projects}<span className="animate-pulse">|</span>
              </h2>
            </div>
            
            <div 
              className="grid md:grid-cols-3 gap-8"
              style={{
                opacity: scrollY > 2200 ? Math.min(1, (scrollY - 2200) / 300) : 0,
              }}
            >
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="group transform hover:scale-105 transition-all duration-500"
                  style={{
                    transform: `translateY(${Math.max(0, (2400 - scrollY + i * 50) * 0.1)}px)`,
                  }}
                >
                  {/* Frame container for PNG overlay */}
                  <div className="relative">
                    <div className="w-full h-64 bg-[#f5f2ed] flex items-center justify-center shadow-lg">
                      <p className="text-[#8B4513] text-center font-medium">Project {i}</p>
                    </div>
                    
                    {/* Oval frame PNG overlay */}
                    <div 
                      className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: 'url(/path-to-your-oval-frame.png)',
                        backgroundSize: 'contain',
                      }}
                    ></div>
                  </div>
                  
                  <div className="text-center mt-6">
                    <h3 className="text-xl font-bold text-[#8B4513] mb-2">Project Title {i}</h3>
                    <p className="text-[#8B4513]/70">Brief project description</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="min-h-screen flex items-center justify-center px-6 py-20" ref={skillsRef}>
          <div className="max-w-6xl mx-auto">
            <div 
              className="text-center mb-16"
              style={{
                opacity: scrollY > 2800 ? Math.min(1, (scrollY - 2800) / 300) : 0,
              }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-[#8B4513] mb-8">
              {typedTexts.skills}<span className="animate-pulse">|</span>
              </h2>
            </div>
            
            <div 
              className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              style={{
                opacity: scrollY > 3000 ? Math.min(1, (scrollY - 3000) / 300) : 0,
              }}
            >
              {[
                ['JavaScript', 'React', 'Node.js'],
                ['Python', 'CSS', 'Design'], 
                ['UI/UX', 'Git', 'MongoDB']
              ].map((column, colIndex) => (
                <div key={colIndex} className="space-y-6">
                  {column.map((skill, i) => (
                    <div 
                      key={skill}
                      className="text-center transform hover:scale-110 transition-transform duration-300"
                      style={{
                        transform: `translateY(${Math.max(0, (3200 - scrollY + (colIndex * 3 + i) * 30) * 0.05)}px)`,
                      }}
                    >
                      <div className="w-24 h-24 bg-[#8B4513] rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
                        <span className="text-[#f5f2ed] font-bold text-sm">{skill.slice(0, 3)}</span>
                      </div>
                      <p className="text-[#8B4513] font-medium">{skill}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="min-h-screen flex items-center justify-center px-6 py-20" ref={experienceRef}>
          <div className="max-w-6xl mx-auto">
            <div 
              className="text-center mb-16"
              style={{
                opacity: scrollY > 3600 ? Math.min(1, (scrollY - 3600) / 300) : 0,
              }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-[#8B4513] mb-8">
              {typedTexts.experience}<span className="animate-pulse">|</span>
              </h2>
            </div>
            
            <div 
              className="space-y-12"
              style={{
                opacity: scrollY > 3800 ? Math.min(1, (scrollY - 3800) / 300) : 0,
              }}
            >
              {[1, 2].map((i) => (
                <div key={i} className="grid md:grid-cols-2 gap-8 items-center">
                  <div className={`space-y-4 ${i % 2 === 0 ? 'md:order-2' : ''}`}>
                    <h3 className="text-2xl font-bold text-[#8B4513]">Job Title {i}</h3>
                    <p className="text-xl text-[#8B4513]/80">Company Name</p>
                    <p className="text-[#8B4513]/70">Date Range</p>
                    <p className="text-[#8B4513]/80 leading-relaxed">
                      Describe your role, responsibilities, and achievements. Highlight key projects, 
                      skills developed, and impact made.
                    </p>
                  </div>
                  
                  <div className={`flex justify-center ${i % 2 === 0 ? 'md:order-1' : ''}`}>
                    {/* Frame container for PNG overlay */}
                    <div className="relative">
                      <div className="w-64 h-64 bg-[#f5f2ed] flex items-center justify-center shadow-xl">
                        <p className="text-[#8B4513] text-center font-medium">Work Photo {i}</p>
                      </div>
                      
                      {/* Custom frame PNG overlay */}
                      <div 
                        className="absolute inset-0 pointer-events-none bg-cover bg-center bg-no-repeat"
                        style={{
                          backgroundImage: 'url(/path-to-your-decorative-frame.png)',
                          backgroundSize: 'contain',
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20" ref={contactRef}>
          <div className="max-w-4xl mx-auto text-center">
            <div 
              style={{
                opacity: scrollY > 4400 ? Math.min(1, (scrollY - 4400) / 300) : 0,
              }}
            >
              <h2 className="text-5xl md:text-6xl font-bold text-[#8B4513] mb-12">
              {typedTexts.contact}<span className="animate-pulse">|</span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  { label: 'Email', value: 'your.email@example.com' },
                  { label: 'LinkedIn', value: '/in/yourprofile' },
                  { label: 'Portfolio', value: 'yourwebsite.com' }
                ].map((contact, i) => (
                  <div 
                    key={contact.label}
                    className="transform hover:scale-105 transition-transform duration-300"
                    style={{
                      transform: `translateY(${Math.max(0, (4800 - scrollY + i * 50) * 0.05)}px)`,
                    }}
                  >
                    <div className="w-32 h-32 bg-[#8B4513] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <span className="text-[#f5f2ed] font-bold">{contact.label[0]}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#8B4513] mb-2">{contact.label}</h3>
                    <p className="text-[#8B4513]/70">{contact.value}</p>
                  </div>
                ))}
              </div>
              
              <button 
                className="px-8 py-4 bg-[#8B4513] text-[#f5f2ed] rounded-full font-semibold hover:bg-[#A0522D] transform hover:scale-105 transition-all duration-300 shadow-lg"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                Back to Top
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PersonalPortfolio;