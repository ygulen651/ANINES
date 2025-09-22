import { defineField, defineType } from 'sanity'

export const videoSettingsType = defineType({
  name: 'videoSettings',
  title: 'Video Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Video Ayarları Başlığı',
      type: 'string',
      description: 'Bu video ayarlarını tanımlayan bir başlık (örn: Ana Video Ayarları)',
    }),
    defineField({
      name: 'videoFile',
      title: 'Video Dosyası',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Yüklenecek video dosyası (MP4, WebM, vb.) - Maksimum 300MB',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL (Alternatif)',
      type: 'url',
      description: 'YouTube, Vimeo gibi harici video platformlarından video URL\'i',
    }),
    defineField({
      name: 'videoType',
      title: 'Video Türü',
      type: 'string',
      options: {
        list: [
          { title: 'Yüklenen Dosya', value: 'file' },
          { title: 'Harici URL', value: 'url' }
        ],
        layout: 'radio'
      },
      initialValue: 'file',
      description: 'Video kaynağını seçin',
    }),
    defineField({
      name: 'videoTitle',
      title: 'Video Başlığı',
      type: 'string',
      description: 'Video butonunda görünecek metin',
      initialValue: 'Video İzle',
    }),
    defineField({
      name: 'videoDescription',
      title: 'Video Açıklaması',
      type: 'text',
      description: 'Video hakkında kısa açıklama',
    }),
    defineField({
      name: 'showVideoButton',
      title: 'Video Butonunu Göster',
      type: 'boolean',
      description: '3. bölümde video butonu görünsün mü?',
      initialValue: true,
    }),
    defineField({
      name: 'active',
      title: 'Aktif',
      type: 'boolean',
      description: 'Bu video ayarları aktif olarak kullanılsın mı?',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      videoType: 'videoType',
      active: 'active',
    },
    prepare(selection) {
      const { title, videoType, active } = selection
      return {
        title: title,
        subtitle: `${videoType === 'file' ? 'Dosya' : 'URL'} - ${active ? 'Aktif' : 'Pasif'}`,
      }
    },
  },
})
