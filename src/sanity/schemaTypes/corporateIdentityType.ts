import { defineField, defineType } from 'sanity'

export const corporateIdentityType = defineType({
  name: 'corporateIdentity',
  title: 'Kurumsal Kimlik',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      initialValue: 'Kurumsal Kimlik',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Tanıtım Görseli',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', title: 'Alt Metin', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'assets',
      title: 'İndirilebilir Dosyalar',
      type: 'array',
      of: [
        defineField({
          name: 'assetFile',
          title: 'Dosya',
          type: 'object',
          fields: [
            { name: 'label', title: 'Görünecek Ad', type: 'string', validation: (Rule) => Rule.required() },
            { name: 'file', title: 'Dosya (AI/JPG/PNG vb.)', type: 'file', validation: (Rule) => Rule.required() },
            { name: 'order', title: 'Sıra', type: 'number', initialValue: 1 },
            { name: 'isActive', title: 'Aktif', type: 'boolean', initialValue: true },
          ],
          preview: {
            select: { title: 'label', media: 'file' },
          },
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
    },
  },
})


