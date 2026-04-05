import { lexicalEditor, BlocksFeature } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { FormBlock } from '../Form/config'

export const FormBlockContent: Block = {
  slug: 'formBlockContent',
  fields: [
    {
      type: 'richText',
      name: 'forms',
      label: 'Form Block Content',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [FormBlock],
          }),
        ],
      }),
    },
  ],
  interfaceName: 'formBlockContent',
}
