import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Add global error handling
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});

try {
  const root = createRoot(document.getElementById('root'));
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} catch (error) {
  console.error('Error rendering app:', error);
  document.getElementById('root').innerHTML = `
    <div style="padding: 20px; font-family: Arial, sans-serif;">
      <h1>Error Loading FitBuddy</h1>
      <p>There was an error loading the application. Please check the console for details.</p>
      <p>Error: ${error.message}</p>
    </div>
  `;
}
