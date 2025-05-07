import React from 'react';
import Card from '../Card';

function RegisterCard({data}) {
  return (
    <Card>
      {Object.entries(data).map(([key, value]) => (
        <span key={key}><strong>{key}: </strong>{value.toString()}</span>
      ))}
    </Card>
  )
}

export default RegisterCard;
