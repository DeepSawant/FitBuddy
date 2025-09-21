import { useState, useEffect } from 'react'

const PersonalizedPlan = ({ profileData, userName, onPlanGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(true)
  const [generatedPlan, setGeneratedPlan] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!profileData) {
      console.error('No profile data provided')
      return
    }
    
    // Simulate plan generation
    const generatePlan = async () => {
      try {
        setIsGenerating(true)
        
        // Simulate API delay with timeout
        await Promise.race([
          new Promise(resolve => setTimeout(resolve, 3000)),
          new Promise((_, reject) => setTimeout(() => reject(new Error('Generation timeout')), 10000))
        ])
        
        console.log('Profile data received:', profileData)
        const plan = createPersonalizedPlan(profileData)
        console.log('Generated plan:', plan)
        
        setGeneratedPlan(plan)
        setIsGenerating(false)
        
        // Save to localStorage and notify parent
        localStorage.setItem('userPlan', JSON.stringify(plan))
        if (onPlanGenerated) {
          onPlanGenerated(plan)
        }
      } catch (error) {
        console.error('Error generating plan:', error)
        setError(error.message || 'Failed to generate plan')
        setIsGenerating(false)
      }
    }
    
    generatePlan()
  }, [profileData])

  const createPersonalizedPlan = (profile) => {
    // Validate required fields with fallbacks
    const age = parseInt(profile.age) || 25
    const weight = parseInt(profile.weight) || 70
    const height = parseInt(profile.height) || 170
    const gender = profile.gender || 'male'
    const activityLevel = profile.activityLevel || 'moderately-active'
    const primaryGoal = profile.primaryGoal || 'general-fitness'
    const fitnessExperience = profile.fitnessExperience || 'beginner'
    const dietPreference = profile.dietPreference || 'no-preference'
    const timeCommitment = profile.timeCommitment || '4-5-hours'
    
    console.log('Processing profile with values:', { age, weight, height, gender, activityLevel, primaryGoal, fitnessExperience, dietPreference, timeCommitment })
    
    // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation
    const bmr = gender === 'male' 
      ? (10 * weight) + (6.25 * height) - (5 * age) + 5
      : (10 * weight) + (6.25 * height) - (5 * age) - 161

    // Activity multipliers
    const activityMultipliers = {
      'sedentary': 1.2,
      'lightly-active': 1.375,
      'moderately-active': 1.55,
      'very-active': 1.725,
      'extremely-active': 1.9
    }
    
    const dailyCalories = Math.round(bmr * (activityMultipliers[activityLevel] || 1.2))
    
    // Create processed profile object with validated values
    const processedProfile = {
      ...profile,
      age,
      weight,
      height,
      gender,
      activityLevel,
      primaryGoal,
      fitnessExperience,
      dietPreference,
      timeCommitment
    }
    
    // Generate workout plan based on goals and experience
    const workoutPlan = generateWorkoutPlan(processedProfile)
    
    // Generate nutrition plan
    const nutritionPlan = generateNutritionPlan(processedProfile, dailyCalories)
    
    // Generate timeline/roadmap
    const roadmap = generateRoadmap(processedProfile)

    return {
      bmr: Math.round(bmr),
      dailyCalories,
      workoutPlan,
      nutritionPlan,
      roadmap,
      generatedAt: new Date().toISOString()
    }
  }

  const generateWorkoutPlan = (profile) => {
    const { primaryGoal, fitnessExperience, timeCommitment } = profile
    
    let daysPerWeek = 3
    let sessionDuration = 45
    
    // Adjust based on time commitment
    if (timeCommitment.includes('2-3')) {
      daysPerWeek = 2
      sessionDuration = 60
    } else if (timeCommitment.includes('4-5')) {
      daysPerWeek = 3
      sessionDuration = 60
    } else if (timeCommitment.includes('6-8')) {
      daysPerWeek = 4
      sessionDuration = 75
    } else if (timeCommitment.includes('9-12')) {
      daysPerWeek = 5
      sessionDuration = 75
    } else if (timeCommitment.includes('12+')) {
      daysPerWeek = 6
      sessionDuration = 90
    }

    // Base workout structure by goal
    const workoutTemplates = {
      'weight-loss': {
        focus: 'Cardio + Strength Training',
        cardioRatio: 60,
        strengthRatio: 40,
        exercises: ['Walking/Running', 'Cycling', 'Swimming', 'Full Body Strength', 'HIIT']
      },
      'muscle-gain': {
        focus: 'Strength Training + Minimal Cardio',
        cardioRatio: 20,
        strengthRatio: 80,
        exercises: ['Push/Pull/Legs Split', 'Compound Movements', 'Progressive Overload', 'Isolation Exercises']
      },
      'strength-building': {
        focus: 'Heavy Compound Movements',
        cardioRatio: 15,
        strengthRatio: 85,
        exercises: ['Squats', 'Deadlifts', 'Bench Press', 'Overhead Press', 'Rows']
      },
      'endurance': {
        focus: 'Cardiovascular Training',
        cardioRatio: 80,
        strengthRatio: 20,
        exercises: ['Long Distance Running', 'Cycling', 'Swimming', 'Circuit Training']
      },
      'general-fitness': {
        focus: 'Balanced Training',
        cardioRatio: 50,
        strengthRatio: 50,
        exercises: ['Full Body Workouts', 'Cardio Mix', 'Functional Training', 'Flexibility']
      }
    }

    const template = workoutTemplates[primaryGoal] || workoutTemplates['general-fitness']
    
    return {
      daysPerWeek,
      sessionDuration,
      focus: template.focus,
      split: generateWeeklySplit(daysPerWeek, template),
      progression: getProgressionGuidelines(fitnessExperience)
    }
  }

  const generateWeeklySplit = (days, template) => {
    const splits = {
      2: ['Full Body A', 'Full Body B'],
      3: ['Upper Body', 'Lower Body', 'Full Body'],
      4: ['Upper Body', 'Lower Body', 'Cardio', 'Full Body'],
      5: ['Push', 'Pull', 'Legs', 'Cardio', 'Full Body'],
      6: ['Push', 'Pull', 'Legs', 'Push', 'Pull', 'Cardio']
    }
    
    return splits[days] || splits[3]
  }

  const getProgressionGuidelines = (experience) => {
    const guidelines = {
      'beginner': {
        startWeight: '50% of body weight',
        progression: 'Increase weight by 5-10% weekly',
        restDays: 'At least 1 day between sessions',
        focus: 'Form and consistency'
      },
      'intermediate': {
        startWeight: '70% of body weight',
        progression: 'Increase weight by 2.5-5% weekly',
        restDays: 'Active recovery between sessions',
        focus: 'Progressive overload'
      },
      'advanced': {
        startWeight: '80-90% of body weight',
        progression: 'Periodized training approach',
        restDays: 'Strategic deload weeks',
        focus: 'Specialization and peak performance'
      }
    }
    
    return guidelines[experience] || guidelines['beginner']
  }

  const generateNutritionPlan = (profile, calories) => {
    const { primaryGoal, dietPreference } = profile
    
    // Macro distribution based on goals
    const macroDistributions = {
      'weight-loss': { protein: 30, carbs: 35, fat: 35 },
      'muscle-gain': { protein: 25, carbs: 45, fat: 30 },
      'strength-building': { protein: 25, carbs: 45, fat: 30 },
      'endurance': { protein: 20, carbs: 55, fat: 25 },
      'general-fitness': { protein: 25, carbs: 45, fat: 30 }
    }
    
    const macros = macroDistributions[primaryGoal] || macroDistributions['general-fitness']
    
    const proteinCalories = calories * (macros.protein / 100)
    const carbCalories = calories * (macros.carbs / 100)
    const fatCalories = calories * (macros.fat / 100)
    
    return {
      dailyCalories: calories,
      macros: {
        protein: { grams: Math.round(proteinCalories / 4), percentage: macros.protein },
        carbs: { grams: Math.round(carbCalories / 4), percentage: macros.carbs },
        fat: { grams: Math.round(fatCalories / 9), percentage: macros.fat }
      },
      mealTiming: generateMealPlan(dietPreference),
      hydration: Math.round(profile.weight * 35) // ml per kg body weight
    }
  }

  const generateMealPlan = (dietPreference) => {
    const mealPlans = {
      'vegetarian': {
        breakfast: ['Oats with fruits', 'Greek yogurt with nuts', 'Vegetarian protein smoothie'],
        lunch: ['Quinoa bowl with vegetables', 'Lentil curry with rice', 'Veggie wrap'],
        dinner: ['Tofu stir-fry', 'Chickpea curry', 'Vegetarian pasta'],
        snacks: ['Nuts and seeds', 'Fruits', 'Hummus with veggies']
      },
      'vegan': {
        breakfast: ['Oats with plant milk', 'Smoothie bowl', 'Avocado toast'],
        lunch: ['Buddha bowl', 'Lentil soup', 'Plant-based wrap'],
        dinner: ['Quinoa stir-fry', 'Bean curry', 'Veggie pasta'],
        snacks: ['Nuts', 'Fruits', 'Plant-based protein bars']
      },
      'non-vegetarian': {
        breakfast: ['Eggs with toast', 'Protein smoothie', 'Greek yogurt'],
        lunch: ['Chicken with rice', 'Fish with quinoa', 'Turkey wrap'],
        dinner: ['Grilled protein with vegetables', 'Lean meat stir-fry', 'Fish with sweet potato'],
        snacks: ['Greek yogurt', 'Protein bars', 'Nuts']
      }
    }
    
    return mealPlans[dietPreference] || mealPlans['non-vegetarian']
  }

  const generateRoadmap = (profile) => {
    const milestones = []
    const { primaryGoal, fitnessExperience } = profile
    
    // Week 1-2: Foundation
    milestones.push({
      period: 'Week 1-2',
      title: 'Foundation Phase',
      goals: [
        'Establish workout routine',
        'Learn proper form',
        'Track baseline metrics',
        'Adjust nutrition habits'
      ],
      focus: 'Consistency and habit formation'
    })
    
    // Week 3-6: Building
    milestones.push({
      period: 'Week 3-6',
      title: 'Building Phase',
      goals: [
        'Increase workout intensity',
        'Progressive overload',
        'Fine-tune nutrition',
        'Monitor progress'
      ],
      focus: 'Strength and endurance building'
    })
    
    // Week 7-12: Progression
    milestones.push({
      period: 'Week 7-12',
      title: 'Progression Phase',
      goals: [
        'Advanced exercise variations',
        'Optimize recovery',
        'Track body composition changes',
        'Adjust macros based on progress'
      ],
      focus: 'Measurable improvements'
    })
    
    // Week 13+: Specialization
    milestones.push({
      period: 'Week 13+',
      title: 'Specialization Phase',
      goals: [
        'Goal-specific training',
        'Peak performance',
        'Long-term maintenance',
        'New goal setting'
      ],
      focus: 'Mastery and goal achievement'
    })
    
    return milestones
  }

  // Show error state
  if (error) {
    return (
      <div className="plan-generation">
        <div className="generation-container">
          <h2>❌ Oops! Something went wrong</h2>
          <p style={{ color: 'white', marginBottom: '2rem' }}>{error}</p>
          <button 
            className="btn-primary" 
            onClick={() => {
              setError(null)
              setIsGenerating(true)
              window.location.reload()
            }}
            style={{ padding: '1rem 2rem', fontSize: '1rem' }}
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }
  
  // Show loading state
  if (isGenerating) {
    return (
      <div className="plan-generation">
        <div className="generation-container">
          <div className="generation-spinner">
            <div className="spinner"></div>
          </div>
          <h2>🧠 Analyzing Your Profile</h2>
          <p>Creating your personalized fitness plan...</p>
          <div className="generation-steps">
            <div className="step active">Calculating daily calorie needs</div>
            <div className="step active">Designing workout routine</div>
            <div className="step active">Planning nutrition strategy</div>
            <div className="step">Generating progress roadmap</div>
          </div>
        </div>
      </div>
    )
  }

  // Safety check for generatedPlan
  if (!generatedPlan) {
    return (
      <div className="plan-generation">
        <div className="generation-container">
          <h2>⚠️ Loading your plan...</h2>
          <p style={{ color: 'white' }}>Please wait while we prepare your personalized fitness plan.</p>
          <button 
            className="btn-primary" 
            onClick={() => window.location.reload()}
            style={{ marginTop: '2rem', padding: '1rem 2rem' }}
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="personalized-plan">
      <div className="plan-container">
        <div className="plan-header">
          <h2>🎉 Your Personalized Fitness Plan</h2>
          <p>Based on your profile, here's your custom roadmap to success!</p>
        </div>

        <div className="plan-sections">
          {/* Calorie & BMR Info */}
          <div className="plan-section">
            <h3>📊 Your Numbers</h3>
            <div className="metrics-grid">
              <div className="metric-card">
                <span className="metric-value">{generatedPlan.bmr}</span>
                <span className="metric-label">BMR (calories/day)</span>
              </div>
              <div className="metric-card">
                <span className="metric-value">{generatedPlan.dailyCalories}</span>
                <span className="metric-label">Daily Calories</span>
              </div>
            </div>
          </div>

          {/* Workout Plan */}
          <div className="plan-section">
            <h3>💪 Your Workout Plan</h3>
            <div className="workout-overview">
              <p><strong>Focus:</strong> {generatedPlan.workoutPlan.focus}</p>
              <p><strong>Frequency:</strong> {generatedPlan.workoutPlan.daysPerWeek} days per week</p>
              <p><strong>Duration:</strong> {generatedPlan.workoutPlan.sessionDuration} minutes per session</p>
              
              <div className="weekly-split">
                <h4>Weekly Split:</h4>
                <ul>
                  {generatedPlan.workoutPlan.split.map((day, index) => (
                    <li key={index}>Day {index + 1}: {day}</li>
                  ))}
                </ul>
              </div>
              
              <div className="progression-info">
                <h4>Progression Guidelines:</h4>
                <p><strong>Starting Point:</strong> {generatedPlan.workoutPlan.progression.startWeight}</p>
                <p><strong>Progression:</strong> {generatedPlan.workoutPlan.progression.progression}</p>
                <p><strong>Focus:</strong> {generatedPlan.workoutPlan.progression.focus}</p>
              </div>
            </div>
          </div>

          {/* Nutrition Plan */}
          <div className="plan-section">
            <h3>🥗 Your Nutrition Plan</h3>
            <div className="nutrition-overview">
              <div className="macros-breakdown">
                <h4>Daily Macros:</h4>
                <div className="macro-bars">
                  <div className="macro-item">
                    <span>Protein: {generatedPlan.nutritionPlan.macros.protein.grams}g ({generatedPlan.nutritionPlan.macros.protein.percentage}%)</span>
                    <div className="macro-bar">
                      <div className="macro-fill protein" style={{ width: `${generatedPlan.nutritionPlan.macros.protein.percentage}%` }}></div>
                    </div>
                  </div>
                  <div className="macro-item">
                    <span>Carbs: {generatedPlan.nutritionPlan.macros.carbs.grams}g ({generatedPlan.nutritionPlan.macros.carbs.percentage}%)</span>
                    <div className="macro-bar">
                      <div className="macro-fill carbs" style={{ width: `${generatedPlan.nutritionPlan.macros.carbs.percentage}%` }}></div>
                    </div>
                  </div>
                  <div className="macro-item">
                    <span>Fat: {generatedPlan.nutritionPlan.macros.fat.grams}g ({generatedPlan.nutritionPlan.macros.fat.percentage}%)</span>
                    <div className="macro-bar">
                      <div className="macro-fill fat" style={{ width: `${generatedPlan.nutritionPlan.macros.fat.percentage}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="meal-suggestions">
                <h4>Meal Ideas:</h4>
                <div className="meals-grid">
                  <div className="meal-category">
                    <h5>Breakfast</h5>
                    <ul>
                      {generatedPlan.nutritionPlan.mealTiming.breakfast.map((meal, index) => (
                        <li key={index}>{meal}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="meal-category">
                    <h5>Lunch</h5>
                    <ul>
                      {generatedPlan.nutritionPlan.mealTiming.lunch.map((meal, index) => (
                        <li key={index}>{meal}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="meal-category">
                    <h5>Dinner</h5>
                    <ul>
                      {generatedPlan.nutritionPlan.mealTiming.dinner.map((meal, index) => (
                        <li key={index}>{meal}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <p><strong>Daily Water Goal:</strong> {generatedPlan.nutritionPlan.hydration}ml</p>
            </div>
          </div>

          {/* Roadmap */}
          <div className="plan-section">
            <h3>🛣️ Your Progress Roadmap</h3>
            <div className="roadmap">
              {generatedPlan.roadmap.map((milestone, index) => (
                <div key={index} className="milestone">
                  <div className="milestone-header">
                    <h4>{milestone.period}: {milestone.title}</h4>
                    <p className="milestone-focus">{milestone.focus}</p>
                  </div>
                  <ul className="milestone-goals">
                    {milestone.goals.map((goal, goalIndex) => (
                      <li key={goalIndex}>{goal}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="plan-actions">
          <button 
            className="btn-primary"
            onClick={() => onPlanGenerated(generatedPlan, true)}
          >
            Start My Journey 🚀
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalizedPlan