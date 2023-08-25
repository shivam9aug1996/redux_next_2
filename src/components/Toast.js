import { useState, useEffect } from 'react';

const Toast = ({ message, duration = 3000, onClose,setCustomError }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
      setCustomError?.(null)
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white py-2 px-4 rounded-lg z-50">
      {message}
    </div>
  );
};

export default Toast;
