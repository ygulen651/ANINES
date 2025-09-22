import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { client, queries } from '../lib/sanity.client'

/**
 * Ürünler sayfası - Sanity'den ürün verilerini çeker ve grid layout'ta gösterir
 */
export default function Products({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const openModal = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setIsModalOpen(false)
  }

  // Kategori filtreleme
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const categories = [
    { value: 'all', label: 'Tümü' },
    { value: 'kekler', label: 'Kekler' },
    { value: 'biskuviler', label: 'Bisküviler' },
    { value: 'gofretler', label: 'Gofretler' },
    { value: 'cikolatalar', label: 'Çikolatalar' }
  ]

  return (
    <>
      <style jsx global>{`
        /* Genel Ayarlar */
        html, body {
          background: transparent;
          height: auto;
          overflow-x: hidden;
          overflow-y: auto;
        }

        body {
          padding-top: 0;
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
          color: white;
          display: flex;
          align-items: center;
        }

        .logo-image {
          max-width: 300px;
          max-height: 100px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
        }

        .menu-button {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          gap: 10px;
          color: white;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 10px 15px;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .menu-button:hover {
          background: rgba(255, 255, 255, 0.1);
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
          transition: all 0.3s ease;
        }

        .navbar-menu {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          width: 50vw;
          height: 100vh;
          background: linear-gradient(135deg, #FF8C00, #FF6B35);
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
          max-width: 160px;
          max-height: 55px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
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

        /* Ürünler Sayfası Responsive */
        @media (max-width: 1200px) {
          .logo-image {
            max-width: 250px;
            max-height: 85px;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            top: 12px;
            left: 12px;
            right: 12px;
          }

          .logo-image {
            max-width: 180px;
            max-height: 60px;
          }

          .menu-button {
            padding: 8px 14px;
            gap: 10px;
          }

          .menu-text {
            font-size: 0.95rem;
          }

          .hamburger-icon {
            width: 32px;
            height: 32px;
          }

          .hamburger-icon span {
            width: 12px;
            height: 2px;
          }

          .navbar-menu {
            width: 100vw;
            padding: 50px 18px;
            overflow-y: auto;
          }

          .navbar-menu a {
            font-size: 1.05rem;
            padding: 10px 0;
          }

          .menu-logo-image {
            max-width: 140px;
            max-height: 50px;
          }

          /* Sayfa içeriği mobil düzenlemeleri */
          .min-h-screen {
            padding-top: 80px !important;
          }

          /* Modal Close Button Tablet Düzenlemesi */
          .modal-close-btn {
            width: 42px !important;
            height: 42px !important;
            font-size: 22px !important;
            z-index: 99999 !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            top: 8px;
            left: 8px;
            right: 8px;
          }

          .logo-image {
            max-width: 150px;
            max-height: 50px;
          }

          .menu-button {
            padding: 6px 10px;
            gap: 8px;
          }

          .menu-text {
            font-size: 0.85rem;
          }

          .hamburger-icon {
            width: 28px;
            height: 28px;
          }

          .hamburger-icon span {
            width: 10px;
            height: 2px;
          }

          .navbar-menu {
            padding: 40px 15px;
          }

          .navbar-menu a {
            font-size: 1rem;
            padding: 8px 0;
          }

          .menu-logo-image {
            max-width: 120px;
            max-height: 45px;
          }

          .min-h-screen {
            padding-top: 70px !important;
          }

          /* Modal Close Button Mobil Düzenlemesi */
          .modal-close-btn {
            width: 44px !important;
            height: 44px !important;
            top: 10px !important;
            right: 10px !important;
            font-size: 24px !important;
            z-index: 99999 !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            user-select: none !important;
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
          }
        }
      `}</style>

      {/* Fixed Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          {/* Logo kaldırıldı */}
        </div>
        
        <button className="menu-button" onClick={toggleMobileMenu}>
          <span className="menu-text">MENU</span>
          <div className="hamburger-icon">
            <span></span>
            <span></span>
          </div>
        </button>
        
        <ul className={`navbar-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <li className="menu-header">
            <div className="menu-logo">
              <img src="/logo.png" alt="ANI Logo" className="menu-logo-image" />
            </div>
            <button onClick={closeMenu} className="close-button">×</button>
          </li>
          <li><Link href="/" onClick={closeMenu}>Ana Sayfa</Link></li>
          <li><Link href="/products" onClick={closeMenu}>Ürünler</Link></li>
          <li><Link href="/blog" onClick={closeMenu}>Blog</Link></li>
          <li><Link href="/about" onClick={closeMenu}>Kurumsal</Link></li>
          <li><Link href="/contact" onClick={closeMenu}>İletişim</Link></li>
          <li><Link href="/documents" onClick={closeMenu}>Dökümanlar</Link></li>
        </ul>
      </nav>

      <div className="min-h-screen bg-gray-50" style={{ paddingTop: '100px' }}>
      {/* Sayfa başlığı */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Ürünlerimiz</h1>
          <p className="mt-2 text-gray-600">Fabrikamızda üretilen kaliteli ürünler</p>
        </div>
      </div>

      {/* Kategori filtreleri */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === category.value
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ürün grid'i */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                onClick={() => openModal(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              {selectedCategory === 'all' 
                ? 'Henüz ürün eklenmemiş.' 
                : `${categories.find(c => c.value === selectedCategory)?.label} kategorisinde ürün bulunamadı.`
              }
            </p>
            <p className="text-gray-400 mt-2">Sanity panelinden ürün ekleyebilirsiniz.</p>
          </div>
        )}
      </div>

      {/* Modal Popup */}
      {isModalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
    </>
  )
}

/**
 * Tek ürün kartı bileşeni
 */
function ProductCard({ product, onClick }) {
  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105"
      onClick={onClick}
    >
      {/* Ürün görseli */}
      <div className="relative h-64 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <Image
            src={product.image?.asset?.url || '/placeholder.svg'}
            alt={product.name}
            width={300}
            height={200}
            className="object-contain w-full h-full p-4 transition-transform duration-300 ease-in-out hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 text-lg">Görsel yok</span>
          </div>
        )}
        
        {/* NEW badge */}
        {product.featured && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full z-10">
            NEW
          </div>
        )}
      </div>

      {/* Ürün bilgileri */}
      <div className="p-6">
        {/* Ürün başlığı */}
        <h3 className="text-lg font-bold text-gray-900 mb-3">
          {product.name}
        </h3>
        
        {/* Kategori etiketi */}
        {product.category && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
            {getCategoryName(product.category)}
          </span>
        )}
        
        {/* Ürün açıklaması */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {product.description}
        </p>

        {/* Alt çizgi */}
        <div className="w-full h-px bg-amber-200 mb-4"></div>

        {/* Navigasyon butonu */}
        <div className="flex justify-center">
          <button className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200">
            <span className="text-gray-600 text-lg">»</span>
          </button>
        </div>
      </div>
    </div>
  )
}

/**
 * Ürün detay modal popup bileşeni
 */
function ProductModal({ product, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Modal açıldığında body scroll'unu engelle
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
      ></div>
      
      {/* Modal Content */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden z-50 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={(e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            onClose(); 
          }}
          className="modal-close-btn absolute top-4 right-4 z-[9999] w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg border-2 border-white cursor-pointer"
          style={{ fontSize: '20px', lineHeight: '1' }}
        >
          ×
        </button>

        <div className="flex flex-col lg:flex-row">
          {/* Sol taraf - Ürün görseli */}
          <div className="lg:w-1/2 bg-white p-8 flex items-center justify-center">
            <div className="relative">
              {/* Ürün kutusu */}
              <div className="w-64 h-80 bg-white border-2 border-gray-200 rounded-lg shadow-2xl transform rotate-3 relative">
                {/* Ürün görseli */}
                <div className="absolute inset-4 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <Image
                      src={product.image?.asset?.url || '/placeholder.svg'}
                      alt={product.name}
                      width={200}
                      height={150}
                      className="object-contain w-full h-full transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  ) : (
                    <span className="text-gray-400">Görsel yok</span>
                  )}
                </div>
                
                {/* NEW badge */}
                {product.featured && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                )}
              </div>

              {/* Navigasyon okları */}
              <button className="absolute left-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                ‹
              </button>
              <button className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                ›
              </button>
            </div>
          </div>

          {/* Sağ taraf - Ürün detayları */}
          <div className="lg:w-1/2 p-8">
            {/* Ürün başlığı */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {product.name}
              </h2>
            </div>

            {/* Ürün özellikleri */}
            <div className="space-y-4">
              <div className="flex items-center">
                <span className="text-gray-600 w-32">Çeşit No:</span>
                <span className="font-semibold text-gray-900">{product.varietyNumber || 'Belirtilmemiş'}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">Gramaj:</span>
                <span className="font-semibold text-gray-900">{product.weight || 'Belirtilmemiş'}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">Koli Adet:</span>
                <span className="font-semibold text-gray-900">{product.boxQuantity || 'Belirtilmemiş'}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">40HC:</span>
                <span className="font-semibold text-gray-900">{product.container40HC || 'Belirtilmemiş'}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">Tır:</span>
                <span className="font-semibold text-gray-900">{product.truck || 'Belirtilmemiş'}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">Kutu Boyutu:</span>
                <span className="font-semibold text-gray-900">{product.boxSize || 'Belirtilmemiş'}</span>
              </div>

              <div className="flex items-center">
                <span className="text-gray-600 w-32">Barkod:</span>
                <span className="font-semibold text-gray-900">{product.barcode || 'Belirtilmemiş'}</span>
              </div>
            </div>

            {/* Ürün açıklaması */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ürün Açıklaması</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Kategori kodunu Türkçe isme çevirir
 */
function getCategoryName(category) {
  const categories = {
    'kekler': 'Kekler',
    'biskuviler': 'Bisküviler',
    'gofretler': 'Gofretler',
    'cikolatalar': 'Çikolatalar'
  }
  return categories[category] || category
}

/**
 * Sanity'den ürün verilerini çek
 */
export async function getServerSideProps() {
  try {
    const products = await client.fetch(queries.products);
    
    return {
      props: {
        products: products || []
      }
    }
  } catch (error) {
    console.error('Sanity veri çekme hatası:', error);
    
    // Hata durumunda fallback veriler
    const fallbackProducts = [
      {
        _id: '1',
        name: 'Örnek Ürün 1',
        description: 'Bu bir örnek ürün açıklamasıdır.',
        image: { asset: { url: '/placeholder.svg' } },
        category: 'makine',
        featured: true,
        slug: 'ornek-urun-1'
      }
    ];
    
    return {
      props: {
        products: fallbackProducts
      }
    }
  }
}
