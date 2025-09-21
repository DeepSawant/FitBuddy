import { useState } from 'react'

const ProfileSetup = ({ onProfileComplete, userName }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [profileData, setProfileData] = useState({
    // Personal Info
    age: '',
    gender: '',
    height: '',
    weight: '',
    
    // Lifestyle
    dietPreference: '',
    activityLevel: '',
    fitnessExperience: '',
    
    // Goals
    primaryGoal: '',
    targetWeight: '',
    timeCommitment: '',
    
    // Health
    medicalConditions: [],
    injuries: []
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProfileData({
      ...profileData,
      [name]: value
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target
    if (checked) {
      setProfileData({
        ...profileData,
        [field]: [...profileData[field], value]
      })
    } else {
      setProfileData({
        ...profileData,
        [field]: profileData[field].filter(item => item !== value)
      })
    }
  }

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!profileData.age) newErrors.age = 'Age is required'
      if (!profileData.gender) newErrors.gender = 'Gender is required'
      if (!profileData.height) newErrors.height = 'Height is required'
      if (!profileData.weight) newErrors.weight = 'Current weight is required'
    }
    
    if (step === 2) {
      if (!profileData.dietPreference) newErrors.dietPreference = 'Diet preference is required'
      if (!profileData.activityLevel) newErrors.activityLevel = 'Activity level is required'
      if (!profileData.fitnessExperience) newErrors.fitnessExperience = 'Fitness experience is required'
    }
    
    if (step === 3) {
      if (!profileData.primaryGoal) newErrors.primaryGoal = 'Primary goal is required'
      if (!profileData.timeCommitment) newErrors.timeCommitment = 'Time commitment is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      onProfileComplete(profileData)
    }
  }

  const renderStep1 = () => (
    <div className="profile-step">
      <h3>📋 Basic Information</h3>
      <p>Let's start with some basic details about you</p>
      
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            placeholder="Your age"
            value={profileData.age}
            onChange={handleInputChange}
            className={errors.age ? 'error' : ''}
            min="13"
            max="100"
          />
          {errors.age && <span className="error-message">{errors.age}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={profileData.gender}
            onChange={handleInputChange}
            className={errors.gender ? 'error' : ''}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && <span className="error-message">{errors.gender}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="height">Height (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            placeholder="Your height"
            value={profileData.height}
            onChange={handleInputChange}
            className={errors.height ? 'error' : ''}
            min="100"
            max="250"
          />
          {errors.height && <span className="error-message">{errors.height}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="weight">Current Weight (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            placeholder="Your current weight"
            value={profileData.weight}
            onChange={handleInputChange}
            className={errors.weight ? 'error' : ''}
            min="30"
            max="300"
          />
          {errors.weight && <span className="error-message">{errors.weight}</span>}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="profile-step">
      <h3>🍽️ Lifestyle & Experience</h3>
      <p>Tell us about your lifestyle and fitness background</p>
      
      <div className="form-group">
        <label htmlFor="dietPreference">Diet Preference</label>
        <select
          id="dietPreference"
          name="dietPreference"
          value={profileData.dietPreference}
          onChange={handleInputChange}
          className={errors.dietPreference ? 'error' : ''}
        >
          <option value="">Select diet preference</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="non-vegetarian">Non-Vegetarian</option>
          <option value="pescatarian">Pescatarian</option>
          <option value="keto">Ketogenic</option>
          <option value="paleo">Paleo</option>
          <option value="no-preference">No Preference</option>
        </select>
        {errors.dietPreference && <span className="error-message">{errors.dietPreference}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="activityLevel">Current Activity Level</label>
        <select
          id="activityLevel"
          name="activityLevel"
          value={profileData.activityLevel}
          onChange={handleInputChange}
          className={errors.activityLevel ? 'error' : ''}
        >
          <option value="">Select activity level</option>
          <option value="sedentary">Sedentary (little to no exercise)</option>
          <option value="lightly-active">Lightly Active (1-3 days/week)</option>
          <option value="moderately-active">Moderately Active (3-5 days/week)</option>
          <option value="very-active">Very Active (6-7 days/week)</option>
          <option value="extremely-active">Extremely Active (2x/day or intense exercise)</option>
        </select>
        {errors.activityLevel && <span className="error-message">{errors.activityLevel}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="fitnessExperience">Fitness Experience</label>
        <select
          id="fitnessExperience"
          name="fitnessExperience"
          value={profileData.fitnessExperience}
          onChange={handleInputChange}
          className={errors.fitnessExperience ? 'error' : ''}
        >
          <option value="">Select experience level</option>
          <option value="beginner">Beginner (0-6 months)</option>
          <option value="intermediate">Intermediate (6 months - 2 years)</option>
          <option value="advanced">Advanced (2+ years)</option>
          <option value="expert">Expert/Professional</option>
        </select>
        {errors.fitnessExperience && <span className="error-message">{errors.fitnessExperience}</span>}
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="profile-step">
      <h3>🎯 Goals & Commitment</h3>
      <p>What do you want to achieve with FitBuddy?</p>
      
      <div className="form-group">
        <label htmlFor="primaryGoal">Primary Fitness Goal</label>
        <select
          id="primaryGoal"
          name="primaryGoal"
          value={profileData.primaryGoal}
          onChange={handleInputChange}
          className={errors.primaryGoal ? 'error' : ''}
        >
          <option value="">Select your primary goal</option>
          <option value="weight-loss">Weight Loss</option>
          <option value="muscle-gain">Muscle Gain</option>
          <option value="strength-building">Strength Building</option>
          <option value="endurance">Improve Endurance</option>
          <option value="general-fitness">General Fitness</option>
          <option value="flexibility">Improve Flexibility</option>
          <option value="sports-performance">Sports Performance</option>
          <option value="rehabilitation">Rehabilitation/Recovery</option>
        </select>
        {errors.primaryGoal && <span className="error-message">{errors.primaryGoal}</span>}
      </div>

      {(profileData.primaryGoal === 'weight-loss' || profileData.primaryGoal === 'muscle-gain') && (
        <div className="form-group">
          <label htmlFor="targetWeight">Target Weight (kg)</label>
          <input
            type="number"
            id="targetWeight"
            name="targetWeight"
            placeholder="Your target weight"
            value={profileData.targetWeight}
            onChange={handleInputChange}
            min="30"
            max="300"
          />
        </div>
      )}

      <div className="form-group">
        <label htmlFor="timeCommitment">Time Commitment per Week</label>
        <select
          id="timeCommitment"
          name="timeCommitment"
          value={profileData.timeCommitment}
          onChange={handleInputChange}
          className={errors.timeCommitment ? 'error' : ''}
        >
          <option value="">Select time commitment</option>
          <option value="2-3-hours">2-3 hours/week</option>
          <option value="4-5-hours">4-5 hours/week</option>
          <option value="6-8-hours">6-8 hours/week</option>
          <option value="9-12-hours">9-12 hours/week</option>
          <option value="12+-hours">12+ hours/week</option>
        </select>
        {errors.timeCommitment && <span className="error-message">{errors.timeCommitment}</span>}
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="profile-step">
      <h3>🏥 Health & Safety</h3>
      <p>Help us create a safe workout plan for you (Optional)</p>
      
      <div className="form-group">
        <label>Do you have any medical conditions?</label>
        <div className="checkbox-group">
          {['diabetes', 'hypertension', 'heart-disease', 'asthma', 'arthritis', 'back-problems', 'none'].map(condition => (
            <label key={condition} className="checkbox-label">
              <input
                type="checkbox"
                value={condition}
                checked={profileData.medicalConditions.includes(condition)}
                onChange={(e) => handleCheckboxChange(e, 'medicalConditions')}
              />
              {condition.charAt(0).toUpperCase() + condition.slice(1).replace('-', ' ')}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Do you have any current injuries?</label>
        <div className="checkbox-group">
          {['knee-injury', 'shoulder-injury', 'back-injury', 'ankle-injury', 'wrist-injury', 'none'].map(injury => (
            <label key={injury} className="checkbox-label">
              <input
                type="checkbox"
                value={injury}
                checked={profileData.injuries.includes(injury)}
                onChange={(e) => handleCheckboxChange(e, 'injuries')}
              />
              {injury.charAt(0).toUpperCase() + injury.slice(1).replace('-', ' ')}
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="profile-setup">
      <div className="profile-container">
        <div className="profile-header">
          <h2>👋 Welcome, {userName}!</h2>
          <p>Let's personalize your fitness journey</p>
          
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
          </div>
          <span className="progress-text">Step {currentStep} of 4</span>
        </div>

        <div className="profile-form">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          <div className="form-actions">
            {currentStep > 1 && (
              <button type="button" className="btn-secondary" onClick={handleBack}>
                ← Back
              </button>
            )}
            
            {currentStep < 4 ? (
              <button type="button" className="btn-primary" onClick={handleNext}>
                Next →
              </button>
            ) : (
              <button type="button" className="btn-primary" onClick={handleSubmit}>
                Complete Setup 🎉
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetup