import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { format } from 'date-fns';
import useSound from 'use-sound';
import alarmSound from './microwave-timer.mp3';

const PomodoroTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0); // Para reiniciar el temporizador
  
  // Duración en segundos (25 minutos)
  const POMODORO_DURATION = 1 * 60;

  const [play] = useSound(alarmSound);

  const handleComplete = () => {
    play(); // Reproducir sonido al finalizar
    setIsPlaying(false);
    return [true, 1000]; // Reiniciar después de 1 segundo
  };

  const formatTime = (seconds) => {
    return format(new Date(seconds * 1000), 'mm:ss');
  };

  return (
    <>
      <div className="container mx-auto">
        <div className='grid grid-cols-1'>
          <h1>Pomodoro Timer</h1>
          <CountdownCircleTimer
            key={key}
            isPlaying={isPlaying}
            duration={POMODORO_DURATION}
            colors={['#00ff00', '#ffff00', '#ff0000']}
            colorsTime={[POMODORO_DURATION, POMODORO_DURATION/2, 0]}
            onComplete={handleComplete}
            size={300}
            strokeWidth={15}
          >
            {({ remainingTime }) => (
              <div className="timer-display">
                <span className="time">{formatTime(remainingTime)}</span>
                <div className="controls">
                  <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? 'Pausar' : 'Comenzar'}
                  </button>
                  <button onClick={() => {
                    setKey(prev => prev + 1);
                    setIsPlaying(false);
                  }}>
                    Reiniciar
                  </button>
                </div>
              </div>
            )}
          </CountdownCircleTimer>
        </div>
      </div>
      <div>
        <h1>HOLASAAA</h1>
      </div>
    </>
  );
};

export default PomodoroTimer;