import { useState, useEffect, useCallback } from 'react';
import './Timer.css';

function Timer({ running }) {
  let intervalId;
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (running) {
      intervalId = setInterval(() => {
        setTime((prev) => prev + 1000);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [running]);

  const getMinutes = useCallback(
    () => `0${Math.floor((time / 60000) % 60)}`.slice(-2),
    [time]
  );
  const getSeconds = useCallback(
    () => `0${Math.floor((time / 1000) % 60)}`.slice(-2),
    [time]
  );

  return (
    <div className="timer">
      <span>{getMinutes()}:</span>
      <span>{getSeconds()}</span>
    </div>
  );
}

export default Timer;
