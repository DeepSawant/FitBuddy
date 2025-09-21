import React, { useMemo } from 'react';
import { useFitBuddy } from '../context/FitBuddyContext';


const ProgressAnalytics = () => {
  const { state } = useFitBuddy();



  // Calculate statistics
  const totalWorkouts = state.workouts.completed.length;
  const thisWeekWorkouts = state.dashboard.workoutsThisWeek;
  const avgMood = state.mood.currentMood;
  const todaysSteps = state.dashboard.todaysSteps;

  return (
    <div className="progress-analytics">
      <h2>📊 Progress Analytics</h2>

      {/* Key Statistics */}
      <div className="analytics-stats">
        <div className="analytics-stat-card">
          <div className="stat-icon">🏃‍♂️</div>
          <div className="stat-content">
            <div className="stat-number">{todaysSteps.toLocaleString()}</div>
            <div className="stat-label">Today's Steps</div>
          </div>
        </div>
        <div className="analytics-stat-card">
          <div className="stat-icon">😊</div>
          <div className="stat-content">
            <div className="stat-number">{avgMood}/10</div>
            <div className="stat-label">Average Mood</div>
          </div>
        </div>
        <div className="analytics-stat-card">
          <div className="stat-icon">💪</div>
          <div className="stat-content">
            <div className="stat-number">{totalWorkouts}</div>
            <div className="stat-label">Total Workouts</div>
          </div>
        </div>
        <div className="analytics-stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-number">{thisWeekWorkouts}</div>
            <div className="stat-label">This Week</div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Steps Progress */}
        <div className="chart-container">
          <h3>📈 Steps Progress</h3>
          <div className="simple-chart">
            <div className="progress-item">
              <span>Today's Steps</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{width: `${Math.min((state.dashboard.todaysSteps / 10000) * 100, 100)}%`}}
                ></div>
              </div>
              <span>{state.dashboard.todaysSteps.toLocaleString()} / 10,000</span>
            </div>
          </div>
        </div>

        {/* Mood Tracking */}
        <div className="chart-container">
          <h3>😊 Current Mood Status</h3>
          <div className="simple-chart">
            <div className="mood-display">
              <div className="mood-circle">
                <span className="mood-score">{state.mood.currentMood}/10</span>
              </div>
              <p>Your current mood rating</p>
            </div>
          </div>
        </div>

        {/* Workout Distribution */}
        <div className="chart-container">
          <h3>💪 Workout Summary</h3>
          <div className="simple-chart">
            {state.workouts.completed.length > 0 ? (
              <div className="workout-summary">
                <p>Total Workouts: {state.workouts.completed.length}</p>
                <p>This Week: {state.dashboard.workoutsThisWeek}</p>
              </div>
            ) : (
              <div className="no-data">
                <p>No workout data available</p>
                <p>Start logging workouts to see your progress!</p>
              </div>
            )}
          </div>
        </div>

        {/* Hydration Status */}
        <div className="chart-container">
          <h3>💧 Hydration Status</h3>
          <div className="simple-chart">
            <div className="progress-item">
              <span>Water Intake</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill hydration" 
                  style={{width: `${Math.min((state.hydration.currentIntake / state.hydration.dailyGoal) * 100, 100)}%`}}
                ></div>
              </div>
              <span>{state.hydration.currentIntake} / {state.hydration.dailyGoal} glasses</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="progress-summary">
        <h3>📋 Weekly Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="summary-label">Steps Goal Achievement:</span>
            <span className="summary-value">
              {todaysSteps >= 10000 ? '✅ On Track' : '📈 Keep Going'}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Workout Consistency:</span>
            <span className="summary-value">
              {thisWeekWorkouts >= 4 ? '🔥 Excellent' : thisWeekWorkouts >= 2 ? '👍 Good' : '💪 Needs Improvement'}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Overall Mood:</span>
            <span className="summary-value">
              {avgMood >= 8 ? '😊 Great' : avgMood >= 6 ? '🙂 Good' : '😐 Could be Better'}
            </span>
          </div>
          <div className="summary-item">
            <span className="summary-label">Hydration:</span>
            <span className="summary-value">
              {state.hydration.currentIntake >= 6 ? '💧 Well Hydrated' : '🥤 Drink More Water'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;