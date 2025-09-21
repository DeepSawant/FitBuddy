import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import ProfileSetup from './components/ProfileSetup'
import PersonalizedPlan from './components/PersonalizedPlan'
import WorkoutTimer from './components/WorkoutTimer'
import './App.css'

function App() {
  const [appState, setAppState] = useState('loading') // loading, landing, profile-setup, plan-generation, dashboard
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [userPlan, setUserPlan] = useState(null)
  const [currentPage, setCurrentPage] = useState('home')
  const [userData, setUserData] = useState({
    steps: 0,
    water: 0,
    workouts: 0,
    mood: 5
  })

  useEffect(() => {
    // Check for existing user session on page load
    const savedUser = localStorage.getItem('fitbuddyUser')
    const savedProfile = localStorage.getItem('userProfile')
    const savedPlan = localStorage.getItem('userPlan')
    
    try {
      if (savedUser && savedProfile && savedPlan) {
        // User has completed everything - go to dashboard
        setUser(JSON.parse(savedUser))
        setUserProfile(JSON.parse(savedProfile))
        setUserPlan(JSON.parse(savedPlan))
        
        // Load saved dashboard data if available
        const savedUserData = localStorage.getItem('fitbuddyDashboardData')
        if (savedUserData) {
          setUserData(JSON.parse(savedUserData))
        }
        
        setAppState('dashboard')
      } else if (savedUser && savedProfile) {
        // User has profile but no plan - go to plan generation
        setUser(JSON.parse(savedUser))
        setUserProfile(JSON.parse(savedProfile))
        setAppState('plan-generation')
      } else if (savedUser) {
        // User is logged in but no profile - go to profile setup
        setUser(JSON.parse(savedUser))
        setAppState('profile-setup')
      } else {
        // No user data - show landing page
        setAppState('landing')
      }
    } catch (error) {
      // If there's any error parsing saved data, clear it and start fresh
      console.warn('Error parsing saved user data:', error)
      localStorage.removeItem('fitbuddyUser')
      localStorage.removeItem('userProfile')
      localStorage.removeItem('userPlan')
      setAppState('landing')
    }
  }, [])

  // Authentication handlers
  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('fitbuddyUser', JSON.stringify(userData))
    setAppState('profile-setup')
  }

  const handleProfileComplete = (profileData) => {
    setUserProfile(profileData)
    localStorage.setItem('userProfile', JSON.stringify(profileData))
    setAppState('plan-generation')
  }

  const handlePlanGenerated = (planData, startJourney = false) => {
    setUserPlan(planData)
    localStorage.setItem('userPlan', JSON.stringify(planData))
    if (startJourney) {
      setAppState('dashboard')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('fitbuddyUser')
    localStorage.removeItem('userProfile')
    localStorage.removeItem('userPlan')
    localStorage.removeItem('fitbuddyDashboardData')
    setUser(null)
    setUserProfile(null)
    setUserPlan(null)
    setUserData({
      steps: 0,
      water: 0,
      workouts: 0,
      mood: 5
    })
    setCurrentPage('home')
    setAppState('landing')
  }

  const updateSteps = (steps) => {
    const newUserData = { ...userData, steps: parseInt(steps) }
    setUserData(newUserData)
    localStorage.setItem('fitbuddyDashboardData', JSON.stringify(newUserData))
  }

  const addWater = () => {
    const newUserData = { ...userData, water: Math.min(userData.water + 1, 8) }
    setUserData(newUserData)
    localStorage.setItem('fitbuddyDashboardData', JSON.stringify(newUserData))
  }
  
  const updateMood = (mood) => {
    const newUserData = { ...userData, mood: parseInt(mood) }
    setUserData(newUserData)
    localStorage.setItem('fitbuddyDashboardData', JSON.stringify(newUserData))
  }
  
  const addWorkout = () => {
    const newUserData = { ...userData, workouts: userData.workouts + 1 }
    setUserData(newUserData)
    localStorage.setItem('fitbuddyDashboardData', JSON.stringify(newUserData))
  }
  
  const handleWorkoutComplete = (duration, workoutName) => {
    addWorkout()
    // Could also save workout details to localStorage for history
    const workoutLog = {
      date: new Date().toISOString(),
      duration,
      workoutName,
      type: 'completed'
    }
    const existingWorkouts = JSON.parse(localStorage.getItem('workoutHistory') || '[]')
    existingWorkouts.push(workoutLog)
    localStorage.setItem('workoutHistory', JSON.stringify(existingWorkouts))
  }
  
  const resetProgress = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to reset your daily progress? This will clear your steps, water intake, and mood data for today.'
    )
    if (confirmReset) {
      const resetData = {
        steps: 0,
        water: 0,
        workouts: 0,
        mood: 5
      }
      setUserData(resetData)
      localStorage.setItem('fitbuddyDashboardData', JSON.stringify(resetData))
    }
  }

  const renderContent = () => {
    switch(appState) {
      case 'loading':
        return (
          <div className="loading-screen">
            <div className="loading-spinner">
              <div className="spinner"></div>
            </div>
            <h2>Loading FitBuddy...</h2>
          </div>
        )
      
      case 'landing':
        return <LandingPage onLogin={handleLogin} />
      
      case 'profile-setup':
        return (
          <ProfileSetup 
            onProfileComplete={handleProfileComplete}
            userName={user?.name || 'User'}
          />
        )
      
      case 'plan-generation':
        return (
          <PersonalizedPlan 
            profileData={userProfile}
            userName={user?.name || 'User'}
            onPlanGenerated={handlePlanGenerated}
          />
        )
      
      case 'dashboard':
        return (
          <div className="dashboard-app">
            <nav className="dashboard-navbar">
              <div className="nav-brand">
                <h2>🏋️‍♀️ FitBuddy</h2>
                <span className="welcome-text">Welcome, {user?.name}!</span>
              </div>
              <div className="nav-links">
                <button 
                  className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('home')}
                >
                  🏠 Home
                </button>
                <button 
                  className={`nav-button ${currentPage === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('dashboard')}
                >
                  📊 Dashboard
                </button>
                <button 
                  className={`nav-button ${currentPage === 'workouts' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('workouts')}
                >
                  💪 Workouts
                </button>
                <button 
                  className={`nav-button ${currentPage === 'nutrition' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('nutrition')}
                >
                  🍎 Nutrition
                </button>
                <button 
                  className={`nav-button ${currentPage === 'community' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('community')}
                >
                  🏆 Community
                </button>
                <button 
                  className="nav-button"
                  onClick={resetProgress}
                  title="Reset today's progress (steps, water, workouts, mood)"
                >
                  🔄 Reset
                </button>
                <button 
                  className="nav-button logout-btn"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            </nav>
            
            <main className="dashboard-content">
              {renderDashboardPage()}
            </main>
            
            <footer className="dashboard-footer">
              <p>FitBuddy - Your Personal Fitness Companion | Built with React</p>
            </footer>
          </div>
        )
      
      default:
        return <LandingPage onLogin={handleLogin} />
    }
  }

  const renderDashboardPage = () => {
    switch(currentPage) {
      case 'dashboard':
        const weeklyWorkoutGoal = userPlan?.workoutPlan?.daysPerWeek || 3
        const dailyCalorieGoal = userPlan?.nutritionPlan?.dailyCalories || 2000
        const dailyWaterGoal = userPlan?.nutritionPlan ? Math.round(userPlan.nutritionPlan.hydration / 250) : 8 // Convert ml to glasses
        
        return (
          <div className="page">
            <h2>📏 Your Dashboard</h2>
            {userPlan && (
              <div className="plan-summary">
                <h3>🎯 Your Personalized Goals</h3>
                <div className="goals-overview">
                  <div className="goal-item">
                    <span className="goal-icon">💪</span>
                    <span className="goal-text">{weeklyWorkoutGoal} workouts per week</span>
                  </div>
                  <div className="goal-item">
                    <span className="goal-icon">🍎</span>
                    <span className="goal-text">{dailyCalorieGoal} calories per day</span>
                  </div>
                  <div className="goal-item">
                    <span className="goal-icon">💧</span>
                    <span className="goal-text">{dailyWaterGoal} glasses of water daily</span>
                  </div>
                  <div className="goal-item">
                    <span className="goal-icon">🏃‍♂️</span>
                    <span className="goal-text">10,000 steps daily</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="dashboard-grid">
              <div className="widget">
                <h3>🏃‍♂️ Steps Today</h3>
                <div className="progress-circle">
                  <span className="progress-number">{userData.steps.toLocaleString()}</span>
                  <span className="progress-goal">/ 10,000</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((userData.steps / 10000) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="widget-controls">
                  <input 
                    type="number" 
                    placeholder="Add steps"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        updateSteps(e.target.value)
                        e.target.value = ''
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="widget">
                <h3>💧 Water Intake</h3>
                <div className="water-display">
                  <span className="water-count">{userData.water} / {dailyWaterGoal} glasses</span>
                  <div className="water-glasses">
                    {Array(dailyWaterGoal).fill(0).map((_, i) => (
                      <span key={i} className={`water-glass ${i < userData.water ? 'filled' : ''}`}>💧</span>
                    ))}
                  </div>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill water" 
                    style={{ width: `${Math.min((userData.water / dailyWaterGoal) * 100, 100)}%` }}
                  ></div>
                </div>
                <button onClick={addWater} className="btn-primary">+ Add Glass</button>
              </div>
              
              <div className="widget">
                <h3>💪 Workouts This Week</h3>
                <div className="workout-count">
                  <span className="workout-number">{userData.workouts}</span>
                  <span className="workout-goal">/ {weeklyWorkoutGoal}</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill workout" 
                    style={{ width: `${Math.min((userData.workouts / weeklyWorkoutGoal) * 100, 100)}%` }}
                  ></div>
                </div>
                <div className="workout-status">
                  {userData.workouts >= weeklyWorkoutGoal ? 
                    <span className="goal-achieved">🎉 Goal Achieved!</span> : 
                    <span className="goal-progress">{weeklyWorkoutGoal - userData.workouts} more to go!</span>
                  }
                </div>
                <button onClick={addWorkout} className="btn-primary">
                  + Log Workout
                </button>
              </div>
              
              <div className="widget">
                <h3>😊 Daily Mood</h3>
                <div className="mood-display">
                  <span className="mood-score">{userData.mood}</span>
                  <span className="mood-scale">/10</span>
                </div>
                <div className="mood-indicator">
                  {userData.mood >= 8 ? '😊 Great!' : 
                   userData.mood >= 6 ? '🙂 Good' : 
                   userData.mood >= 4 ? '😐 Okay' : '😔 Could be better'}
                </div>
                <div className="mood-buttons">
                  {[1,2,3,4,5,6,7,8,9,10].map(num => (
                    <button 
                      key={num}
                      onClick={() => updateMood(num)}
                      className={`mood-btn ${userData.mood === num ? 'active' : ''}`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* New Weekly Progress Summary Widget */}
              <div className="widget weekly-summary">
                <h3>📏 Weekly Summary</h3>
                <div className="summary-stats">
                  <div className="stat-row">
                    <span className="stat-label">Workouts Completed:</span>
                    <span className="stat-value">{userData.workouts}/{weeklyWorkoutGoal}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Daily Water Avg:</span>
                    <span className="stat-value">{userData.water}/{dailyWaterGoal} glasses</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Mood Average:</span>
                    <span className="stat-value">{userData.mood}/10</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Steps Today:</span>
                    <span className="stat-value">{userData.steps.toLocaleString()}/10K</span>
                  </div>
                </div>
              </div>
              
              {/* Plan Focus Widget */}
              {userPlan && (
                <div className="widget plan-focus">
                  <h3>🎯 Current Focus</h3>
                  <div className="focus-content">
                    <div className="focus-workout">
                      <h4>💪 Workout Focus</h4>
                      <p>{userPlan.workoutPlan.focus}</p>
                    </div>
                    <div className="focus-progress">
                      <h4>📈 This Week's Goal</h4>
                      <p>{userPlan.workoutPlan.daysPerWeek} workouts, {userPlan.workoutPlan.sessionDuration} min each</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      
      case 'workouts':
        return (
          <div className="page">
            <h2>💪 Your Workout Plan</h2>
            
            {/* Workout Timer */}
            <WorkoutTimer 
              onComplete={handleWorkoutComplete} 
              workoutName="Current Workout"
            />
            
            <div className="workout-section">
              {userPlan?.workoutPlan ? (
                <>
                  {/* Workout Plan Overview */}
                  <div className="workout-overview">
                    <div className="workout-focus">
                      <h3>🎯 Your Focus</h3>
                      <p>{userPlan.workoutPlan.focus}</p>
                    </div>
                    <div className="workout-schedule">
                      <h3>📅 Weekly Schedule</h3>
                      <p><strong>{userPlan.workoutPlan.daysPerWeek} days per week</strong></p>
                      <p><strong>{userPlan.workoutPlan.sessionDuration} minutes per session</strong></p>
                    </div>
                  </div>
                  
                  {/* Weekly Split */}
                  <div className="weekly-split">
                    <h3>🗓️ Weekly Split</h3>
                    <div className="workout-days">
                      {userPlan.workoutPlan.split.map((day, index) => (
                        <div key={index} className="workout-day">
                          <div className="day-number">Day {index + 1}</div>
                          <div className="day-workout">{day}</div>
                          <button 
                            onClick={() => handleWorkoutComplete(0, day)}
                            className="start-workout-btn"
                          >
                            Start Workout
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Progression Guidelines */}
                  <div className="progression-guidelines">
                    <h3>📈 Progression Guidelines</h3>
                    <div className="progression-cards">
                      <div className="progression-card">
                        <h4>Starting Point</h4>
                        <p>{userPlan.workoutPlan.progression.startWeight}</p>
                      </div>
                      <div className="progression-card">
                        <h4>Progression</h4>
                        <p>{userPlan.workoutPlan.progression.progression}</p>
                      </div>
                      <div className="progression-card">
                        <h4>Focus</h4>
                        <p>{userPlan.workoutPlan.progression.focus}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="no-plan-message">
                  <h3>⚠️ No workout plan available</h3>
                  <p>Complete your profile setup to get a personalized workout plan.</p>
                </div>
              )}
              
              {/* Weekly Stats */}
              <div className="workout-stats">
                <h3>📊 This Week: {userData.workouts} workouts completed</h3>
                <p>{userData.workouts >= (userPlan?.workoutPlan?.daysPerWeek || 3) ? '🎉 Goal achieved!' : 'Keep going! You\'re doing great!'}</p>
              </div>
            </div>
          </div>
        )
      
      case 'nutrition':
        return (
          <div className="page">
            <h2>🍎 Your Nutrition Plan</h2>
            
            <div className="nutrition-section">
              {userPlan?.nutritionPlan ? (
                <>
                  {/* Daily Calorie Goal */}
                  <div className="calorie-overview">
                    <div className="calorie-card">
                      <h3>🎯 Daily Calorie Goal</h3>
                      <div className="calorie-number">{userPlan.nutritionPlan.dailyCalories}</div>
                      <p>calories per day</p>
                    </div>
                  </div>
                  
                  {/* Macros Breakdown */}
                  <div className="macros-section">
                    <h3>📏 Daily Macros Breakdown</h3>
                    <div className="macro-cards">
                      <div className="macro-card protein">
                        <h4>Protein</h4>
                        <div className="macro-amount">{userPlan.nutritionPlan.macros.protein.grams}g</div>
                        <div className="macro-percentage">{userPlan.nutritionPlan.macros.protein.percentage}%</div>
                      </div>
                      <div className="macro-card carbs">
                        <h4>Carbs</h4>
                        <div className="macro-amount">{userPlan.nutritionPlan.macros.carbs.grams}g</div>
                        <div className="macro-percentage">{userPlan.nutritionPlan.macros.carbs.percentage}%</div>
                      </div>
                      <div className="macro-card fat">
                        <h4>Fat</h4>
                        <div className="macro-amount">{userPlan.nutritionPlan.macros.fat.grams}g</div>
                        <div className="macro-percentage">{userPlan.nutritionPlan.macros.fat.percentage}%</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Meal Suggestions */}
                  <div className="meal-suggestions">
                    <h3>🍽️ Meal Ideas</h3>
                    <div className="meals-grid">
                      <div className="meal-category">
                        <h4>🍳 Breakfast</h4>
                        <ul>
                          {userPlan.nutritionPlan.mealTiming.breakfast.map((meal, index) => (
                            <li key={index}>{meal}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="meal-category">
                        <h4>🥙 Lunch</h4>
                        <ul>
                          {userPlan.nutritionPlan.mealTiming.lunch.map((meal, index) => (
                            <li key={index}>{meal}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="meal-category">
                        <h4>🍽️ Dinner</h4>
                        <ul>
                          {userPlan.nutritionPlan.mealTiming.dinner.map((meal, index) => (
                            <li key={index}>{meal}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="meal-category">
                        <h4>🍎 Snacks</h4>
                        <ul>
                          {userPlan.nutritionPlan.mealTiming.snacks.map((snack, index) => (
                            <li key={index}>{snack}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hydration */}
                  <div className="hydration-section">
                    <div className="hydration-goal">
                      <h3>💧 Hydration Goal</h3>
                      <div className="hydration-target">
                        <span className="target-amount">{userPlan.nutritionPlan.hydration}ml</span>
                        <span className="target-label">per day</span>
                      </div>
                    </div>
                    <div className="hydration-tracker">
                      <h4>Today's Progress: {userData.water}/8 glasses</h4>
                      <div className="water-glasses">
                        {Array(8).fill(0).map((_, i) => (
                          <span key={i} className={`water-glass ${i < userData.water ? 'filled' : ''}`}>💧</span>
                        ))}
                      </div>
                      <button onClick={addWater} className="add-water-btn">+ Add Glass</button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="no-plan-message">
                  <h3>⚠️ No nutrition plan available</h3>
                  <p>Complete your profile setup to get a personalized nutrition plan.</p>
                </div>
              )}
            </div>
          </div>
        )
      
      case 'community':
        return (
          <div className="page">
            <h2>🏆 Community</h2>
            <div className="community-section">
              <div className="challenge-card">
                <h3>30-Day Step Challenge</h3>
                <p>Join 1,234 people walking 10,000 steps daily!</p>
                <p>Your progress: {userData.steps >= 10000 ? '✅ Complete' : `${userData.steps}/10,000 steps`}</p>
                <button className="btn-primary">Join Challenge</button>
              </div>
              <div className="challenge-card">
                <h3>Weekly Workout Goal</h3>
                <p>Complete 4 workouts this week</p>
                <p>Progress: {userData.workouts}/4 workouts</p>
                <button className="btn-primary">Join Challenge</button>
              </div>
            </div>
          </div>
        )
      
      default:
        return (
          <div className="hero-section">
            <h1>Welcome to FitBuddy</h1>
            <p className="hero-subtitle">Your Personal Fitness Companion</p>
            <div className="features-grid">
              <div className="feature-card" onClick={() => setCurrentPage('dashboard')}>
                <h3>🎯 Interactive Dashboard</h3>
                <p>Track steps, water, workouts, and mood in real-time</p>
              </div>
              <div className="feature-card" onClick={() => setCurrentPage('workouts')}>
                <h3>💪 Workout Logging</h3>
                <p>Quick log your cardio, strength, and yoga sessions</p>
              </div>
              <div className="feature-card" onClick={() => setCurrentPage('nutrition')}>
                <h3>🍎 Nutrition Tracking</h3>
                <p>Monitor meals and stay hydrated throughout the day</p>
              </div>
              <div className="feature-card" onClick={() => setCurrentPage('community')}>
                <h3>🏆 Community Challenges</h3>
                <p>Join fitness challenges and stay motivated with others</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="app">
      {renderContent()}
    </div>
  )
}

export default App
