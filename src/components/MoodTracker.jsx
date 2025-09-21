import React, { useState } from 'react';
import { useFitBuddy } from '../context/FitBuddyContext';
import { format } from 'date-fns';

const MoodTracker = () => {
  const { state, setMood } = useFitBuddy();
  const [selectedMood, setSelectedMood] = useState(state.mood.currentMood);
  const [moodNote, setMoodNote] = useState('');

  const moodEmojis = {
    1: { emoji: '😢', label: 'Very Sad', color: '#dc3545' },
    2: { emoji: '😞', label: 'Sad', color: '#fd7e14' },
    3: { emoji: '😐', label: 'Neutral', color: '#ffc107' },
    4: { emoji: '🙂', label: 'Good', color: '#20c997' },
    5: { emoji: '😊', label: 'Happy', color: '#28a745' },
    6: { emoji: '😄', label: 'Very Happy', color: '#17a2b8' },
    7: { emoji: '😁', label: 'Excited', color: '#007bff' },
    8: { emoji: '🤗', label: 'Joyful', color: '#6f42c1' },
    9: { emoji: '😍', label: 'Elated', color: '#e83e8c' },
    10: { emoji: '🤩', label: 'Euphoric', color: '#fd7e14' }
  };

  const handleMoodSubmit = () => {
    setMood(selectedMood, moodNote);
    setMoodNote('');
    alert(`Mood logged: ${moodEmojis[selectedMood].label}!`);
  };

  const getRecentMoods = () => {
    return state.mood.entries.slice(-7).reverse(); // Last 7 entries
  };

  return (
    <div className="mood-tracker">
      <h3>😊 Mood Tracker</h3>
      
      {/* Current Mood Display */}
      <div className="current-mood">
        <div className="mood-display">
          <span className="current-mood-emoji">{moodEmojis[state.mood.currentMood].emoji}</span>
          <p>Current Mood: {moodEmojis[state.mood.currentMood].label}</p>
        </div>
      </div>

      {/* Mood Scale */}
      <div className="mood-scale">
        <h4>How are you feeling today?</h4>
        <div className="mood-buttons">
          {Object.entries(moodEmojis).map(([rating, data]) => (
            <button
              key={rating}
              className={`mood-button ${selectedMood === parseInt(rating) ? 'selected' : ''}`}
              style={{ 
                borderColor: selectedMood === parseInt(rating) ? data.color : '#ddd',
                backgroundColor: selectedMood === parseInt(rating) ? data.color + '20' : 'white'
              }}
              onClick={() => setSelectedMood(parseInt(rating))}
              title={data.label}
            >
              <span className="mood-emoji">{data.emoji}</span>
              <span className="mood-rating">{rating}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mood Note */}
      <div className="mood-note">
        <textarea
          placeholder="How are you feeling? What's on your mind? (optional)"
          value={moodNote}
          onChange={(e) => setMoodNote(e.target.value)}
          rows="3"
        />
      </div>

      {/* Submit Button */}
      <button className="mood-submit-btn" onClick={handleMoodSubmit}>
        Log My Mood
      </button>

      {/* Recent Moods History */}
      <div className="mood-history">
        <h4>Recent Mood History</h4>
        {getRecentMoods().length > 0 ? (
          <div className="mood-entries">
            {getRecentMoods().map((entry) => (
              <div key={entry.id} className="mood-entry">
                <div className="mood-entry-header">
                  <span className="mood-entry-emoji">{moodEmojis[entry.rating].emoji}</span>
                  <span className="mood-entry-rating">{entry.rating}/10</span>
                  <span className="mood-entry-date">
                    {format(new Date(entry.timestamp), 'MMM dd, HH:mm')}
                  </span>
                </div>
                {entry.note && (
                  <p className="mood-entry-note">"{entry.note}"</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-entries">No mood entries yet. Start tracking your mood!</p>
        )}
      </div>

      {/* Mood Insights */}
      {state.mood.entries.length >= 3 && (
        <div className="mood-insights">
          <h4>📈 Mood Insights</h4>
          <div className="insights-grid">
            <div className="insight-item">
              <span className="insight-icon">📊</span>
              <div className="insight-text">
                <span className="insight-label">Average Mood</span>
                <span className="insight-value">
                  {(state.mood.entries.reduce((sum, entry) => sum + entry.rating, 0) / state.mood.entries.length).toFixed(1)}/10
                </span>
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-icon">📝</span>
              <div className="insight-text">
                <span className="insight-label">Total Entries</span>
                <span className="insight-value">{state.mood.entries.length}</span>
              </div>
            </div>
            <div className="insight-item">
              <span className="insight-icon">🎯</span>
              <div className="insight-text">
                <span className="insight-label">Best Mood</span>
                <span className="insight-value">
                  {Math.max(...state.mood.entries.map(entry => entry.rating))}/10
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;