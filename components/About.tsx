import React, { useState, useEffect } from 'react';

const TypingHeading: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = text;
      const currentText = displayedText;
      
      if (isDeleting) {
        setDisplayedText(currentText.substring(0, currentText.length - 1));
        setSpeed(100);
      } else {
        setDisplayedText(fullText.substring(0, currentText.length + 1));
        setSpeed(150);
      }
      
      if (!isDeleting && currentText === fullText) {
        // Pause at the end
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
      }
    };
    
    const timer = setTimeout(handleTyping, speed);
    
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, text, speed]);
  
  return (
    <h2 className="text-4xl font-bold text-center mb-12 text-white font-mono h-12">
      <span className="text-green-400">~$</span> {displayedText}
      <span className="text-green-400 cursor-blink">|</span>
    </h2>
  );
};

const About: React.FC = () => {
  const staticBio = "I'm a computer science engineering student with a passion for building things for the web. My main focus is on Machine Learning, but I enjoy crafting dynamic user interfaces and exploring the intersection of AI and web development. I see code as a tool to build the future, one line at a time.";

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <TypingHeading text="About Me" />
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-2/3">
            <div className="bg-transparent p-8 rounded-lg shadow-2xl shadow-green-900/20 border border-green-800">
              <p className="text-green-300 leading-relaxed text-lg whitespace-pre-wrap font-mono">{staticBio}</p>
            </div>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <div className="w-64 h-64 rounded-none overflow-hidden relative group border-4 border-green-500/50">
              <img 
                src="https://picsum.photos/seed/tech-portfolio/400/400" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-green-500/20 group-hover:bg-transparent transition-all duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;