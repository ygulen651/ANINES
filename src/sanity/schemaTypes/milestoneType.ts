import { defineField, defineType } from 'sanity'

export const milestoneType = defineType({
  name: 'milestone',
  title: 'Kilometre Taşları',
  type: 'document',
  icon: () => '🏆',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Yıl',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'stats',
      title: 'İstatistikler',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Sayı',
              type: 'string',
              validation: (rule) => rule.required(),
            },
            {
              name: 'label',
              title: 'Etiket',
              type: 'string',
              validation: (rule) => rule.required(),
            },
          ],
          preview: {
            select: {
              number: 'number',
              label: 'label',
            },
            prepare({ number, label }) {
              return {
                title: `${number} - ${label}`,
              }
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).max(3),
    }),
    defineField({
      name: 'image',
      title: 'Görsel',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: 'Yıl (Eskiden Yeniye)',
      name: 'yearAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Yıl (Yeniden Eskiye)',
      name: 'yearDesc',
      by: [{ field: 'order', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      year: 'year',
      media: 'image',
      isActive: 'isActive',
    },
    prepare({ title, year, media, isActive }) {
      return {
        title: `${year} - ${title}`,
        subtitle: isActive ? 'Aktif' : 'Pasif',
        media,
      }
    },
  },
})
