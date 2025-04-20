import { useState, useEffect } from "react";

const easeOutQuad = (t: number) => t * (2 - t);

const useCountUp = (target: number, startingValue: number, duration: number = 2000) => {
  const [count, setCount] = useState(startingValue);

  useEffect(() => {
    let startTime: number | null = null;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuad(progress); 
      setCount(Math.floor(startingValue + easedProgress * (target - startingValue)));

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [target, startingValue, duration]);

  return count;
};

export default useCountUp;