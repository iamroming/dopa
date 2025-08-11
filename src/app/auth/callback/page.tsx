// app/auth/callback/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'
import type { AuthChangeEvent, Session } from '@supabase/supabase-js'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        switch (event) {
          case 'SIGNED_IN':
            router.push('/dashboard')
            break
          case 'SIGNED_OUT':
            router.push('/login')
            break
          case 'TOKEN_REFRESHED':
            console.log('Token refreshed')
            break
          case 'USER_UPDATED':
            console.log('User updated', session?.user)
            break
          case 'PASSWORD_RECOVERY':
            router.push('/reset-password')
            break
          default:
            console.warn('Unhandled auth event:', event)
        }
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-lg font-medium text-gray-700">Processing authentication...</p>
      <p className="text-sm text-gray-500">You'll be redirected automatically</p>
    </div>
  )
}