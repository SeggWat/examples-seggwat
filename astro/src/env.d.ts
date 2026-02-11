/// <reference path="../.astro/types.d.ts" />

/**
 * TypeScript declarations for SeggWat embeddable widgets.
 * @see https://seggwat.com/docs/widget/installation
 */

interface SeggwatFeedbackAPI {
  version: string
  setUser(userId: string | null): void
  updateAppearance(options?: {
    color?: string
    position?: 'bottom-right' | 'right-side' | 'icon-only'
    language?: 'en' | 'de' | 'sv'
  }): Promise<void>
  open(): void
  close(): void
  captureScreenshot(): void
  openWithScreenshot(blob: Blob): void
  hasScreenshot(): boolean
  clearScreenshot(): void
  screenshotsEnabled: boolean
  container: HTMLButtonElement
}

interface SeggwatHelpfulAPI {
  setUser(userId: string | null): void
  reset(): void
  container: HTMLElement
}

interface SeggwatStarAPI {
  version: string
  setUser(userId: string | null): void
  reset(): void
  getRating(): number
  getStyle(): 'stars' | 'smiley'
  container: HTMLElement
}

interface SeggwatContactAPI {
  setUser(userId: string | null): void
  open(): void
  close(): void
  reset(): void
}

declare global {
  interface Window {
    SeggwatFeedback?: SeggwatFeedbackAPI
    SeggwatHelpful?: SeggwatHelpfulAPI
    SeggwatStar?: SeggwatStarAPI
    SeggwatContact?: SeggwatContactAPI
  }

  const SeggwatFeedback: SeggwatFeedbackAPI | undefined
  const SeggwatHelpful: SeggwatHelpfulAPI | undefined
  const SeggwatStar: SeggwatStarAPI | undefined
  const SeggwatContact: SeggwatContactAPI | undefined
}

export {}
