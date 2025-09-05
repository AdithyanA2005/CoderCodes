import type { Block } from 'payload'

export const Code: Block = {
  slug: 'code',
  interfaceName: 'CodeBlock',
  fields: [
    {
      name: 'language',
      type: 'select',
      defaultValue: 'typescript',
      options: [
        {
          label: 'Typescript',
          value: 'typescript',
        },
        {
          label: 'Javascript',
          value: 'javascript',
        },
        {
          label: 'Java',
          value: 'java',
        },
        {
          label: 'Bash',
          value: 'bash',
        },
        {
          label: 'SQL',
          value: 'sql',
        },
        {
          label: 'C',
          value: 'c',
        },
        {
          label: 'Text',
          value: 'text',
        },
        {
          label: 'CSS',
          value: 'css',
        },
      ],
    },
    {
      name: 'code',
      type: 'code',
      label: false,
      required: true,
    },
  ],
}
