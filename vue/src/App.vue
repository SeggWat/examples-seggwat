<script setup lang="ts">
import { onMounted, ref } from 'vue'

type Position = 'bottom-right' | 'right-side' | 'icon-only'
type Language = 'en' | 'de' | 'sv' | 'fr'

const currentColor = ref('#42b883')
const position = ref<Position>('bottom-right')
const language = ref<Language>('en')
const userId = ref('')
const showConfigWarning = ref(false)

const colors = [
  { color: '#42b883', label: 'Vue Green' },
  { color: '#ef4444', label: 'Red' },
  { color: '#10b981', label: 'Green' },
  { color: '#3b82f6', label: 'Blue' },
  { color: '#9333ea', label: 'Purple' },
]

const positions: { value: Position; label: string }[] = [
  { value: 'bottom-right', label: 'Bottom Right' },
  { value: 'right-side', label: 'Right Side' },
  { value: 'icon-only', label: 'Icon Only' },
]

const languages: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'de', label: 'Deutsch' },
  { value: 'sv', label: 'Svenska' },
  { value: 'fr', label: 'Français' },
]

function updateColor(color: string) {
  currentColor.value = color
  window.SeggwatFeedback?.updateAppearance({ color })
}

function updatePosition(newPosition: Position) {
  position.value = newPosition
  window.SeggwatFeedback?.updateAppearance({ position: newPosition })
}

// Language is loaded once when the widget initializes (it fetches the i18n
// bundle and builds the modal then), so it can't be hot-swapped via
// updateAppearance. The supported pattern — mirroring SeggWat's own demo
// host — is to destroy the widget and re-inject the script with a fresh
// data-language. Current color/position are carried over so they persist.
function updateLanguage(lang: Language) {
  language.value = lang

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
  script.dataset.buttonColor = currentColor.value
  script.dataset.buttonPosition = position.value
  script.dataset.language = lang
  script.dataset.enableScreenshots = screenshots
  document.body.appendChild(script)
}

function handleUserIdChange(event: Event) {
  const value = (event.target as HTMLInputElement).value
  userId.value = value
  if (value) {
    window.SeggwatFeedback?.setUser(value)
  } else {
    window.SeggwatFeedback?.setUser(null)
  }
}

function openFeedback() {
  window.SeggwatFeedback?.open()
}

function closeFeedback() {
  window.SeggwatFeedback?.close()
}

function captureScreenshot() {
  window.SeggwatFeedback?.captureScreenshot()
}

function isWidgetMisconfigured() {
  const scripts = document.querySelectorAll<HTMLScriptElement>(
    'script[src*="seggwat.com/static/widgets/"]',
  )

  if (!scripts.length) return false

  return Array.from(scripts).some((script) => {
    const projectKey = script.dataset.projectKey?.trim() ?? ''
    return !projectKey
  })
}

onMounted(() => {
  showConfigWarning.value = isWidgetMisconfigured()
})
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>SeggWat Vue Example</h1>
      <p>
        Integrate the SeggWat feedback widget into a Vue 3 + Vite app.
        Customize appearance, language, and control the widget programmatically.
      </p>
    </header>

    <section v-if="showConfigWarning" class="warning" role="alert">
      <strong>Configuration warning:</strong> <code>data-project-key</code> is missing.
      Update <code>vue/index.html</code> with your real key from the
      <a href="https://seggwat.com" target="_blank" rel="noopener noreferrer">
        SeggWat dashboard
      </a>.
    </section>

    <main class="main">
      <section class="section">
        <h2>Features</h2>
        <ul>
          <li>Simple script tag integration (no npm package needed)</li>
          <li>TypeScript declarations for all widget APIs</li>
          <li>Dynamic color, position, and language switching</li>
          <li>Programmatic open/close control</li>
          <li>Screenshot capture and annotation</li>
          <li>User identification for feedback tracking</li>
          <li>Works with Vue Router and SPAs</li>
        </ul>
      </section>

      <section class="section">
        <h2>Customize Feedback Button</h2>

        <div class="controls">
          <div class="control-group">
            <h3>Button Color</h3>
            <div class="button-group">
              <button
                v-for="c in colors"
                :key="c.color"
                @click="updateColor(c.color)"
                :style="{ backgroundColor: c.color }"
                :class="{ active: currentColor === c.color }"
              >
                {{ c.label }}
              </button>
            </div>
          </div>

          <div class="control-group">
            <h3>Button Position</h3>
            <div class="button-group position-group">
              <button
                v-for="p in positions"
                :key="p.value"
                @click="updatePosition(p.value)"
                :class="{ active: position === p.value }"
              >
                {{ p.label }}
              </button>
            </div>
          </div>

          <div class="control-group">
            <h3>Language</h3>
            <div class="button-group">
              <button
                v-for="l in languages"
                :key="l.value"
                @click="updateLanguage(l.value)"
                :class="{ active: language === l.value }"
                style="background-color: #4b5563"
              >
                {{ l.label }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <h2>Programmatic Control</h2>
        <p>Open or close the feedback modal from your own UI:</p>

        <div class="controls">
          <div class="control-group">
            <div class="button-group">
              <button
                class="action-btn"
                @click="openFeedback"
              >
                Open Feedback
              </button>
              <button
                class="action-btn"
                @click="closeFeedback"
              >
                Close Feedback
              </button>
              <button
                class="action-btn"
                @click="captureScreenshot"
              >
                Capture Screenshot
              </button>
            </div>
          </div>

          <div class="control-group">
            <h3>User Identification</h3>
            <p class="helper-text">
              Associate feedback with a user ID so you know who submitted it.
            </p>
            <input
              type="text"
              class="text-input"
              placeholder="e.g. user-123"
              :value="userId"
              @input="handleUserIdChange"
            />
          </div>
        </div>
      </section>

      <section class="section">
        <h2>How It Works</h2>
        <p>
          Load the widget via a script tag in <code>index.html</code>.
          It stays mounted across route changes automatically.
        </p>

        <div class="code-block">
          <pre>{{ `<script defer
  src="https://seggwat.com/static/widgets/v1/seggwat-feedback.js"
  data-project-key="YOUR_PROJECT_KEY"
  data-button-color="#42b883"
  data-enable-screenshots="true">
<\/script>` }}</pre>
        </div>

        <p>
          Update appearance or control the widget at runtime:
        </p>

        <div class="code-block">
          <pre>{{ `// Change color or position at runtime
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
window.SeggwatFeedback?.setUser('user-123')` }}</pre>
        </div>
      </section>

      <section class="section">
        <h2>Try It Out!</h2>
        <p>
          Look for the feedback button on screen. Click it to open the feedback form,
          or use the "Open Feedback" button above to trigger it programmatically.
        </p>
        <p class="note">
          <strong>Note:</strong> This example uses a demo project key. Replace it
          with your own key from the
          <a href="https://seggwat.com" target="_blank" rel="noopener noreferrer">
            SeggWat dashboard
          </a>
          for production use.
        </p>
      </section>
    </main>

    <footer class="footer">
      <p>
        Learn more in the
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
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header p {
  font-size: 1.2rem;
  color: #6b7280;
}

.main {
  flex: 1;
}

.warning {
  padding: 1rem;
  margin-bottom: 1.5rem;
  background-color: #fef3c7;
  border-left: 4px solid #f59e0b;
  border-radius: 4px;
}

.warning a {
  color: #92400e;
  font-weight: 600;
}

@media (prefers-color-scheme: dark) {
  .warning {
    background-color: #78350f;
    border-color: #fbbf24;
  }

  .warning a {
    color: #fcd34d;
  }
}

.section {
  margin-bottom: 3rem;
  padding: 2rem;
  border-radius: 12px;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  .section {
    background-color: #1f2937;
    border-color: #374151;
  }
}

.section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #111827;
}

@media (prefers-color-scheme: dark) {
  .section h2 {
    color: #f9fafb;
  }
}

.section h3 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: #374151;
}

@media (prefers-color-scheme: dark) {
  .section h3 {
    color: #d1d5db;
  }
}

.section ul {
  list-style: none;
  padding: 0;
}

.section li {
  padding: 0.5rem 0;
  font-size: 1.1rem;
}

.controls {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.button-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.button-group button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.button-group button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.button-group button.active {
  border-color: #111827;
  box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.1);
}

@media (prefers-color-scheme: dark) {
  .button-group button.active {
    border-color: #f9fafb;
    box-shadow: 0 0 0 3px rgba(249, 250, 251, 0.1);
  }
}

.position-group button,
.button-group button.action-btn {
  background-color: #4b5563;
  color: white;
}

.position-group button:hover,
.button-group button.action-btn:hover {
  background-color: #374151;
}

@media (prefers-color-scheme: dark) {
  .position-group button,
  .button-group button.action-btn {
    background-color: #6b7280;
  }

  .position-group button:hover,
  .button-group button.action-btn:hover {
    background-color: #9ca3af;
  }
}

.helper-text {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
}

.text-input {
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background-color: white;
  color: #111827;
  max-width: 320px;
  transition: border-color 0.2s ease;
}

.text-input:focus {
  outline: none;
  border-color: #42b883;
}

@media (prefers-color-scheme: dark) {
  .text-input {
    background-color: #374151;
    border-color: #4b5563;
    color: #f9fafb;
  }

  .text-input:focus {
    border-color: #42b883;
  }
}

.code-block {
  margin: 1.5rem 0;
  padding: 1.5rem;
  background-color: #1f2937;
  border-radius: 8px;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #e5e7eb;
  line-height: 1.6;
}

code {
  padding: 0.2rem 0.4rem;
  background-color: #e5e7eb;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
  color: #dc2626;
}

@media (prefers-color-scheme: dark) {
  code {
    background-color: #374151;
    color: #fca5a5;
  }
}

.note {
  padding: 1rem;
  background-color: #dbeafe;
  border-left: 4px solid #3b82f6;
  border-radius: 4px;
  margin-top: 1rem;
}

.note a {
  color: #2563eb;
  font-weight: 600;
}

@media (prefers-color-scheme: dark) {
  .note {
    background-color: #1e3a8a;
    border-color: #60a5fa;
  }

  .note a {
    color: #93c5fd;
  }
}

.footer {
  text-align: center;
  padding: 2rem 0;
  margin-top: 3rem;
  border-top: 1px solid #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  .footer {
    border-color: #374151;
  }
}

.footer a {
  color: #42b883;
  text-decoration: none;
  font-weight: 600;
}

.footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .app {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .header p {
    font-size: 1rem;
  }

  .section {
    padding: 1.5rem;
  }

  .section h2 {
    font-size: 1.5rem;
  }

  .text-input {
    max-width: 100%;
  }
}
</style>
