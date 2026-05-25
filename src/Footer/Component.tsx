import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { Logomain } from '@/snippets/Icons'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  const socialItems = footerData?.socialItems || []
  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white footer_main">
      <div className="footer_inner fixed bottom-0 left-0 w-full">
        <div className="container h-full md:gap-8 flex flex-row  !p-5 justify-between ">
          <Link className="flex items-center" href="/">
            {/* <Logo /> */}
            <div
              className="text-3xl font-bold text-white mousegrow footer-logo max-w-[300px]"
              id="hero"
            >
              {/* &lt;RITWICK/&gt; */}
              <Logomain />
            </div>
          </Link>
          {navItems && navItems.length > 0 && (
            <div className="flex flex-col-reverse items-start md:flex-row pt-8 gap-4 md:items-center">
              {/* <ThemeSelector /> */}
              <nav className="flex flex-col md:flex-row gap-4">
                {navItems.map(({ link }, i) => {
                  return <CMSLink className="text-white" key={i} {...link} />
                })}
              </nav>
            </div>
          )}
          {socialItems && socialItems.length > 0 && (
            <div className="flex items-center gap-4">
              {socialItems.map((item, i) => (
                <Link
                  key={i}
                  href={item.link || '#'}
                  target="_blank"
                  className="flex items-center gap-2 text-white hover:text-gray-300 transition social_link"
                >
                  {/* Image Icon */}
                  {item.iconType === 'image' &&
                    item.iconImage &&
                    typeof item.iconImage !== 'string' && (
                      <img
                        src={item.iconImage.url || ''}
                        alt={item.iconImage?.alt ?? item.text ?? ''}
                        className="w-5 h-5 object-contain"
                      />
                    )}

                  {/* HTML / SVG Icon */}
                  {item.iconType === 'html' && item.iconHtml && (
                    <div
                      className="w-5 h-5 flex items-center justify-center"
                      dangerouslySetInnerHTML={{
                        __html: item.iconHtml,
                      }}
                    />
                  )}

                  {/* Text */}
                  <span className="text-sm">{item.text}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
