'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event) => {
        if (event === 'SIGNED_IN') {
          router.push('/dashboard')
        } else if (event === 'SIGNED_OUT') {
          router.push('/login')
        }
      }
    )

    return () => subscription?.unsubscribe()
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-lg font-medium text-gray-700">
        Processing authentication...
      </p>
      <p className="text-sm text-gray-500">
        You&apos;ll be redirected automatically
      </p>
    </div>
  )
}