'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

// Define a proper type for your user data
interface User {
  id: string;
  email?: string;
  name?: string;
  created_at: string;
  // Add all other fields that exist in your users table
  // Make optional (with ?) if the field might be null
}

export default function DashboardPage() {
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
    dfadfasd
    </div>
  )
}