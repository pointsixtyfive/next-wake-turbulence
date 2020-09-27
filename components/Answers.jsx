import React from 'react';
import Button from './Button';

const Answers = ({ start, onClick }) => {
  return (
    <section id='answer'>
      <Button label={'None'} value={0} onClick={onClick} disabled={!start} />
      <Button label={'2 Minutes'} value={2} onClick={onClick} disabled={!start} />
      <Button label={'3 Minutes'} value={3} onClick={onClick} disabled={!start} />
      <Button label={'4 Minutes'} value={4} onClick={onClick} disabled={!start} />
      <Button label={'Waivable'} value={true} onClick={onClick} disabled={!start} />
    </section>
  );
};

export default Answers;
