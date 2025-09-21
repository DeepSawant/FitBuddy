import { useState, useEffect, useRef } from 'react'

const WorkoutTimer = ({ onComplete, workoutName }) => {
  const [time, setTime] = useState(0) // time in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, isPaused])

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = () => {
    setIsRunning(true)
    setIsPaused(false)
  }

  const pauseTimer = () => {
    setIsPaused(true)
  }

  const resumeTimer = () => {
    setIsPaused(false)
  }

  const stopTimer = () => {
    setIsRunning(false)
    setIsPaused(false)
    if (onComplete && time > 0) {
      onComplete(time, workoutName)
    }
    setTime(0)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsPaused(false)
    setTime(0)
  }

  return (
    <div className="workout-timer">
      <div className="timer-display">
        <div className="timer-time">{formatTime(time)}</div>
        {workoutName && <div className="timer-workout-name">{workoutName}</div>}
      </div>
      
      <div className="timer-controls">
        {!isRunning ? (
          <button onClick={startTimer} className="timer-btn start-btn">
            ▶️ Start
          </button>
        ) : (
          <>
            {isPaused ? (
              <button onClick={resumeTimer} className="timer-btn resume-btn">
                ▶️ Resume
              </button>
            ) : (
              <button onClick={pauseTimer} className="timer-btn pause-btn">
                ⏸️ Pause
              </button>
            )}
            <button onClick={stopTimer} className="timer-btn stop-btn">
              ⏹️ Complete
            </button>
          </>
        )}
        {(isRunning || time > 0) && (
          <button onClick={resetTimer} className="timer-btn reset-btn">
            🔄 Reset
          </button>
        )}
      </div>
      
      {isRunning && !isPaused && (
        <div className="timer-status">
          <div className="pulse-indicator"></div>
          <span>Workout in progress...</span>
        </div>
      )}
    </div>
  )
}

export default WorkoutTimer