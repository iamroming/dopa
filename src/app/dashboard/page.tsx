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
  const [userData, setUserData] = useState<User | null>(null) // Fixed: Replaced any with User | null
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error: dbError } = await supabase
          .from('users')
          .select('*')
          .single()

        if (dbError) throw dbError
        setUserData(data as User) // Type assertion if needed
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {userData && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Information</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
            {JSON.stringify(userData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}