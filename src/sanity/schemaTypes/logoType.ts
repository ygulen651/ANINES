import { defineType, defineField } from 'sanity'

export const logoType = defineType({
  name: 'logo',
  title: 'Logo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Logo Başlığı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Görsel için açıklayıcı metin',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoText',
      title: 'Logo Yazısı',
      type: 'string',
      description: 'Görsel yoksa gösterilecek yazı',
      initialValue: 'OSLO',
    }),
    defineField({
      name: 'width',
      title: 'Genişlik (px)',
      type: 'number',
      initialValue: 120,
    }),
    defineField({
      name: 'height',
      title: 'Yükseklik (px)',
      type: 'number',
      initialValue: 40,
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif mi?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logoImage',
    },
  },
})
