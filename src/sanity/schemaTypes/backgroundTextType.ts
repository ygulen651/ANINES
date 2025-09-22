import { defineField, defineType } from 'sanity'

export const backgroundTextType = defineType({
  name: 'backgroundText',
  title: 'Arka Plan Yazıları',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      description: 'Bu arka plan yazı setinin adı',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leftText',
      title: 'Sol Yazı',
      type: 'string',
      description: 'Sol tarafta görünecek büyük yazı',
      validation: (Rule) => Rule.required().max(20),
    }),
    defineField({
      name: 'rightText',
      title: 'Sağ Yazı',
      type: 'string',
      description: 'Sağ tarafta görünecek büyük yazı',
      validation: (Rule) => Rule.required().max(20),
    }),
    defineField({
      name: 'active',
      title: 'Aktif',
      type: 'boolean',
      description: 'Bu arka plan yazı seti kullanılsın mı?',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      leftText: 'leftText',
      rightText: 'rightText',
      active: 'active',
    },
    prepare(selection) {
      const { title, leftText, rightText, active } = selection
      return {
        title: title,
        subtitle: `${leftText} | ${rightText} ${active ? '(Aktif)' : '(Pasif)'}`,
      }
    },
  },
})
