import React, { useMemo } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { useFitBuddy } from '../context/FitBuddyContext';
import { format, subDays, startOfDay } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const ProgressAnalytics = () => {
  const { state } = useFitBuddy();

  // Generate mock historical data for demonstration
  const generateHistoricalData = () => {
    const days = 30;
    const data = [];
    
    for (let i = days; i >= 0; i--) {
      const date = subDays(new Date(), i);
      data.push({
        date: date.toISOString(),
        steps: Math.floor(Math.random() * 5000) + 7000,
        mood: Math.floor(Math.random() * 5) + 5,
        water: Math.floor(Math.random() * 4) + 6,
        calories: Math.floor(Math.random() * 800) + 1800,
        workouts: Math.random() > 0.7 ? 1 : 0
      });
    }
    
    return data;
  };

  const historicalData = useMemo(() => generateHistoricalData(), []);

  // Steps Progress Chart
  const stepsChartData = {
    labels: historicalData.slice(-14).map(d => format(new Date(d.date), 'MMM dd')),
    datasets: [
      {
        label: 'Daily Steps',
        data: historicalData.slice(-14).map(d => d.steps),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Goal (10,000)',
        data: Array(14).fill(10000),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderDash: [5, 5],
        tension: 0,
        fill: false
      }
    ]
  };

  // Mood Tracking Chart
  const moodChartData = {
    labels: historicalData.slice(-7).map(d => format(new Date(d.date), 'EEE')),
    datasets: [
      {
        label: 'Mood Rating',
        data: historicalData.slice(-7).map(d => d.mood),
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderWidth: 3,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.3
      }
    ]
  };

  // Workout Distribution
  const workoutTypes = state.workouts.completed.reduce((acc, workout) => {
    acc[workout.type] = (acc[workout.type] || 0) + 1;
    return acc;
  }, {});

  const workoutDistributionData = {
    labels: Object.keys(workoutTypes).map(key => key.charAt(0).toUpperCase() + key.slice(1)),
    datasets: [
      {
        data: Object.values(workoutTypes),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        hoverBackgroundColor: [
          '#FF6384CC',
          '#36A2EBCC',
          '#FFCE56CC',
          '#4BC0C0CC',
          '#9966FFCC',
          '#FF9F40CC'
        ]
      }
    ]
  };

  // Weekly Activity Chart
  const weeklyActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Workouts',
        data: [2, 1, 3, 2, 1, 0, 2],
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        }
      }
    }
  };

  const moodChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        }
      },
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  // Calculate statistics
  const avgSteps = Math.floor(historicalData.reduce((sum, d) => sum + d.steps, 0) / historicalData.length);
  const avgMood = (historicalData.reduce((sum, d) => sum + d.mood, 0) / historicalData.length).toFixed(1);
  const totalWorkouts = state.workouts.completed.length;
  const thisWeekWorkouts = state.dashboard.workoutsThisWeek;

  return (
    <div className="progress-analytics">
      <h2>📊 Progress Analytics</h2>

      {/* Key Statistics */}
      <div className="analytics-stats">
        <div className="analytics-stat-card">
          <div className="stat-icon">🏃‍♂️</div>
          <div className="stat-content">
            <div className="stat-number">{avgSteps.toLocaleString()}</div>
            <div className="stat-label">Avg Daily Steps</div>
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
          <h3>📈 Steps Progress (Last 14 Days)</h3>
          <div className="chart-wrapper">
            <Line data={stepsChartData} options={chartOptions} />
          </div>
        </div>

        {/* Mood Tracking */}
        <div className="chart-container">
          <h3>😊 Mood Tracking (Last 7 Days)</h3>
          <div className="chart-wrapper">
            <Line data={moodChartData} options={moodChartOptions} />
          </div>
        </div>

        {/* Workout Distribution */}
        <div className="chart-container">
          <h3>💪 Workout Types Distribution</h3>
          <div className="chart-wrapper">
            {Object.keys(workoutTypes).length > 0 ? (
              <Doughnut data={workoutDistributionData} options={doughnutOptions} />
            ) : (
              <div className="no-data">
                <p>No workout data available</p>
                <p>Start logging workouts to see your distribution!</p>
              </div>
            )}
          </div>
        </div>

        {/* Weekly Activity */}
        <div className="chart-container">
          <h3>📊 Weekly Activity Pattern</h3>
          <div className="chart-wrapper">
            <Bar data={weeklyActivityData} options={chartOptions} />
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
              {avgSteps >= 10000 ? '✅ On Track' : '📈 Keep Going'}
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