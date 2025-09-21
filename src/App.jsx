import React from 'react'

function App() {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '15px',
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          color: '#667eea',
          textAlign: 'center',
          fontSize: '3rem',
          marginBottom: '1rem'
        }}>🏋️‍♀️ FitBuddy</h1>
        
        <p style={{
          textAlign: 'center',
          fontSize: '1.3rem',
          color: '#666',
          marginBottom: '2rem'
        }}>Your Personal Fitness Companion</p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginTop: '2rem'
        }}>
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '2rem',
            borderRadius: '15px',
            textAlign: 'center',
            borderLeft: '4px solid #667eea'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>🎯 Dashboard</h3>
            <p style={{ color: '#666' }}>Track your progress with customized metrics</p>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '2rem',
            borderRadius: '15px',
            textAlign: 'center',
            borderLeft: '4px solid #667eea'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>💪 Workouts</h3>
            <p style={{ color: '#666' }}>Log and track your exercise routines</p>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '2rem',
            borderRadius: '15px',
            textAlign: 'center',
            borderLeft: '4px solid #667eea'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>🍎 Nutrition</h3>
            <p style={{ color: '#666' }}>Monitor your daily nutrition intake</p>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '2rem',
            borderRadius: '15px',
            textAlign: 'center',
            borderLeft: '4px solid #667eea'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>📊 Analytics</h3>
            <p style={{ color: '#666' }}>View your fitness progress and trends</p>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '2rem',
            borderRadius: '15px',
            textAlign: 'center',
            borderLeft: '4px solid #667eea'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>🏆 Community</h3>
            <p style={{ color: '#666' }}>Join challenges with other fitness enthusiasts</p>
          </div>
          
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '2rem',
            borderRadius: '15px',
            textAlign: 'center',
            borderLeft: '4px solid #667eea'
          }}>
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>🤖 AI Assistant</h3>
            <p style={{ color: '#666' }}>Get personalized fitness advice 24/7</p>
          </div>
        </div>
        
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '2rem',
          backgroundColor: '#e8f2ff',
          borderRadius: '10px'
        }}>
          <h2 style={{ color: '#667eea', marginBottom: '1rem' }}>✅ Website Status</h2>
          <p style={{ color: '#333', fontSize: '1.1rem' }}>FitBuddy is now loading successfully!</p>
          <p style={{ color: '#666', marginTop: '0.5rem' }}>Time: {new Date().toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default App
