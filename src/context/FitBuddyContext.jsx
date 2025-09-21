import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FitBuddyContext = createContext();

const initialState = {
  user: {
    isLoggedIn: false,
    name: '',
    email: '',
    avatar: '',
    goals: {
      dailySteps: 10000,
      dailyCalories: 2200,
      dailyWater: 8,
      weeklyWorkouts: 4
    }
  },
  dashboard: {
    todaysSteps: 0,
    caloriesBurned: 0,
    caloriesConsumed: 0,
    waterIntake: 0,
    workoutsThisWeek: 0,
    currentWeight: 0,
    targetWeight: 0
  },
  mood: {
    entries: [],
    currentMood: 5
  },
  hydration: {
    dailyGoal: 8,
    currentIntake: 0,
    entries: []
  },
  sleep: {
    entries: [],
    averageSleep: 7.5,
    bedtime: '22:00',
    wakeTime: '06:30'
  },
  workouts: {
    completed: [],
    scheduled: [],
    history: []
  },
  community: {
    challenges: [
      {
        id: '1',
        title: '30-Day Step Challenge',
        description: 'Walk 10,000 steps daily for 30 days',
        participants: 523,
        progress: 0,
        joined: false,
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      {
        id: '2',
        title: 'Healthy Eating Week',
        description: 'Track your meals and eat 5 servings of fruits/vegetables daily',
        participants: 287,
        progress: 0,
        joined: false,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    ],
    leaderboard: []
  },
  nutrition: {
    dailyMeals: [],
    waterIntake: 0,
    calorieGoal: 2200
  },
  analytics: {
    dailyProgress: [],
    weeklyStats: {},
    monthlyStats: {}
  }
};

function fitBuddyReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: { ...state.user, isLoggedIn: true, ...action.payload }
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: { ...initialState.user }
      };
    
    case 'UPDATE_STEPS':
      return {
        ...state,
        dashboard: { ...state.dashboard, todaysSteps: action.payload }
      };
    
    case 'ADD_WATER':
      return {
        ...state,
        hydration: {
          ...state.hydration,
          currentIntake: Math.min(state.hydration.currentIntake + 1, state.hydration.dailyGoal),
          entries: [...state.hydration.entries, {
            id: uuidv4(),
            timestamp: new Date(),
            amount: 1
          }]
        },
        dashboard: {
          ...state.dashboard,
          waterIntake: Math.min(state.dashboard.waterIntake + 1, state.hydration.dailyGoal)
        }
      };
    
    case 'REMOVE_WATER':
      return {
        ...state,
        hydration: {
          ...state.hydration,
          currentIntake: Math.max(state.hydration.currentIntake - 1, 0)
        },
        dashboard: {
          ...state.dashboard,
          waterIntake: Math.max(state.dashboard.waterIntake - 1, 0)
        }
      };
    
    case 'SET_MOOD':
      return {
        ...state,
        mood: {
          ...state.mood,
          currentMood: action.payload.rating,
          entries: [...state.mood.entries, {
            id: uuidv4(),
            rating: action.payload.rating,
            note: action.payload.note || '',
            timestamp: new Date()
          }]
        }
      };
    
    case 'ADD_SLEEP_ENTRY':
      return {
        ...state,
        sleep: {
          ...state.sleep,
          entries: [...state.sleep.entries, {
            id: uuidv4(),
            ...action.payload,
            timestamp: new Date()
          }]
        }
      };
    
    case 'JOIN_CHALLENGE':
      return {
        ...state,
        community: {
          ...state.community,
          challenges: state.community.challenges.map(challenge =>
            challenge.id === action.payload
              ? { ...challenge, joined: true, participants: challenge.participants + 1 }
              : challenge
          )
        }
      };
    
    case 'LEAVE_CHALLENGE':
      return {
        ...state,
        community: {
          ...state.community,
          challenges: state.community.challenges.map(challenge =>
            challenge.id === action.payload
              ? { ...challenge, joined: false, participants: Math.max(challenge.participants - 1, 0) }
              : challenge
          )
        }
      };
    
    case 'UPDATE_CALORIES_BURNED':
      return {
        ...state,
        dashboard: { ...state.dashboard, caloriesBurned: action.payload }
      };
    
    case 'UPDATE_CALORIES_CONSUMED':
      return {
        ...state,
        dashboard: { ...state.dashboard, caloriesConsumed: action.payload }
      };
    
    case 'ADD_WORKOUT':
      return {
        ...state,
        workouts: {
          ...state.workouts,
          completed: [...state.workouts.completed, action.payload]
        },
        dashboard: {
          ...state.dashboard,
          workoutsThisWeek: state.dashboard.workoutsThisWeek + 1
        }
      };
    
    case 'ADD_MEAL':
      return {
        ...state,
        nutrition: {
          ...state.nutrition,
          dailyMeals: [...state.nutrition.dailyMeals, action.payload]
        }
      };
    
    case 'UPDATE_PROFILE':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      };
    
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

export function FitBuddyProvider({ children }) {
  const [state, dispatch] = useReducer(fitBuddyReducer, initialState);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('fitbuddy-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('fitbuddy-data', JSON.stringify(state));
  }, [state]);

  const contextValue = {
    state,
    dispatch,
    // Helper functions
    login: (userData) => dispatch({ type: 'LOGIN', payload: userData }),
    logout: () => dispatch({ type: 'LOGOUT' }),
    updateSteps: (steps) => dispatch({ type: 'UPDATE_STEPS', payload: steps }),
    addWater: () => dispatch({ type: 'ADD_WATER' }),
    removeWater: () => dispatch({ type: 'REMOVE_WATER' }),
    setMood: (rating, note) => dispatch({ type: 'SET_MOOD', payload: { rating, note } }),
    addSleepEntry: (sleepData) => dispatch({ type: 'ADD_SLEEP_ENTRY', payload: sleepData }),
    joinChallenge: (challengeId) => dispatch({ type: 'JOIN_CHALLENGE', payload: challengeId }),
    leaveChallenge: (challengeId) => dispatch({ type: 'LEAVE_CHALLENGE', payload: challengeId }),
    updateCaloriesBurned: (calories) => dispatch({ type: 'UPDATE_CALORIES_BURNED', payload: calories }),
    updateCaloriesConsumed: (calories) => dispatch({ type: 'UPDATE_CALORIES_CONSUMED', payload: calories }),
    addWorkout: (workout) => dispatch({ type: 'ADD_WORKOUT', payload: workout }),
    addMeal: (meal) => dispatch({ type: 'ADD_MEAL', payload: meal }),
    updateProfile: (profileData) => dispatch({ type: 'UPDATE_PROFILE', payload: profileData })
  };

  return (
    <FitBuddyContext.Provider value={contextValue}>
      {children}
    </FitBuddyContext.Provider>
  );
}

export function useFitBuddy() {
  const context = useContext(FitBuddyContext);
  if (!context) {
    throw new Error('useFitBuddy must be used within a FitBuddyProvider');
  }
  return context;
}

export default FitBuddyContext;