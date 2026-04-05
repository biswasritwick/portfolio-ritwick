'use client'

import { MainHeroBannerBlock as MainHeroBannerBlockProps } from '@/payload-types'
import './style.css'
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export const MainHeroBanner: React.FC<MainHeroBannerBlockProps> = ({
  name,
  staticText,
  description,
  buttonText,
  buttonLink,
  bgImage,
}) => {
  const interactiveRef = useRef<HTMLDivElement | null>(null)

  // ================= Gradient Mouse Animation =================
  useEffect(() => {
    let curX = 0
    let curY = 0
    let tgX = 0
    let tgY = 0
    let animationFrameId: number

    const move = () => {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20

      if (interactiveRef.current) {
        interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
      }

      animationFrameId = requestAnimationFrame(move)
    }

    const handleMouseMove = (event: MouseEvent) => {
      tgX = event.clientX
      tgY = event.clientY
    }

    window.addEventListener('mousemove', handleMouseMove)
    move()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  // ================= Typing Effect =================
  const words = ['Frontend', 'Backend', 'Fullstack', 'Web Apps', 'APIs', 'Mobile Apps']

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [displayText, setDisplayText] = useState(words[0])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const generateGibberish = (length: number) => {
    const chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+[]{}|;:,<>?/'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const resolveGibberish = (word: string, callback: () => void) => {
    let text = generateGibberish(word.length)
    setDisplayText(text)

    let iterations = 0
    const maxIterations = 10

    intervalRef.current = setInterval(() => {
      iterations++

      text = text
        .split('')
        .map((char, index) => {
          if (iterations < maxIterations) {
            return Math.random() > 0.5 ? generateGibberish(1) : char
          }
          return word[index]
        })
        .join('')

      setDisplayText(text)

      if (text === word) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        callback()
      }
    }, 100)
  }

  useEffect(() => {
    const nextWord = words[currentWordIndex]

    resolveGibberish(nextWord, () => {
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
      }, 1200)
    })

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [currentWordIndex])

  // ================= UI =================
  return (
    <div className="hero-section overflow-hidden relative w-full h-screen" id="herosection">
      {/* Background Image */}
      <div className="overlay">
        {bgImage && typeof bgImage !== 'string' && (
          <figure className="featured_img w-full h-full">
            <Image
              src={bgImage.url || ''}
              alt={bgImage.alt || 'feature_img'}
              width={1920}
              height={870}
            />
          </figure>
        )}
      </div>

      {/* Content */}
      <div className="container w-full h-full flex justify-start items-center hero-section-content relative z-10">
        <div className="hero-text flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="start-text">Start /&gt;</p>

            <h2 className="hero-heading font-bold">
              Hi, my name is <span className="highlightText">{name}</span>
            </h2>
          </div>

          <div className="typing-container flex flex-col gap-2">
            <h4 className="static-text">
              {staticText} <span className="dynamic-text">{displayText}</span>
            </h4>

            <p className="hero-description">{description}</p>
          </div>
        </div>

        <div className="button-container">
          <a className="hero-button" href={buttonLink}>
            <span>{buttonText}</span>
          </a>
        </div>
      </div>

      {/* Gradient Background */}
      <div className="gradient-bg" id="gradient-bg">
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        <div className="gradients-container">
          <div className="g1"></div>
          <div className="g2"></div>
          <div className="g3"></div>
          <div className="g4"></div>
          <div className="g5"></div>

          {/* Interactive bubble */}
          <div ref={interactiveRef} className="interactive"></div>
        </div>
      </div>
    </div>
  )
}
