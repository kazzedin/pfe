// CopyBubble.js
import React, { useState, useEffect } from 'react';

const CopyBubble = ({ text }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed  mt-5 ml-10 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-80 text-white py-2 px-4 rounded-md transition-opacity ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default CopyBubble;
