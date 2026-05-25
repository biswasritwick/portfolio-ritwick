'use client'

import { useEffect, useState } from 'react'

const text = 'Booting up the portfolio'

export default function Loader() {
  const [displayedText, setDisplayedText] = useState('')
  const [loading, setLoading] = useState(0)

  useEffect(() => {
    let index = 0

    const typing = setInterval(() => {
      setDisplayedText(text.slice(0, index))
      index++

      if (index > text.length) {
        clearInterval(typing)
      }
    }, 80)

    const progress = setInterval(() => {
      setLoading((prev) => {
        if (prev >= 100) {
          clearInterval(progress)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => {
      clearInterval(typing)
      clearInterval(progress)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <div className="w-fit flex flex-col items-center">
        {/* Text */}
        <div className="flex items-center gap-3 text-white text-4xl font-bold font-mono">
          <span>{'<'}</span>

          <h4>
            {displayedText}
            <span>
              <span className="animate-pulse">..</span>
              {'>'}
            </span>
          </h4>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 h-[2px] w-full max-w-[80%] bg-white/20 overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-200"
            style={{ width: `${loading}%` }}
          />
        </div>
      </div>
    </div>
  )
}
