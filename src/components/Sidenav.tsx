'use client'

import NavLinks from './NavLinks'
import ThemeSwitcher from './ThemeSwitcher'
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

      {/* User row */}
      <li className="sticky top-0 bg-base-200 z-10 pointer-events-none">
        <div className="flex items-center gap-2 px-2 py-3">
          <UserCircleIcon className="w-6 h-6 shrink-0 text-primary" />
          <span className="hidden lg:block text-sm font-medium truncate">
            {email ?? '...'}
          </span>
        </div>
      </li>

      {/* Theme section */}
      <li><hr className="border-base-300 my-1" /></li>
      <li className="hidden lg:block">
        <span className="menu-title text-xs uppercase tracking-widest opacity-50 px-2">Theme</span>
      </li>
      <li>
        <ThemeSwitcher />
      </li>

      {/* Menu section */}
      <li><hr className="border-base-300 my-1" /></li>
      <li className="hidden lg:block">
        <span className="menu-title text-xs uppercase tracking-widest opacity-50 px-2">Menu</span>
      </li>
      <NavLinks />

      {/* Sign out */}
      <li className="mt-auto">
        <button onClick={handleSignOut} className="text-error">
          <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
          <p className="hidden lg:block">Sign Out</p>
        </button>
      </li>

    </ul>
  )
}
