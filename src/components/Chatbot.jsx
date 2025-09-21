import React, { useState, useRef, useEffect } from 'react';
import { useFitBuddy } from '../context/FitBuddyContext';
import { v4 as uuidv4 } from 'uuid';

const Chatbot = () => {
  const { state } = useFitBuddy();
  const [messages, setMessages] = useState([
    {
      id: uuidv4(),
      type: 'bot',
      content: "Hi there! I'm your FitBuddy AI assistant! 🤖 I'm here to help you with fitness tips, nutrition advice, and motivation. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = {
    // Greetings
    'hello': "Hello! Great to see you here! How can I help you with your fitness journey today? 😊",
    'hi': "Hi there! Ready to crush your fitness goals? What can I help you with? 💪",
    'hey': "Hey! I'm excited to help you on your fitness journey! What's on your mind?",
    
    // Fitness
    'workout': "Here are some great workout ideas:\n\n🏃‍♂️ **Cardio**: Try 30 minutes of jogging, cycling, or dancing\n💪 **Strength**: Push-ups, squats, and planks are excellent bodyweight exercises\n🧘‍♀️ **Flexibility**: Don't forget to stretch or try some yoga!\n\nWhat type of workout interests you most?",
    'exercise': "Exercise is fantastic! Here are some beginner-friendly options:\n\n✅ Walking or light jogging\n✅ Bodyweight squats (start with 10-15)\n✅ Wall push-ups\n✅ Stretching routine\n\nRemember: consistency beats intensity! Start small and build up gradually.",
    'cardio': "Cardio is great for heart health! Here are some fun options:\n\n🏃‍♀️ Running or jogging\n🚴‍♂️ Cycling\n💃 Dancing\n🏊‍♀️ Swimming\n🥾 Hiking\n\nAim for 150 minutes of moderate cardio per week. What sounds fun to you?",
    'strength': "Strength training is amazing for building muscle and bone density! Try these:\n\n💪 **Beginners**: Push-ups, squats, lunges, planks\n🏋️‍♀️ **Intermediate**: Add weights or resistance bands\n🎯 **Advanced**: Progressive overload with heavier weights\n\nStart with 2-3 sessions per week!",
    
    // Nutrition
    'nutrition': "Nutrition is key to reaching your goals! Here are some tips:\n\n🥗 **Eat the rainbow**: Variety of colorful fruits and vegetables\n🍗 **Lean proteins**: Chicken, fish, beans, tofu\n🌾 **Whole grains**: Brown rice, quinoa, oats\n💧 **Stay hydrated**: Aim for 8 glasses of water daily\n\nWhat specific nutrition questions do you have?",
    'diet': "A balanced diet supports your fitness goals! Focus on:\n\n✅ Whole, unprocessed foods\n✅ Proper portion sizes\n✅ Regular meal timing\n✅ Listening to your body's hunger cues\n\nRemember: it's about progress, not perfection!",
    'water': `Great question about hydration! 💧\n\nYou should aim for 8 glasses of water daily. I see you've had ${state.hydration.currentIntake} glasses today - ${state.hydration.currentIntake >= state.hydration.dailyGoal ? 'fantastic job!' : 'you can do it!'}\n\nTips to drink more water:\n• Keep a water bottle nearby\n• Add lemon or cucumber for flavor\n• Set reminders on your phone`,
    'calories': `Calories matter, but quality matters more! Here's what I see:\n\n📊 **Your Stats Today**:\n• Burned: ${state.dashboard.caloriesBurned} calories\n• Consumed: ${state.dashboard.caloriesConsumed} calories\n• Net: ${state.dashboard.caloriesConsumed - state.dashboard.caloriesBurned} calories\n\nFocus on nutrient-dense foods rather than just counting calories!`,
    
    // Motivation
    'motivation': "You've got this! 🌟 Remember:\n\n💪 Every workout counts, no matter how small\n🎯 Progress isn't always linear\n🏆 You're stronger than you think\n✨ Celebrate small victories\n\nWhat's one thing you accomplished today that you're proud of?",
    'tired': "Feeling tired is normal! Here are some energy boosters:\n\n☕ Stay hydrated\n🍎 Eat a healthy snack\n🚶‍♀️ Take a short walk\n😴 Ensure you're getting enough sleep\n🧘‍♀️ Try some deep breathing\n\nSometimes rest is the best workout!",
    'stress': "Stress and fitness are closely connected. Try these stress-busters:\n\n🧘‍♀️ **Meditation**: Even 5 minutes helps\n🏃‍♀️ **Exercise**: Great for releasing tension\n📚 **Deep breathing**: 4-7-8 technique\n🛁 **Self-care**: Take time for yourself\n\nExercise is one of the best stress relievers!",
    
    // Progress
    'progress': `Let me check your progress! 📈\n\n🚶‍♂️ **Steps**: ${state.dashboard.todaysSteps}/${state.user.goals.dailySteps} (${Math.round(state.dashboard.todaysSteps/state.user.goals.dailySteps*100)}%)\n💧 **Water**: ${state.hydration.currentIntake}/${state.hydration.dailyGoal} glasses\n💪 **Workouts**: ${state.dashboard.workoutsThisWeek}/${state.user.goals.weeklyWorkouts} this week\n😊 **Mood**: ${state.mood.currentMood}/10\n\n${state.dashboard.todaysSteps >= state.user.goals.dailySteps ? 'Amazing job on your steps! 🎉' : 'Keep moving - you\'re making great progress!'}`,
    'goals': `Your current goals are fantastic! 🎯\n\n• ${state.user.goals.dailySteps.toLocaleString()} steps daily\n• ${state.user.goals.dailyWater} glasses of water\n• ${state.user.goals.weeklyWorkouts} workouts per week\n• ${state.user.goals.dailyCalories} calories daily\n\nRemember: goals should be challenging but achievable. You're doing great!`,
    
    // Sleep
    'sleep': "Sleep is crucial for recovery and performance! 😴\n\n✅ **Aim for 7-9 hours** of quality sleep\n✅ **Keep a consistent schedule** (even on weekends)\n✅ **Create a bedtime routine** (no screens 1 hour before bed)\n✅ **Keep your room cool and dark**\n\nGood sleep = better workouts and recovery!",
    
    // Default responses
    'help': "I can help you with:\n\n🏃‍♀️ **Workouts & Exercise** - Get personalized workout suggestions\n🥗 **Nutrition & Diet** - Learn about healthy eating\n💧 **Hydration** - Track your water intake\n😊 **Motivation** - Get inspired and stay motivated\n📈 **Progress** - Check your fitness journey\n😴 **Sleep & Recovery** - Tips for better rest\n\nJust ask me anything about fitness, nutrition, or wellness!",
    'thanks': "You're very welcome! 😊 I'm here whenever you need fitness advice, motivation, or just want to chat about your health journey. Keep up the amazing work!",
    'bye': "Goodbye for now! 👋 Remember, every step counts and you're doing amazing. Come back anytime you need fitness advice or motivation. Keep crushing those goals! 💪"
  };

  const generateResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Check for exact matches first
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (message.includes(key)) {
        return response;
      }
    }
    
    // Context-aware responses based on user data
    if (message.includes('mood')) {
      return `I see your current mood is ${state.mood.currentMood}/10. ${state.mood.currentMood >= 7 ? 'That\'s wonderful! 😊' : state.mood.currentMood >= 4 ? 'That\'s okay, we all have those days. 🤗' : 'I\'m sorry you\'re not feeling great. 💙'} \n\nRemember, exercise can boost mood naturally! Even a 10-minute walk can help.`;
    }
    
    if (message.includes('steps')) {
      return `You've taken ${state.dashboard.todaysSteps.toLocaleString()} steps today! ${state.dashboard.todaysSteps >= state.user.goals.dailySteps ? 'You\'ve reached your goal! 🎉' : `You're ${(state.user.goals.dailySteps - state.dashboard.todaysSteps).toLocaleString()} steps away from your daily goal. You can do it! 💪`}`;
    }
    
    // Fallback responses
    const fallbackResponses = [
      "That's a great question! While I'm still learning, I'd recommend focusing on consistency in your fitness journey. What specific area would you like help with - workouts, nutrition, or motivation? 🤔",
      "I want to give you the best advice! Could you be more specific about what you'd like to know? I'm here to help with fitness, nutrition, and wellness topics! 💪",
      "Interesting! I'm here to help with fitness and wellness. Try asking me about workouts, nutrition, hydration, sleep, or motivation - I'd love to help! 😊",
      "I'm your fitness companion and I want to help! Feel free to ask me about exercise routines, healthy eating, staying motivated, or tracking your progress! 🎯"
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: uuidv4(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = {
        id: uuidv4(),
        type: 'bot',
        content: generateResponse(inputMessage),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Show my progress",
    "Workout suggestions",
    "Nutrition tips",
    "How to stay motivated",
    "Hydration reminder"
  ];

  return (
    <div className="section">
      <h2>🤖 AI FitBuddy Assistant</h2>
      
      <div className="chatbot-container">
        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-avatar">
                {message.type === 'bot' ? '🤖' : '😊'}
              </div>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot typing">
              <div className="message-avatar">🤖</div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="quick-questions">
          <p>Quick questions:</p>
          <div className="quick-question-buttons">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                className="quick-question-btn"
                onClick={() => setInputMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>
        </div>
        
        <div className="chat-input">
          <div className="input-container">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about fitness, nutrition, or wellness..."
              rows="2"
              disabled={isTyping}
            />
            <button 
              onClick={handleSendMessage}
              disabled={isTyping || inputMessage.trim() === ''}
              className="send-button"
            >
              📤
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;