'use client'
import React from 'react'
import {signOut} from 'next-auth/react';

export const SignOutBtn = () => {
  return (
    <div> <button onClick={() => signOut({
      redirect: true,
      callbackUrl: `/login`
    })}>Sign Out</button></div>
  )
}
