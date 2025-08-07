import { useEffect, useState } from 'react';

const VisitorCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Increment and get updated count
    fetch('https://api.countapi.xyz/hit/mywebsite123/homepage')
      .then(res => res.json())
      .then(data => setCount(data.value));
  }, []);

  return (
    <div>
      <h2>👥 Total Visitors: {count}</h2>
    </div>
  );
};

export default VisitorCounter;