import type { Block } from 'payload'

export const MainHeroBanner: Block = {
  slug: 'mainHeroBannerBlock',
  fields: [
    {
      type: 'upload',
      relationTo: 'media',
      name: 'bgImage',
      label: 'Background Image',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'staticText',
      type: 'text',
      required: true,
      defaultValue: 'I am a developer and I develop',
    },
    {
      name: 'developingwordText',
      type: 'array',
      label: 'Developing Words For Random Typing Effect',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Random Text',
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      type: 'upload',
      relationTo: 'media',
      name: 'profileImage',
      label: 'Profile Image',
    },

    {
      name: 'buttonLink',
      type: 'text',
      required: true,
      defaultValue: '#about',
    },
  ],
  interfaceName: 'mainHeroBannerBlock',
}
