import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homeBlogSectionType = defineType({
  name: 'homeBlogSection',
  title: 'Ana Sayfa Blog Bölümü',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Bölüm Başlığı',
      type: 'string',
      initialValue: 'ANI Blog',
    }),
    defineField({
      name: 'subtitle',
      title: 'Alt Başlık',
      type: 'string',
      initialValue: 'Her lokmada bir anı saklı',
    }),
    defineField({
      name: 'blogCards',
      title: 'Blog Kartları',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Kart Başlığı',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'excerpt',
              title: 'Kısa Açıklama',
              type: 'text',
              rows: 3,
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Görsel',
              type: 'image',
              options: {
                hotspot: true,
              },
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  title: 'Alt Text',
                })
              ]
            }),
            defineField({
              name: 'linkText',
              title: 'Link Metni',
              type: 'string',
              initialValue: 'Devamını Oku',
            }),
            defineField({
              name: 'linkUrl',
              title: 'Link URL',
              type: 'string',
              validation: Rule => Rule.required(),
            }),
            defineField({
              name: 'backgroundColor',
              title: 'Arka Plan Rengi',
              type: 'string',
              options: {
                list: [
                  {title: 'Turuncu Gradient', value: 'orange-gradient'},
                  {title: 'Kırmızı Gradient', value: 'red-gradient'},
                  {title: 'Sarı Gradient', value: 'yellow-gradient'},
                  {title: 'Yeşil Gradient', value: 'green-gradient'},
                ],
              },
              initialValue: 'orange-gradient',
            }),
            defineField({
              name: 'order',
              title: 'Sıralama',
              type: 'number',
              validation: Rule => Rule.required().min(1),
            }),
            defineField({
              name: 'active',
              title: 'Aktif',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image',
              order: 'order',
            },
            prepare(selection) {
              const {title, order} = selection
              return {
                title: title,
                subtitle: `Sıra: ${order}`,
                media: selection.media,
              }
            },
          },
        })
      ],
      validation: Rule => Rule.max(6).error('Maksimum 6 blog kartı ekleyebilirsiniz'),
    }),
    defineField({
      name: 'showSection',
      title: 'Bölümü Göster',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Butonu',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Buton Metni',
          type: 'string',
          initialValue: 'Tüm Blog Yazılarını Gör',
        }),
        defineField({
          name: 'url',
          title: 'Buton URL',
          type: 'string',
          initialValue: '/blog',
        }),
        defineField({
          name: 'show',
          title: 'Butonu Göster',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'active',
      title: 'Aktif',
      type: 'boolean',
      description: 'Bu bölümü ana sayfada göstermek için aktif yapın',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Ana Sayfa Blog Bölümü',
        subtitle: selection.subtitle || 'Blog kartları yönetimi',
      }
    },
  },
})

