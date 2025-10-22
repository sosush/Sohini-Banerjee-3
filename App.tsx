import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { generateBio } from './services/geminiService';

const App: React.FC = () => {
  const [bio, setBio] = useState('');
  const [isLoadingBio, setIsLoadingBio] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  // AI Bio Generation
  const handleGenerateBio = async () => {
    setIsLoadingBio(true);
    try {
      const newBio = await generateBio();
      setBio(newBio);
    } catch (error) {
      console.error("Failed to generate bio in App component:", error);
      setBio("An error occurred while generating a new bio. Please check the console for more details.");
    } finally {
      setIsLoadingBio(false);
    }
  };

  useEffect(() => {
    handleGenerateBio();
  }, []);

  // Page-wide glitch effect
  useEffect(() => {
    if (!hasEntered) return;

    const intervalId = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => {
        setIsGlitching(false);
      }, 800); // Duration of the glitch animation
    }, Math.random() * 6000 + 4000); // Random interval between 4s and 10s

    return () => clearInterval(intervalId);
  }, [hasEntered]);
  
  // Lock scroll until user enters
  useEffect(() => {
    if (hasEntered) {
      document.body.style.overflow = 'auto';
    } else {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [hasEntered]);
  
  const handleEnter = () => {
    setHasEntered(true);
  };

  return (
    <div className={`bg-black text-white min-h-screen font-sans relative ${isGlitching ? 'glitch-active' : ''}`}>
      <Header isVisible={hasEntered} />
      <main>
        <Hero onEnter={handleEnter} />
        <About bio={bio} onGenerateBio={handleGenerateBio} isLoading={isLoadingBio} />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="text-center py-8 px-6 text-green-400/50 font-mono text-sm">
        <div>Designed & Built by Jane Doe</div>
        <p className="mt-2 max-w-2xl mx-auto">This portfolio is a dynamic React application, styled with Tailwind CSS, and features an AI-generated bio using Google's Gemini API.</p>
      </footer>
    </div>
  );
};

export default App;