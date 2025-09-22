import { defineType, defineField } from 'sanity';

export const footerType = defineType({
  name: 'footer',
  title: 'Footer Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'slogan',
      title: 'Slogan',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Hayatın her anında Şölen',
    }),
    defineField({
      name: 'socialText',
      title: 'Sosyal Medya Metni',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Bizi takip edin!',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Sosyal Medya Linkleri',
      type: 'array',
      of: [
        defineField({
          name: 'socialItem',
          title: 'Sosyal Medya Öğesi',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isActive',
              title: 'Aktif mi?',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'order',
              title: 'Sıralama',
              type: 'number',
              description: 'Görünme sırası (küçükten büyüğe)',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'navigationLinks',
      title: 'Navigasyon Linkleri',
      type: 'array',
      of: [
        defineField({
          name: 'navItem',
          title: 'Navigasyon Öğesi',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Link Metni',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'row',
              title: 'Satır',
              type: 'number',
              options: {
                list: [
                  { title: '1. Satır', value: 1 },
                  { title: '2. Satır', value: 2 },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isActive',
              title: 'Aktif mi?',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'order',
              title: 'Sıralama',
              type: 'number',
              description: 'Satır içindeki sıralama (küçükten büyüğe)',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'legalLinks',
      title: 'Yasal Linkler',
      type: 'array',
      of: [
        defineField({
          name: 'legalItem',
          title: 'Yasal Öğe',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Link Metni',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isActive',
              title: 'Aktif mi?',
              type: 'boolean',
              initialValue: true,
            }),
            defineField({
              name: 'order',
              title: 'Sıralama',
              type: 'number',
              description: 'Görünme sırası (küçükten büyüğe)',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Metni',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: '2023 Şölen Tüm Hakları Saklıdır.',
    }),
    defineField({
      name: 'isActive',
      title: 'Footer Aktif mi?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});

