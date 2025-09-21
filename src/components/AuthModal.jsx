import React, { useState } from 'react';
import { useFitBuddy } from '../context/FitBuddyContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    height: '',
    currentWeight: '',
    targetWeight: '',
    fitnessLevel: 'beginner'
  });
  const { login } = useFitBuddy();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate authentication (in real app, this would call an API)
    const userData = {
      name: formData.name,
      email: formData.email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=4F46E5&color=fff`,
      profile: {
        age: parseInt(formData.age),
        height: parseInt(formData.height),
        currentWeight: parseInt(formData.currentWeight),
        targetWeight: parseInt(formData.targetWeight),
        fitnessLevel: formData.fitnessLevel,
        joinDate: new Date().toISOString()
      }
    };
    
    login(userData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{isLogin ? 'Welcome Back!' : 'Join FitBuddy'}</h2>
        
        <div className="auth-toggle">
          <button 
            className={isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={!isLogin ? 'active' : ''} 
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {!isLogin && (
            <>
              <div className="form-row">
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="height"
                  placeholder="Height (cm)"
                  value={formData.height}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-row">
                <input
                  type="number"
                  name="currentWeight"
                  placeholder="Current Weight (kg)"
                  value={formData.currentWeight}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="number"
                  name="targetWeight"
                  placeholder="Target Weight (kg)"
                  value={formData.targetWeight}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleInputChange}
                required
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </>
          )}

          <button type="submit" className="auth-submit">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            className="auth-link" 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;