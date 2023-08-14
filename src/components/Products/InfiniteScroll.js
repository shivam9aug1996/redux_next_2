import React, { useEffect, useRef } from 'react';

const InfiniteScroll = ({ onReachBottom }) => {
  const bottomRef = useRef();

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
//console.log("kjytr34567890-",distanceFromBottom,bottomRef.current)
    if (distanceFromBottom < 300 && bottomRef.current) {
    //  bottomRef.current = false;
      onReachBottom();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <div ref={bottomRef} />;
};

export default InfiniteScroll;
