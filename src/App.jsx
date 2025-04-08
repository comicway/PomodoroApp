import PomodoroTimer from './components/PomodoroTimer';

function App() {
  return (
    <>
        <div className="container mx-auto">
          <div className='grid grid-cols-1 sm:grid-cols-4'>
            <h1>Pomodoro Timer</h1>
            <PomodoroTimer />
          </div>
        </div>
    </>
  );
}

export default App;