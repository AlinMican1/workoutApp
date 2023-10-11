import React from 'react';

interface DaySectionProps {
  day: string;
  children: React.ReactNode;
}

const DaySection: React.FC<DaySectionProps> = ({ day, children }) => (
  <section>
    <div className='flex justify-center font-bold uppercase m-2'>{day}</div>
    <hr className='m-2'></hr>
    {children}
  </section>
);

export default DaySection;