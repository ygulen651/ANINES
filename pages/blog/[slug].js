import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { client, queries } from '../../lib/sanity.client';
// import { PortableText } from '@portabletext/react';

export default function BlogPost({ post, blogSettings }) {
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <h1>Blog yazısı bulunamadı</h1>
        <p>Aradığınız blog yazısı bulunamadı veya silinmiş olabilir.</p>
        <Link href="/blog" className="back-to-blog">
          ← Blog'a Dön
        </Link>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title} - {blogSettings?.blogTitle || 'OSLO Blog'}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.mainImage?.asset?.url || '/placeholder.svg'} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.mainImage?.asset?.url || '/placeholder.svg'} />
      </Head>

      <div className="blog-post-page">
        {/* Fixed Navbar */}
        <nav className="navbar">
          <div className="navbar-brand">
            <Link href="/" className="logo-link">
              <img src="/logo.png" alt="ANI" className="logo-image" />
            </Link>
          </div>
          
          <button className="menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className="menu-text">MENU</span>
            <div className="hamburger-icon">
              <span></span>
              <span></span>
            </div>
          </button>
          
          <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
            <li className="menu-header">
              <div className="menu-logo">
                <img src="/logo.png" alt="ANI" className="menu-logo-image" />
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="close-button">×</button>
            </li>
            <li><Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Ana Sayfa</Link></li>
            <li><Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>Ürünler</Link></li>
            <li><Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link></li>
            <li><Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>Hakkımızda</Link></li>
            <li><Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>İletişim</Link></li>
            <li><Link href="/documents" onClick={() => setIsMobileMenuOpen(false)}>Dökümanlar</Link></li>
          </ul>
        </nav>

        {/* Simple Header */}
        <div className="blog-post-header">
          <div className="blog-post-container">
            <div className="blog-post-breadcrumb">
              <Link href="/" className="breadcrumb-link">Ana Sayfa</Link>
              <span className="breadcrumb-separator">/</span>
              <Link href="/blog" className="breadcrumb-link">Blog</Link>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{post.title}</span>
            </div>
          </div>
        </div>


        {/* Article */}
        <article className="blog-post-article">
          <div className="blog-post-container">
            <div className="blog-post-meta">
              <div className="blog-post-category">
                {post.category && (
                  <span className="category-badge">
                    {post.category.replace('-', ' ').toUpperCase()}
                  </span>
                )}
              </div>
              <div className="blog-post-info">
                <span className="blog-post-author">
                  {post.author || 'OSLO Ekibi'}
                </span>
                <span className="blog-post-date">
                  {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : ''}
                </span>
              </div>
            </div>

            <h1 className="blog-post-title">{post.title}</h1>
            
            {post.excerpt && (
              <div className="blog-post-excerpt">
                <p>{post.excerpt}</p>
              </div>
            )}

            {/* Featured Image in Content */}
            {post.mainImage && (
              <div className="blog-post-content-image">
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="content-img"
                  quality={85}
                  priority
                  sizes="(max-width: 800px) 100vw, 800px"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
            )}

            <div className="blog-post-content">
              {post.content ? (
                <div className="blog-post-rich-content">
                  {post.content.map((block, index) => {
                    if (block._type === 'block') {
                      return (
                        <div key={index} className="blog-post-block">
                          {block.children.map((child, childIndex) => (
                            <span key={childIndex} className={`blog-post-text ${child.marks?.includes('strong') ? 'bold' : ''} ${child.marks?.includes('em') ? 'italic' : ''}`}>
                              {child.text}
                            </span>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ) : (
                <div className="blog-post-placeholder">
                  <p>Bu blog yazısının içeriği henüz eklenmemiş.</p>
                  <p>Lütfen daha sonra tekrar ziyaret edin.</p>
                </div>
              )}
            </div>

            {/* Share Buttons */}
            {isClient && (
              <div className="blog-post-share">
                <h3>Bu yazıyı paylaş:</h3>
                <div className="share-buttons">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn facebook"
                  >
                    Facebook
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn twitter"
                  >
                    Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn linkedin"
                  >
                    LinkedIn
                  </a>
                  <button
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(window.location.href);
                        alert('Link kopyalandı!');
                      }
                    }}
                    className="share-btn copy"
                  >
                    Linki Kopyala
                  </button>
                </div>
              </div>
            )}
          </div>
        </article>


        {/* Back to Blog */}
        <div className="blog-post-back">
          <div className="blog-post-container">
            <Link href="/blog" className="back-to-blog-btn">
              ← Tüm Blog Yazılarına Dön
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .blog-post-page {
          min-height: 100vh;
          background: #f8f9fa;
        }

        .blog-post-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .blog-post-header {
          background: white;
          padding: 20px 0;
          border-bottom: 1px solid #e9ecef;
        }

        .blog-post-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
        }

        .breadcrumb-link {
          color: #D21B21;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .breadcrumb-link:hover {
          color: #B0151A;
        }

        .breadcrumb-separator {
          color: #6c757d;
        }

        .breadcrumb-current {
          color: #6c757d;
          font-weight: 500;
        }


        .blog-post-article {
          background: white;
          margin: 40px auto;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
        }

        .blog-post-meta {
          padding: 30px 40px 20px;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 15px;
        }

        .category-badge {
          background: #D21B21;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .blog-post-info {
          display: flex;
          gap: 20px;
          font-size: 0.9rem;
          color: #6c757d;
        }

        .blog-post-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #D21B21;
          margin: 30px 40px 20px;
          line-height: 1.2;
        }

        

        .blog-post-excerpt {
          margin: 0 40px 30px;
          padding: 20px;
          background: #f8f9fa;
          border-left: 4px solid #D21B21;
          border-radius: 0 10px 10px 0;
        }

        .blog-post-excerpt p {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.6;
          margin: 0;
        }

        .blog-post-content-image {
          margin: 30px 0;
          text-align: center;
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%; /* 16:9 alan */
          background: #ffffff;
          border-radius: 10px;
          overflow: hidden;
        }

        :global(img.content-img) {
          object-fit: contain;
          object-position: center;
          background: transparent;
        }

        .content-img:hover {
          transform: scale(1.02);
        }

        .blog-post-content {
          padding: 0 40px 40px;
          font-size: 1.1rem;
          line-height: 1.8;
          color: #333;
        }

        .blog-post-rich-content {
          margin-top: 20px;
        }

        .blog-post-block {
          margin-bottom: 20px;
        }

        .blog-post-text {
          display: inline;
        }

        .blog-post-text.bold {
          font-weight: 700;
        }

        .blog-post-text.italic {
          font-style: italic;
        }

        .blog-post-placeholder {
          text-align: center;
          padding: 60px 20px;
          color: #6c757d;
        }

        .blog-post-share {
          padding: 30px 40px;
          border-top: 1px solid #e9ecef;
          background: #f8f9fa;
        }

        .blog-post-share h3 {
          margin: 0 0 20px;
          color: #333;
          font-size: 1.2rem;
        }

        .share-buttons {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .share-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .share-btn.facebook {
          background: #1877f2;
          color: white;
        }

        .share-btn.twitter {
          background: #1da1f2;
          color: white;
        }

        .share-btn.linkedin {
          background: #0077b5;
          color: white;
        }

        .share-btn.copy {
          background: #6c757d;
          color: white;
        }

        .share-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }


        .blog-post-back {
          padding: 40px 0;
          text-align: center;
          background: #f8f9fa;
        }

        .back-to-blog-btn {
          display: inline-block;
          background: #D21B21;
          color: white;
          padding: 15px 30px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .back-to-blog-btn:hover {
          background: #B0151A;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(233, 30, 99, 0.3);
        }

        .blog-post-not-found {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 40px 20px;
          background: #f8f9fa;
        }

        .blog-post-not-found h1 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 20px;
        }

        .blog-post-not-found p {
          font-size: 1.1rem;
          color: #666;
          margin-bottom: 30px;
        }

        .back-to-blog {
          display: inline-block;
          background: #D21B21;
          color: white;
          padding: 15px 30px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .back-to-blog:hover {
          background: #B0151A;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .blog-post-title {
            font-size: 2rem;
            margin: 20px 20px 15px;
          }

          .blog-post-meta {
            padding: 20px;
            flex-direction: column;
            align-items: flex-start;
          }

          .blog-post-excerpt {
            margin: 0 20px 20px;
            padding: 15px;
          }

          .blog-post-content {
            padding: 0 20px 30px;
          }

          .blog-post-share {
            padding: 20px;
          }

          .share-buttons {
            justify-content: center;
            flex-wrap: wrap;
          }
        }

        /* Navbar */
        .navbar {
          position: fixed;
          top: 15px;
          left: 15px;
          right: 15px;
          z-index: 1000;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
        }

        .logo-link {
          text-decoration: none;
          color: #111;
          display: flex;
          align-items: center;
          background: white;
          padding: 8px 12px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .logo-text {
          font-size: 2rem;
          font-weight: 900;
          color: white;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: 3px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
        }

        .logo-image {
          max-width: 140px;
          max-height: 40px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: none;
        }

        .menu-button {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          padding: 12px 20px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .menu-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .menu-text {
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .hamburger-icon {
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          border: 2px solid white;
        }

        .hamburger-icon span {
          width: 16px;
          height: 3px;
          background: #D21B21;
          border-radius: 2px;
        }

        .navbar-menu {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          width: 50vw;
          height: 100vh;
          background: #D21B21;
          list-style: none;
          margin: 0;
          padding: 60px 40px;
          flex-direction: column;
          gap: 20px;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
          z-index: 999;
          overflow-y: auto;
        }

        .navbar-menu.active {
          display: flex;
        }

        .navbar-menu li {
          position: relative;
        }

        .menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        }

        .menu-logo {
          display: flex;
          align-items: center;
        }

        .menu-logo-image {
          max-width: 120px;
          max-height: 36px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: none;
        }

        .menu-logo-text {
          font-size: 2rem;
          font-weight: 800;
          color: white;
          text-transform: uppercase;
          letter-spacing: 3px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .close-button {
          background: none;
          border: none;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }

        .navbar-menu a {
          color: white;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          padding: 15px 0;
          display: block;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .navbar-menu a:hover {
          opacity: 0.8;
          transform: translateX(10px);
          color: rgba(255, 255, 255, 0.9);
        }

        /* Blog post header adjustment */
        .blog-post-header {
          margin-top: 80px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .blog-nav-container {
            padding: 0 15px;
          }
          
          .blog-nav-menu {
            gap: 15px;
          }
          
          .blog-nav-link {
            padding: 6px 12px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}

// Slug'ları temizleyen fonksiyon
function sanitizeSlug(slug) {
  if (!slug) return '';
  return slug
    .replace(/[<>:"/\\|?*]/g, '') // Windows'ta geçersiz karakterleri kaldır
    .replace(/[!]/g, '') // Ünlem işaretini kaldır
    .replace(/\s+/g, '-') // Boşlukları tire ile değiştir
    .toLowerCase();
}

export async function getStaticPaths() {
  try {
    const posts = await client.fetch(`*[_type == "post" && active == true] {
      "slug": slug.current,
      "title": title
    }`);

    const paths = posts.map((post) => ({
      params: { slug: sanitizeSlug(post.slug) },
    }));

    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error('Static paths oluşturma hatası:', error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    // Gelen slug'ı temizle
    const cleanSlug = sanitizeSlug(params.slug);
    
    const [rawPosts, blogSettings] = await Promise.all([
      client.fetch(queries.blogPosts),
      client.fetch(queries.blogSettings)
    ]);

    const mapped = (rawPosts || []).map((p) => ({
      ...p,
      featuredImage: p.mainImage,
      category: Array.isArray(p.categories) && p.categories.length > 0
        ? (p.categories[0].slug?.current || p.categories[0].title || 'genel')
        : 'genel',
      author: typeof p.author === 'object' ? p.author?.name : p.author,
    }));

    const post = mapped.find(p => sanitizeSlug(p.slug?.current) === cleanSlug);

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
        blogSettings: blogSettings || null,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error('Blog post veri çekme hatası:', error);
    return {
      notFound: true,
    };
  }
}
