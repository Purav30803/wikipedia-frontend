// src/components/CustomCursor.jsx
'use client';

import { useEffect } from 'react';

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const cursor2 = document.querySelector('.cursor2');

    const moveCursor = (e) => {
      const style = `left: ${e.clientX}px; top: ${e.clientY}px;`;
      if (cursor) cursor.style.cssText = style;
      if (cursor2) cursor2.style.cssText = style;
    };

    document.addEventListener('mousemove', moveCursor);
    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      <div className="cursor z-[1000] border-2 border-[#000] dark:border-[#fff]"></div>
      <div className="cursor2 z-[1000]  dark:bg-[#fff] bg-[#000]"></div>
    </>
  );
};

export default CustomCursor;
