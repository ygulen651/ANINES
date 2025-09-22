import { defineField, defineType } from 'sanity'

export const backgroundImageType = defineType({
  name: 'backgroundImage',
  title: 'Arka Plan Görseli',
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
      name: 'position',
      title: 'Pozisyon',
      type: 'string',
      options: {
        list: [
          { title: 'Sol Üst', value: 'top-left' },
          { title: 'Sağ Üst', value: 'top-right' },
          { title: 'Sol Alt', value: 'bottom-left' },
          { title: 'Sağ Alt', value: 'bottom-right' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'size',
      title: 'Boyut',
      type: 'string',
      options: {
        list: [
          { title: 'Küçük', value: 'small' },
          { title: 'Orta', value: 'medium' },
          { title: 'Büyük', value: 'large' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'animation',
      title: 'Animasyon',
      type: 'string',
      options: {
        list: [
          { title: 'Yüzen', value: 'float' },
          { title: 'Zıplayan', value: 'bounce' },
          { title: 'Sallanan', value: 'swing' },
          { title: 'Sabit', value: 'static' },
        ],
        layout: 'radio',
      },
      initialValue: 'float',
    }),
    defineField({
      name: 'active',
      title: 'Aktif',
      type: 'boolean',
      description: 'Bu arka plan görseli gösterilsin mi?',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Görsellerin sıralaması',
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      position: 'position',
      active: 'active',
    },
    prepare(selection) {
      const { title, media, position, active } = selection
      return {
        title: title,
        media: media,
        subtitle: `${position} ${active ? '(Aktif)' : '(Pasif)'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Sıralama (Düşükten Yükseğe)',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Pozisyon',
      name: 'positionAsc',
      by: [{ field: 'position', direction: 'asc' }],
    },
  ],
})
