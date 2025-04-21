import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { format } from 'date-fns';
import useSound from 'use-sound';
import alarmSound from './microwave-timer.mp3';

const PomodoroTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0); // Para reiniciar el temporizador
  const [tasks, setTasks] = useState([]);
  
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

  const handleTask = (e) => {
    e.preventDefault();
    const newTask = e.target[0].value;
    if (newTask) {
      setTasks([...tasks, newTask]);
      e.target[0].value = '';
    }
  };

  return (
    <>
      <div className="container">
        <div className='grid grid-cols-1 gap-5'>
          <h1 className='mx-auto'>Pomodoro Timer</h1>
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
        <form onSubmit={handleTask}>
          <input type="text" placeholder="Ingrese una nueva tarea" />
        </form>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}
              <div><button onClic={() => setTasks(tasks)}>Eliminar</button></div>
              <div><button>Lista</button></div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PomodoroTimer;