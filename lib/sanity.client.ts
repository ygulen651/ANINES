import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '0l9mm7zn'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-09-09'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Geliştirme için false, production'da true olabilir
})

// GROQ sorguları
export const queries = {
  // Ana slider verileri
  sliders: `*[_type == "slider" && active == true] | order(order asc) {
    _id,
    title,
    image {
      asset-> {
        url
      },
      alt
    },
    active,
    order
  }`,

  // Arka plan yazıları
  backgroundTexts: `*[_type == "backgroundText"] | order(_createdAt desc) {
    _id,
    title,
    leftText,
    rightText,
    active
  }`,

  // İkinci bölüm slider verileri
  secondSlides: `*[_type == "secondSection" && active == true] | order(order asc) {
    _id,
    title,
    image {
      asset-> {
        url
      },
      alt
    },
    floatingImages[] {
      image {
        asset-> {
          url
        },
        alt
      },
      position,
      order,
      active
    },
    active,
    order
  }`,

  // Ürünler
  products: `*[_type == "product" && active == true] | order(_createdAt desc) {
    _id,
    name,
    slug,
    description,
    image {
      asset-> {
        url
      },
      alt
    },
    category,
    featured,
    price,
    varietyNumber,
    weight,
    boxQuantity,
    container40HC,
    truck,
    boxSize,
    barcode,
    active
  }`,

  // Arka plan görselleri
  backgroundImages: `*[_type == "backgroundImage"] | order(order asc) {
    _id,
    title,
    image {
      asset-> {
        url
      },
      alt
    },
    position,
    size,
    animation,
    active,
    order
  }`,

  // PDF ayarları
  pdfSettings: `*[_type == "pdfSettings" && active == true] | order(_createdAt desc) [0] {
    _id,
    title,
    catalogPdf {
      asset-> {
        url
      }
    },
    pdfTitle,
    active
  }`,

  // Blog yazıları
    blogPosts: `*[_type == "post" && active == true] | order(publishedAt desc) {
      _id,
      title,
      slug {
        current
      },
      excerpt,
      mainImage {
        asset-> {
          url
        },
        alt,
        hotspot,
        crop
      },
      categories[]-> {
        title,
        slug
      },
      author-> {
        name,
        slug
      },
      publishedAt,
      featured,
      active,
      body
    }`,
    videoSettings: `*[_type == "videoSettings" && active == true] | order(_createdAt desc) [0] {
      _id,
      title,
      videoFile {
        asset-> {
          url
        }
      },
      videoUrl,
      videoType,
      videoTitle,
      videoDescription,
      showVideoButton,
      active
    }`,
    blogSettings: `*[_type == "blogSettings" && active == true] | order(_createdAt desc) [0] {
      _id,
      title,
      blogTitle,
      blogSubtitle,
      showBlogSection,
      maxPosts,
      ctaText,
      ctaLink,
      active
    }`,
    menu: `*[_type == "menu" && isActive == true] | order(_createdAt desc) [0] {
      _id,
      title,
      items[] {
        label,
        url,
        hasSubmenu,
        isActive
      },
      isActive
    }`,
    logo: `*[_type == "logo" && isActive == true] | order(_createdAt desc) [0] {
      _id,
      title,
      logoImage {
        asset-> {
          url,
          metadata {
            dimensions
          }
        },
        alt
      },
      logoText,
      width,
      height,
      isActive
    }`,
    productBar: `*[_type == "productBar" && isActive == true] | order(_createdAt desc) [0] {
      _id,
      title,
      products[] {
        name,
        isActive,
        url,
        secondSlide-> {
          _id,
          title,
          image {
            asset-> {
              url
            },
            alt
          },
          floatingImages[] {
            image {
              asset-> {
                url
              },
              alt
            },
            position,
            order,
            active
          },
          active,
          order
        },
        order
      },
      isActive
    }`,
    footer: `*[_type == "footer" && isActive == true] | order(_createdAt desc) [0] {
      _id,
      slogan,
      socialText,
      socialLinks[] {
        platform,
        url,
        isActive,
        order
      },
      navigationLinks[] {
        text,
        url,
        row,
        isActive,
        order
      },
      legalLinks[] {
        text,
        url,
        isActive,
        order
      },
      copyright,
      isActive
    }`,
    
    // Ana Sayfa Blog Bölümü
    homeBlogSection: `*[_type == "homeBlogSection" && active == true] | order(_createdAt desc) [0] {
      _id,
      title,
      subtitle,
      blogCards[] {
        title,
        excerpt,
        image {
          asset-> {
            url
          },
          alt
        },
        linkText,
        linkUrl,
        backgroundColor,
        order,
        active
      },
      showSection,
      ctaButton {
        text,
        url,
        show
      },
      active
    }`,

    // Kurumsal Kimlik
    corporateIdentity: `*[_type == "corporateIdentity" && isActive == true] | order(_createdAt desc) [0] {
      _id,
      title,
      heroImage {
        asset-> { url },
        alt
      },
      assets[] {
        label,
        order,
        isActive,
        file { asset-> { url, originalFilename } }
      },
      isActive
    }`,

    // Sertifikalar
    certificates: `*[_type == "certificate" && isActive == true] | order(order asc) {
      _id,
      title,
      description,
      certificateImage {
        asset-> {
          url
        },
        alt
      },
      certificateType,
      issueDate,
      expiryDate,
      order,
      isActive
    }`,

    // Dökümanlar
    documents: `*[_type == "companyDocument" && isActive == true] | order(order asc) {
      _id,
      title,
      description,
      file {
        asset-> {
          url,
          originalFilename
        }
      },
      order,
      isActive
    }`
}

// Dökümanları getir
export async function getDocuments() {
  try {
    const documents = await client.fetch(queries.documents)
    return documents || []
  } catch (error) {
    console.error('Dökümanlar yüklenemedi:', error)
    return []
  }
}

// Kurumsal kimliği getir
export async function getCorporateIdentity() {
  try {
    const identity = await client.fetch(queries.corporateIdentity)
    return identity || null
  } catch (error) {
    console.error('Kurumsal Kimlik yüklenemedi:', error)
    return null
  }
}
