import type { Block } from 'payload'

export const AboutUsBlock: Block = {
  slug: 'aboutUsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'About Me',
    },
    {
      name: 'aboutusStaticText',
      type: 'text',
      required: true,
      label: 'About Us Text',
    },
    {
      name: 'education',
      type: 'array',
      label: 'Education',
      fields: [
        {
          name: 'degree',
          type: 'text',
          required: true,
          label: 'Degree',
        },
        {
          name: 'institution',
          type: 'text',
          required: true,
          label: 'Institution',
        },

        {
          name: 'cgpa',
          type: 'text',
          label: 'CGPA',
        },
      ],
    },
    {
      name: 'skillsName',
      type: 'array',
      label: 'Skills Name',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Skill Name',
        },

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
        {
          name: 'iconImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Skill Icon Image',
          admin: {
            condition: (_, siblingData) => siblingData.iconType === 'image',
          },
        },
        {
          name: 'iconHtml',
          type: 'code',
          label: 'SVG / HTML Code',
          admin: {
            language: 'html',
            condition: (_, siblingData) => siblingData.iconType === 'html',
          },
        },
      ],
    },
  ],
  interfaceName: 'aboutUsBlock',
}
