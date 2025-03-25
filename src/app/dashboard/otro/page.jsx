import { ProtectedRoute } from '@/components'
import React from 'react'

const Page = () => {
  return (
    <ProtectedRoute>
      <div>Page</div>
    </ProtectedRoute>
  )
}

export default Page