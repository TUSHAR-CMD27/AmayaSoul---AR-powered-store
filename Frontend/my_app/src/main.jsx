import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Remove loading screen once React is ready
const removeLoadingScreen = () => {
  const loadingScreen = document.getElementById('loading-screen')
  if (loadingScreen) {
    loadingScreen.classList.add('hidden')
    // Remove from DOM after fade out
    setTimeout(() => {
      loadingScreen.remove()
    }, 300)
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    const root = createRoot(document.getElementById('root'))
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    )
    // Remove loading screen after a brief delay to ensure CSS is loaded
    setTimeout(removeLoadingScreen, 100)
  })
} else {
  const root = createRoot(document.getElementById('root'))
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
  // Remove loading screen after a brief delay to ensure CSS is loaded
  setTimeout(removeLoadingScreen, 100)
}
