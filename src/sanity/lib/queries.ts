import { client } from './client'

// Kilometre taşlarını getir
export async function getMilestones() {
  const query = `*[_type == "milestone" && isActive == true] | order(order asc) {
    _id,
    title,
    year,
    description,
    stats,
    "imageUrl": image.asset->url,
    order
  }`
  
  return await client.fetch(query)
}

// Blog yazılarını getir
export async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    "imageUrl": mainImage.asset->url,
    "author": author->name,
    "categories": categories[]->title
  }`
  
  return await client.fetch(query)
}

// Tekil blog yazısını getir
export async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    body,
    "imageUrl": mainImage.asset->url,
    "author": author->{name, image},
    "categories": categories[]->title
  }`
  
  return await client.fetch(query, { slug })
}

// Ürünleri getir
export async function getProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
    _id,
    title,
    description,
    "imageUrl": image.asset->url,
    price,
    category
  }`
  
  return await client.fetch(query)
}

// Slider verilerini getir
export async function getSliderData() {
  const query = `*[_type == "slider"][0] {
    title,
    subtitle,
    "backgroundImage": backgroundImage.asset->url
  }`
  
  return await client.fetch(query)
}

// Menü verilerini getir
export async function getMenuData() {
  const query = `*[_type == "menu"] | order(order asc) {
    _id,
    title,
    url,
    order,
    isActive
  }`
  
  return await client.fetch(query)
}

// Logo verilerini getir
export async function getLogoData() {
  const query = `*[_type == "logo"][0] {
    "logoUrl": logo.asset->url,
    altText
  }`
  
  return await client.fetch(query)
}
