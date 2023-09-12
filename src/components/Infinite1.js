import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

const InfiniteScroll1 = ({ onReachBottom,children }) => {
  const containerRef = useRef();
  const [inViewRef, inView] = useInView({
    threshold: 0.5, // Adjust this threshold as needed
  });

  useEffect(() => {
    if (inView) {
      onReachBottom();
    }
  }, [inView, onReachBottom]);

  return (
    <div ref={containerRef} style={{ minHeight: '400px' }}>
      {/* Render your list of items here */}
      {children}

      {/* The element to track for visibility */}
      <div ref={inViewRef} style={{ height: '10px' }}></div>
    </div>
  );
};

export default InfiniteScroll1;
