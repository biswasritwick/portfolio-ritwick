import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'socialItems',
      type: 'array',
      fields: [
        {
          name: 'iconType',
          type: 'radio',
          label: 'Icon Type',
          options: [
            {
              label: 'Image Upload',
              value: 'image',
            },
            {
              label: 'SVG / HTML',
              value: 'html',
            },
          ],
          defaultValue: 'image',
        },

        // Image Upload
        {
          name: 'iconImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Skill Icon Image',
          admin: {
            condition: (_, siblingData) => siblingData.iconType === 'image',
          },
        },

        // SVG / HTML
        {
          name: 'iconHtml',
          type: 'code',
          label: 'SVG / HTML Code',
          admin: {
            language: 'html',
            condition: (_, siblingData) => siblingData.iconType === 'html',
          },
        },

        // Text
        {
          name: 'text',
          type: 'text',
          label: 'Social Text',
        },

        // Link
        {
          name: 'link',
          type: 'text',
          label: 'Social Link',
          required: true,
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
