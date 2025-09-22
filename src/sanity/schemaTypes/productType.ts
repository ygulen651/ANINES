import { defineField, defineType } from 'sanity'

export const productType = defineType({
  name: 'product',
  title: 'Ürün',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ürün Adı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Ürün Görseli',
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
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          { title: 'Kekler', value: 'kekler' },
          { title: 'Bisküviler', value: 'biskuviler' },
          { title: 'Gofretler', value: 'gofretler' },
          { title: 'Çikolatalar', value: 'cikolatalar' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Öne Çıkan',
      type: 'boolean',
      description: 'Bu ürün öne çıkan ürünler arasında gösterilsin mi?',
      initialValue: false,
    }),
    defineField({
      name: 'price',
      title: 'Fiyat',
      type: 'number',
      description: 'Ürün fiyatı (TL)',
    }),
    defineField({
      name: 'varietyNumber',
      title: 'Çeşit No',
      type: 'string',
      description: 'Ürün çeşit numarası',
    }),
    defineField({
      name: 'weight',
      title: 'Gramaj',
      type: 'string',
      description: 'Ürün ağırlığı (örn: 85 gr)',
    }),
    defineField({
      name: 'boxQuantity',
      title: 'Koli Adet',
      type: 'string',
      description: 'Koli adedi (örn: 24*6)',
    }),
    defineField({
      name: 'container40HC',
      title: '40HC',
      type: 'string',
      description: '40HC konteyner bilgisi',
    }),
    defineField({
      name: 'truck',
      title: 'Tır',
      type: 'string',
      description: 'Tır bilgisi',
    }),
    defineField({
      name: 'boxSize',
      title: 'Kutu Boyutu',
      type: 'string',
      description: 'Kutu boyutları (örn: 30x20x15 cm)',
    }),
    defineField({
      name: 'barcode',
      title: 'Barkod',
      type: 'string',
      description: 'Ürün barkodu',
    }),
    defineField({
      name: 'active',
      title: 'Aktif',
      type: 'boolean',
      description: 'Bu ürün gösterilsin mi?',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      category: 'category',
      featured: 'featured',
      active: 'active',
    },
    prepare(selection) {
      const { title, media, category, featured, active } = selection
      const status = active ? (featured ? '⭐ Öne Çıkan' : 'Aktif') : 'Pasif'
      return {
        title: title,
        media: media,
        subtitle: `${category} - ${status}`,
      }
    },
  },
  orderings: [
    {
      title: 'İsim (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Kategori',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
