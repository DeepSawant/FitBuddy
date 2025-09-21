import React, { useState } from 'react';
import { useFitBuddy } from '../context/FitBuddyContext';
import { format } from 'date-fns';

const WorkoutLogger = () => {
  const { state, addWorkout } = useFitBuddy();
  const [workoutForm, setWorkoutForm] = useState({
    type: 'cardio',
    name: '',
    duration: '',
    calories: '',
    notes: ''
  });
  const [showForm, setShowForm] = useState(false);

  const workoutTypes = {
    cardio: ['Running', 'Cycling', 'Swimming', 'Walking', 'Dancing', 'Jumping Rope'],
    strength: ['Push-ups', 'Pull-ups', 'Squats', 'Deadlifts', 'Bench Press', 'Weight Lifting'],
    flexibility: ['Yoga', 'Stretching', 'Pilates', 'Tai Chi'],
    sports: ['Basketball', 'Football', 'Tennis', 'Badminton', 'Volleyball'],
    other: ['Custom Workout']
  };

  const handleInputChange = (e) => {
    setWorkoutForm({
      ...workoutForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const workout = {
      id: Date.now().toString(),
      ...workoutForm,
      duration: parseInt(workoutForm.duration),
      calories: parseInt(workoutForm.calories),
      date: new Date().toISOString(),
      completed: true
    };
    
    addWorkout(workout);
    setWorkoutForm({
      type: 'cardio',
      name: '',
      duration: '',
      calories: '',
      notes: ''
    });
    setShowForm(false);
  };

  const getWorkoutIcon = (type) => {
    const icons = {
      cardio: '🏃‍♂️',
      strength: '💪',
      flexibility: '🧘‍♀️',
      sports: '⚽',
      other: '🏋️‍♀️'
    };
    return icons[type] || '🏃‍♂️';
  };

  const getTotalWorkoutTime = () => {
    return state.workouts.completed.reduce((total, workout) => total + workout.duration, 0);
  };

  const getTotalCaloriesBurned = () => {
    return state.workouts.completed.reduce((total, workout) => total + workout.calories, 0);
  };

  return (
    <div className="workout-logger">
      <div className="workout-header">
        <h2>💪 Workout Logger</h2>
        <button 
          className="add-workout-btn" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Log Workout'}
        </button>
      </div>

      {/* Workout Stats */}
      <div className="workout-stats">
        <div className="stat-card">
          <div className="stat-icon">🏃‍♂️</div>
          <div className="stat-info">
            <div className="stat-number">{state.workouts.completed.length}</div>
            <div className="stat-label">Total Workouts</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <div className="stat-number">{getTotalWorkoutTime()}</div>
            <div className="stat-label">Minutes Exercised</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-info">
            <div className="stat-number">{getTotalCaloriesBurned()}</div>
            <div className="stat-label">Calories Burned</div>
          </div>
        </div>
      </div>

      {/* Workout Form */}
      {showForm && (
        <div className="workout-form-container">
          <form onSubmit={handleSubmit} className="workout-form">
            <h3>Log New Workout</h3>
            
            <select
              name="type"
              value={workoutForm.type}
              onChange={handleInputChange}
              required
            >
              <option value="cardio">Cardio</option>
              <option value="strength">Strength Training</option>
              <option value="flexibility">Flexibility</option>
              <option value="sports">Sports</option>
              <option value="other">Other</option>
            </select>

            <select
              name="name"
              value={workoutForm.name}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Exercise</option>
              {workoutTypes[workoutForm.type].map(exercise => (
                <option key={exercise} value={exercise}>{exercise}</option>
              ))}
            </select>

            <div className="form-row">
              <input
                type="number"
                name="duration"
                placeholder="Duration (minutes)"
                value={workoutForm.duration}
                onChange={handleInputChange}
                required
                min="1"
              />
              <input
                type="number"
                name="calories"
                placeholder="Calories burned"
                value={workoutForm.calories}
                onChange={handleInputChange}
                required
                min="1"
              />
            </div>

            <textarea
              name="notes"
              placeholder="Notes (optional)"
              value={workoutForm.notes}
              onChange={handleInputChange}
              rows="3"
            />

            <button type="submit" className="submit-workout-btn">
              Log Workout
            </button>
          </form>
        </div>
      )}

      {/* Workout History */}
      <div className="workout-history">
        <h3>Recent Workouts</h3>
        {state.workouts.completed.length === 0 ? (
          <p className="no-workouts">No workouts logged yet. Start your fitness journey!</p>
        ) : (
          <div className="workout-list">
            {state.workouts.completed
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 10)
              .map(workout => (
                <div key={workout.id} className="workout-item">
                  <div className="workout-icon">
                    {getWorkoutIcon(workout.type)}
                  </div>
                  <div className="workout-details">
                    <div className="workout-name">{workout.name}</div>
                    <div className="workout-meta">
                      <span>{workout.duration} min</span>
                      <span>•</span>
                      <span>{workout.calories} cal</span>
                      <span>•</span>
                      <span>{format(new Date(workout.date), 'MMM dd, yyyy')}</span>
                    </div>
                    {workout.notes && (
                      <div className="workout-notes">{workout.notes}</div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutLogger;