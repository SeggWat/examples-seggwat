/**
 * TypeScript declarations for SeggWat embeddable widgets.
 * @see https://seggwat.com/docs/widget/installation
 */

interface SeggwatFeedbackAPI {
  version: string
  setUser(userId: string | null, email?: string | null): void
  // Live appearance only. Language is loaded at init from data-language and
  // cannot be changed here — destroy() and re-inject the script to switch it.
  updateAppearance(options?: {
    color?: string
    headerColor?: string
    position?: 'bottom-right' | 'right-side' | 'icon-only'
    buttonText?: string
  }): void
  open(): void
  close(): void
  captureScreenshot(): void
  openWithScreenshot(blob: Blob): void
  hasScreenshot(): boolean
  clearScreenshot(): void
  screenshotsEnabled: boolean
  destroy(): void
  container: HTMLButtonElement
}

interface SeggwatHelpfulAPI {
  setUser(userId: string | null): void
  reset(): void
  container: HTMLElement
}

interface SeggwatRatingAPI {
  version: string
  setUser(userId: string | null): void
  reset(): void
  getRating(): number
  getStyle(): 'stars' | 'smiley'
  container: HTMLElement
}

declare global {
  interface Window {
    SeggwatFeedback?: SeggwatFeedbackAPI
    SeggwatHelpful?: SeggwatHelpfulAPI
    SeggwatRating?: SeggwatRatingAPI
  }

  // Allow direct access without `window.` prefix
  const SeggwatFeedback: SeggwatFeedbackAPI | undefined
  const SeggwatHelpful: SeggwatHelpfulAPI | undefined
  const SeggwatRating: SeggwatRatingAPI | undefined
}

export {}
