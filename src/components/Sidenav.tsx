'use client'

import NavLinks from './NavLinks'
import { ArrowLeftEndOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const supabase = createClient()

export default function SideNav() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    async function loadUser() {
      const { data: { session } } = await supabase.auth.getSession()
      setEmail(session?.user?.email ?? null)
    }
    loadUser()
  }, [])

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-full p-2 lg:p-4">
      {/* Sticky user row */}
      <li className="sticky top-0 bg-base-200 z-10 mb-2 pointer-events-none">
        <div className="flex items-center gap-2 px-2 py-3 border-b border-base-300">
          <UserCircleIcon className="w-6 h-6 shrink-0 text-primary" />
          <span className="hidden lg:block text-sm font-medium truncate">
            {email ?? '...'}
          </span>
        </div>
      </li>

      <NavLinks />

      <li className="mt-auto">
        <button onClick={handleSignOut} className="text-error">
          <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
          <p className="hidden lg:block">Sign Out</p>
        </button>
      </li>
    </ul>
  )
}
