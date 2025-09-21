import { useState } from 'react'
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('home')
  const [userLoggedIn, setUserLoggedIn] = useState(false)

  const renderSection = () => {
    switch(currentSection) {
      case 'dashboard':
        return (
          <div className="section">
            <h2>📊 Dashboard</h2>
            <p>Track your daily fitness progress here!</p>
            <div className="dashboard-preview">
              <div className="stat-card">
                <h3>🏃‍♂️ Steps Today</h3>
                <p>0 / 10,000 steps</p>
              </div>
              <div className="stat-card">
                <h3>💧 Water Intake</h3>
                <p>0 / 8 glasses</p>
              </div>
            </div>
          </div>
        )
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
        return (
          <div className="section">
            <h2>🏆 Community</h2>
            <p>Join fitness challenges and connect with others!</p>
            <div className="community-preview">
              <div className="challenge-card">
                <h3>30-Day Step Challenge</h3>
                <p>Walk 10,000 steps daily for 30 days</p>
                <button className="btn-primary">Join Challenge</button>
              </div>
            </div>
          </div>
        )
      case 'workouts':
        return (
          <div className="section">
            <h2>🏋️‍♀️ Workouts</h2>
            <p>Log and track your workouts!</p>
            <button className="btn-primary">+ Add Workout</button>
          </div>
        )
      case 'nutrition':
        return (
          <div className="section">
            <h2>🍎 Nutrition</h2>
            <p>Track your meals and nutrition!</p>
            <button className="btn-primary">+ Add Meal</button>
          </div>
        )
      case 'analytics':
        return (
          <div className="section">
            <h2>📊 Analytics</h2>
            <p>View your progress and insights!</p>
            <div className="progress-preview">
              <p>Progress charts and statistics will appear here.</p>
            </div>
          </div>
        )
      case 'chatbot':
        return (
          <div className="section">
            <h2>🤖 AI Chatbot</h2>
            <p>Chat with your AI fitness assistant!</p>
            <div className="chat-preview">
              <p>AI: Hi! I'm here to help with your fitness journey. How can I assist you today?</p>
            </div>
          </div>
        )
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
            {userLoggedIn ? (
              <div className="user-profile">
                <span className="user-name">FitBuddy User</span>
                <button className="logout-btn" onClick={() => setUserLoggedIn(false)}>
                  Logout
                </button>
              </div>
            ) : (
              <button className="login-btn" onClick={() => setUserLoggedIn(true)}>
                Login
              </button>
            )}
          </div>
        </nav>
        <main className="main-content">
          {renderSection()}
        </main>
        
      </div>
    )
}

export default App
