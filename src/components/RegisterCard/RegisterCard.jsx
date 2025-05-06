import React from 'react';
import Card from '../Card';

function RegisterCard({data}) {
  return (
    <Card>
      {Object.entries(data).map(([key, value]) => (
        <><span><strong>{key}: </strong>{value}</span><br/></>
      ))}
    </Card>
  )
}

export default RegisterCard;
