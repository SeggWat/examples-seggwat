import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'SeggWat Next.js Example',
  description: 'Integrate the SeggWat feedback widget into a Next.js app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}

        <Script
          src="https://seggwat.com/static/widgets/v1/seggwat-feedback.js"
          data-project-key="demo-project-key"
          data-button-color="#000000"
          data-enable-screenshots="true"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
