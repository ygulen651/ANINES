import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { client, queries } from '../lib/sanity.client';

export default function DocumentsPage({ certificates }) {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Fallback data eğer Sanity'den veri gelmezse
  const fallbackDocuments = [
    {
      _id: '1',
      title: "ISO 50001:2018",
      description: "Enerji Yönetim Sistemi Sertifikası",
      certificateImage: { asset: { url: "/placeholder-certificate.jpg" } },
      certificateType: "iso"
    },
    {
      _id: '2',
      title: "FSSC 22000",
      description: "Gıda Güvenliği Sistemi Sertifikası", 
      certificateImage: { asset: { url: "/placeholder-certificate.jpg" } },
      certificateType: "food_safety"
    },
    {
      _id: '3',
      title: "ISO 9001:2015",
      description: "Kalite Yönetim Sistemi Sertifikası",
      certificateImage: { asset: { url: "/placeholder-certificate.jpg" } },
      certificateType: "quality"
    }
  ];

  // Sanity'den gelen veriyi kullan, yoksa fallback kullan
  const documents = certificates && certificates.length > 0 ? certificates : fallbackDocuments;

  return (
    <>
      <Head>
        <title>Dökümanlar - YENİ MARKA</title>
        <meta name="description" content="YENİ MARKA Gıda Sanayi ve Ticaret Limited Şirketi sertifikaları ve belgeleri" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        /* Genel Ayarlar */
        html, body {
          background: #ffffff;
          height: auto;
          overflow-x: hidden;
          overflow-y: auto;
          margin: 0;
          padding: 0;
        }

        body {
          padding-top: 0;
          font-family: 'Montserrat', sans-serif;
          background: #ffffff;
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
          color: #D21B21;
          display: flex;
          align-items: center;
        }

        .logo-image {
          max-width: 300px;
          max-height: 100px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(2px 2px 4px rgba(210, 27, 33, 0.3));
        }

        .menu-button {
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #D21B21;
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
          background: rgba(210, 27, 33, 0.1);
        }

        .hamburger-icon {
          background: #D21B21;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          border: 2px solid #D21B21;
        }

        .hamburger-icon span {
          width: 16px;
          height: 3px;
          background: white;
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

        /* Responsive */
        @media (max-width: 768px) {
          .navbar {
            top: 10px;
            left: 10px;
            right: 10px;
          }

          .logo-image {
            max-width: 250px;
            max-height: 90px;
          }

          .navbar-menu {
            width: 100vw;
            padding: 60px 20px;
            overflow-y: auto;
          }

          .navbar-menu a {
            font-size: 1.5rem;
            padding: 8px 15px;
          }

          .menu-logo-image {
            max-width: 150px;
            max-height: 55px;
          }
        }
      `}</style>

      {/* Fixed Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <Link href="/" className="logo-link">
            <img src="/logo.png" alt="ANI Logo" className="logo-image" />
          </Link>
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

      <div className="documents-page">
        {/* Header */}
        <div className="documents-header">
          <div className="documents-container">
            <h1 className="documents-title">SERTİFİKALARIMIZ</h1>
            <p className="documents-subtitle">
              YENİ MARKA Gıda Sanayi ve Ticaret Limited Şirketi kalite belgelerimiz
            </p>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="documents-section">
          <div className="documents-container">
            <div className="documents-grid">
              {documents.map((doc) => (
                <div
                  key={doc._id}
                  className="document-card"
                  onClick={() => setSelectedDoc(doc)}
                >
                  {/* Document Image */}
                  <div className="document-image">
                    <img 
                      src={doc.certificateImage?.asset?.url || "/placeholder-certificate.jpg"} 
                      alt={doc.title}
                      onError={(e) => {
                        // Fallback placeholder görsel
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNlcnRpZmljYXRlPC90ZXh0Pgo8L3N2Zz4K';
                      }}
                    />
                    <div className="image-overlay">
                      <div className="overlay-content">
                        <span className="zoom-icon">🔍</span>
                        <span className="zoom-text">Büyüt</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Document Info */}
                  <div className="document-info">
                    <h3 className="document-title">{doc.title}</h3>
                    <p className="document-description">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal for enlarged image */}
        {selectedDoc && (
          <div className="document-modal" onClick={() => setSelectedDoc(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="close-btn"
                onClick={() => setSelectedDoc(null)}
              >
                ×
              </button>
              <div className="modal-image">
                <img 
                  src={selectedDoc.certificateImage?.asset?.url || "/placeholder-certificate.jpg"} 
                  alt={selectedDoc.title}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI0NSUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzNiIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNlcnRpZmljYXRlPC90ZXh0PgogIDx0ZXh0IHg9IjUwJSIgeT0iNTUlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBOb3QgRm91bmQ8L3RleHQ+Cjwvc3ZnPgo=';
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Back to Home */}
        <div className="back-section">
          <Link href="/" className="back-link">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>

      <style jsx>{`
        .documents-page {
          min-height: 100vh;
          background: #ffffff;
          padding-top: 120px;
          position: relative;
        }

        .documents-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .documents-header {
          text-align: center;
          margin-bottom: 80px;
          padding: 60px 0;
        }

        .documents-title {
          font-size: 4rem;
          font-weight: 900;
          color: #2c3e50;
          margin-bottom: 25px;
          letter-spacing: -2px;
        }

        .documents-subtitle {
          font-size: 1.3rem;
          color: #666;
          max-width: 800px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 400;
        }

        .documents-section {
          padding: 0 0 80px 0;
        }

        .documents-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 50px;
          margin-bottom: 80px;
        }

        .document-card {
          background: white;
          border-radius: 25px;
          overflow: hidden;
          box-shadow: 0 15px 40px rgba(0,0,0,0.15);
          cursor: pointer;
          transition: all 0.4s ease;
          border: 2px solid #e0e0e0;
        }

        .document-card:hover {
          transform: translateY(-15px) scale(1.02);
          box-shadow: 0 25px 60px rgba(210, 27, 33, 0.2);
          border-color: #D21B21;
        }

        .document-image {
          position: relative;
          width: 100%;
          height: 350px;
          overflow: hidden;
          background: #f8f9fa;
          border-bottom: 3px solid #f0f0f0;
        }

        .document-image img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 10px;
          transition: transform 0.4s ease;
          background: white;
        }

        .document-card:hover .document-image img {
          transform: scale(1.08);
        }

        .image-overlay {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: all 0.4s ease;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          backdrop-filter: blur(10px);
        }

        .document-card:hover .image-overlay {
          opacity: 1;
          transform: scale(1.1);
        }

        .overlay-content {
          text-align: center;
          color: #2c3e50;
        }

        .zoom-icon {
          font-size: 1.8rem;
          transition: transform 0.3s ease;
        }

        .document-card:hover .zoom-icon {
          transform: scale(1.2);
        }

        .zoom-text {
          display: none;
        }

        .document-info {
          padding: 35px;
          text-align: center;
          background: linear-gradient(135deg, #ffffff, #f8f9fa);
        }

        .document-title {
          font-size: 1.7rem;
          font-weight: 900;
          color: #2c3e50;
          margin-bottom: 15px;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .document-description {
          color: #666;
          font-size: 1.1rem;
          margin: 0;
          line-height: 1.6;
          font-weight: 500;
        }

        /* Modal Styles */
        .document-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(20, 20, 20, 0.98));
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 0;
          backdrop-filter: blur(15px);
          animation: modalBackdropFadeIn 0.5s ease;
        }

        @keyframes modalBackdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: linear-gradient(135deg, #ffffff, #fafafa);
          border-radius: 25px;
          max-width: 95vw;
          max-height: 95vh;
          width: auto;
          height: auto;
          overflow: visible;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          animation: modalSlideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 
            0 50px 100px rgba(0,0,0,0.4),
            0 20px 40px rgba(0,0,0,0.2),
            inset 0 1px 0 rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.3);
        }

        @keyframes modalSlideIn {
          from { 
            transform: translate(-50%, -50%) scale(0.7); 
            opacity: 0; 
            filter: blur(10px);
          }
          to { 
            transform: translate(-50%, -50%) scale(1); 
            opacity: 1; 
            filter: blur(0);
          }
        }

        .close-btn {
          position: absolute;
          top: -15px;
          right: -15px;
          background: linear-gradient(135deg, #D21B21, #B0151A);
          border: 3px solid white;
          color: white;
          font-size: 2rem;
          cursor: pointer;
          padding: 15px 20px;
          border-radius: 50%;
          z-index: 15;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 
            0 10px 25px rgba(210, 27, 33, 0.4),
            0 5px 15px rgba(0,0,0,0.2);
          backdrop-filter: blur(10px);
        }

        .close-btn:hover {
          background: linear-gradient(135deg, #B0151A, #8B1014);
          transform: scale(1.2) rotate(90deg);
          box-shadow: 
            0 15px 35px rgba(210, 27, 33, 0.6),
            0 8px 20px rgba(0,0,0,0.3);
        }

        .modal-image {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 600px;
          max-height: 85vh;
          overflow: visible;
          padding: 20px;
          background: #ffffff;
          margin: 0;
          border-radius: 25px;
          position: relative;
          box-shadow: 
            0 10px 30px rgba(0,0,0,0.15),
            inset 0 1px 0 rgba(255,255,255,1);
        }

        .modal-image img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 10px;
          box-shadow: 
            0 15px 35px rgba(0,0,0,0.1),
            0 5px 15px rgba(0,0,0,0.05);
          background: #ffffff;
          padding: 0;
          border: none;
          transition: transform 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .modal-image img:hover {
          transform: scale(1.01);
        }


        .back-section {
          padding: 60px 0;
          text-align: center;
          border-top: 1px solid #f0f0f0;
        }

        .back-link {
          display: inline-block;
          background: linear-gradient(135deg, #D21B21, #9c27b0);
          color: white;
          padding: 18px 40px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(210, 27, 33, 0.3);
          letter-spacing: 0.5px;
        }

        .back-link:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(210, 27, 33, 0.4);
        }

        @media (max-width: 768px) {
          .documents-title {
            font-size: 2.8rem;
          }
          
          .documents-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .document-image {
            height: 300px;
          }
          
          .document-info {
            padding: 30px;
          }

          .document-title {
            font-size: 1.5rem;
          }

          .document-description {
            font-size: 1rem;
          }

          .modal-content {
            max-width: 98vw;
            max-height: 95vh;
            border-radius: 20px;
          }
          
          .close-btn {
            top: -10px;
            right: -10px;
            padding: 12px 16px;
            font-size: 1.8rem;
          }
          
          .modal-image {
            min-height: 400px;
            max-height: 80vh;
            padding: 15px;
            margin: 0;
            border-radius: 20px;
          }

          .modal-image img {
            padding: 0;
            border-radius: 10px;
          }
        }

        @media (max-width: 480px) {
          .documents-page {
            padding-top: 100px;
          }
          
          .documents-title {
            font-size: 2.2rem;
          }
          
          .documents-subtitle {
            font-size: 1.1rem;
          }
          
          .document-image {
            height: 200px;
          }
        }

        /* Footer Styles */
        .footer {
          width: 100%;
          background: linear-gradient(90deg, #D21B21 0%, #B0151A 100%);
          color: white;
          font-family: 'Arial', sans-serif;
        }

        .footer-top {
          background: linear-gradient(90deg, #D21B21 0%, #B0151A 100%);
          padding: 40px 0 30px;
        }

        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .footer-slogan {
          margin-bottom: 40px;
        }

        .footer-slogan h2 {
          font-size: 2.5rem;
          font-weight: 300;
          margin: 0;
          color: white;
        }

        .footer-nav {
          margin-bottom: 40px;
          width: 100%;
        }

        .nav-row {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 30px;
          margin-bottom: 20px;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          font-size: 1rem;
          font-weight: 400;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        .footer-social {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .social-text {
          font-size: 1.1rem;
          font-weight: 500;
          margin: 0;
        }

        .social-icons {
          display: flex;
          gap: 15px;
        }

        .social-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: white;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .footer-bottom {
          background: #FFA600;
          padding: 20px 0;
        }

        .footer-bottom-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }

        .footer-legal {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .cookie-icon {
          width: 24px;
          height: 24px;
          background: #4a90e2;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .legal-links {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .legal-link {
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        .legal-link:hover {
          color: rgba(255, 255, 255, 0.8);
        }

        .footer-copyright {
          color: white;
          font-size: 0.9rem;
        }

        .footer-copyright p {
          margin: 0;
        }
      `}</style>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-content">
            <div className="footer-slogan">
              <h2>Hayatın her anında YENİ MARKA</h2>
            </div>
            
            <div className="footer-nav">
              <div className="nav-row">
                <a href="/blog" className="nav-link">BLOG</a>
                <a href="/" className="nav-link">ANASAYFA</a>
                <a href="/products" className="nav-link">ÜRÜNLER</a>
                <a href="/documents" className="nav-link">DÖKÜMANLAR</a>
              </div>
            </div>
            
            <div className="footer-social">
              <p className="social-text">Bizi takip edin!</p>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="social-icon" aria-label="YouTube">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-legal">
              <div className="cookie-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="legal-links">
                <a href="/bilgi-toplumu" className="legal-link">Bilgi Toplumu Hizmetleri</a>
                <a href="/gizlilik" className="legal-link">Gizlilik ve Güvenlik Politikamız</a>
                <a href="/kvkk" className="legal-link">Kişisel Verilerin Korunması</a>
                <a href="/cerez-politikasi" className="legal-link">Çerez Politikası</a>
              </div>
            </div>
            <div className="footer-copyright">
              <p>2023 YENİ MARKA Tüm Hakları Saklıdır.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// Server-side rendering ile Sanity'den veri çek
export async function getServerSideProps() {
  try {
    const certificates = await client.fetch(queries.certificates);
    
    return {
      props: {
        certificates: certificates || []
      }
    };
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return {
      props: {
        certificates: []
      }
    };
  }
}