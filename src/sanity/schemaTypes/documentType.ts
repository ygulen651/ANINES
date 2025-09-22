import { defineField, defineType } from 'sanity'

export const documentType = defineType({
  name: 'companyDocument',
  title: 'Dökümanlar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Döküman Adı',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'file',
      title: 'PDF Dosyası',
      type: 'file',
      options: {
        accept: '.pdf'
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'order',
      title: 'Sıra',
      type: 'number',
      initialValue: 1,
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif',
      type: 'boolean',
      initialValue: true
    })
  ],
  orderings: [
    {
      title: 'Sıraya göre',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' }
      ]
    },
    {
      title: 'Tarihe göre (Yeni)',
      name: 'dateDesc',
      by: [
        { field: '_createdAt', direction: 'desc' }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order',
      isActive: 'isActive'
    },
    prepare(selection) {
      const { title, order, isActive } = selection
      return {
        title: `${order}. ${title}`,
        subtitle: isActive ? '✅ Aktif' : '❌ Pasif'
      }
    }
  }
})
