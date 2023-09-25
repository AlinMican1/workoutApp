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
    + flex relative items-center w-[250px] px-3 text-[17px] 
    py-2 min-h-[32px] font-semibold rounded rounded-md  
    hover:bg-indigo-500  duration-150 hover:px-5` } {...props} > 
    <div className='w-4 h-7 mr-5'>
    {children}
    </div>
    <div>
    <span className='top-[-1px] relative '>{btnText}</span>
    </div>
    
    </button>
    
  )
}

