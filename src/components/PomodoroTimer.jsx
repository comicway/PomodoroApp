import { useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { format } from 'date-fns';
import useSound from 'use-sound';
import alarmSound from './microwave-timer.mp3';

const PomodoroTimer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0); // Para reiniciar el temporizador
  const [tasks, setTasks] = useState([]);
  const [completePomodoro, setCompletePomodoro] = useState(0);
  const [completePomodoroTask, setCompletePomodoroTask] = useState(0);

  console.log('El pomodoro esta activo o no:', isPlaying);
  console.log('El pomodoro total en:', completePomodoro);
  console.log('El pomodoro de la tarea esta en:', tasks.completePomodoroTask);

  // Duración en segundos (25 minutos = 25 * 60)
  const POMODORO_DURATION = 1 * 1;

  const [play] = useSound(alarmSound);

  const handleComplete = () => {
    play(); // Reproducir sonido al finalizar
    setIsPlaying(false);
    setCompletePomodoro(completePomodoro + 1);
    if (tasks.completed === false) {
      setCompletePomodoroTask(tasks.completePomodoroTask + 1);
    } 
    return [true, 1000]; // Reiniciar después de 1 segundo
  };

  const formatTime = (seconds) => {
    return format(new Date(seconds * 1000), 'mm:ss');
  };

  const handleTask = (e) => {
    e.preventDefault();
    const newTask = e.target[0].value;
    if (newTask) {
      setTasks([...tasks, { text: newTask, completed: false, completePomodoroTask},]);
      e.target[0].value = '';
    }
  };

  const handleDeleteTask = (indexToDelete) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  const handleTaskCompletion = (indexToComplete) => {
    setTasks(tasks.map((task, index) =>
      index === indexToComplete ? { ...task, completed: !task.completed } : task
    ));
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
            colors={['#FF6347', '#FF6347', '#FF6347']}
            colorsTime={[POMODORO_DURATION, POMODORO_DURATION / 2, 0]}
            onComplete={handleComplete}
            size={350}
            strokeWidth={20}
          >
            {({ remainingTime }) => (
              <div className="timer-display">
                <span className="time">{formatTime(remainingTime)}</span>
                <div className="controls">
                  <button onClick={() => {
                    if (remainingTime === 0) {
                      setKey(prev => prev + 1);
                    }
                    setIsPlaying(!isPlaying);
                  }}>
                    {isPlaying ? 'Pausar' : 'Comenzar'}
                  </button>
                  <button onClick={() => {
                    setKey(prev => prev + 1);
                    setIsPlaying(false);
                  }} style={{ display: isPlaying ? 'block' : 'none' }}>
                    Reiniciar
                  </button>
                </div>
                {completePomodoro}
              </div>
            )}
          </CountdownCircleTimer>
        </div >
      </div >
      <div>
        <form onSubmit={handleTask}>
          <input type="text" placeholder="Ingrese una nueva tarea" />
        </form>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <p className={task.completed ? 'line-through' : ''}>{task.text}{completePomodoroTask}</p>
              <div><button onClick={() => handleDeleteTask(index)}>Eliminar</button></div>
              <div><button onClick={() => handleTaskCompletion(index)}>Realizada</button></div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PomodoroTimer;