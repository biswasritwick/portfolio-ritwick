/* eslint-disable */
import React from 'react'

export const Logomain: React.FC<{ color?: string | undefined; className?: any }> = ({
  color = '#ffffff',
  className,
}) => {
  return (
    <svg
      width="800"
      height="240"
      viewBox="0 0 800 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#2563EB" />
          <stop offset="100%" stop-color="#7C3AED" />
        </linearGradient>
      </defs>

      <rect width="800" height="240" rx="32" fill="#0F172A" />

      <g transform="translate(40,40)">
        <circle cx="80" cy="80" r="70" stroke="url(#grad)" stroke-width="10" fill="none" />

        <path
          d="M55 120V40H90C115 40 130 52 130 74C130 92 119 103 101 106L132 120H103L77 108V120H55ZM77 90H88C98 90 106 85 106 75C106 65 98 60 88 60H77V90Z"
          fill="url(#grad)"
        />
      </g>

      <text
        x="259"
        y="135"
        font-family="Poppins, Arial, sans-serif"
        font-size="64"
        font-weight="700"
        letter-spacing="8"
        fill="white"
      >
        RITWICK
      </text>
    </svg>
  )
}
