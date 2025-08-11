'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError('No verification token found')
        setLoading(false)
        return
      }

      try {
        const { error } = await supabase.auth.verifyOtp({
          type: 'email',
          token_hash: token,
        })

        if (error) throw error
        setSuccess(true)
        setTimeout(() => router.push('/dashboard'), 2000)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Verification failed')
      } finally {
        setLoading(false)
      }
    }

    verifyToken()
  }, [token, router])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Verification Error</h1>
        <p className="text-gray-700 mb-4">{error}</p>
        <button
          onClick={() => router.push('/login')}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Return to Login
        </button>
      </div>
    )
  }

  if (success) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Email Verified!</h1>
        <p className="text-gray-700 mb-4">Your email has been successfully verified. Redirecting to dashboard...</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
      <p className="text-gray-700">Processing your verification request...</p>
    </div>
  )
}