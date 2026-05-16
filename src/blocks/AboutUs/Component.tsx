'use client'
import { AboutUsBlock as AboutUsBlockProps } from '@/payload-types'
import './style.css'
import React, { useRef } from 'react'
import Image from 'next/image'
import { PhysicsImages } from '@/components/PhysicsImages'

export const AboutUsBlock: React.FC<AboutUsBlockProps> = ({
  title,
  aboutusStaticText,
  education,
  worktype,
}) => {
  const educationRef = useRef<HTMLDivElement | null>(null)
  let timeout: NodeJS.Timeout | null = null

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (timeout) return

    timeout = setTimeout(() => {
      const el = educationRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xPercent = (x / rect.width) * 100
      const yPercent = (y / rect.height) * 100

      el.style.backgroundImage = `radial-gradient(circle at ${xPercent}% ${yPercent}%, #cbd5e180, #0206171a)`

      timeout = null
    }, 20)
  }

  return (
    <div className="container about-section-main">
      <div className="about-section-content">
        <div className="about-content-inner flex flex-col items-center gap-5">
          {/* TITLE */}
          <h2 className="about-title">{title}</h2>

          {/* MAIN BOX */}
          <div className="education-section" ref={educationRef} onMouseMove={handleMouseMove}>
            <div className="education-section-inner flex flex-col items-center p-8 gap-10">
              {/* DESCRIPTION */}
              <p className="about-description md:max-w-[80%] max-w-full text-center">
                {aboutusStaticText}
              </p>

              {/* EDUCATION */}
              <div className="education w-full flex flex-col items-start gap-4">
                <h4 className="education-title">Education</h4>

                {education?.map((edu, i) => (
                  <div
                    key={edu.id || i}
                    className="education-item w-full bg-blue-500/10 p-3 rounded-[8px] hover:bg-blue-500/20 transition"
                  >
                    <h6 className="degree">{edu.degree}</h6>
                    <p className="institution">{edu.institution}</p>
                    {edu.cgpa && <p className="cgpa">CGPA: {edu.cgpa}</p>}
                  </div>
                ))}
              </div>

              {/* SKILLS */}
              <div className="skills-section w-full flex flex-col items-start gap-4">
                <h4 className="skills-title">Skills</h4>

                <div
                  className="skills-list grid w-full
                  md:grid-cols-2 grid-cols-1  flex-col gap-6"
                >
                  {worktype?.map((skillGroup, i) => (
                    <div key={skillGroup.id || i} className="skill-item flex flex-col gap-4">
                      {/* CATEGORY */}
                      <h5 className="work-type font-semibold mb-2">{skillGroup.workName}</h5>

                      {/* SKILLS LIST */}
                      <div className="flex flex-wrap gap-4">
                        {skillGroup.skills?.map((skill, j) => (
                          <div key={skill.id || j} className="">
                            <div className="skill-detail flex items-center gap-3 bg-white/5 px-3 py-2  hover:bg-white/10 transition rounded-[8px]">
                              <p className="skill-name text-sm capitalize">{skill.name}</p>
                              <div className="skill-icon flex items-center justify-center">
                                {skill.iconType === 'image' &&
                                  skill.iconImage &&
                                  typeof skill.iconImage !== 'string' &&
                                  skill.iconImage.url && ( // 👈 important check
                                    <Image
                                      src={skill.iconImage.url}
                                      alt={skill.name + ' icon'}
                                      width={32}
                                      height={32}
                                      className="w-8 h-8"
                                    />
                                  )}

                                {skill.iconType === 'html' && skill.iconHtml && (
                                  <div
                                    className="w-8 h-8"
                                    dangerouslySetInnerHTML={{ __html: skill.iconHtml }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* END SKILLS */}

              {/* <div className="skills-section w-full flex flex-col items-start gap-4">
                <h4 className="skills-title">Skills</h4>

                <div className="skills-list grid w-full grid-cols-2 gap-6">
                  {worktype?.map((skillGroup, i) => {
                    // ✅ Create icon array per group
                    const groupIcons =
                      skillGroup.skills
                        ?.map((skill) => {
                          if (
                            skill.iconType === 'image' &&
                            skill.iconImage &&
                            typeof skill.iconImage !== 'string'
                          ) {
                            return {
                              url: skill.iconImage.url,
                              width: 20,
                            }
                          }

                          if (skill.iconType === 'html' && skill.iconHtml) {
                            return {
                              url: 'data:image/svg+xml;utf8,' + encodeURIComponent(skill.iconHtml),
                              width: 20,
                            }
                          }

                          return null
                        })
                        .filter(Boolean) || []

                    console.log(`Icons for ${skillGroup.workName}:`, groupIcons)

                    return (
                      <div key={skillGroup.id || i} className="skill-item">
                        <h5 className="work-type font-semibold mb-2">{skillGroup.workName}</h5>
                        <div className="flex flex-wrap gap-2">
                          {skillGroup.skills?.map((skill, j) => (
                            <div
                              key={skill.id || j}
                              className="skill-detail bg-white/5 px-3 py-2 rounded-md"
                            >
                              <p className="text-sm">{skill.name}</p>
                            </div>
                          ))}
                        </div>
                        <div className="skill-icons flex gap-2 mb-3 h-[200px] relative overflow-hidden">
                          <PhysicsImages images={groupIcons} size={30} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
