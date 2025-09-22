import { defineField, defineType } from 'sanity'

export const blogSettingsType = defineType({
  name: 'blogSettings',
  title: 'Blog Ayarları',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Blog Ayarları Başlığı',
      type: 'string',
      description: 'Bu blog ayarlarını tanımlayan bir başlık (örn: Ana Blog Ayarları)',
    }),
    defineField({
      name: 'blogTitle',
      title: 'Blog Başlığı',
      type: 'string',
      description: 'Blog bölümünün ana başlığı',
      initialValue: 'OSLO Blog',
    }),
    defineField({
      name: 'blogSubtitle',
      title: 'Blog Alt Başlığı',
      type: 'text',
      description: 'Blog bölümünün alt başlığı/açıklaması',
      initialValue: 'Hayatını OSLO\'ya Dönüştürmek Senin Elinde!',
    }),
    defineField({
      name: 'showBlogSection',
      title: 'Blog Bölümünü Göster',
      type: 'boolean',
      description: 'Ana sayfada blog bölümü görünsün mü?',
      initialValue: true,
    }),
    defineField({
      name: 'maxPosts',
      title: 'Maksimum Blog Yazısı Sayısı',
      type: 'number',
      description: 'Ana sayfada gösterilecek maksimum blog yazısı sayısı',
      initialValue: 6,
      validation: (Rule) => Rule.min(1).max(12),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Metni',
      type: 'string',
      description: 'Blog bölümünün altındaki CTA butonunun metni',
      initialValue: 'Tüm Blog içeriklerine ulaşmak için tıklayınız',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Linki',
      type: 'url',
      description: 'Blog bölümünün altındaki CTA butonunun linki',
      initialValue: '/blog',
    }),
    defineField({
      name: 'active',
      title: 'Aktif',
      type: 'boolean',
      description: 'Bu blog ayarları aktif olarak kullanılsın mı?',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      blogTitle: 'blogTitle',
      active: 'active',
    },
    prepare(selection) {
      const { title, blogTitle, active } = selection
      return {
        title: title || blogTitle,
        subtitle: active ? 'Aktif' : 'Pasif',
      }
    },
  },
})
