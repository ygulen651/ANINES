import { defineField, defineType } from 'sanity'

export const pdfSettingsType = defineType({
  name: 'pdfSettings',
  title: 'PDF Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      description: 'PDF ayarları başlığı',
      initialValue: 'Katalog PDF Ayarları',
    }),
    defineField({
      name: 'catalogPdf',
      title: 'Katalog PDF',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      description: 'Kataloğu İncele butonu için PDF dosyası',
    }),
    defineField({
      name: 'pdfTitle',
      title: 'PDF Başlığı',
      type: 'string',
      description: 'PDF dosyasının görünecek başlığı',
      initialValue: 'OSLO Katalog 2025',
    }),
    defineField({
      name: 'active',
      title: 'Aktif',
      type: 'boolean',
      description: 'PDF ayarları aktif mi?',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pdfTitle: 'pdfTitle',
      active: 'active',
    },
    prepare(selection) {
      const { title, pdfTitle, active } = selection
      return {
        title: title || 'PDF Ayarları',
        subtitle: `${pdfTitle || 'PDF'} - ${active ? 'Aktif' : 'Pasif'}`,
      }
    },
  },
})

