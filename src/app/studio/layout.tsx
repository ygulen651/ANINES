import { metadata } from 'next-sanity/studio'

export { metadata }

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
