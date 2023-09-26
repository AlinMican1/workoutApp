
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from "next/headers";

import { NavBar } from '@/components/molecule/navBar';

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
  
  //Check the pathname so it doesn't add layout to register and login page
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";
  
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#27282c] text-white `}>{children}
        {pathname === '/login' || pathname === '/register' ? <>
        </> :
        <div>
          <NavBar />
          </div>
        }
        
      
      </body>
    </html>
  )
}
