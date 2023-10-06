import React from 'react'
interface TopNavBarProps{
   
 
    children: React.ReactNode;
}
const TopNavBar = ({children}:TopNavBarProps) => {
  return (
    <div className=' fixed border rounded-bl-xl  rounded-br-xl bg-backgroundColor mx-2 w-[96vw] top-0 shadow-sm  shadow-red-500 border-darkgray'>
        {children}
    </div>
  )
}

export default TopNavBar