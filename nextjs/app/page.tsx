'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'

type Position = 'bottom-right' | 'right-side' | 'icon-only'
type Language = 'en' | 'de' | 'sv'

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

export default function Home() {
  const [currentColor, setCurrentColor] = useState('#000000')
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

  const updateLanguage = (lang: Language) => {
    setLanguage(lang)
    window.SeggwatFeedback?.updateAppearance({ language: lang })
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
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>SeggWat Next.js Example</h1>
        <p>
          Integrate the SeggWat feedback widget into a Next.js App Router project.
          Customize appearance, language, and control the widget programmatically.
        </p>
      </header>

      {showConfigWarning && (
        <section className={styles.warning} role="alert">
          <strong>Configuration warning:</strong> `data-project-key` is missing.
          Update `nextjs/app/layout.tsx` with your real key from the{' '}
          <a href="https://seggwat.com" target="_blank" rel="noopener noreferrer">
            SeggWat dashboard
          </a>
          .
        </section>
      )}

      <main className={styles.main}>
        <section className={styles.section}>
          <h2>Features</h2>
          <ul>
            <li>Uses next/script for optimized script loading</li>
            <li>TypeScript declarations for all widget APIs</li>
            <li>Dynamic color, position, and language switching</li>
            <li>Programmatic open/close control</li>
            <li>Screenshot capture and annotation</li>
            <li>User identification for feedback tracking</li>
            <li>Persists across route changes with App Router</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Customize Feedback Button</h2>

          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <h3>Button Color</h3>
              <div className={styles.buttonGroup}>
                {[
                  { color: '#000000', label: 'Next.js Black' },
                  { color: '#ef4444', label: 'Red' },
                  { color: '#10b981', label: 'Green' },
                  { color: '#3b82f6', label: 'Blue' },
                  { color: '#9333ea', label: 'Purple' },
                ].map(({ color, label }) => (
                  <button
                    key={color}
                    onClick={() => updateColor(color)}
                    style={{ backgroundColor: color }}
                    className={currentColor === color ? styles.active : ''}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.controlGroup}>
              <h3>Button Position</h3>
              <div className={`${styles.buttonGroup} ${styles.positionGroup}`}>
                {[
                  { value: 'bottom-right' as Position, label: 'Bottom Right' },
                  { value: 'right-side' as Position, label: 'Right Side' },
                  { value: 'icon-only' as Position, label: 'Icon Only' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updatePosition(value)}
                    className={position === value ? styles.active : ''}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.controlGroup}>
              <h3>Language</h3>
              <div className={styles.buttonGroup}>
                {[
                  { value: 'en' as Language, label: 'English' },
                  { value: 'de' as Language, label: 'Deutsch' },
                  { value: 'sv' as Language, label: 'Svenska' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updateLanguage(value)}
                    className={language === value ? styles.active : ''}
                    style={{ backgroundColor: '#4b5563' }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Programmatic Control</h2>
          <p>Open or close the feedback modal from your own UI:</p>

          <div className={styles.controls}>
            <div className={styles.controlGroup}>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.actionBtn}
                  onClick={() => window.SeggwatFeedback?.open()}
                >
                  Open Feedback
                </button>
                <button
                  className={styles.actionBtn}
                  onClick={() => window.SeggwatFeedback?.close()}
                >
                  Close Feedback
                </button>
                <button
                  className={styles.actionBtn}
                  onClick={() => window.SeggwatFeedback?.captureScreenshot()}
                >
                  Capture Screenshot
                </button>
              </div>
            </div>

            <div className={styles.controlGroup}>
              <h3>User Identification</h3>
              <p className={styles.helperText}>
                Associate feedback with a user ID so you know who submitted it.
              </p>
              <input
                type="text"
                className={styles.textInput}
                placeholder="e.g. user-123"
                value={userId}
                onChange={(e) => handleUserIdChange(e.target.value)}
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>How It Works</h2>
          <p>
            Load the widget via <code className={styles.inlineCode}>next/script</code> in{' '}
            <code className={styles.inlineCode}>app/layout.tsx</code>.
            It persists across route changes automatically.
          </p>

          <div className={styles.codeBlock}>
            <pre>{`import Script from 'next/script'

<Script
  src="https://seggwat.com/static/widgets/v1/seggwat-feedback.js"
  data-project-key="YOUR_PROJECT_KEY"
  data-button-color="#000000"
  data-enable-screenshots="true"
  strategy="afterInteractive"
/>`}</pre>
          </div>

          <p>
            Update appearance or control the widget at runtime:
          </p>

          <div className={styles.codeBlock}>
            <pre>{`// Change color, position, or language
window.SeggwatFeedback?.updateAppearance({
  color: '#ef4444',
  position: 'icon-only',
  language: 'de'
})

// Programmatic control
window.SeggwatFeedback?.open()
window.SeggwatFeedback?.close()
window.SeggwatFeedback?.captureScreenshot()

// User identification
window.SeggwatFeedback?.setUser('user-123')`}</pre>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Try It Out!</h2>
          <p>
            Look for the feedback button on screen. Click it to open the feedback form,
            or use the &quot;Open Feedback&quot; button above to trigger it programmatically.
          </p>
          <p className={styles.note}>
            <strong>Note:</strong> This example uses a demo project key. Replace it
            with your own key from the{' '}
            <a href="https://seggwat.com" target="_blank" rel="noopener noreferrer">
              SeggWat dashboard
            </a>{' '}
            for production use.
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
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
