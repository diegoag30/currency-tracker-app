'use client'

import NavLinks from './NavLinks'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SideNav() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <ul className="menu bg-base-200 text-base-content min-h-full w-60 p-4">
      <NavLinks />
      <li className="mt-auto">
        <button onClick={handleSignOut} className="text-error">
          <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />
          <p className="hidden md:block">Sign Out</p>
        </button>
      </li>
    </ul>
  )
}
