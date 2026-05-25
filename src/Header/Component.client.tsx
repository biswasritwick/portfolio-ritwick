'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { SideBarSocialLink } from './SideBar'
import { Logomain } from '@/snippets/Icons'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  // Local UI theme mode for the toggle (dark or light)
  const [localMode, setLocalMode] = useState<'dark' | 'light'>('light')
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  // Initialize local theme from storage or user preference
  // useEffect(() => {
  //   try {
  //     const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
  //     if (saved === 'dark' || saved === 'light') {
  //       setLocalMode(saved as 'dark' | 'light')
  //     } else {
  //       const prefersDark =
  //         typeof window !== 'undefined' && window.matchMedia
  //           ? window.matchMedia('(prefers-color-scheme: dark)').matches
  //           : false
  //       setLocalMode(prefersDark ? 'dark' : 'light')
  //     }
  //   } catch {
  //     // ignore storage errors
  //   }
  //   // eslint-disable-next-line no-empty
  // }, [])

  // Apply HTML level classes to reflect the current theme
  // useEffect(() => {
  //   const html = document.documentElement
  //   if (localMode === 'dark') {
  //     html.classList.add('dark_mode')
  //     html.classList.remove('light_mode')
  //   } else {
  //     html.classList.add('light_mode')
  //     html.classList.remove('dark_mode')
  //   }
  // }, [localMode])

  // Toggle handler
  // const toggleTheme = () => {
  //   setLocalMode((prev) => {
  //     const next = prev === 'dark' ? 'light' : 'dark'
  //     try {
  //       localStorage.setItem('theme', next)
  //     } catch {
  //       // ignore storage errors
  //     }
  //     return next
  //   })
  // }

  // // Determine icon based on current mode
  // const themeIcon = localMode === 'dark' ? '☀️' : '🌙'

  return (
    <header
      className="w-full flex items-center justify-center relative z-20 header_main  "
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className=" flex items-center justify-between header_main__inner container">
        <Link href="/">
          {/* <Logo loading="eager" priority="high" className="invert dark:invert-0" /> */}
          <div className="text-3xl font-bold text-white mousegrow header-logo" id="hero">
            {/* &lt;RITWICK/&gt;
             */}

            <Logomain />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          {/* <button
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            title="Toggle theme"
            className="p-2 rounded-md"
          >
            <span aria-hidden="true">{themeIcon}</span>
          </button> */}
          <HeaderNav data={data} />
          {/* <SideBarSocialLink data={data} />  */}
        </div>
      </div>
    </header>
  )
}
