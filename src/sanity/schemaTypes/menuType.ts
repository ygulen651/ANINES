import { defineType, defineField } from 'sanity'

export const menuType = defineType({
  name: 'menu',
  title: 'Menü',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Menü Başlığı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Menü Öğeleri',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Menü Adı',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Link',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hasSubmenu',
              title: 'Alt Menü Var mı?',
              type: 'boolean',
              initialValue: false,
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
              title: 'label',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Menü Aktif mi?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
