import React, { useState } from 'react';
import { useFitBuddy } from '../context/FitBuddyContext';
import { format, differenceInDays } from 'date-fns';

const Community = () => {
  const { state, joinChallenge, leaveChallenge } = useFitBuddy();
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    title: '',
    description: '',
    duration: 7
  });

  const handleJoinChallenge = (challengeId) => {
    joinChallenge(challengeId);
  };

  const handleLeaveChallenge = (challengeId) => {
    if (confirm('Are you sure you want to leave this challenge?')) {
      leaveChallenge(challengeId);
    }
  };

  const getDaysRemaining = (endDate) => {
    return Math.max(0, differenceInDays(new Date(endDate), new Date()));
  };

  const getJoinedChallenges = () => {
    return state.community.challenges.filter(challenge => challenge.joined);
  };

  const getAvailableChallenges = () => {
    return state.community.challenges.filter(challenge => !challenge.joined);
  };

  return (
    <div className="section">
      <h2>🏆 Community Challenges</h2>
      
      {/* Challenge Stats */}
      <div className="challenge-stats">
        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <div className="stat-number">{getJoinedChallenges().length}</div>
            <div className="stat-label">Active Challenges</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <div className="stat-number">
              {state.community.challenges.reduce((sum, c) => sum + c.participants, 0)}
            </div>
            <div className="stat-label">Total Participants</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <div className="stat-number">{getJoinedChallenges().length * 10}</div>
            <div className="stat-label">Points Earned</div>
          </div>
        </div>
      </div>

      {/* Active Challenges */}
      {getJoinedChallenges().length > 0 && (
        <div className="challenges-section">
          <h3>🔥 Your Active Challenges</h3>
          <div className="challenge-list">
            {getJoinedChallenges().map((challenge) => (
              <div key={challenge.id} className="challenge-item active-challenge">
                <div className="challenge-header">
                  <h4>{challenge.title}</h4>
                  <div className="challenge-status joined">
                    <span className="status-icon">✅</span>
                    <span>Joined</span>
                  </div>
                </div>
                <p className="challenge-description">{challenge.description}</p>
                <div className="challenge-details">
                  <div className="challenge-participants">
                    <span className="participants-icon">👥</span>
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="challenge-deadline">
                    <span className="deadline-icon">⏰</span>
                    <span>{getDaysRemaining(challenge.endDate)} days left</span>
                  </div>
                </div>
                <div className="challenge-progress">
                  <div className="progress-label">Your Progress</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill active" 
                      style={{width: `${challenge.progress}%`}}
                    ></div>
                  </div>
                  <div className="progress-text">{challenge.progress}% complete</div>
                </div>
                <div className="challenge-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => handleLeaveChallenge(challenge.id)}
                  >
                    Leave Challenge
                  </button>
                  <button className="btn-primary">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Challenges */}
      {getAvailableChallenges().length > 0 && (
        <div className="challenges-section">
          <h3>💫 Available Challenges</h3>
          <div className="challenge-list">
            {getAvailableChallenges().map((challenge) => (
              <div key={challenge.id} className="challenge-item available-challenge">
                <div className="challenge-header">
                  <h4>{challenge.title}</h4>
                  <div className="challenge-status available">
                    <span className="status-icon">🎯</span>
                    <span>Join Now</span>
                  </div>
                </div>
                <p className="challenge-description">{challenge.description}</p>
                <div className="challenge-details">
                  <div className="challenge-participants">
                    <span className="participants-icon">👥</span>
                    <span>{challenge.participants} participants</span>
                  </div>
                  <div className="challenge-deadline">
                    <span className="deadline-icon">⏰</span>
                    <span>{getDaysRemaining(challenge.endDate)} days left</span>
                  </div>
                </div>
                <div className="challenge-rewards">
                  <div className="reward-item">
                    <span className="reward-icon">🏆</span>
                    <span>Achievement Badge</span>
                  </div>
                  <div className="reward-item">
                    <span className="reward-icon">⭐</span>
                    <span>10 Points</span>
                  </div>
                </div>
                <div className="challenge-actions">
                  <button 
                    className="btn-primary join-btn"
                    onClick={() => handleJoinChallenge(challenge.id)}
                  >
                    Join Challenge
                  </button>
                  <button className="btn-secondary">Learn More</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="leaderboard-section">
        <h3>🏅 Community Leaderboard</h3>
        <div className="leaderboard">
          <div className="leaderboard-header">
            <div className="rank-col">Rank</div>
            <div className="name-col">Member</div>
            <div className="points-col">Points</div>
            <div className="challenges-col">Challenges</div>
          </div>
          <div className="leaderboard-entries">
            {[
              { rank: 1, name: 'Alex Johnson', points: 2850, challenges: 12, avatar: '🏃‍♂️' },
              { rank: 2, name: 'Sarah Smith', points: 2640, challenges: 11, avatar: '🏋️‍♀️' },
              { rank: 3, name: 'Mike Chen', points: 2420, challenges: 10, avatar: '🚴‍♂️' },
              { rank: 4, name: 'Emma Wilson', points: 2180, challenges: 9, avatar: '🤸‍♀️' },
              { rank: 5, name: 'You', points: getJoinedChallenges().length * 10, challenges: getJoinedChallenges().length, avatar: '😊' }
            ].map((entry) => (
              <div key={entry.rank} className={`leaderboard-entry ${entry.name === 'You' ? 'current-user' : ''}`}>
                <div className="rank-col">
                  {entry.rank <= 3 ? (
                    <span className="medal">{entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}</span>
                  ) : (
                    <span className="rank-number">#{entry.rank}</span>
                  )}
                </div>
                <div className="name-col">
                  <span className="avatar">{entry.avatar}</span>
                  <span className="name">{entry.name}</span>
                </div>
                <div className="points-col">{entry.points} pts</div>
                <div className="challenges-col">{entry.challenges}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Motivational Messages */}
      <div className="motivation-section">
        <h3>💪 Daily Motivation</h3>
        <div className="motivation-cards">
          <div className="motivation-card">
            <div className="motivation-icon">🌟</div>
            <div className="motivation-text">
              "Every step you take is progress towards your goals!"
            </div>
          </div>
          <div className="motivation-card">
            <div className="motivation-icon">💎</div>
            <div className="motivation-text">
              "Consistency is the key to transformation!"
            </div>
          </div>
          <div className="motivation-card">
            <div className="motivation-icon">🚀</div>
            <div className="motivation-text">
              "You're stronger than you think!"
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Community;