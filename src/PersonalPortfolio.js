import React, { useState, useEffect, useRef } from 'react';

const PersonalPortfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
  className={`fixed top-0 left-0 right-0 z-50 bg-[#f5f2ed]/90 backdrop-blur-sm border-b border-[#d4a574]/20 transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
>
  <div className="max-w-6xl mx-auto px-6 py-4">
    <div className="flex justify-between items-center">
      <div className="text-2xl font-bold text-[#8B4513]">Jessica McIlree</div>
      
      {/* Desktop Navigation */}
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
      
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-[#8B4513] p-2"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className="w-full h-0.5 bg-current"></div>
          <div className="w-full h-0.5 bg-current"></div>
          <div className="w-full h-0.5 bg-current"></div>
        </div>
      </button>
    </div>
    
    {/* Mobile Navigation Menu */}
    {showMobileMenu && (
      <div className="md:hidden mt-4 space-y-3">
        {['About', 'Education', 'Projects', 'Skills', 'Experience', 'Contact'].map((item) => (
          <button
            key={item}
            onClick={() => {
              scrollToSection(item.toLowerCase());
              setShowMobileMenu(false);
            }}
            className="block w-full text-left text-[#8B4513] hover:text-[#A0522D] transition-colors duration-300 font-medium py-2"
          >
            {item}
          </button>
        ))}
      </div>
    )}
  </div>
</nav>

    {/* Background texture and animated elements */}
<div className="fixed inset-0 pointer-events-none overflow-hidden">
  {/* Hero section background */}
  <div
    className="absolute inset-0 bg-cover bg-no-repeat transition-opacity duration-1000"
    style={{
      backgroundImage: 'url(/hero-background.png)',
      backgroundPosition: 'center top',
      backgroundSize: 'cover',
      opacity: scrollY < 600 ? 1 : 0,
      transform: `translateY(${scrollY * 0.1}px)`,
    }}
  />

  {/* About section background */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
    style={{
      backgroundImage: 'url(/pink-background.png)',
      backgroundSize: 'cover',
      opacity: scrollY > 600 && scrollY < 1800 ? 1 : 0,
      transform: `translateY(${scrollY * 0.05}px)`,
    }}
  />

  {/* Smoke layer 1 */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
    style={{
      backgroundImage: 'url(/Greensmoke1.png)',
      backgroundSize: 'cover',
      opacity: scrollY > 1400 && scrollY < 4000 ? 1 : 0,
      transform: `translateY(${scrollY * 0.1}px)`,
    }}
  />

  {/* Smoke layer 2 */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
    style={{
      backgroundImage: 'url(/Greensmoke2.png)',
      backgroundSize: 'cover',
      opacity: scrollY > 1600 && scrollY < 4000 ? 1 : 0,
      transform: `translateY(${scrollY * 0.1}px)`,
    }}
  />

  {/* Smoke layer 3 */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
    style={{
      backgroundImage: 'url(/Greensmoke3.png)',
      backgroundSize: 'cover',
      opacity: scrollY > 1800 && scrollY < 4000 ? 1 : 0,
      transform: `translateY(${scrollY * 0.1}px)`,
    }}
  />

  {/* Keep some animated dots for sections without custom backgrounds */}
  {createDots(8, 'w-2 h-2 bg-[#d4a574]/20 animate-pulse')}
  {createDots(5, 'w-1 h-1 bg-[#8B4513]/15 animate-ping')}

  {/* Sparkles - reduced since you have custom backgrounds */}
  <div
    className="absolute w-3 h-3 bg-[#d4a574] animate-pulse"
    style={{
      bottom: '40%',
      left: '10%',
      transform: `translateY(${-scrollY * 0.18}px)`,
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
              <div className="w-85 h-25 mx-auto bg-cover bg-center bg-no-repeat flex items-center justify-center">
                <img
                  src="/jess.PNG"
                  alt="Jess"
                  className="w-82 max-h-full object-contain"
                  style={{
                    filter: 'drop-shadow(2px 2px 4px rgba(139, 69, 19, 0.3))',
                  }}
                />
                <p className="absolute bottom-16 md:bottom-60 left-4 md:left-auto md:right-60 text-lg md:text-xl lg:text-2xl text-[#8B4513] font-medium bg-[#f5f2ed]/80 px-3 md:px-4 py-2 rounded-lg backdrop-blur-sm max-w-xs md:max-w-none">
  Computer Science & Innovation Major
</p>
              </div>

              {/* Leaf overlay - positioned in front of Jess image */}
              <div
                className="absolute inset-0 pointer-events-none z-20"
                style={{
                  backgroundImage: 'url(/hero-overlay.png)',
                  backgroundSize: '120%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'left center',
                  opacity: 1,
                  transform: `translateY(${scrollY * 0.2}px) translateX(${scrollY * 0.1}px)`,
                }}
              />
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
              className="grid md:grid-cols-2 gap-20 items-center"
              style={{
                transform: `translateY(${Math.max(0, (800 - scrollY) * 0.2)}px)`,
                opacity: scrollY > 600 ? Math.min(1, (scrollY - 600) / 300) : 0,
              }}
            >
              {/* Frame container for PNG overlay */}
              <div className="flex justify-center">
                <div className="relative w-96 h-[35rem]">
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
                    style={{ transform: 'scale(1.8)' }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <p className="text-lg text-[#8B4513]/80 leading-relaxed">
                  Hi! I'm Jess, a Computer Science major graduating this spring, 2026. I'm passionate
                  about learning new technologies and incorporating creativity into all of my work. I'm based in Long Island, New York
                  but currently studying in Burlington, Vermont. I'm looking to develop my skills and employ the knowledge I have leanred in
                  data science and programming.
                </p>
                <p className="text-lg text-[#8B4513]/80 leading-relaxed">
                  When I'm not studying, you can find me exploring new technologies, sketching, or diving into the latest creative trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="min-h-screen flex items-center justify-center px-6 py-25" ref={educationRef}>
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
                <h3 className="text-3xl font-bold text-[#8B4513]">Champlain College</h3>
                <p className="text-xl text-[#8B4513]/80">Bachelor's Degree in Computer Science & Innovation</p>
                <p className="text-lg text-[#8B4513]/70 leading-relaxed">
                  Merit scholarship recipient, completing a minor in Data Analytics and a concentration in Artificial Intelligence.
                  Expected to graduate a year early in spring 2026.
                </p>
                <p className="text-lg text-[#8B4513]/70 leading-relaxed">
                  Coursework in: Data Mining, Database Management Systems, Network Programming,
                  Web Development, Computer Architecture, Data Structures and Algorithms, Advanced Programming,
                  Discrete Math & Linear Algebra.
                </p>
                <div className="space-y-2">
                  <p className="text-[#8B4513]/80"><strong>Graduation:</strong> 2026</p>
                  <p className="text-[#8B4513]/80"><strong>GPA:</strong> 3.89</p>
                </div>
              </div>

              {/* Frame container for PNG overlay */}
              <div className="flex justify-center">
                <div className="relative w-72 h-72">
                  {/* photo BEHIND the frame */}
                  <img
                    src="/champlain.jpeg"
                    alt="Education Photo"
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    style={{ transform: 'scaleX(1.2)' }}
                  />

                  {/* Frame PNG ON TOP */}
                  <img
                    src="/frameC.png"
                    alt="Frame"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                    style={{ transform: 'scale(1.75)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="min-h-screen flex items-center justify-center px-10 py-20" ref={projectsRef}>
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
              className="grid md:grid-cols-3 gap-20"
              style={{
                opacity: scrollY > 2200 ? Math.min(1, (scrollY - 2200) / 300) : 0,
              }}
            >
              {[
                {
                  id: 1,
                  title: 'Multi-Client Chat Room',
                  desc: [
                    'Developed a client-server chat system in python using TCP socket connections for real time communication',
                    'Implemented multithreading to handle concurrent client sessions',
                    'Allowed for private and broadcast messages, custom usernames, and system messages for user entry and exit'
                  ]
                },
                {
                  id: 2,
                  title: 'Brain Computer Interface for Accessibility',
                  desc: [
                    'Designing a privacy-preserving BCI prototype that classifies motor-imagery EEG signals in real time to control smart-home devices',
                    'Training and deploying machine-learning models on open-source EEG datasets for on-device inference, eliminating cloud dependence and protecting neural data',
                    'Developing a mobile app that integrates with Google Home APIs to trigger lights, fans, and other devices using only neural activity',
                    'Conducting research on ethical and neuroethical implications of BCI systems, emphasizing open-source and responsible AI practices'
                  ]
                },
                {
                  id: 3,
                  title: 'App Development',
                  desc: [
                    'Developed multiple apps using adnroid studio, flutter, and firebase',
                    'Used Google authentication to login and pair users to keep track of their daily self-care routine',
                    'Created a messaging system between paired users',
                    'Integrated multiple APIs to fetch specific or random information aligned with user preferences',
                    'Designed UX elements using Figma and Procreate to create a seamless and recognizable brand image'
                  ]
                }
              ].map((project, i) => (
                <div
                  key={project.id}
                  className="group transform hover:scale-105 transition-all duration-500"
                  style={{
                    transform: `translateY(${Math.max(0, (2400 - scrollY + i * 50) * 0.1)}px)`,
                  }}
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-[#8B4513] mb-3">{project.title}</h3>

                    <ul className="text-[#8B4513]/70 text-left space-y-4 ml-18">
                      {project.desc.map((point, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#d4a574] mr-2">•</span>
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
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
                [
                  { name: 'JavaScript', logo: '/javascript.png' },
                  { name: 'React', logo: '/react.png' },
                  { name: 'Python', logo: '/python.png' }
                ],
                [
                  { name: 'MySQL', logo: '/mysql.png' },
                  { name: 'Dart', logo: '/dart.png' },
                  { name: 'UI/UX Design', logo: '/figma.png' }
                ],
                [
                  { name: 'Android Studio', logo: '/android.png' },
                  { name: 'C++', logo: '/c++.png' },
                  { name: 'Adobe Premiere', logo: '/pr.png' }
                ]
              ].map((column, colIndex) => (
                <div key={colIndex} className="space-y-6">
                  {column.map((skill, i) => (
                    <div
                      key={skill.name}
                      className="text-center transform hover:scale-110 transition-transform duration-300"
                      style={{
                        transform: `translateY(${Math.max(0, (3200 - scrollY + (colIndex * 3 + i) * 30) * 0.05)}px)`,
                      }}
                    >
                      <div className="w-24 h-24 bg-[#8B4513] rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg p-2">
                        <img
                          src={skill.logo}
                          alt={`${skill.name} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-[#8B4513] font-medium">{skill.name}</p>
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
              {/* Experience 1 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#8B4513]">IT Helpdesk Technician</h3>
                  <p className="text-xl text-[#8B4513]/80">ChampSupport</p>
                  <p className="text-[#8B4513]/70">September 2025 - Present</p>
                  <p className="text-[#8B4513]/80 leading-relaxed">
                    As an IT helpdesk tech, I have to respond to daily tickets and phine calls, walking people though troubleshooting
                    there electronic & or system problems. I also have to manage software installations for campus needs
                    and maintenence on systems such as printers, projectors, etc.
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-64 h-64">
                    {/* photo BEHIND the frame */}
                    <img
                      src="/IT.jpg"
                      alt="IT Work"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Frame PNG ON TOP */}
                    <img
                      src="/itframe.png"
                      alt="Frame"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                      style={{ transform: 'scale(1.3)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Experience 2 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 md:order-2">
                  <h3 className="text-2xl font-bold text-[#8B4513]">IoT Database Programming Intern</h3>
                  <p className="text-xl text-[#8B4513]/80">Leahy Center for Digital Forensics & Cybersecurity</p>
                  <p className="text-[#8B4513]/70">August 2024 - May 2025</p>
                  <p className="text-[#8B4513]/80 leading-relaxed">
                    As a member of the Database team my main responsibilities included updating and maintaining a MySQL database,
                    adding client requested features to our connected website used by National Security, and writing documentation. My largest achievement was spearheading the
                    transition from storing crucial information in google drive to a secure local fileserver, which included writing netwoking protocols and mutation scripts.
                  </p>
                </div>

                <div className="flex justify-center md:order-1">
                  <div className="relative w-72 h-64">
                    {/* photo BEHIND the frame */}
                    <img
                      src="/leahy.jpg"
                      alt="Leahy Center Work"
                      className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* Frame PNG ON TOP */}
                    <img
                      src="/lhyframe.png"
                      alt="Frame"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                      style={{ transform: 'scale(1.3)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Experience 3 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-[#8B4513]">Preseident of the Womxn in Technology Club</h3>
                  <p className="text-xl text-[#8B4513]/80">Champlain College</p>
                  <p className="text-[#8B4513]/70">August 2025 - Present</p>
                  <p className="text-[#8B4513]/80 leading-relaxed">
                    As president of this club I have to plan and organize meetings surrounding the topics of emerging technologies and the minority experience
                    in the tech field. I prepare and deliver presentations on certain tech interests of myself or requested form members and create an open environment where everyone
                    can feel included and supported.
                  </p>
                </div>

                <div className="flex justify-center">
                  <div className="relative w-64 h-64">
                    {/* photo BEHIND the frame */}
                    <img
                      src="/wit.png"
                      alt="Womxn in Technology Club"
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    />

                    {/* Frame PNG ON TOP */}
                    <img
                      src="/witframe.png"
                      alt="Frame"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                      style={{ transform: 'scale(1.3)' }}
                    />
                  </div>
                </div>
              </div>
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

              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {[
                  { label: 'Email', value: '8626Jess@gmail.com', logo: '/email.png' },
                  { label: 'LinkedIn', value: 'https://www.linkedin.com/in/jessicamcilree/', logo: '/lnkdn.png' },
                ].map((contact, i) => (
                  <div
                    key={contact.label}
                    className="transform hover:scale-105 transition-transform duration-300"
                    style={{
                      transform: `translateY(${Math.max(0, (4800 - scrollY + i * 50) * 0.05)}px)`,
                    }}
                  >
                    <div className="w-32 h-32 bg-[#8B4513] rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg p-6">
                      <img
                        src={contact.logo}
                        alt={`${contact.label} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-[#8B4513] mb-2">{contact.label}</h3>
                    {contact.label === 'LinkedIn' ? (
                      <a
                        href={contact.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8B4513]/70 hover:text-[#8B4513] transition-colors duration-300 hover:underline"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-[#8B4513]/70">{contact.value}</p>
                    )}
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