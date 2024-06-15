import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'The Novice | Learn Everything',
  description: 'Learn something new every episode. The Novice is a new podcast and a newsletter by Kirill Zubovsky',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
