import React from 'react';

const StarField = ({ count = 270 }) => {
  // Génère un tableau de positions aléatoires
  const stars = Array.from({ length: count }).map((_, i) => {
    const size = Math.random() * 2 + 1; // taille entre 1 et 3px
    const top = Math.random() * 100; // % top
    const left = Math.random() * 100; // % left
    const delay = Math.random() * 3; // délai d'animation pour la brillance

    return (
      <div
        key={i}
        className="star"
        style={{
          width: size,
          height: size,
          top: `${top}%`,
          left: `${left}%`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });

  return <div className="stars">{stars}</div>;
};

export default StarField;
