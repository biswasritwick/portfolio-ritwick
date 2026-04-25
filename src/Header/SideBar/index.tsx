'use client'

import React from 'react'

import type { Header as SociaLink } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const SideBarSocialLink: React.FC<{ data: SociaLink }> = ({ data }) => {
  const SocialLinks = data?.socialLinks || []
  console.log('HeaderNav data:', SocialLinks)
  return (
    <div className="flex gap-3 items-center Social_main">
      {SocialLinks.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
    </div>
  )
}
