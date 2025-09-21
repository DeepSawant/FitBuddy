import { useState } from 'react'
import './App.css'
import { FitBuddyProvider, useFitBuddy } from './context/FitBuddyContext'
import Dashboard from './components/Dashboard'
import MoodTracker from './components/MoodTracker'
import Community from './components/Community'
import Chatbot from './components/Chatbot'
import AuthModal from './components/AuthModal'
import WorkoutLogger from './components/WorkoutLogger'
import NutritionTracker from './components/NutritionTracker'
import ProgressAnalytics from './components/ProgressAnalytics'

function AppContent() {
  const { state, logout } = useFitBuddy();
  const [currentSection, setCurrentSection] = useState('home')
  const [showAuthModal, setShowAuthModal] = useState(false)

  const renderSection = () => {
    switch(currentSection) {
      case 'dashboard':
        return <Dashboard />
      case 'roadmap':
        return (
          <div className="section">
            <h2>🗺️ Fitness & Nutrition Roadmaps</h2>
            <div className="roadmap-container">
              <div className="roadmap-item">
                <h3>🏃‍♂️ Beginner Fitness Plan</h3>
                <p><strong>Week 1-4:</strong> Building foundation with cardio and basic strength training</p>
                <ul>
                  <li>30 min walks 3x per week</li>
                  <li>Basic bodyweight exercises</li>
                  <li>Flexibility and stretching</li>
                </ul>
              </div>
              <div className="roadmap-item">
                <h3>🥗 Nutrition Goals</h3>
                <p><strong>Focus:</strong> Balanced meals with proper protein intake</p>
                <ul>
                  <li>Eat 5 servings of fruits/vegetables daily</li>
                  <li>Include lean protein in each meal</li>
                  <li>Stay hydrated with 8 glasses of water</li>
                </ul>
              </div>
              <div className="roadmap-item">
                <h3>💪 Intermediate Level</h3>
                <p><strong>Week 5-12:</strong> Increasing intensity and adding variety</p>
                <ul>
                  <li>4-5 workout sessions per week</li>
                  <li>Strength training with weights</li>
                  <li>Track macronutrients</li>
                </ul>
              </div>
            </div>
          </div>
        )
      case 'community':
        return <Community />
      case 'tracker':
        return (
          <div className="section">
            <h2>📱 Health Trackers</h2>
            <div className="trackers-container">
              <MoodTracker />
              
              <div className="tracker-item">
                <h3>💧 Hydration Tracker</h3>
                <p>Track your daily water intake in the Dashboard section. Stay hydrated for optimal performance!</p>
              </div>
              
              <div className="tracker-item">
                <h3>😴 Sleep Tracker</h3>
                <p>Monitor your sleep patterns and quality. Good sleep is essential for recovery and fitness goals.</p>
                <div className="sleep-tips">
                  <h4>Sleep Tips:</h4>
                  <ul>
                    <li>Aim for 7-9 hours per night</li>
                    <li>Keep a consistent sleep schedule</li>
                    <li>Create a relaxing bedtime routine</li>
                    <li>Avoid screens before bed</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      case 'workouts':
        return <WorkoutLogger />
      case 'nutrition':
        return <NutritionTracker />
      case 'analytics':
        return <ProgressAnalytics />
      case 'chatbot':
        return <Chatbot />
      default:
        return (
          <div className="hero-section">
            <h1>Welcome to FitBuddy</h1>
            <p className="hero-subtitle">Your Personal Fitness Companion</p>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🎯 Personalized Dashboard</h3>
                <p>Track your progress with customized metrics and goals</p>
              </div>
              <div className="feature-card">
                <h3>🗺️ Fitness Roadmaps</h3>
                <p>Follow structured plans tailored to your fitness level</p>
              </div>
              <div className="feature-card">
                <h3>😊 Mood Tracking</h3>
                <p>Monitor your mental wellness alongside physical health</p>
              </div>
              <div className="feature-card">
                <h3>🏆 Community Challenges</h3>
                <p>Join group challenges and compete with friends</p>
              </div>
              <div className="feature-card">
                <h3>📈 Progress Analytics</h3>
                <p>Visualize your journey with detailed charts and insights</p>
              </div>
              <div className="feature-card">
                <h3>🤖 AI Chatbot</h3>
                <p>Get personalized fitness and nutrition advice 24/7</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <h2>FitBuddy</h2>
        </div>
        <div className="nav-links">
            <button 
              className={currentSection === 'home' ? 'nav-button active' : 'nav-button'}
              onClick={() => setCurrentSection('home')}
            >
              🏠 Home
            </button>
            <button 
              className={currentSection === 'dashboard' ? 'nav-button active' : 'nav-button'}
              onClick={() => setCurrentSection('dashboard')}
            >
              📊 Dashboard
            </button>
            <button 
              className={currentSection === 'roadmap' ? 'nav-button active' : 'nav-button'}
              onClick={() => setCurrentSection('roadmap')}
            >
              🗺️ Roadmaps
            </button>
            <button 
              className={currentSection === 'community' ? 'nav-button active' : 'nav-button'}
              onClick={() => setCurrentSection('community')}
            >
              🏆 Community
            </button>
            <button 
              className={currentSection === 'tracker' ? 'nav-button active' : 'nav-button'}
              onClick={() => setCurrentSection('tracker')}
            >
              📱 Trackers
            </button>
            <button 
              className={currentSection === 'workouts' ? 'nav-button active' : 'nav-button'}
              onClick={() => setCurrentSection('workouts')}
            >
              🏋️‍♀️ Workouts
            </button>
            <button 
              className={currentSection === 'nutrition' ? 'nav-button active' : 'nav-button'}
              onClick={() => setCurrentSection('nutrition')}
            >
              🍎 Nutrition
            </button>
            <button 
              className={currentSection === 'analytics' ? 'nav-button active' : 'nav-button'}
              onClick={() => setCurrentSection('analytics')}
            >
              📊 Analytics
            </button>
            <button 
              className={currentSection === 'chatbot' ? 'nav-button active' : 'nav-button'}
              onClick={() => setCurrentSection('chatbot')}
            >
              🤖 AI Chat
            </button>
          </div>
          <div className="nav-user">
            {state.user.isLoggedIn ? (
              <div className="user-profile">
                <img src={state.user.avatar} alt="Profile" className="user-avatar" />
                <span className="user-name">{state.user.name}</span>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="login-btn" onClick={() => setShowAuthModal(true)}>
                Login
              </button>
            )}
          </div>
        </nav>
        <main className="main-content">
          {renderSection()}
        </main>
        
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </div>
    )
}

function App() {
  return (
    <FitBuddyProvider>
      <AppContent />
    </FitBuddyProvider>
  )
}

export default App
