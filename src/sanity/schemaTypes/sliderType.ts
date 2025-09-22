import { defineField, defineType } from 'sanity'

export const sliderType = defineType({
  name: 'slider',
  title: 'Ana Slider',
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
          description: 'Görsel için açıklayıcı metin',
        },
      ],
      validation: (Rule) => Rule.required(),
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
      description: 'Slider içindeki sıralama (düşük sayı önce gösterilir)',
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
