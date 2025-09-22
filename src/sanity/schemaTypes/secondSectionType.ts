import { defineField, defineType } from 'sanity'

export const secondSectionType = defineType({
  name: 'secondSection',
  title: 'İkinci Bölüm Slider',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Ana Görsel',
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
      name: 'floatingImages',
      title: 'Yüzen Görseller',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Görsel',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                },
              ],
            },
            {
              name: 'position',
              title: 'Pozisyon',
              type: 'string',
              options: {
                list: [
                  { title: 'Sol', value: 'left' },
                  { title: 'Sağ', value: 'right' },
                  { title: 'Üst', value: 'top' },
                  { title: 'Ortada', value: 'center' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'order',
              title: 'Sıralama',
              type: 'number',
              description: 'Aynı pozisyondaki görsellerin sıralaması',
              validation: (Rule) => Rule.required().min(1),
            },
            {
              name: 'active',
              title: 'Aktif',
              type: 'boolean',
              description: 'Bu yüzen görsel gösterilsin mi?',
              initialValue: true,
            },
          ],
          preview: {
            select: {
              media: 'image',
              position: 'position',
              order: 'order',
              active: 'active',
            },
            prepare(selection) {
              const { media, position, order, active } = selection
              return {
                title: `${position?.toUpperCase()} - Sıra ${order}`,
                media: media,
                subtitle: active ? 'Aktif' : 'Pasif',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'active',
      title: 'Aktif',
      type: 'boolean',
      description: 'Bu slider öğesi gösterilsin mi?',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Slider içindeki sıralama',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      active: 'active',
    },
    prepare(selection) {
      const { title, media, active } = selection
      return {
        title: title,
        media: media,
        subtitle: active ? 'Aktif' : 'Pasif',
      }
    },
  },
  orderings: [
    {
      title: 'Sıralama (Düşükten Yükseğe)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
