
import React from 'react'
import {signOut} from 'next-auth/react';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { db } from '@/lib/db';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

export const SignOutBtn = () => {
  return (
    <button className={
     `flex relative text-[14px] 
     min-h-[32px]  rounded rounded-md flex-col  
     hover:bg-indigo-500  items-center text-red-500 duration-150`}  onClick={() => signOut({
      redirect: true,
      callbackUrl: `/login`
    })}>
    <div className=''>
    <FontAwesomeIcon icon={faRightFromBracket} />
    </div>
    Sign Out</button>
  )
}

// interface DeleteBtnProps {
//   cardId: string; // Update the type accordingly
// }

// const DeletePlanBtn: React.FC<DeleteBtnProps> = ({ cardId }) => {
//   const handleClick = async () => {
    
//     try{
                
//       const response = await fetch ('api/user/newPlan/Delete',{
//         method: 'POST',
       
//         body: JSON.stringify({
//           cardId
          
//         }),
//         headers:{
//           'Content-type': 'application/json'
//         },
        
//       })
//       if(response.ok){
//         redirect
//       }
//     }catch(error){
//       //Internal server error
//     }
//   };

//   return (
//     <button className={`bg-[#f3405f] text-[16px] m-2 font-bold p-1 rounded-lg  text-titleColor`} onClick={handleClick}>DELETE</button>
//   );
// }

// export default DeletePlanBtn;