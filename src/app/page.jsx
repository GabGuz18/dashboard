import { redirect } from 'next/navigation'
import React from 'react'

const Page = () => {
  redirect('/auth/login')
}

export default Page