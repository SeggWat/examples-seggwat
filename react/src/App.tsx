import { useEffect, useState } from 'react'
import './App.css'

type Position = 'bottom-right' | 'right-side' | 'icon-only'
type Language = 'en' | 'de' | 'sv' | 'fr'

function isWidgetMisconfigured() {
  if (typeof document === 'undefined') return false

  const scripts = document.querySelectorAll<HTMLScriptElement>(
    'script[src*="seggwat.com/static/widgets/"]'
  )

  if (!scripts.length) return false

  return Array.from(scripts).some((script) => {
    const projectKey = script.dataset.projectKey?.trim() ?? ''
    return !projectKey
  })
}

function App() {
  const [currentColor, setCurrentColor] = useState('#61dafb')
  const [position, setPosition] = useState<Position>('bottom-right')
  const [language, setLanguage] = useState<Language>('en')
  const [userId, setUserId] = useState('')
  const [showConfigWarning, setShowConfigWarning] = useState(false)

  useEffect(() => {
    setShowConfigWarning(isWidgetMisconfigured())
  }, [])

  const updateColor = (color: string) => {
    setCurrentColor(color)
    window.SeggwatFeedback?.updateAppearance({ color })
  }

  const updatePosition = (newPosition: Position) => {
    setPosition(newPosition)
    window.SeggwatFeedback?.updateAppearance({ position: newPosition })
  }

  // Language is loaded once when the widget initializes (it fetches the i18n
  // bundle and builds the modal then), so it can't be hot-swapped via
  // updateAppearance. The supported pattern — mirroring SeggWat's own demo
  // host — is to destroy the widget and re-inject the script with a fresh
  // data-language. Current color/position are carried over so they persist.
  const updateLanguage = (lang: Language) => {
    setLanguage(lang)

    const selector = 'script[src*="seggwat.com/static/widgets/"]'
    const existing = document.querySelector<HTMLScriptElement>(selector)
    const projectKey = existing?.dataset.projectKey ?? 'demo-project-key'
    const screenshots = existing?.dataset.enableScreenshots ?? 'true'

    window.SeggwatFeedback?.destroy?.()
    document.querySelectorAll(selector).forEach((el) => el.remove())

    const script = document.createElement('script')
    script.src = 'https://seggwat.com/static/widgets/v1/seggwat-feedback.js'
    script.defer = true
    script.dataset.projectKey = projectKey
    script.dataset.buttonColor = currentColor
    script.dataset.buttonPosition = position
    script.dataset.language = lang
    script.dataset.enableScreenshots = screenshots
    document.body.appendChild(script)
  }

  const handleUserIdChange = (value: string) => {
    setUserId(value)
    if (value) {
      window.SeggwatFeedback?.setUser(value)
    } else {
      window.SeggwatFeedback?.setUser(null)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <h1>SeggWat React Example</h1>
        <p>
          Integrate the SeggWat feedback widget into a React + Vite app.
          Customize appearance, language, and control the widget programmatically.
        </p>
      </header>

      {showConfigWarning && (
        <section className="warning" role="alert">
          <strong>Configuration warning:</strong> `data-project-key` is missing.
          Update `react/index.html` with your real key from the{' '}
          <a href="https://seggwat.com" target="_blank" rel="noopener noreferrer">
            SeggWat dashboard
          </a>
          .
        </section>
      )}

      <main className="main">
        <section className="section">
          <h2>Features</h2>
          <ul>
            <li>Simple script tag integration (no npm package needed)</li>
            <li>TypeScript declarations for all widget APIs</li>
            <li>Dynamic color, position, and language switching</li>
            <li>Programmatic open/close control</li>
            <li>Screenshot capture and annotation</li>
            <li>User identification for feedback tracking</li>
            <li>Works with React Router and SPAs</li>
          </ul>
        </section>

        <section className="section">
          <h2>Customize Feedback Button</h2>

          <div className="controls">
            <div className="control-group">
              <h3>Button Color</h3>
              <div className="button-group">
                {[
                  { color: '#61dafb', label: 'React Blue' },
                  { color: '#ef4444', label: 'Red' },
                  { color: '#10b981', label: 'Green' },
                  { color: '#3b82f6', label: 'Blue' },
                  { color: '#9333ea', label: 'Purple' },
                ].map(({ color, label }) => (
                  <button
                    key={color}
                    onClick={() => updateColor(color)}
                    style={{ backgroundColor: color }}
                    className={currentColor === color ? 'active' : ''}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <h3>Button Position</h3>
              <div className="button-group position-group">
                {[
                  { value: 'bottom-right' as Position, label: 'Bottom Right' },
                  { value: 'right-side' as Position, label: 'Right Side' },
                  { value: 'icon-only' as Position, label: 'Icon Only' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updatePosition(value)}
                    className={position === value ? 'active' : ''}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="control-group">
              <h3>Language</h3>
              <div className="button-group">
                {[
                  { value: 'en' as Language, label: 'English' },
                  { value: 'de' as Language, label: 'Deutsch' },
                  { value: 'sv' as Language, label: 'Svenska' },
                  { value: 'fr' as Language, label: 'Français' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updateLanguage(value)}
                    className={language === value ? 'active' : ''}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2>Programmatic Control</h2>
          <p>Open or close the feedback modal from your own UI:</p>

          <div className="controls">
            <div className="control-group">
              <div className="button-group">
                <button
                  className="action-btn"
                  onClick={() => window.SeggwatFeedback?.open()}
                >
                  Open Feedback
                </button>
                <button
                  className="action-btn"
                  onClick={() => window.SeggwatFeedback?.close()}
                >
                  Close Feedback
                </button>
                <button
                  className="action-btn"
                  onClick={() => window.SeggwatFeedback?.captureScreenshot()}
                >
                  Capture Screenshot
                </button>
              </div>
            </div>

            <div className="control-group">
              <h3>User Identification</h3>
              <p className="helper-text">
                Associate feedback with a user ID so you know who submitted it.
              </p>
              <input
                type="text"
                className="text-input"
                placeholder="e.g. user-123"
                value={userId}
                onChange={(e) => handleUserIdChange(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className="section">
          <h2>How It Works</h2>
          <p>
            Load the widget via a script tag in <code>index.html</code>.
            It stays mounted across route changes automatically.
          </p>

          <div className="code-block">
            <pre>{`<script defer
  src="https://seggwat.com/static/widgets/v1/seggwat-feedback.js"
  data-project-key="YOUR_PROJECT_KEY"
  data-button-color="#61dafb"
  data-enable-screenshots="true">
</script>`}</pre>
          </div>

          <p>
            Update appearance or control the widget at runtime:
          </p>

          <div className="code-block">
            <pre>{`// Change color or position at runtime
window.SeggwatFeedback?.updateAppearance({
  color: '#ef4444',
  position: 'icon-only'
})

// Language is set at load via data-language; switching it
// means destroy() + re-injecting the script tag.

// Programmatic control
window.SeggwatFeedback?.open()
window.SeggwatFeedback?.close()
window.SeggwatFeedback?.captureScreenshot()

// User identification
window.SeggwatFeedback?.setUser('user-123')`}</pre>
          </div>
        </section>

        <section className="section">
          <h2>Try It Out!</h2>
          <p>
            Look for the feedback button on screen. Click it to open the feedback form,
            or use the "Open Feedback" button above to trigger it programmatically.
          </p>
          <p className="note">
            <strong>Note:</strong> This example uses a demo project key. Replace it
            with your own key from the{' '}
            <a href="https://seggwat.com" target="_blank" rel="noopener noreferrer">
              SeggWat dashboard
            </a>{' '}
            for production use.
          </p>
        </section>
      </main>

      <footer className="footer">
        <p>
          Learn more in the{' '}
          <a
            href="https://seggwat.com/docs/widget/installation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Widget Documentation
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App
