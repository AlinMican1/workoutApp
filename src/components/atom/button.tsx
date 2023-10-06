import React, { ReactNode } from 'react';
import '../../app/globals.css';
interface ButtonConfig {
    btnText?: string
    btnColor?: string;
    onclick?: () => void;
    children?: ReactNode;
    //btnIcon?: React.ReactNode;
  }

export const ButtonNavBar: React.FC<ButtonConfig> = ({btnText,btnColor, onclick, children, ...props}) => {
    
    return (
  
    <button onClick={onclick} 
    className= { `${btnColor} 
    + flex relative text-[14px] 
    min-h-[32px]  rounded rounded-md flex-col  
    hover:bg-indigo-500  items-center duration-150` } {...props} > 
    <div className=''>
    {children}
    </div>
    <div>
    <span className='text-textColor'>{btnText}</span>
    </div>
    
    </button>
    
  )
}

interface ColorButtonProps{
  onClick?: () => void,
  btnColor: string,
}
export const ColorButton = ({onClick,btnColor}:ColorButtonProps) => {
  return(
  <button onClick={onClick} className={`w-12 h-6 rounded rounded-lg bg-pink-300 ${btnColor}`}>
    
  </button>
  )
}