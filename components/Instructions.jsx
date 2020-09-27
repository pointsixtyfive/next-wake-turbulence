import React from 'react';
import Button from './Button';

const Instructions = ({ start }) => {
  return (
    <div>
      <p>Here are the instructions</p>
      <Button label={'Start'} onClick={(e) => start(e.target.value)} value={true} />
    </div>
  );
};

export default Instructions;
