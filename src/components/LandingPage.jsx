import { useState } from 'react'

const LandingPage = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Name is required'
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (isLogin) {
      onLogin(formData)
    } else {
      // For signup, treat it the same as login for now
      onLogin(formData)
    }
  }

  return (
    <div className="landing-page">
      <div className="landing-container">
        {/* Left Side - Branding & Features */}
        <div className="landing-left">
          <div className="brand-section">
            <div className="brand-logo">
              <span className="logo-icon">🏋️‍♀️</span>
              <h1 className="brand-name">FitBuddy</h1>
            </div>
            <p className="brand-tagline">Transform your fitness journey with AI-powered personalized coaching</p>
          </div>
          
          <div className="features-showcase">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <div>
                <h3>Smart Planning</h3>
                <p>AI-generated workout & nutrition plans tailored to your goals</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <div>
                <h3>Progress Tracking</h3>
                <p>Real-time analytics to monitor your fitness journey</p>
              </div>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <div>
                <h3>Community & Challenges</h3>
                <p>Stay motivated with community support and challenges</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial">
            <p>"FitBuddy helped me achieve my fitness goals faster than I ever imagined!"</p>
            <span>- Sarah M., Marathon Runner</span>
          </div>
        </div>
        
        {/* Right Side - Authentication Form */}
        <div className="landing-right">
          <div className="auth-container">
            <div className="auth-header">
              <h2>{isLogin ? 'Welcome Back!' : 'Join FitBuddy Today'}</h2>
              <p>{isLogin ? 'Continue your fitness journey' : 'Start your transformation now'}</p>
            </div>
            
            <div className="auth-toggle">
              <button 
                className={`toggle-btn ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
                type="button"
              >
                Sign In
              </button>
              <button 
                className={`toggle-btn ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
                type="button"
              >
                Sign Up
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
              )}
              
              <button type="submit" className="auth-submit-btn">
                {isLogin ? '🚀 Sign In' : '🎯 Create Account'}
              </button>
            </form>
            
            <div className="auth-footer">
              <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button"
                  className="link-btn"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? 'Sign up here' : 'Sign in here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage