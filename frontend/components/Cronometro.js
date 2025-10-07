import { useState, useEffect } from 'react';

export default function Cronometro({ startTime, isRunning }) {
  const [tempo, setTempo] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTempo(Math.round((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [startTime, isRunning]);

  const minutes = String(Math.floor(tempo / 60)).padStart(2, '0');
  const seconds = String(tempo % 60).padStart(2, '0');

  return <strong>Tempo decorrido: {minutes}:{seconds}</strong>;
}