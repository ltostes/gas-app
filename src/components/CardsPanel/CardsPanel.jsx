import React from 'react';

function CardsPanel({ children }) {
  return (
      <div
        style={{
          width: '100%',
          height: '100vh',
          margin: '0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 25,
          paddingTop: 25
        }}
        >
          { children }
      </div>
    );
}

export default CardsPanel;
