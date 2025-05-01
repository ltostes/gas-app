import React from 'react';

function Card({children}) {
  return (
    <div style={{
      background: 'white',
      color: 'black',
      minHeight: 120,
      minWidth: 240,
      borderRadius: 25,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {children}
    </div>
  )
}

export default Card;
