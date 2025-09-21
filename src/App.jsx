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
    // Check if user is already logged in and has completed setup
    const savedUser = localStorage.getItem('fitbuddyUser')
    const savedProfile = localStorage.getItem('userProfile')
    const savedPlan = localStorage.getItem('userPlan')
    
    if (savedUser && savedProfile && savedPlan) {
      setUser(JSON.parse(savedUser))
      setUserProfile(JSON.parse(savedProfile))
      setUserPlan(JSON.parse(savedPlan))
      setAppState('dashboard')
    } else if (savedUser && savedProfile) {
      setUser(JSON.parse(savedUser))
      setUserProfile(JSON.parse(savedProfile))
      setAppState('plan-generation')
    } else if (savedUser) {
      setUser(JSON.parse(savedUser))
      setAppState('profile-setup')
    } else {
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
    setUser(null)
    setUserProfile(null)
    setUserPlan(null)
    setAppState('landing')
  }

  const updateSteps = (steps) => {
    setUserData(prev => ({ ...prev, steps: parseInt(steps) }))
  }

  const addWater = () => {
    setUserData(prev => ({ ...prev, water: Math.min(prev.water + 1, 8) }))
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
                <button onClick={() => setUserData(prev => ({ ...prev, workouts: prev.workouts + 1 }))} className="btn-primary">
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
                        onClick={() => setUserData(prev => ({ ...prev, mood: num }))}
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
                  <button onClick={() => setUserData(prev => ({ ...prev, workouts: prev.workouts + 1 }))} className="workout-type-btn">
                    🏃‍♂️ Cardio
                  </button>
                  <button onClick={() => setUserData(prev => ({ ...prev, workouts: prev.workouts + 1 }))} className="workout-type-btn">
                    💪 Strength
                  </button>
                  <button onClick={() => setUserData(prev => ({ ...prev, workouts: prev.workouts + 1 }))} className="workout-type-btn">
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
