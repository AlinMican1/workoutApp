import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
// import { Poppins } from 'next/font/google'


// const poppins = Poppins({
//   weight: ['100','200','300','400','500','600','700','800','900'],
//   subsets: ['latin'],
//   display: 'swap',
// })

export const metadata: Metadata = {
  title: 'Workout App',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#27282c] text-white`}>{children}</body>
    </html>
  )
}
