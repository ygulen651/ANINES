import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Şölen Lezzet Kataloğu - 3 Kısımlı Sayfa
 */
export default function Catalog() {
  const [activeSection, setActiveSection] = useState(0);

  // 3 ana bölüm
  const sections = [
    {
      id: 'product-catalog',
      title: 'Ürün Kataloğu',
      subtitle: '2025 Hediyelik ve İkramlık Ürün Kataloğu',
      description: 'Şölen lezzet ailesinin 2025 yılı kataloğu ile çikolata ve çikolatalı ürünleri sevenler için görsel şölen sunulmaktadır.',
      buttonText: 'Ürün Kataloğu',
      buttonStyle: 'primary',
      background: 'linear-gradient(135deg, #f5e6d3, #e8d5c4)',
      catalogImage: '/bigger.png'
    },
    {
      id: 'holiday-catalog',
      title: 'Bayram Kataloğu',
      subtitle: 'Bayramınız Şölen Olsun!',
      description: 'Özel günlerinizde sevdiklerinizle paylaşabileceğiniz en lezzetli çikolata ve şekerleme ürünlerimizi keşfedin.',
      buttonText: 'Bayram Kataloğu',
      buttonStyle: 'secondary',
      background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)',
      catalogImage: '/bigger.png'
    },
    {
      id: 'corporate-catalog',
      title: 'Kurumsal Kataloğu',
      subtitle: 'İş Dünyasının Tercihi',
      description: 'Kurumsal hediyeleşme ve özel etkinlikleriniz için profesyonel çikolata çözümlerimizi inceleyin.',
      buttonText: 'Kurumsal Kataloğu',
      buttonStyle: 'primary',
      background: 'linear-gradient(135deg, #a8e6cf, #88d8a3)',
      catalogImage: '/bigger.png'
    }
  ];

  return (
    <>
      <Head>
        <title>Şölen Lezzet Kataloğu - 2025</title>
        <meta name="description" content="Şölen lezzet ailesinin 2025 yılı kataloğu ile çikolata ve çikolatalı ürünleri sevenler için görsel şölen" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Montserrat', sans-serif;
          overflow-x: hidden;
          background: #ffffff;
        }

        .catalog-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Header Bölümü */
        .catalog-header {
          background: linear-gradient(135deg, #D21B21, #f06292);
          color: white;
          padding: 60px 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .catalog-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="10" cy="60" r="0.5" fill="rgba(255,255,255,0.05)"/><circle cx="90" cy="40" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
        }

        .catalog-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          position: relative;
          z-index: 2;
        }

        .catalog-subtitle {
          font-size: 1.2rem;
          font-weight: 300;
          letter-spacing: 2px;
          opacity: 0.9;
          position: relative;
          z-index: 2;
        }

        /* Ana İçerik Bölümü */
        .catalog-main {
          flex: 1;
          display: flex;
          min-height: 80vh;
        }

        /* Sol Taraf - Katalog Görselleri */
        .catalog-visuals {
          flex: 1;
          background: #f8f9fa;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          position: relative;
        }

        .catalog-stack {
          position: relative;
          width: 100%;
          max-width: 400px;
          height: 500px;
        }

        .catalog-book {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 15px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          transition: all 0.5s ease;
          cursor: pointer;
        }

        .catalog-book.front {
          z-index: 3;
          transform: translateX(0) translateY(0) rotate(0deg);
          background: white;
          border: 3px solid #D21B21;
        }

        .catalog-book.back {
          z-index: 1;
          transform: translateX(-20px) translateY(20px) rotate(-5deg);
          background: #D21B21;
          border: 3px solid #B0151A;
        }

        .catalog-book:hover {
          transform: translateX(0) translateY(-10px) rotate(0deg) scale(1.02);
        }

        .catalog-cover {
          width: 100%;
          height: 100%;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .catalog-cover.front {
          background: linear-gradient(135deg, #ffffff, #f8f9fa);
        }

        .catalog-cover.back {
          background: linear-gradient(135deg, #D21B21, #B0151A);
          color: white;
        }

        .brand-logo {
          font-size: 2.5rem;
          font-weight: 900;
          color: #D21B21;
          margin-bottom: 20px;
          position: relative;
        }

        .brand-logo .accent {
          color: #ff6b6b;
          position: relative;
        }

        .brand-logo .accent::after {
          content: '✦';
          position: absolute;
          top: -10px;
          right: -15px;
          font-size: 1rem;
          color: #FFE043;
          animation: sparkle 2s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        .catalog-year {
          font-size: 1rem;
          font-weight: 600;
          color: #666;
          margin-bottom: 10px;
        }

        .catalog-type {
          font-size: 0.9rem;
          color: #888;
          line-height: 1.4;
        }

        .catalog-cover.back .catalog-year,
        .catalog-cover.back .catalog-type {
          color: rgba(255,255,255,0.9);
        }

        /* Sağ Taraf - İçerik ve Butonlar */
        .catalog-content {
          flex: 1;
          background: white;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 40px;
        }

        .content-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #D21B21;
          margin-bottom: 20px;
          line-height: 1.2;
        }

        .content-description {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 500px;
        }

        .catalog-buttons {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .catalog-button {
          padding: 15px 30px;
          border: none;
          border-radius: 50px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          min-width: 180px;
          position: relative;
          overflow: hidden;
        }

        .catalog-button.primary {
          background: #D21B21;
          color: white;
          box-shadow: 0 4px 15px rgba(233, 30, 99, 0.3);
        }

        .catalog-button.primary:hover {
          background: #B0151A;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(233, 30, 99, 0.4);
        }

        .catalog-button.secondary {
          background: white;
          color: #D21B21;
          border: 2px solid #D21B21;
          box-shadow: 0 4px 15px rgba(233, 30, 99, 0.1);
        }

        .catalog-button.secondary:hover {
          background: #D21B21;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(233, 30, 99, 0.3);
        }

        .catalog-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }

        .catalog-button:hover::before {
          left: 100%;
        }

        /* Alt Bölüm - Ek Bilgiler */
        .catalog-footer {
          background: #f8f9fa;
          padding: 40px 20px;
          text-align: center;
          border-top: 1px solid #e9ecef;
        }

        .footer-text {
          color: #666;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 20px;
        }

        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #D21B21;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: #B0151A;
          transform: translateY(-2px);
        }

        /* Responsive Tasarım */
        @media (max-width: 768px) {
          .catalog-main {
            flex-direction: column;
          }

          .catalog-title {
            font-size: 2.5rem;
          }

          .content-title {
            font-size: 2rem;
          }

          .catalog-buttons {
            flex-direction: column;
            align-items: center;
          }

          .catalog-button {
            width: 100%;
            max-width: 300px;
          }

          .catalog-stack {
            max-width: 300px;
            height: 400px;
          }
        }

        @media (max-width: 480px) {
          .catalog-header {
            padding: 40px 15px;
          }

          .catalog-title {
            font-size: 2rem;
          }

          .catalog-content {
            padding: 40px 20px;
          }

          .content-title {
            font-size: 1.8rem;
          }
        }
      `}</style>

      <div className="catalog-container">
        {/* Header Bölümü */}
        <header className="catalog-header">
          <h1 className="catalog-title">Şölen Lezzet Kataloğu</h1>
          <p className="catalog-subtitle">2025 Yılı Özel Koleksiyonu</p>
        </header>

        {/* Ana İçerik Bölümü */}
        <main className="catalog-main">
          {/* Sol Taraf - Katalog Görselleri */}
          <section className="catalog-visuals">
            <div className="catalog-stack">
              {/* Ön Katalog */}
              <div className="catalog-book front">
                <div className="catalog-cover front">
                  <div className="brand-logo">
                    şö<span className="accent">l</span>en
                  </div>
                  <div className="catalog-year">2025</div>
                  <div className="catalog-type">
                    Hediyelik ve İkramlık<br />
                    Ürün Kataloğu
                  </div>
                </div>
              </div>

              {/* Arka Katalog */}
              <div className="catalog-book back">
                <div className="catalog-cover back">
                  <div className="brand-logo" style={{color: 'white'}}>
                    şö<span className="accent" style={{color: '#FFE043'}}>l</span>en
                  </div>
                  <div className="catalog-year">Bayramınız Şölen Olsun!</div>
                  <div className="catalog-type">
                    Özel Günler İçin<br />
                    Lezzet Koleksiyonu
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Sağ Taraf - İçerik ve Butonlar */}
          <section className="catalog-content">
            <h2 className="content-title">Şölen Lezzet Kataloğu</h2>
            <p className="content-description">
              Şölen lezzet ailesinin 2025 yılı kataloğu ile çikolata ve çikolatalı ürünleri sevenler için görsel şölen sunulmaktadır. 
              Her damakta iz bırakan lezzetlerimizi keşfetmeye hazır mısınız?
            </p>
            
                 <div className="catalog-buttons">
                   <button 
                     className="catalog-button primary"
                     onClick={() => window.open('/products', '_blank')}
                   >
                     Ürün Kataloğu
                   </button>
                   <button 
                     className="catalog-button secondary"
                     onClick={() => window.open('/catalog', '_blank')}
                   >
                     Bayram Kataloğu
                   </button>
                 </div>
          </section>
        </main>

        {/* Alt Bölüm */}
        <footer className="catalog-footer">
          <p className="footer-text">
            Türkiye'nin en sevilen çikolata markası Şölen ile lezzet dolu anlar yaşayın.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">📱</a>
            <a href="#" className="social-link">📧</a>
            <a href="#" className="social-link">🌐</a>
          </div>
        </footer>
      </div>
    </>
  );
}
