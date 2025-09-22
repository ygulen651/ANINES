
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Timeline from '../components/Timeline';
import { getMilestones } from '../src/sanity/lib/queries';
import { getDocuments, getCorporateIdentity } from '../lib/sanity.client';

/**
 * Hakkımızda sayfası
 */
export default function About({ milestones, documents, corporateIdentity }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

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

        /* Smooth Scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Yan Navigasyon Responsive */
        @media (max-width: 1024px) {
          .side-navigation {
            left: 10px !important;
            minWidth: 140px !important;
            padding: 10px 8px !important;
          }
        }

        @media (max-width: 768px) {
          .side-navigation {
            display: none !important;
          }
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

      {/* Yan Navigasyon Menüsü */}
      <div className="side-navigation" style={{
        position: 'fixed',
        left: '15px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: '100',
        background: 'white', 
        borderRadius: '10px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        padding: '12px 10px',
        minWidth: '150px',
        border: '1.5px solid #D21B21'
      }}>
        <h3 style={{
          fontSize: '0.8rem',
          fontWeight: '700',
          color: '#D21B21',
          marginBottom: '12px',
          textAlign: 'center',
          borderBottom: '1.5px solid #D21B21',
          paddingBottom: '6px'
        }}>
          KURUMSAL
        </h3>
        <ul style={{
          listStyle: 'none',
          padding: '0',
          margin: '0'
        }}>
          <li style={{ marginBottom: '6px' }}>
            <a href="#hero" style={{
              color: '#D21B21',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'block',
              padding: '5px 8px',
              borderRadius: '5px',
              transition: 'all 0.3s ease',
              border: '1px solid transparent'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#D21B21';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#D21B21';
            }}>
              — Tarihçemiz
            </a>
          </li>
          <li style={{ marginBottom: '6px' }}>
            <a href="#kalite" style={{
              color: '#D21B21',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'block',
              padding: '5px 8px',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#D21B21';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#D21B21';
            }}>
              — Kalite
            </a>
          </li>
          <li style={{ marginBottom: '6px' }}>
            <a href="#ihracat" style={{
              color: '#D21B21',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'block',
              padding: '5px 8px',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#D21B21';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#D21B21';
            }}>
              — İhracat
            </a>
          </li>
          <li style={{ marginBottom: '6px' }}>
            <a href="#baskan-mesaji" style={{
              color: '#D21B21',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'block',
              padding: '5px 8px',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#D21B21';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#D21B21';
            }}>
              — Başkanın Mesajı
            </a>
          </li>
          <li style={{ marginBottom: '6px' }}>
            <a href="#sosyal-sorumluluk" style={{
              color: '#D21B21',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'block',
              padding: '5px 8px',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#D21B21';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#D21B21';
            }}>
              — Sosyal Sorumluluk
            </a>
          </li>
          <li style={{ marginBottom: '6px' }}>
            <a href="#misyon-vizyon" style={{
              color: '#D21B21',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'block',
              padding: '5px 8px',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#D21B21';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#D21B21';
            }}>
              — Misyon & Vizyon
            </a>
          </li>
          <li style={{ marginBottom: '6px' }}>
            <a href="#sertifikalar" style={{
              color: '#D21B21',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'block',
              padding: '5px 8px',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#D21B21';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#D21B21';
            }}>
              — Sertifikalar
            </a>
          </li>
          <li style={{ marginBottom: '6px' }}>
            <a href="#kilometre-taslanimiz" style={{
              color: '#D21B21',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'block',
              padding: '5px 8px',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#D21B21';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#D21B21';
            }}>
              — Kilometre Taşlarımız
            </a>
          </li>
          <li style={{ marginBottom: '6px' }}>
            <a href="#bilgi-toplumu" style={{
              color: '#D21B21',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'block',
              padding: '5px 8px',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#D21B21';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#D21B21';
            }}>
              — Bilgi Toplumu Hizmeti
            </a>
          </li>
          <li style={{ marginBottom: '0' }}>
            <a href="#kurumsal-kimlik" style={{
              color: '#D21B21',
              textDecoration: 'none',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'block',
              padding: '5px 8px',
              borderRadius: '5px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#D21B21';
              e.target.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#D21B21';
            }}>
              — Kurumsal Kimlik
            </a>
          </li>
        </ul>
      </div>

      {/* Ana Tarihçe Bölümü - İlk Sırada */}
      <section id="hero" style={{ 
        background: 'white', 
        padding: '150px 0 80px 0'
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: '700', 
              marginBottom: '2rem',
              color: '#1a1a1a',
              letterSpacing: '3px'
            }}>
              TARİHÇEMİZ
            </h1>
            
            <div style={{ 
              width: '120px', 
              height: '3px', 
              background: '#D21B21', 
              margin: '0 auto 3rem'
            }}></div>
            
            <h2 style={{ 
              fontSize: '1.8rem', 
              color: '#D21B21',
              lineHeight: '1.6',
              maxWidth: '800px',
              margin: '0 auto 4rem',
              fontWeight: '400'
            }}>
              ANI BİSKÜVİ serüveninde attığımız önemli adımlar ve başarılarımız
            </h2>
          </div>
          
          {/* Basit Tarihçe Metni - İlk Başta */}
          <div style={{ 
            maxWidth: '900px',
            margin: '0 auto',
            fontSize: '1.1rem', 
            color: '#444', 
            lineHeight: '1.8'
          }}>
            <p style={{ marginBottom: '25px' }}>
              1995 yılında kurulan ANI BİSKÜVİ A.Ş İlk olarak bisküvi üretimiyle faaliyetine başlamış, 
              kuruluşundan bu güne 20 yıllık sürede satışlarında gösterdiği büyük sıçramayla sürekli yatırımlara yönelmiştir.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Şirketimizin göstermiş olduğu performans sonucunda 1997, 2000, 2008, 2009, 2010, 2011 ve 2012 yıllarında 
              İstanbul Sanayi Odasınca yayınlanan Türkiye'nin ikinci 500 büyük firması arasında yer almış ardından 
              2013- 2014 yıllarında ise Türkiye'nin ilk 500 büyük firma arasına girme başarısını göstermiştir.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              40 işçi ile başlayan faaliyetimiz bugün 1500 işçiyle sürdürülmektedir.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              ANI BİSKÜVİ A.Ş, 65000 m2 açık 115000 m2 kapalı alanda faaliyetin sürdüğü fabrikada 
              dünya ülkelerine yaptığı ihracatıyla Karaman'da en çok ihracat yapan şirketler sıralamasında 1. sıraya 
              yükselmiştir. (2011 - 2012 - 2013 - 2014 Karaman il birincisi)
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              ANI BİSKÜVİ fabrika bünyesindeki bisküvi - kek - çikolata - gofret - kraker - marshmallow - 
              şeker - fındık kreması ve 2010 yılında yeni bir hat ekleyerek kakao kremalı mozaik bisküvi-fındık pasta 
              ve çikolata damlalı bisküvi hatlarıyla ürün yelpazesine dâhil etmiştir. 2015 
              yılında kremalı bisküvi ürünleri yurt dışından en son model tam otomatik yeni bir tesisi devreye girmiştir.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              ANI BİSKÜVİ GIDA SANAYİ VE TİC. A.Ş kaliteye de büyük önem vermiş ve kuruluşunun ilk yıllarından itibaren 
              TSE+TSEK ve TS-EN+ISO 9001 belgesini almış olup bununla yetinmeyip gıda sektöründe tüm dünya tarafından 
              kabul edilen, gıda güvenliği ve sağlığa uygunluk konusunda son nokta olan ve HACCP disiplinini de içeren 
              ISO 22000 kalite belgesin de bünyesine ve helal gıda üretim belgesini de katmıştır.
            </p>
            
            <p style={{ marginBottom: '0' }}>
              Nihayetinde Bilgi Güvenliği Sistemi olan ISO 27001 sertifikasını almış bulunmaktayız.
            </p>
          </div>
        </div>
      </section>

      {/* Kalite Bölümü - 2. Sırada */}
      <section id="kalite" style={{ 
        background: 'white', 
        padding: '100px 0'
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ 
              fontSize: '4rem', 
                fontWeight: '700', 
                color: '#1a1a1a', 
              marginBottom: '20px',
              letterSpacing: '3px'
              }}>
              KALİTE
            </h1>
              <div style={{ 
              width: '120px', 
                height: '3px', 
                background: '#D21B21', 
              margin: '0 auto'
              }}></div>
            </div>

          {/* Ana Kalite Metni */}
              <div style={{ 
            maxWidth: '1000px',
            margin: '0 auto 60px',
                fontSize: '1.1rem', 
            color: '#444', 
                lineHeight: '1.8'
              }}>
            <p style={{ marginBottom: '25px' }}>
              Kalite belgeleri yönetim sistemlerini kurmuş işletmeler rekabet ortamında karşılıklı fayda yaratarak daha kolay sistemli ve tamamen sıfır hata ile iş yapma olanağını yakalarlar. Bu bağlamda işletmeler ulusal ve uluslararası ticaret sahnesinde saygın bir yer edinirler.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Şirketimiz ANI BİSKÜVİ de globalleşen dünyada artan rekabet şartları yanında ekonomik gelişmeler yüksek müşteri beklentileri işletmelerin içinde bulunduğu sektörde pazar paylarını korumaları sadece teknolojik yatırımlarla değil ürettikleri mamullerinde çok kaliteli ve tüketiciye her tür güvence sağlamakla mümkün olduğuna inanan ANI BİSKÜVİ A.Ş gıda sektöründe kalite her şeyin önünde gelir prensibiyle hareket ederek T.S.E ve ISO 9000 kalite belgelerine öncelikle sahip olmuştur.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              ANI BİSKÜVİ kalite sistem belgelerine tüm çalışanlarını da inandırmış ve işletmenin tüm birimlerinde düzeltici, önleyici faaliyetlerle sistem mükemmel şekilde yürütülmektedir.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Biz ANI BİSKÜVİ olarak, kalite için inanarak söyleyebileceğimiz prensipleri kısaca özetlersek :
            </p>
            
            <ul style={{ marginBottom: '25px', paddingLeft: '30px' }}>
              <li style={{ marginBottom: '10px', color: '#D21B21', fontWeight: '600' }}>Kalite ilk defada doğru yapmaktır.</li>
              <li style={{ marginBottom: '10px', color: '#D21B21', fontWeight: '600' }}>Kalite ancak çok iyi bir takım çalışması ile elde edilir.</li>
              <li style={{ marginBottom: '10px', color: '#D21B21', fontWeight: '600' }}>Sürekli iyileştirme ve geliştirme işletmenin hedefidir.</li>
              <li style={{ marginBottom: '10px', color: '#D21B21', fontWeight: '600' }}>Kalite müşteri beklentisinin karşılanmasıdır.</li>
              <li style={{ marginBottom: '10px', color: '#D21B21', fontWeight: '600' }}>Etkin kararlar güvenilir donelere sahip olmakla elde edilir.</li>
            </ul>
            
            <p style={{ marginBottom: '25px' }}>
              <strong>ANI BİSKÜVİ'nin sahip olduğu belgelerden;</strong>
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              <strong>T.S.E Belgesi</strong> Malların ve hizmetlerin ilgili Türk Standartlarına uygun olduğunu ve mamulle veya hizmetle ilgili bir problem ortaya çıktığında Türk Standartları Enstitüsünün garantisi altında olduğunu ifade eder.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              <strong>ISO KALİTE SİSTEMİ</strong> = Kalite yönetim standartları diğer ürün standartları gibi uluslar arası kabul görmüş standartları içerir. Şu an dünyada uygulanmakta olan en üst düzey ISO belgesi ISO 22000'dir. ANI BİSKÜVİ ISO 9001 ve IS0 22000 kalite sistemine sahiptir.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              <strong>HACCP</strong> = Gıda güvenirliği sisteminde uygulanan en iyi standartları ve değerlendirmelere sahip bir sistem olup, üretilen ürünlerin insan sağlığını tehdit edecek bütün tehlikelerden arındırılmış bir kalite sistemidir. HACCP, IS0 22000 ile entegre olarak kalite sistemimizde titizlikle uygulanmaktadır.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Tüm ANI BİSKÜVİ çalışanlarının ortak çabasıyla bütün çeşitlerimiz kalite belgelerine, üretim izinlerine ve marka tescillerine sahiptir. Kalite el kitabımızda kalite için ortak politikamız: "Çalışanlarımızın ortak katılımı ile kaliteli ve sağlıklı ürünler üretmek temel ilkemizdir. Kaliteli üretimi sürekli bir gelişme içinde çalışarak başaracağız."
            </p>
          </div>

          {/* Politikalar */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
            
            {/* Kalite Politikası */}
            <div style={{ 
        background: '#f8f9fa', 
              padding: '40px', 
              borderRadius: '15px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
              fontWeight: '700', 
                color: '#D21B21', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                KALİTE POLİTİKAMIZ
              </h3>
            <p style={{ 
                fontSize: '1.1rem', 
                color: '#444', 
              lineHeight: '1.8',
                textAlign: 'justify'
            }}>
                ANI BİSKÜVİ GIDA SANAYİ ve TİCARET A.Ş. olarak; çalışanlarımızın ortak katılımıyla kaliteli üretim yaparak, gıda güvenliğini en üst düzeyde sağlayarak, müşteri memnuniyetini ön planda tutarak, yenilikler doğrultusunda sürekli iyileşmeyi baz alarak, yasal şartlar ve müşteri gerekliliklerine uygunluğu ön planda tutmayı amaç edindik.
            </p>
          </div>

            {/* Gıda Güvenliği Politikası */}
          <div style={{ 
              background: '#f8f9fa', 
              padding: '40px', 
              borderRadius: '15px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                fontWeight: '700', 
                color: '#D21B21', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                GIDA GÜVENLİĞİ POLİTİKAMIZ
              </h3>
              <p style={{ 
                fontSize: '1.1rem', 
                color: '#444', 
                lineHeight: '1.8',
                marginBottom: '20px'
              }}>
                Kuruluşumuzda çalışan herkesin gönül seferberliği ve bilinçli çabaları ile müşterilerimize lezzetli, kaliteli ve güvenli ürünler sunarak rekabet yarışında önde olmak ana ilkemizdir.
              </p>
                  <p style={{ 
                fontSize: '1.1rem', 
                color: '#444', 
                    lineHeight: '1.8',
                marginBottom: '15px'
              }}>
                Bu ilkemizi gerçekleştirmek için, girdilerimizin satın alınmasından itibaren, mamullerimizin müşterilerimize ulaştırılmasına kadar
              </p>
              <ul style={{ paddingLeft: '20px', color: '#444' }}>
                <li style={{ marginBottom: '8px' }}>Mevzuata uygunluğa önem verir,</li>
                <li style={{ marginBottom: '8px' }}>Çalışanlarımızı eğitir,</li>
                <li style={{ marginBottom: '8px' }}>Üretimde hijyen kurallarına uyulmasını sağlar,</li>
                <li style={{ marginBottom: '8px' }}>Gelişen şartlara uyum için akılcı ve planlı çalışmaya önem verir,</li>
                <li style={{ marginBottom: '8px' }}>Bilgi ve verilere dayalı karar verir,</li>
                <li style={{ marginBottom: '8px' }}>Müşterilerimizin istek ve beklentilerini sürekli olarak izler; kaliteli, güvenli, yasal ve özgün ürünler üretir.</li>
                <li style={{ marginBottom: '8px' }}>Tedarikçilerimizle işbirliği yapar,</li>
                <li style={{ marginBottom: '0' }}>Faaliyetlerimizin etkinliğini, gıda güvenliği ve kalite kültürünü sürekli iyileştiririz.</li>
              </ul>
                </div>

            {/* Bilgi Güvenliği Politikası */}
                <div style={{ 
              background: '#f8f9fa', 
              padding: '40px', 
              borderRadius: '15px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                fontWeight: '700', 
                color: '#D21B21', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                BİLGİ GÜVENLİĞİ POLİTİKAMIZ
              </h3>
                  <p style={{ 
                fontSize: '1.1rem', 
                color: '#444', 
                    lineHeight: '1.8',
                marginBottom: '15px'
              }}>
                ANI BİSKÜVİ GIDA SANAYİ VE TİCARET A.Ş. ve çalışanları olarak iş sürekliliğimize ve bilgiye yönelik her türlü riski yönetmek amacıyla;
              </p>
              <ul style={{ paddingLeft: '20px', color: '#444', marginBottom: '20px' }}>
                <li style={{ marginBottom: '8px' }}>Kurum içinde sürekli iyileştirerek ve bilgi güvenliği farkındalığı sağlayarak</li>
                <li style={{ marginBottom: '8px' }}>Tüm çalışanlarımız ve iş ortaklarımızın katılımı ile</li>
                <li style={{ marginBottom: '0' }}>İşlediğimiz tüm fiziksel ve elektronik veriyi koruma hedefi ile devam ettireceğimiz taahhüt etmekteyiz.</li>
              </ul>
                  <p style={{ 
                fontSize: '1.1rem', 
                color: '#444', 
                    lineHeight: '1.8',
                marginBottom: '15px'
              }}>
                Veri güveliğinin Gizlilik, Bütünlük ve Erişebilirlik ilkelerine dayalı olarak ve KVK kanunu ile Kişisel veri, Özel Nitelikli veri sınıflandırmaları esası ile;
              </p>
              <ul style={{ paddingLeft: '20px', color: '#444' }}>
                <li style={{ marginBottom: '8px' }}>Bilgi Güvenliği Standartlarının ve ilgili yasal mevzuatlara uyumu sağlanacaktır.</li>
                <li style={{ marginBottom: '8px' }}>Oluşturulan Varlık ve Veri Envanterleri üzerinden bu varlıklara yönelik tehdit ve zafiyetler ile riskleri tespit edilecek ve yönetilecektir</li>
                <li style={{ marginBottom: '8px' }}>Bilgi Güvenliği Yönetim Sistemini ve KVKK uyumluluğunu sürekli gözden geçirilmesi ve iyileştirilmesi sağklnacaktır.</li>
                <li style={{ marginBottom: '8px' }}>Bilgi Güvenliği farkındalığını artırmak için, teknik ve davranış bütünlüğü sağlayacak eğitimler verilecektir.</li>
                <li style={{ marginBottom: '0' }}>Ana bilgi güvenliği politikamızı destekleyecek alt politikalar belirlenecektir.</li>
              </ul>
                </div>

            {/* Hijyen ve Sanitasyon Politikası */}
                <div style={{ 
              background: '#f8f9fa', 
              padding: '40px', 
              borderRadius: '15px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                fontWeight: '700', 
                color: '#D21B21', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                HİJYEN VE SANİTASYON POLİTİKAMIZ
              </h3>
              <ul style={{ paddingLeft: '20px', color: '#444' }}>
                <li style={{ marginBottom: '8px' }}>Temizlik ve hijyen faaliyetlerimizde insan, doğayı ve ön planda tutmak,</li>
                <li style={{ marginBottom: '8px' }}>Paydaşlarımızın isteklerine göre sağlıklı, hijyenik, standartlara uygun ve güvenilir ürünler üretmek</li>
                <li style={{ marginBottom: '8px' }}>Her Kademede eğitimli ve bilinçli personel yaklaşımını benimsemek ve uygulamak, personelin bilgi ve beceri düzeylerinin artırılması yönünde sürekli eğitim faaliyetlerinde bulunmak</li>
                <li style={{ marginBottom: '8px' }}>Hijyen ve Sanitasyon Yönetim Sisteminin sürekli iyileştirilmesini, geliştirilmesini ve etkinliğini artırmak.</li>
                <li style={{ marginBottom: '0' }}>Yasal ve Düzenleyici Şartlara Uygunluğunu Sağlamak,</li>
              </ul>
                </div>

            {/* Helal Politikası */}
                <div style={{ 
              background: '#f8f9fa', 
              padding: '40px', 
              borderRadius: '15px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                fontWeight: '700', 
                color: '#D21B21', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                HELAL POLİTİKAMIZ
              </h3>
                  <p style={{ 
                fontSize: '1.1rem', 
                color: '#444', 
                    lineHeight: '1.8',
                marginBottom: '15px'
              }}>
                Helal sertifikalı ürünlerimizi aşağıdaki ilkelere uygun olarak üretmeyi ve dağıtmayı taahhüt ediyoruz:
              </p>
              <ul style={{ paddingLeft: '20px', color: '#444' }}>
                <li style={{ marginBottom: '8px' }}>Ürünlerde kullanılan malzemeler, ilgili kurumlarca Helal Sertifikalı ve hayvansal menşeli yasak bölümlerden arınmış olacaktır.</li>
                <li style={{ marginBottom: '8px' }}>İmalatı, ambalajlanması, depolanması ve dağıtımı sırasında kir/pis içermez.</li>
                <li style={{ marginBottom: '8px' }}>Ürünler tüketici kullanımı için güvenli ve gıda ile temas uygulamaları için ulusal gıda güvenliği gereklilikleriyle uyumlu olacaktır.</li>
                <li style={{ marginBottom: '0' }}>Ürün temiz ve hijyenik bir ortamda üretilecek, depolanacak ve dağıtılacaktır.</li>
              </ul>
                </div>

            {/* Enerji Politikası */}
                <div style={{ 
              background: '#f8f9fa', 
              padding: '40px', 
              borderRadius: '15px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                fontSize: '1.8rem', 
                fontWeight: '700', 
                color: '#D21B21', 
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                ENERJİ POLİTİKAMIZ
              </h3>
                  <p style={{ 
                fontSize: '1.1rem', 
                color: '#444', 
                    lineHeight: '1.8',
                marginBottom: '15px'
              }}>
                Kuruluşumuz, tüm faaliyetlerinde daima müşteri memnuniyetini esas almakta ve müşterilerimizin ihtiyaç ve beklentilerini anlamayı amaçlamaktadır. Faaliyetlerimizin ana eksenine oturttuğumuz sürdürülebilir büyümenin sürdürülebilir enerji ilkelerini yaşattığımız sürece mümkün olduğunun bilincinde bir kurum olarak:
              </p>
              <ul style={{ paddingLeft: '20px', color: '#444', fontSize: '0.95rem' }}>
                <li style={{ marginBottom: '6px' }}>Doğal kaynakları korumayı ve enerji tasarrufu gerçekleştirmeyi, atıkları azaltmayı</li>
                <li style={{ marginBottom: '6px' }}>Ürünün Planlama &Tasarım aşamasından itibaren bütün süreçleri oluştururken enerji verimliliği sağlayan teknolojileri dikkate almayı</li>
                <li style={{ marginBottom: '6px' }}>İklim değişikliğine olumlu etki yapacak enerji verimliliği projeleri geliştirerek uygulamayı</li>
                <li style={{ marginBottom: '6px' }}>Enerji verimliliği sağlayan ürünleri hizmetleri ve teknolojileri satın almayı</li>
                <li style={{ marginBottom: '6px' }}>Enerji Performansımızı Sürekli iyileştirmeyi ve geliştirmeyi</li>
                <li style={{ marginBottom: '6px' }}>Belirlenen amaç ve hedeflerimizi periyodik olarak gözden geçirmeyi</li>
                <li style={{ marginBottom: '0' }}>Politikamızın paydaşlarımız tarafından anlaşılmasını ve benimsenmesini sağlayarak bilinç ve duyarlılığı arttrmayı Beyan ve Taahhüt ederiz</li>
              </ul>
                </div>

            {/* Genel Müdür İmzası */}
                <div style={{ 
              textAlign: 'right',
              marginTop: '40px',
                  padding: '20px', 
              borderTop: '2px solid #D21B21'
                }}>
                  <p style={{ 
                    fontSize: '1rem', 
                fontWeight: '600',
                    margin: '0',
                color: '#444'
                  }}>
                Genel Müdür<br />
                A. Kemal BOYNUKALIN
                  </p>
            </div>

          </div>
        </div>
      </section>

      {/* İhracat Bölümü - 3. Sırada */}
      <section id="ihracat" style={{ 
        background: '#f8f9fa', 
        padding: '100px 0'
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: '700', 
              color: '#1a1a1a', 
              marginBottom: '20px',
              letterSpacing: '3px'
            }}>
              İHRACAT
            </h1>
            <div style={{ 
              width: '120px', 
              height: '3px', 
              background: '#D21B21', 
              margin: '0 auto'
            }}></div>
          </div>
          
          {/* Ana İhracat Metni */}
          <div style={{ 
            maxWidth: '1000px',
            margin: '0 auto',
            fontSize: '1.1rem', 
            color: '#444', 
            lineHeight: '1.8'
          }}>
            <p style={{ marginBottom: '25px' }}>
              ANI Bisküvi Gıda San. ve Tic. A.Ş. satış politikaları doğrultusunda, yurt içi satışlarının yanı sıra ihracat konusuna da büyük önem vermektedir.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Yurt dışında da kaliteli ürün ve marka politikalarından ödün vermeyen Anı Bisküvi, tüketicilerinin desteğiyle en kaliteli ve en güvenilir ürünleri, dünya piyasasına sürerek güçlü adımlarla yoluna devam etmektedir.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Anı Bisküvi'nin el değmeden ürettiği ürünler, lezzet ve kıvam bakımından tüm dünya ülkelerinde kabul ve rağbet görmektedir. Bu yüzden yurt içinde ve yurt dışında taklit edilmeye dahi çalışılmıştır.Bu bizim doğru yolda ilerlediğimizin bir göstergesi olarak, bize cesaret ve kıvanç vermiştir.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Anı Bisküvi, istikrarlı yükselişi ile Türkiye İhracatçılar Meclisi'nin (TİM) 2014 verileri doğrultusunda, Türkiye'de en çok ihracat yapan 1000 firma araştırmasında 183'üncü sırada yerini alarak, ülkemize kazandırdığı döviz ile ekonomiye önemli katkılar sağlamaktadır.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Bunun yanı sıra, Akdeniz İhracatçı Birlikleri Genel Sekreterliği'ne bağlı Hububat Bakliyat ve Yağlı Tohumlar İhracatçı Birliği nezdinde de hububat sektöründe en çok ihracat yapan 3'üncü firma unvanını alan Anı Bisküvi, bu başarısını ödülle taçlandırmıştır. Anı Bisküvi'nin elde ettiği başarılarının ardındaki sır, hiç kuşkusuz dünya piyasasında en çok tercih edilen bir marka olmasından kaynaklıdır.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Anı Bisküvi, dünyanın dört bir yanındaki 90 ülkeye lezzetli ürünlerini ihraç etmektedir. İşte bu ülkelerden bazıları da aşağıdadır.
            </p>
            
            <p style={{ marginBottom: '0', fontSize: '1rem', lineHeight: '1.6', color: '#D21B21', fontWeight: '600' }}>
              Amerika Birleşik Devletleri, Afganistan, Almanya, Angola, Arnavutluk, Avustralya, Avusturya, Azerbaycan, Bahreyn, Belçika, Benin, Birleşik Arap Emirlikleri, Bolivya, Bosna Hersek, Bulgaristan, Cezayir, Cibuti, Çad, Çek Cumhuriyeti, Dominik Cumhuriyeti, Ekvator Ginesi, Etiyopya, Fas, Fransa, Fildişi Sahili, Filistin, Gabon, Gambiya, Gana, Gine, Gine Bissau, Güney Afrika Cumhuriyeti, Gürcistan, Hırvatistan, Hindistan, Hollanda, Irak, İngiltere, İran, İrlanda, İsrail, Kuzey Kıbrıs T.C., Kamerun, Karadağ, Katar, Kenya, Kolombiya, Kongo, Kosova, Kuveyt, Liberya, Libya, Litvanya, Lübnan, Macaristan, Madagaskar, Makedonya, Maldiv Adaları, Malezya, Mali, Malta, Mauritius, Mısır, Moğolistan, Moritanya, Mozambik, Nijer, Nijerya, Panama, Papua Yeni Gine, Polonya, Portekiz, Romanya, Rusya Federasyonu, Sao Tome, Senegal, Seyşel Adaları, Sırbistan, Slovakya, Somali, Sudan, Suudi Arabistan, Tacikistan, Tanzanya, Togo, Tunus, Türkmenistan, Uganda, Umman, Uruguay, Ürdün, Yemen.
            </p>
          </div>
        </div>
      </section>

      {/* Başkan Mesajı - 4. Sırada */}
      <section id="baskan-mesaji" style={{ 
        background: 'white', 
        padding: '100px 0'
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ 
              fontSize: '4rem', 
                fontWeight: '700', 
                color: '#1a1a1a', 
              marginBottom: '20px',
              letterSpacing: '3px'
              }}>
              BAŞKAN MESAJI
            </h1>
              <div style={{ 
                width: '120px', 
                height: '3px', 
                background: '#D21B21', 
              margin: '0 auto'
              }}></div>
          </div>

          {/* Ana Başkan Mesajı Metni */}
          <div style={{ 
            maxWidth: '1000px',
            margin: '0 auto',
            fontSize: '1.1rem', 
            color: '#444', 
            lineHeight: '1.8'
          }}>
            <p style={{ marginBottom: '25px' }}>
              Anı Bisküvi şirketi olarak ülkemiz ve tüm dünya toplumuna unlu ve şekerli mamullerde kaliteli beğenilen tatta sağlıklı ürünler sunmak temel hedefimizdir. Anı Bisküvi olarak bunu sağlarken en üstün teknolojiye sahip tesis ekipmanları ile üretim faaliyetini sürdürmekteyiz.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Mamul üretimi için seçilen hammaddeler fiziksel ve kimyasal analizlerden geçirilerek kullanılmasına özen gösterilmektedir. Sosyal projelere de açık olan şirketimiz çalışanları, tedarikçileri, satıcıları ve tüketicileri Anı marka şemsiyesi altında birleşmiş bir aileyiz.
            </p>
            
            <p style={{ marginBottom: '40px' }}>
              Dileğimiz; Ülkemiz var oldukça şirketimizde var olacaktır.
            </p>
            
            {/* İmza */}
            <div style={{ 
              textAlign: 'right',
              padding: '20px',
              borderTop: '2px solid #D21B21'
            }}>
              <p style={{ 
                fontSize: '1rem', 
                fontWeight: '600',
                margin: '0',
                color: '#444'
              }}>
                Ahmet Vefik BOYNUKALIN<br />
                Yön.Kr.Bşkn
              </p>
                </div>
                </div>
              </div>
      </section>

      {/* Sosyal Sorumluluk - 5. Sırada */}
      <section id="sosyal-sorumluluk" style={{ 
        background: '#f8f9fa', 
        padding: '100px 0'
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: '700', 
              color: '#1a1a1a', 
              marginBottom: '20px',
              letterSpacing: '3px'
            }}>
              SOSYAL SORUMLULUK
            </h1>
            <div style={{ 
              width: '120px', 
              height: '3px', 
              background: '#D21B21', 
              margin: '0 auto'
            }}></div>
            </div>

          {/* Ana Sosyal Sorumluluk Metni */}
              <div style={{ 
            maxWidth: '1000px',
                margin: '0 auto',
            fontSize: '1.1rem', 
            color: '#444', 
            lineHeight: '1.8'
          }}>
            <p style={{ marginBottom: '25px' }}>
              Şirketimiz üretim faaliyetleri dışında ülkemizin bilhassa kültürel hayatına katkıda bulunmak için, her yıl Karaman ilinde kutlanılan Türkçe Dil Bayramı etkinliklerine katkıda bulunmak için kitap ve eser yayınlayarak hediye şeklinde ücretsiz dağıtılmaktadır. Bu faaliyet kurucu ortağımız İbrahim Rıfkı BOYNUKALIN yönetiminde sürdürülmektedir. 2011 'de başlattığımız kitap yayınlama etkinliimize bağlı olarak 5 kitap yayınlanmıştır.
            </p>
            
            <p style={{ marginBottom: '15px' }}>
              <strong>Eser isimleri şu şekildedir:</strong>
            </p>
            
            <ul style={{ marginBottom: '25px', paddingLeft: '30px' }}>
              <li style={{ marginBottom: '8px', color: '#D21B21', fontWeight: '600' }}>(2011) Türkiye, Karaman ve Anı Bisküvi</li>
              <li style={{ marginBottom: '8px', color: '#D21B21', fontWeight: '600' }}>(2012) Karaman'ın İktisadi ve Sosyal Gelişimi</li>
              <li style={{ marginBottom: '8px', color: '#D21B21', fontWeight: '600' }}>(2013) Karaman Beylerinden Pir Ahmet</li>
              <li style={{ marginBottom: '8px', color: '#D21B21', fontWeight: '600' }}>(2014) Karaman ve Ankara'dan Anılar</li>
              <li style={{ marginBottom: '8px', color: '#D21B21', fontWeight: '600' }}>(2015) Milli Mücadele'de Karaman</li>
            </ul>
            
            <p style={{ marginBottom: '25px' }}>
              Karaman ile ilgili eser hazırlayanlar, şirketimize incelenmek üzere Eser Teklif Formu ile gönderebilir. Teklif edilen çalışma şirketimiz tarafından değerlendirildikten sonra uygun görülürse yayınlanacaktır.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Kurucu ortağımız Ömer Nazım BOYNUKALIN, Karamanoğu Mehmet Bey Üniversitesi Yaşatma ve Yaptırma Vakıf Başkanı olarak Karaman'da 19 bin öğrencinin öğrenim gördüğü Karamanoğu Mehmet Bey Üniversitesi'nin gerçekleştirilmesi için vakıf olarak arsa temini (2 milyon m2 arsa), kampüslerden birinin yapımını ve vakıf olarak üniversite kampüsü içine 2000 fidan dikiminin gerçekleştirilmesini sağlamıştır.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Yine vakıf olarak Hemşirelik Yüksekokulu için 3700 m2 lik 5 katlı bina tahsisi yapılmıştır. Türk Hava Kurumu'na bağlı olarak Havacılık Yüksekokulu'nun Karaman'da açılması için gerekli girişim ve temaslar da bulunarak okulun, 2016 eğitim ve öğretim yılına hazır hale getirilmiştir.
            </p>
            
            <p style={{ marginBottom: '25px' }}>
              Karaman Huzur Evi yaptırma derneği başkan yardımcısı olarak görev üstlenmiş ve bina Sosyal Güvenlik Bakanlığı Sosyal Hizmetler Müdürlüğü'ne devri sağlanmıştır.
            </p>
            
            <p style={{ marginBottom: '0' }}>
              Şirketimiz 1450 çalışanından gönüllü kan bağışı yapılarak Mut-Mersin yoluna fidan dikimi gerçekleştirilmiştir. Ayrıca Kızılay Kız Öğrenci Yurdu yapımında gönüllü olarak faaliyetlere katkıda bulunmuş, 210 yataklı tesis devreye girmiştir.
            </p>
          </div>
        </div>
      </section>

      {/* Misyon & Vizyon - 6. Sırada */}
      <section id="misyon-vizyon" style={{ 
        background: 'white', 
        padding: '100px 0'
      }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: '700', 
              color: '#1a1a1a', 
              marginBottom: '20px',
              letterSpacing: '3px'
            }}>
              MİSYON & VİZYON
            </h1>
            <div style={{ 
              width: '120px', 
              height: '3px', 
              background: '#D21B21', 
              margin: '0 auto'
            }}></div>
          </div>
          
          {/* Vizyon Bölümü */}
          <div style={{ 
            maxWidth: '1000px',
            margin: '0 auto 60px'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#D21B21', 
              marginBottom: '20px'
            }}>
              VİZYONUMUZ
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#444', 
              lineHeight: '1.8',
              marginBottom: '20px'
            }}>
              ANI BİSKÜVİ GIDA SAN. ve TİC. A.Ş. olarak unlu mamüller, çikolata, şekerleme sektöründe;
            </p>
            <ul style={{ marginBottom: '40px', paddingLeft: '30px' }}>
              <li style={{ marginBottom: '12px', color: '#D21B21', fontWeight: '600', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Sürekli yeni yatırımlarla sektörde büyümeyi sürdürmek,
              </li>
              <li style={{ marginBottom: '12px', color: '#D21B21', fontWeight: '600', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Ülkemizde sektöründe 2020 yılında ilk dört şirket arasına girmek yanında Uluslar arası ihracatta ülke sayısını 90'dan 140 ülkeye çıkarmak,
              </li>
              <li style={{ marginBottom: '12px', color: '#D21B21', fontWeight: '600', fontSize: '1.1rem', lineHeight: '1.6' }}>
                "ANI" markasını ülkemizde ve dünyada en çok tercih edilen marka olmasını sağlamak,
              </li>
              <li style={{ marginBottom: '0', color: '#D21B21', fontWeight: '600', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Tüm faaliyetlerimizde doğruluk, çalışkanlık yanında sıfır hata ile kaliteli mamüller üreterek ülkemiz ve dünyanın en güvenilir şirketi olmaktır
              </li>
            </ul>
          </div>

          {/* Misyon Bölümü */}
            <div style={{ 
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#D21B21', 
              marginBottom: '20px'
            }}>
              MİSYONUMUZ
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: '#444', 
              lineHeight: '1.8', 
              marginBottom: '20px'
            }}>
              ANI BİSKÜVİ GIDA SAN. ve TİC. A.Ş. olarak unlu mamüller, çikolata, şekerleme sektöründe;
            </p>
            <ul style={{ paddingLeft: '30px' }}>
              <li style={{ marginBottom: '0', color: '#D21B21', fontWeight: '600', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Çalışanlarımıza, tüketicilerimize ve tüm insanlara, çevreye duyarlı bir anlayış içinde yaratılan değerle ülke ekonomisine katkı sağlayarak şirketimizi uluslararası bir şirket haline getirmektir.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline Bölümü - 7. Sırada */}
      <section style={{ 
        background: '#f8f9fa', 
        padding: '80px 0'
      }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: '#1a1a1a', 
              marginBottom: '20px' 
            }}>
              Kilometre Taşlarımız
            </h2>
            <div style={{ 
              width: '120px', 
              height: '3px', 
              background: '#D21B21', 
              margin: '0 auto'
            }}></div>
          </div>
          
          <div id="kilometre-taslanimiz">
            <Timeline events={milestones || []} />
            </div>
        </div>
      </section>

      {/* İstatistik Bölümü kaldırıldı */}





      {/* Kurumsal Kimlik (Sanity) */}
      <section id="kurumsal-kimlik" style={{ padding: '80px 0', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{ fontSize: '4rem', fontWeight: '700', color: '#D21B21', marginBottom: '20px', letterSpacing: '3px' }}>
              KURUMSAL KİMLİK
            </h1>
            <div style={{ width: '120px', height: '3px', background: '#D21B21', margin: '0 auto' }}></div>
            </div>
            
          {corporateIdentity?.heroImage?.asset?.url && (
              <div style={{ 
              background: '#f5f5f5', 
              borderRadius: '10px', 
              padding: '20px', 
              margin: '0 auto 30px',
              textAlign: 'center',
              maxWidth: '1100px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.06)'
            }}>
              <img 
                src={corporateIdentity.heroImage.asset.url} 
                alt={corporateIdentity.heroImage.alt || 'Kurumsal Kimlik'} 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  display: 'block',
                  margin: '0 auto',
                  borderRadius: '8px' 
                }} 
              />
            </div>
          )}

          {/* Sanity'den indirilebilir dosyalar gösterimi (documents yerine corporate identity de kullanılabilir) */}
          {corporateIdentity?.assets && corporateIdentity.assets.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, maxWidth: '800px', margin: '0 auto' }}>
              {corporateIdentity.assets
                .filter((a) => a.isActive !== false)
                .sort((a, b) => (a.order || 0) - (b.order || 0))
                .map((a, index) => (
                  <li key={index} style={{ marginBottom: '12px' }}>
                    <a href={a.file?.asset?.url} target="_blank" rel="noopener noreferrer" style={{ color: '#333', textDecoration: 'none' }}>
                      <span style={{ color: '#D21B21', marginRight: '8px' }}>⬇</span>
                      {a.label || a.file?.asset?.originalFilename || 'Dosya'}
                    </a>
                  </li>
                ))}
            </ul>
          ) : (
            documents && documents.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0, maxWidth: '800px', margin: '0 auto' }}>
              {documents.map((doc) => (
                <li key={doc._id} style={{ marginBottom: '12px' }}>
                  <a href={doc.file?.asset?.url} target="_blank" rel="noopener noreferrer" style={{ color: '#333', textDecoration: 'none' }}>
                    <span style={{ color: '#D21B21', marginRight: '8px' }}>⬇</span>
                    {doc.title}
                  </a>
                </li>
              ))}
            </ul>
            )
          )}
        </div>
      </section>

      {/* Bilgi Toplumu Hizmeti */}
      <section id="bilgi-toplumu" style={{ padding: '80px 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h1 style={{ 
              fontSize: '4rem', 
              fontWeight: '700', 
              color: '#D21B21', 
              marginBottom: '20px',
              letterSpacing: '3px'
            }}>
              BİLGİ TOPLUMU HİZMETİ
            </h1>
            <div style={{ 
              width: '120px', 
              height: '3px', 
              background: '#D21B21', 
              margin: '0 auto'
            }}></div>
          </div>
          
            <div style={{ 
            background: 'white', 
              padding: '40px', 
            borderRadius: '10px', 
            boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <table style={{ 
              width: '100%', 
              borderCollapse: 'collapse',
              fontSize: '0.9rem'
            }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Ticaret Ünvanı</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>Anı Bisküvi Gıda Sanayi Ve Ticaret Anonim Şirketi</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Şirket Türü</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>Anonim Şirketi</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>E-Şirket</td>
                  <td style={{ padding: '12px 15px', color: '#D21B21' }}>
                    <a href="https://www.belgemodul.com/sirket/180" target="_blank" style={{ color: '#D21B21', textDecoration: 'none' }}>
                      https://www.belgemodul.com/sirket/180
                    </a>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Mersis</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>0069006315900010</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Ticaret Sicil Memurluğu</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>Karaman</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Ticaret Sicil Numarası</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>4969</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Adres</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>Organize Sanayi Bölgesi 16. Cadde No:16</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>İletişim Bilgileri</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>
                    TEL: 0338 224 12 30 (pbx)<br />
                    FAX: 0338 224 12 34<br />
                    e-mail: bilgi@anibiskuvi.com.tr
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Taahhüt Edilen Sermaye Miktarı</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>70.000.000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Ödenen Sermaye Miktarı</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>66.378.000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Tescil Tarihi</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>21.12.1994</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Vergi Dairesi</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>Karaman Vergi Dairesi</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Vergi Numarası</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>0690063159</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Sektör</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>Peksimet, bisküvi, gofret, dondurma külahı, kağıt helva vb. ürünlerin imalatı (çikolata kaplı olanlar dahil)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Yönetim Kurulu Başkanı</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>Ahmet Vefik BOYNUKALIN (10.04.2007 - 18.06.2015)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Yönetim Kurulu Başkan Vekili</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>Ömer Nazım BOYNUKALIN (10.04.2007 - 16.06.2015)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Yönetim Kurulu Üyesi</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>Ali Kemal BOYNUKALIN (10.04.2007 - 18.06.2015)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e5e5' }}>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Yönetim Kurulu Üyesi</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>Haluk ÖZATAY (10.04.2007 - 18.06.2015)</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px 15px', fontWeight: '600', color: '#333', backgroundColor: '#f8f9fa' }}>Denetçi Şirket Bilgileri</td>
                  <td style={{ padding: '12px 15px', color: '#666' }}>
                    İsim Soyisim / Ticaret Ünvanı : Akademik Bağımsız Denetim Danışmanlık Yeminli Mali Müşavirlik A.Ş<br />
                    Adres: Yıldızevler Mah. 717. Sk. No: 15/1 PK.06550 Çankaya / Ankara<br />
                    Dönem : 01.01.2014 - 31.12.2014
                  </td>
                </tr>
              </tbody>
            </table>
            
            {/* Dinamik Dökümanlar Bölümü */}
            {documents && documents.length > 0 && (
              <div style={{ marginTop: '40px', borderTop: '2px solid #D21B21', paddingTop: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#D21B21', marginBottom: '15px' }}>
                  Dökümanlar:
              </h3>
                <ul style={{ listStyle: 'none', padding: '0' }}>
                  {documents.map((doc, index) => (
                    <li key={doc._id} style={{ marginBottom: index === documents.length - 1 ? '0' : '8px', paddingLeft: '20px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '0', color: '#D21B21' }}>📄</span>
                      <a 
                        href={doc.file?.asset?.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ color: '#D21B21', textDecoration: 'none', fontSize: '0.9rem' }}
                        title={doc.description || doc.title}
                      >
                        {doc.title}
                      </a>
                </li>
                  ))}
              </ul>
            </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-content">
            <div className="footer-slogan">
              <h2>Hayatın her anında</h2>
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
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.40z"/>
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
              <p>2023 Şölen Tüm Hakları Saklıdır.</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

// Sayfa yüklenirken Sanity'den veri çek
export async function getStaticProps() {
  try {
    const milestones = await getMilestones()
    const documents = await getDocuments()
    const corporateIdentity = await getCorporateIdentity()
    
    return {
      props: {
        milestones,
        documents,
        corporateIdentity,
      },
      revalidate: 60, // 60 saniyede bir yeniden oluştur
    }
  } catch (error) {
    console.error('Milestone verileri alınırken hata:', error)
    
    // Hata durumunda varsayılan veriler - ANI Bisküvi gerçek tarihçesi
    const defaultMilestones = [
      {
        year: "1995",
        title: "ANI BİSKÜVİ A.Ş. Kuruluşu",
        description: "ANI BİSKÜVİ A.Ş. kuruluş yılı. İlk olarak bisküvi üretimiyle faaliyetine başlamış, kuruluşundan bu güne sürekli yatırımlara yönelmiştir.",
        stats: [
          { number: "40", label: "İşçi ile Başladık" },
          { number: "1995", label: "Kuruluş Yılı" }
        ]
      },
      {
        year: "1997",
        title: "İlk Büyük Başarı",
        description: "İstanbul Sanayi Odasınca yayınlanan Türkiye'nin ikinci 500 büyük firması arasında yer aldık.",
        stats: [
          { number: "İkinci 500", label: "Büyük Firma" },
          { number: "İSO", label: "Sertifika" }
        ]
      },
      {
        year: "2000-2012",
        title: "Sürekli Büyüme Dönemi",
        description: "2000, 2008, 2009, 2010, 2011 ve 2012 yıllarında Türkiye'nin ikinci 500 büyük firması arasında yer almaya devam ettik.",
        stats: [
          { number: "7", label: "Yıl Üst Üste" },
          { number: "İkinci 500", label: "Büyük Firma" }
        ]
      },
      {
        year: "2010",
        title: "Ürün Çeşitliliği Genişlemesi",
        description: "Yeni bir hat ekleyerek kakao kremalı mozaik bisküvi, fındık pasta ve çikolata damlalı bisküvi hatlarını ürün yelpazemize dahil ettik.",
        stats: [
          { number: "12", label: "Ürün Kategorisi" },
          { number: "Yeni", label: "Üretim Hattı" }
        ]
      },
      {
        year: "2011-2014",
        title: "İhracat Lideri",
        description: "Dünya ülkelerine yaptığımız ihracatla Karaman'da en çok ihracat yapan şirket olarak 1. sıraya yükseldik.",
        stats: [
          { number: "1.", label: "Karaman İhracat" },
          { number: "4", label: "Yıl Üst Üste" }
        ]
      },
      {
        year: "2013-2014",
        title: "Türkiye'nin İlk 500'ü",
        description: "Türkiye'nin ilk 500 büyük firma arasına girme başarısını gösterdik ve 1500 işçiye ulaştık.",
        stats: [
          { number: "İlk 500", label: "Büyük Firma" },
          { number: "1500", label: "İşçi" }
        ]
      },
      {
        year: "2015",
        title: "Modern Tesisler",
        description: "Kremalı bisküvi ürünleri için yurt dışından en son model tam otomatik yeni bir tesisi devreye girmiştir.",
        stats: [
          { number: "65.000", label: "m² Açık Alan" },
          { number: "115.000", label: "m² Kapalı Alan" }
        ]
      },
      {
        year: "2020+",
        title: "Kalite ve Sertifikalar",
        description: "TSE+TSEK, TS-EN+ISO 9001, ISO 22000, Helal Gıda ve ISO 27001 Bilgi Güvenliği sertifikalarına sahibiz.",
        stats: [
          { number: "6", label: "Uluslararası Sertifika" },
          { number: "180.000", label: "m² Toplam Alan" }
        ]
      }
    ]
    
    return {
      props: {
        milestones: defaultMilestones,
        documents: [], // Hata durumunda boş array
        corporateIdentity: null,
      },
      revalidate: 60,
    }
  }
}
