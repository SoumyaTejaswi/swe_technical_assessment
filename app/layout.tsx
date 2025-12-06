import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TUMMALA MOTORS',
  description: 'Browse our selection of quality vehicles',
  icons: {
    icon: 'https://tummala.inc/wp-content/uploads/elementor/thumbs/cropped-tummalainc-favicon-1-qelqogc6wt9o8hciy2bpxs0sspdp1gzlzanthwqsjm.png',
    shortcut: 'https://tummala.inc/wp-content/uploads/elementor/thumbs/cropped-tummalainc-favicon-1-qelqogc6wt9o8hciy2bpxs0sspdp1gzlzanthwqsjm.png',
    apple: 'https://tummala.inc/wp-content/uploads/elementor/thumbs/cropped-tummalainc-favicon-1-qelqogc6wt9o8hciy2bpxs0sspdp1gzlzanthwqsjm.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white antialiased">{children}</body>
    </html>
  )
}

