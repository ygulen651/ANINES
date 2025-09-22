import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import '../../styles/globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-montserrat'
})

export const metadata: Metadata = {
  title: 'OSLO - Lezzetin Yeni Simgesi',
  description: 'OSLO ile hayatını lezzete dönüştür. Kaliteli çikolata ve şekerleme ürünleri.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={montserrat.className}>
        {children}
      </body>
    </html>
  )
}
