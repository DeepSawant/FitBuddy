import React, { useState } from 'react';
import { useFitBuddy } from '../context/FitBuddyContext';
import { format } from 'date-fns';

const NutritionTracker = () => {
  const { state, dispatch } = useFitBuddy();
  const [mealForm, setMealForm] = useState({
    type: 'breakfast',
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fats: '',
    notes: ''
  });
  const [showForm, setShowForm] = useState(false);

  const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

  const handleInputChange = (e) => {
    setMealForm({
      ...mealForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const meal = {
      id: Date.now().toString(),
      ...mealForm,
      calories: parseInt(mealForm.calories),
      protein: parseFloat(mealForm.protein) || 0,
      carbs: parseFloat(mealForm.carbs) || 0,
      fats: parseFloat(mealForm.fats) || 0,
      date: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_MEAL', payload: meal });
    setMealForm({
      type: 'breakfast',
      name: '',
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
      notes: ''
    });
    setShowForm(false);
  };

  const getMealIcon = (type) => {
    const icons = {
      breakfast: '🥞',
      lunch: '🥙',
      dinner: '🍽️',
      snack: '🍎'
    };
    return icons[type] || '🍽️';
  };

  const getTodaysMeals = () => {
    const today = new Date().toDateString();
    return (state.nutrition?.dailyMeals || []).filter(meal => 
      new Date(meal.date).toDateString() === today
    );
  };

  const getTodaysNutrition = () => {
    const todaysMeals = getTodaysMeals();
    return todaysMeals.reduce((total, meal) => ({
      calories: total.calories + meal.calories,
      protein: total.protein + meal.protein,
      carbs: total.carbs + meal.carbs,
      fats: total.fats + meal.fats
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });
  };

  const nutrition = getTodaysNutrition();
  const calorieGoal = state.nutrition?.calorieGoal || 2200;

  return (
    <div className="nutrition-tracker">
      <div className="nutrition-header">
        <h2>🍎 Nutrition Tracker</h2>
        <button 
          className="add-meal-btn" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ Log Meal'}
        </button>
      </div>

      {/* Daily Summary */}
      <div className="nutrition-summary">
        <div className="calorie-progress">
          <div className="calorie-circle">
            <div className="calorie-text">
              <div className="calorie-number">{nutrition.calories}</div>
              <div className="calorie-goal">/ {calorieGoal} cal</div>
            </div>
            <svg className="progress-ring" width="120" height="120">
              <circle
                className="progress-ring-background"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="transparent"
                r="52"
                cx="60"
                cy="60"
              />
              <circle
                className="progress-ring-progress"
                stroke="#4f46e5"
                strokeWidth="8"
                fill="transparent"
                r="52"
                cx="60"
                cy="60"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - Math.min(nutrition.calories / calorieGoal, 1))}`}
              />
            </svg>
          </div>
        </div>

        <div className="macro-stats">
          <div className="macro-item">
            <div className="macro-label">Protein</div>
            <div className="macro-value">{nutrition.protein.toFixed(1)}g</div>
            <div className="macro-bar">
              <div 
                className="macro-fill protein" 
                style={{width: `${Math.min((nutrition.protein / (calorieGoal * 0.3 / 4)) * 100, 100)}%`}}
              ></div>
            </div>
          </div>
          <div className="macro-item">
            <div className="macro-label">Carbs</div>
            <div className="macro-value">{nutrition.carbs.toFixed(1)}g</div>
            <div className="macro-bar">
              <div 
                className="macro-fill carbs" 
                style={{width: `${Math.min((nutrition.carbs / (calorieGoal * 0.5 / 4)) * 100, 100)}%`}}
              ></div>
            </div>
          </div>
          <div className="macro-item">
            <div className="macro-label">Fats</div>
            <div className="macro-value">{nutrition.fats.toFixed(1)}g</div>
            <div className="macro-bar">
              <div 
                className="macro-fill fats" 
                style={{width: `${Math.min((nutrition.fats / (calorieGoal * 0.2 / 9)) * 100, 100)}%`}}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Meal Form */}
      {showForm && (
        <div className="meal-form-container">
          <form onSubmit={handleSubmit} className="meal-form">
            <h3>Log New Meal</h3>
            
            <select
              name="type"
              value={mealForm.type}
              onChange={handleInputChange}
              required
            >
              {mealTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="name"
              placeholder="Meal/Food name"
              value={mealForm.name}
              onChange={handleInputChange}
              required
            />

            <input
              type="number"
              name="calories"
              placeholder="Calories"
              value={mealForm.calories}
              onChange={handleInputChange}
              required
              min="1"
            />

            <div className="macro-inputs">
              <input
                type="number"
                name="protein"
                placeholder="Protein (g)"
                value={mealForm.protein}
                onChange={handleInputChange}
                step="0.1"
                min="0"
              />
              <input
                type="number"
                name="carbs"
                placeholder="Carbs (g)"
                value={mealForm.carbs}
                onChange={handleInputChange}
                step="0.1"
                min="0"
              />
              <input
                type="number"
                name="fats"
                placeholder="Fats (g)"
                value={mealForm.fats}
                onChange={handleInputChange}
                step="0.1"
                min="0"
              />
            </div>

            <textarea
              name="notes"
              placeholder="Notes (optional)"
              value={mealForm.notes}
              onChange={handleInputChange}
              rows="2"
            />

            <button type="submit" className="submit-meal-btn">
              Log Meal
            </button>
          </form>
        </div>
      )}

      {/* Today's Meals */}
      <div className="todays-meals">
        <h3>Today's Meals</h3>
        {getTodaysMeals().length === 0 ? (
          <p className="no-meals">No meals logged today. Start tracking your nutrition!</p>
        ) : (
          <div className="meal-list">
            {mealTypes.map(mealType => {
              const mealsOfType = getTodaysMeals().filter(meal => meal.type === mealType);
              if (mealsOfType.length === 0) return null;
              
              return (
                <div key={mealType} className="meal-group">
                  <h4 className="meal-type-header">
                    {getMealIcon(mealType)} {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                  </h4>
                  {mealsOfType.map(meal => (
                    <div key={meal.id} className="meal-item">
                      <div className="meal-info">
                        <div className="meal-name">{meal.name}</div>
                        <div className="meal-details">
                          {meal.calories} cal
                          {meal.protein > 0 && ` • ${meal.protein}g protein`}
                          {meal.carbs > 0 && ` • ${meal.carbs}g carbs`}
                          {meal.fats > 0 && ` • ${meal.fats}g fats`}
                        </div>
                        {meal.notes && (
                          <div className="meal-notes">{meal.notes}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionTracker;