import { useState, useEffect } from 'react'
import LandingPage from './components/LandingPage'
import ProfileSetup from './components/ProfileSetup'
import PersonalizedPlan from './components/PersonalizedPlan'
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
        return (
          <div className="page">
            <h2>📊 Dashboard</h2>
            <div className="dashboard-grid">
              <div className="widget">
                <h3>🏃‍♂️ Steps Today</h3>
                <div className="progress-circle">
                  <span className="progress-number">{userData.steps.toLocaleString()}</span>
                  <span className="progress-goal">/ 10,000</span>
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
                  <span className="water-count">{userData.water} / 8 glasses</span>
                  <div className="water-glasses">
                    {Array(8).fill(0).map((_, i) => (
                      <span key={i} className={`water-glass ${i < userData.water ? 'filled' : ''}`}>👥</span>
                    ))}
                  </div>
                </div>
                <button onClick={addWater} className="btn-primary">+ Add Glass</button>
              </div>
              
              <div className="widget">
                <h3>💪 Workouts</h3>
                <div className="workout-count">
                  <span>{userData.workouts} workouts this week</span>
                </div>
                <button onClick={addWorkout} className="btn-primary">
                  + Log Workout
                </button>
              </div>
              
              <div className="widget">
                <h3>😊 Mood</h3>
                <div className="mood-display">
                  <span className="mood-score">{userData.mood}/10</span>
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
              </div>
            </div>
          </div>
        )
      
      case 'workouts':
        return (
          <div className="page">
            <h2>💪 Workouts</h2>
            <div className="workout-section">
              <div className="quick-workouts">
                <h3>Quick Log</h3>
                <div className="workout-buttons">
                  <button onClick={addWorkout} className="workout-type-btn">
                    🏃‍♂️ Cardio
                  </button>
                  <button onClick={addWorkout} className="workout-type-btn">
                    💪 Strength
                  </button>
                  <button onClick={addWorkout} className="workout-type-btn">
                    🧘‍♀️ Yoga
                  </button>
                </div>
              </div>
              <div className="workout-stats">
                <h3>This Week: {userData.workouts} workouts</h3>
                <p>Great job keeping active! 🎉</p>
              </div>
            </div>
          </div>
        )
      
      case 'nutrition':
        return (
          <div className="page">
            <h2>🍎 Nutrition</h2>
            <div className="nutrition-section">
              <div className="quick-meals">
                <h3>Quick Log</h3>
                <div className="meal-buttons">
                  <button className="meal-btn">🍳 Breakfast</button>
                  <button className="meal-btn">🥙 Lunch</button>
                  <button className="meal-btn">🍽️ Dinner</button>
                  <button className="meal-btn">🍎 Snack</button>
                </div>
              </div>
              <div className="hydration-reminder">
                <h3>Hydration: {userData.water}/8 glasses today</h3>
                <button onClick={addWater} className="btn-primary">+ Add Water</button>
              </div>
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
