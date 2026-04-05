'use client'
import { AboutUsBlock as AboutUsBlockProps } from '@/payload-types'
import './style.css'
import React, { useRef } from 'react'

export const AboutUsBlock: React.FC<AboutUsBlockProps> = ({
  title,
  aboutusStaticText,
  education,
  skillsName,
}) => {
  const educationRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = educationRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const xPercent = (x / rect.width) * 100
    const yPercent = (y / rect.height) * 100

    el.style.backgroundImage = `radial-gradient(circle at ${xPercent}% ${yPercent}%, #cbd5e180, #0206171a)`
  }

  return (
    <div className="container about-section-main">
      <div className="about-section-content">
        <div className="about-content-inner flex flex-col items-center gap-5">
          <h2 className="about-title">{title}</h2>

          <div className="education-section" ref={educationRef} onMouseMove={handleMouseMove}>
            <div className="education-section-inner flex flex-col items-center p-8 gap-10">
              <p className="about-description max-w-[80%] text-center">{aboutusStaticText}</p>

              <div className="education w-full h-auto flex flex-col items-start gap-4">
                <h4 className="education-title">Education</h4>

                {education?.map((edu, index) => (
                  <div
                    key={index}
                    className="education-item w-full bg-blue-500/10 p-3 rounded-[8px] hover:bg-blue-500/20"
                  >
                    <h6 className="degree">{edu.degree}</h6>
                    <p className="institution">{edu.institution}</p>
                    {edu.cgpa && <p className="cgpa">CGPA: {edu.cgpa}</p>}
                  </div>
                ))}
              </div>
              <div className="skills-section">
                <h4 className="skills-title">Skills</h4>
                <ul className="skills-list">
                  {skillsName?.map((skill, index) => (
                    <li key={index} className="skill-item">
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
