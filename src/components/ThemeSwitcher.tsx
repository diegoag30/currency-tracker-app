'use client'

import { PaintBrushIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { THEMES, Theme } from '@/config/constants'

export default function ThemeSwitcher() {
  const [current, setCurrent] = useState<Theme>('sunset')

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved && THEMES.includes(saved)) setCurrent(saved)
  }, [])

  function applyTheme(theme: Theme) {
    setCurrent(theme)
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <div className="dropdown dropdown-top w-full">
      <div tabIndex={0} role="button" className="flex items-center gap-2 w-full">
        <PaintBrushIcon className="w-5 h-5 shrink-0" />
        <span className="hidden lg:block text-sm capitalize">{current}</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box shadow-lg z-10 w-40 p-2 mb-1"
      >
        {THEMES.map((theme) => (
          <li key={theme}>
            <button
              onClick={() => applyTheme(theme)}
              className={`capitalize ${current === theme ? 'active' : ''}`}
            >
              {theme}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
