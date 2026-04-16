'use client'

import { PaintBrushIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import { THEMES, Theme } from '@/config/constants'

export default function ThemeSwitcher() {
  const [current, setCurrent] = useState<Theme>('sunset')
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLLIElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved && THEMES.includes(saved)) setCurrent(saved)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function applyTheme(theme: Theme) {
    setCurrent(theme)
    setOpen(false)
    localStorage.setItem('theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }

  return (
    <li ref={ref} className="relative">
      {/* Plain div — inherits single menu hover from <li> */}
      <div onClick={() => setOpen((o) => !o)} className="flex items-center gap-2 cursor-pointer">
        <PaintBrushIcon className="w-5 h-5 shrink-0" />
        <span className="hidden lg:block text-sm capitalize">{current}</span>
      </div>

      {open && (
        <ul className="absolute left-0 top-full mt-1 z-50 bg-base-100 rounded-box shadow-lg w-40 p-2">
          {THEMES.map((theme) => (
            <li key={theme}>
              <button
                onClick={() => applyTheme(theme)}
                className={`w-full text-left capitalize ${current === theme ? 'font-semibold text-primary' : ''}`}
              >
                {theme}
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}
