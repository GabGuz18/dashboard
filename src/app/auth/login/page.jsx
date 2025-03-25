'use client'

import { Login, PublicRoute } from '@/components'
import React from 'react'

const Page = () => {
  return (
    <PublicRoute>
      <Login />
    </PublicRoute>
  )
}

export default Page