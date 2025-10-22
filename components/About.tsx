import React, { useState, useEffect } from 'react';

interface AboutProps {
  bio: string;
  onGenerateBio: () => void;
  isLoading: boolean;
}

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


const About: React.FC<AboutProps> = ({ bio, onGenerateBio, isLoading }) => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <TypingHeading text="About Me" />
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-2/3">
            <div className="bg-transparent p-8 rounded-lg shadow-2xl shadow-green-900/20 border border-green-800">
              {isLoading ? (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-green-900 rounded w-3/4"></div>
                  <div className="h-4 bg-green-900 rounded"></div>
                  <div className="h-4 bg-green-900 rounded"></div>
                  <div className="h-4 bg-green-900 rounded w-1/2"></div>
                </div>
              ) : (
                <p className="text-green-300 leading-relaxed text-lg whitespace-pre-wrap font-mono">{bio}</p>
              )}
            </div>
            <button
              onClick={onGenerateBio}
              disabled={isLoading}
              className="mt-6 border border-green-500 text-green-500 font-semibold py-2 px-6 rounded-sm hover:bg-green-500/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-mono"
            >
              {isLoading && (
                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
              )}
              <span>{isLoading ? 'Generating...' : 'Regenerate Bio [AI]'}</span>
            </button>
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