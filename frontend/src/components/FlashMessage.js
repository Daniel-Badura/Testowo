import React, { useState, useEffect } from "react";

const FlashMessage = ({ message, duration }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide the flash message after the specified duration
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    // Cleanup the timer on unmount or when the duration changes
    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  if (!visible) {
    return null; // Don't render anything if not visible
  }

  return (
    <div className="flash-message">
      <p>{message}</p>
    </div>
  );
};

export default FlashMessage;
