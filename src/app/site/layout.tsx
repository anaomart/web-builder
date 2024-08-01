import React from 'react'
import Navigation from '../../components/site/navigation'

export default function layout({children}:{children:React.ReactNode}) {
  return (
    <main className='h-full'>
        <Navigation/>
        {children}</main>
  )
}
