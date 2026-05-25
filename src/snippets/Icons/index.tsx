/* eslint-disable */
import React from 'react'

export const Logomain: React.FC<{ color?: string | undefined; className?: any }> = ({
  color = '#ffffff',
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="240"
      viewBox="0 0 800 240"
      fill="none"
    >
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>

      <rect width="800" height="240" rx="32" fill="" />

      <g transform="translate(40,40)">
        <circle cx="80" cy="80" r="70" stroke="url(#grad)" strokeWidth="10" fill="none" />

        <path
          d="M55 120V40H90C115 40 130 52 130 74C130 92 119 103 101 106L132 120H103L77 108V120H55ZM77 90H88C98 90 106 85 106 75C106 65 98 60 88 60H77V90Z"
          fill="url(#grad)"
        />
      </g>

      <text
        x="259"
        y="135"
        fontFamily="Poppins, Arial, sans-serif"
        fontSize="64"
        fontWeight="700"
        letterSpacing="8"
        fill="white"
      >
        RITWICK
      </text>
    </svg>
  )
}
