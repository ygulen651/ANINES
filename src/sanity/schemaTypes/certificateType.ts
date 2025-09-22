import {defineField, defineType} from 'sanity'

export const certificateType = defineType({
  name: 'certificate',
  title: 'Sertifika',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Sertifika Başlığı',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'certificateImage',
      title: 'Sertifika Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      description: 'Sertifikaların görüntülenme sırası (küçükten büyüğe)',
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif mi?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'certificateType',
      title: 'Sertifika Türü',
      type: 'string',
      options: {
        list: [
          {title: 'ISO Sertifikası', value: 'iso'},
          {title: 'Gıda Güvenliği Sertifikası', value: 'food_safety'},
          {title: 'Kalite Sertifikası', value: 'quality'},
          {title: 'Çevre Sertifikası', value: 'environment'},
          {title: 'Diğer', value: 'other'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'issueDate',
      title: 'Veriliş Tarihi',
      type: 'date',
    }),
    defineField({
      name: 'expiryDate',
      title: 'Geçerlilik Tarihi',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'certificateImage',
      subtitle: 'description',
    },
  },
})
