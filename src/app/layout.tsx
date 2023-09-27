
import './globals.css'
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'


import { NavBar } from '@/components/molecule/navBar';
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/lib/auth';
import Provider from '@/lib/client-provider';
//const inter = Inter({ subsets: ['latin'] })

// import { Poppins } from 'next/font/google'
// const poppins = Poppins({
//   weight: ['100','200','300','400','500','600','700','800','900'],
//   subsets: ['latin'],
//   display: 'swap',
// })

export const metadata: Metadata = {
  title: 'Workout App',
  
}

export default  function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  //const session = await getServerSession(authOptions)
  //${inter.className}
  return (
    <html lang="en">
      <body className={` bg-backgroundColor text-white border m-2 rounded-xl border-darkgray  `} >
        {/* <Provider session={session}> */}
        {children}
        {/* </Provider> */}
        <div>
          <NavBar />
        </div>
        
        
      
      </body>
      
    </html>
  )
}
