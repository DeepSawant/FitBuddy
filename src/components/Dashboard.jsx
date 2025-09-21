import React, { useState } from 'react';
import { useFitBuddy } from '../context/FitBuddyContext';

const Dashboard = () => {
  const { state, updateSteps, updateCaloriesBurned, updateCaloriesConsumed, addWater } = useFitBuddy();
  const [stepsInput, setStepsInput] = useState('');
  const [caloriesBurnedInput, setCaloriesBurnedInput] = useState('');
  const [caloriesConsumedInput, setCaloriesConsumedInput] = useState('');

  const handleStepsUpdate = () => {
    if (stepsInput && !isNaN(stepsInput)) {
      updateSteps(parseInt(stepsInput));
      setStepsInput('');
    }
  };

  const handleCaloriesBurnedUpdate = () => {
    if (caloriesBurnedInput && !isNaN(caloriesBurnedInput)) {
      updateCaloriesBurned(parseInt(caloriesBurnedInput));
      setCaloriesBurnedInput('');
    }
  };

  const handleCaloriesConsumedUpdate = () => {
    if (caloriesConsumedInput && !isNaN(caloriesConsumedInput)) {
      updateCaloriesConsumed(parseInt(caloriesConsumedInput));
      setCaloriesConsumedInput('');
    }
  };

  const getProgressPercentage = (current, goal) => {
    return Math.min((current / goal) * 100, 100);
  };

  return (
    <div className="section">
      <h2>Personal Dashboard</h2>
      <div className="dashboard-grid">
        
        {/* Steps Widget */}
        <div className="widget interactive-widget">
          <h3>🚶‍♂️ Today's Steps</h3>
          <div className="progress-circle">
            <div className="progress-text">
              {state.dashboard.todaysSteps.toLocaleString()} / {state.user.goals.dailySteps.toLocaleString()}
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${getProgressPercentage(state.dashboard.todaysSteps, state.user.goals.dailySteps)}%`}}
              ></div>
            </div>
          </div>
          <div className="widget-input">
            <input 
              type="number" 
              placeholder="Add steps"
              value={stepsInput}
              onChange={(e) => setStepsInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStepsUpdate()}
            />
            <button onClick={handleStepsUpdate}>Update</button>
          </div>
        </div>

        {/* Water Intake Widget */}
        <div className="widget interactive-widget">
          <h3>💧 Water Intake</h3>
          <div className="water-container">
            <div className="water-glasses">
              {Array.from({ length: state.hydration.dailyGoal }, (_, i) => (
                <div 
                  key={i} 
                  className={`water-glass ${i < state.hydration.currentIntake ? 'filled' : ''}`}
                >
                  🥤
                </div>
              ))}
            </div>
            <p>{state.hydration.currentIntake} / {state.hydration.dailyGoal} glasses</p>
          </div>
          <div className="widget-buttons">
            <button onClick={addWater} className="add-water-btn">+ Add Glass</button>
          </div>
        </div>

        {/* Calories Widget */}
        <div className="widget interactive-widget">
          <h3>🔥 Calories Today</h3>
          <div className="calories-info">
            <div className="calorie-item">
              <span className="calorie-label">Burned:</span>
              <span className="calorie-value">{state.dashboard.caloriesBurned}</span>
            </div>
            <div className="calorie-item">
              <span className="calorie-label">Consumed:</span>
              <span className="calorie-value">{state.dashboard.caloriesConsumed}</span>
            </div>
            <div className="calorie-item total">
              <span className="calorie-label">Net:</span>
              <span className="calorie-value">
                {state.dashboard.caloriesConsumed - state.dashboard.caloriesBurned}
              </span>
            </div>
          </div>
          <div className="widget-inputs">
            <div className="input-group">
              <input 
                type="number" 
                placeholder="Calories burned"
                value={caloriesBurnedInput}
                onChange={(e) => setCaloriesBurnedInput(e.target.value)}
              />
              <button onClick={handleCaloriesBurnedUpdate}>Add Burned</button>
            </div>
            <div className="input-group">
              <input 
                type="number" 
                placeholder="Calories consumed"
                value={caloriesConsumedInput}
                onChange={(e) => setCaloriesConsumedInput(e.target.value)}
              />
              <button onClick={handleCaloriesConsumedUpdate}>Add Consumed</button>
            </div>
          </div>
        </div>

        {/* Workouts Widget */}
        <div className="widget">
          <h3>💪 Workouts This Week</h3>
          <div className="workout-progress">
            <div className="workout-count">
              {state.dashboard.workoutsThisWeek} / {state.user.goals.weeklyWorkouts} completed
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill workout-progress-fill" 
                style={{width: `${getProgressPercentage(state.dashboard.workoutsThisWeek, state.user.goals.weeklyWorkouts)}%`}}
              ></div>
            </div>
          </div>
          <p className="workout-message">
            {state.dashboard.workoutsThisWeek >= state.user.goals.weeklyWorkouts 
              ? "🎉 Goal achieved this week!" 
              : `${state.user.goals.weeklyWorkouts - state.dashboard.workoutsThisWeek} more workouts to go!`
            }
          </p>
        </div>

        {/* Quick Stats Widget */}
        <div className="widget stats-widget">
          <h3>📊 Quick Stats</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">🏃‍♀️</div>
              <div className="stat-info">
                <div className="stat-label">Avg Daily Steps</div>
                <div className="stat-value">{(state.dashboard.todaysSteps).toLocaleString()}</div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">😊</div>
              <div className="stat-info">
                <div className="stat-label">Current Mood</div>
                <div className="stat-value">{state.mood.currentMood}/10</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Widget */}
        <div className="widget achievement-widget">
          <h3>🏆 Today's Achievements</h3>
          <div className="achievements">
            {state.dashboard.todaysSteps >= state.user.goals.dailySteps && (
              <div className="achievement-badge">
                <span className="achievement-icon">🎯</span>
                <span>Steps Goal Reached!</span>
              </div>
            )}
            {state.hydration.currentIntake >= state.hydration.dailyGoal && (
              <div className="achievement-badge">
                <span className="achievement-icon">💧</span>
                <span>Hydration Goal Met!</span>
              </div>
            )}
            {state.dashboard.workoutsThisWeek >= state.user.goals.weeklyWorkouts && (
              <div className="achievement-badge">
                <span className="achievement-icon">💪</span>
                <span>Weekly Workout Goal!</span>
              </div>
            )}
          </div>
          {state.dashboard.todaysSteps < state.user.goals.dailySteps && 
           state.hydration.currentIntake < state.hydration.dailyGoal && 
           state.dashboard.workoutsThisWeek < state.user.goals.weeklyWorkouts && (
            <p className="no-achievements">Keep going! You're making progress! 💪</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;