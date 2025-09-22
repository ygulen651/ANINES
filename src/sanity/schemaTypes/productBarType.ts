import { defineType, defineField } from 'sanity';

export const productBarType = defineType({
  name: 'productBar',
  title: 'Ürün Adları Barı',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'products',
      title: 'Ürün Adları',
      type: 'array',
      of: [
        defineField({
          name: 'product',
          title: 'Ürün',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Ürün Adı',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'isActive',
              title: 'Aktif mi?',
              type: 'boolean',
              initialValue: false,
              description: 'Bu ürün aktif (vurgulanmış) olarak gösterilsin mi?',
            }),
            defineField({
              name: 'url',
              title: 'URL (Opsiyonel)',
              type: 'string',
              description: 'Ürüne tıklandığında gidilecek sayfa',
            }),
            defineField({
              name: 'secondSlide',
              title: '2. Slayt Referansı',
              type: 'reference',
              to: [{ type: 'secondSection' }],
              description: 'Bu ürüne tıklandığında gösterilecek 2. slayt',
            }),
            defineField({
              name: 'order',
              title: 'Sıralama',
              type: 'number',
              description: 'Ürünlerin görünme sırası (küçükten büyüğe)',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Bar Aktif mi?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      products: 'products',
    },
    prepare(selection) {
      const { title, products } = selection;
      const productCount = products?.length || 0;
      return {
        title: title || 'Ürün Adları Barı',
        subtitle: `${productCount} ürün`,
      };
    },
  },
});
