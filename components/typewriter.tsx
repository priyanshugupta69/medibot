import React from 'react';
interface TypewriterProps {
    text: string;
  }
  const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
    return (
      <div className="typewriter-container">
        <h1 className="typewriter-text">
          {text}
        </h1>
      </div>
    );
  };
  

export default Typewriter;