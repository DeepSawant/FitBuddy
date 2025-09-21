import React from 'react';

const SimpleApp = () => {
  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1>🏋️‍♀️ FitBuddy - Simple Version</h1>
      <p>This is a simple test to see if React is working properly.</p>
      <p>If you see this, the basic React app is loading successfully!</p>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        marginTop: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2>✅ Status: React App is Working!</h2>
        <p>The issue was likely with complex components or dependencies.</p>
        <p>Time: {new Date().toLocaleString()}</p>
      </div>
    </div>
  );
};

export default SimpleApp;