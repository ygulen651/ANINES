import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';

// Sanity hotspot -> CSS object-position dönüştürücü
function getObjectPositionFromHotspot(image) {
  try {
    const hotspot = image?.hotspot;
    if (!hotspot || typeof hotspot.x !== 'number' || typeof hotspot.y !== 'number') {
      return 'center';
    }
    const xPercent = Math.round(hotspot.x * 100);
    const yPercent = Math.round(hotspot.y * 100);
    return `${xPercent}% ${yPercent}%`;
  } catch {
    return 'center';
  }
}
import Link from 'next/link';
import { client, queries } from '../lib/sanity.client';
import TextPressure from '../components/TextPressure';
import CurvedLoop from '../components/CurvedLoop';
import SplitText from '../components/SplitText';


/**
 * Ana sayfa - Modern Web Sitesi (Zenginleştirilmiş Tasarım)
 */
export default function Home({ sliders, secondSlides, backgroundTexts, backgroundImages, pdfSettings, videoSettings, blogSettings, blogPosts, productBarData, menuData, logoData, footerData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = sliders?.length || 5; // Slider sayısını dinamik yap
  const intervalRef = useRef();
  const autoPlay = true; // Otomatik geçiş açık
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Slider intersection detection için state'ler
  const [hoveredItems, setHoveredItems] = useState(new Set());
  const sliderContainerRef = useRef(null);
  const hotspotRef = useRef(null);
  
  // Arka plan yazılarını al
  const activeBackgroundText = backgroundTexts?.find(text => text.active) || backgroundTexts?.[0] || null;
  const leftText = activeBackgroundText?.leftText || 'SWEET';
  const rightText = activeBackgroundText?.rightText || 'LOVE';
  
  // Debug için - sadece development'ta çalıştır
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('=== BACKGROUND TEXT DEBUG ===');
      console.log('Background Texts:', backgroundTexts);
      console.log('Active Background Text:', activeBackgroundText);
      console.log('Left Text:', leftText);
      console.log('Right Text:', rightText);
      console.log('============================');
    }
  }, [backgroundTexts, activeBackgroundText, leftText, rightText]);

  // 2. bölüm slider state
  const [secondIndex, setSecondIndex] = useState(0);
  const secondIntervalRef = useRef();
  const secondAutoPlay = false;               // otomatik geçiş kapalı başlasın
  // Sadece aktif olanları filtrele
  const activeSecondSlides = secondSlides?.filter(slide => slide.active !== false) || [];
  const secondTotal = activeSecondSlides.length || 0;

  // Slider intersection detection useEffect
  useEffect(() => {
    const checkIntersections = () => {
      if (!hotspotRef.current || !sliderContainerRef.current) return;

      const hotspot = hotspotRef.current;
      const hotspotRect = hotspot.getBoundingClientRect();
      const hotspotCenter = {
        x: hotspotRect.left + hotspotRect.width / 2,
        y: hotspotRect.top + hotspotRect.height / 2
      };

      const sliderItems = sliderContainerRef.current.querySelectorAll('.slider-item');
      const newHoveredItems = new Set();

      sliderItems.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        const itemCenter = {
          x: itemRect.left + itemRect.width / 2,
          y: itemRect.top + itemRect.height / 2
        };

        // Mesafe hesapla (yeşil alanın merkezine olan uzaklık)
        const distance = Math.sqrt(
          Math.pow(itemCenter.x - hotspotCenter.x, 2) + 
          Math.pow(itemCenter.y - hotspotCenter.y, 2)
        );

        // Yeşil alanın yarıçapı
        const hotspotRadius = 200;

        if (distance <= hotspotRadius) {
          newHoveredItems.add(index);
        }
      });

      setHoveredItems(newHoveredItems);
    };

    // Her 50ms kontrol et
    const interval = setInterval(checkIntersections, 50);

    return () => {
      clearInterval(interval);
    };
  }, []);







  // Ana sayfa renkleri - her slide için farklı
  const pageColors = [
    'linear-gradient(90deg, #6b1e23, #2c0f12)', // İstenilen birinci slider rengi
    'linear-gradient(90deg, #4ecdc4, #44a08d, #96ceb4)', // Turkuaz-yeşil
    'linear-gradient(90deg, #96c93d, #00b894, #00cec9)', // Yeşil tonları
    'linear-gradient(90deg, #44a08d, #96ceb4, #4ecdc4)', // Yeşil-turkuaz
    'linear-gradient(90deg, #00b894, #96c93d, #44a08d)', // Yeşil tonları
  ];

  // Mevcut sayfa rengi
  const currentPageColor = pageColors[currentSlide] || pageColors[0];

  // Otomatik slider geçişi
  useEffect(() => {
    if (autoPlay && totalSlides > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
      }, 2000); // 2 saniyede bir geçiş
      return () => clearInterval(intervalRef.current);
    }
  }, [autoPlay, totalSlides]);

  useEffect(() => {
    if (secondAutoPlay && secondTotal > 1) {
      secondIntervalRef.current = setInterval(() => {
        setSecondIndex((p) => (p + 1) % secondTotal);
      }, 3500);
      return () => clearInterval(secondIntervalRef.current);
    }
  }, [secondAutoPlay, secondTotal]);

  const nextSlide = () => {
    if (totalSlides > 0) {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }
  };

  const prevSlide = () => {
    if (totalSlides > 0) {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    }
  };

  const nextSecond = () => secondTotal > 0 && setSecondIndex((p) => (p + 1) % secondTotal);
  const prevSecond = () => secondTotal > 0 && setSecondIndex((p) => (p - 1 + secondTotal) % secondTotal);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Ürün adına tıklandığında 2. slaytı değiştir
  const handleProductClick = (product) => {
    if (product.secondSlide) {
      // Sanity'den gelen 2. slayt referansını kullan
      const slideIndex = activeSecondSlides.findIndex(slide => slide._id === product.secondSlide._id);
      if (slideIndex !== -1) {
        setSecondIndex(slideIndex);
      }
    } else {
      // Fallback: ürün adına göre 2. slaytı bul
      const productSlides = activeSecondSlides.filter(slide => 
        slide.title && slide.title.toLowerCase().includes(product.name.toLowerCase())
      );
      
      if (productSlides.length > 0) {
        const slideIndex = activeSecondSlides.findIndex(slide => slide._id === productSlides[0]._id);
        if (slideIndex !== -1) {
          setSecondIndex(slideIndex);
        }
      }
    }
  };

  return (
    <>
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
              <img 
                src="/logo.png" 
                alt="ANI Logo" 
                className="menu-logo-image"
              />
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
          transition: all 0.3s ease;
        }

        .logo-link:hover {
          transform: scale(1.05);
        }

        .logo-text {
          font-size: 2rem;
          font-weight: 800;
          color: white;
          text-transform: uppercase;
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
          background: #F94F06;
          border-radius: 2px;
        }

        .navbar-menu {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          width: 50vw;
          height: 100vh;
          background: linear-gradient(135deg, #F94F06, #FFB802, #FF7B00);
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
          max-width: 200px;
          max-height: 70px;
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
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
                 body {
           font-family: 'Montserrat', sans-serif;
           overflow-x: hidden;
           overflow-y: auto;
           background: transparent;
           margin: 0;
           padding: 0;
         }

                   @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); }
            25% { transform: translateY(-20px) translateX(10px) rotate(5deg) scale(1.1); }
            50% { transform: translateY(-10px) translateX(-8px) rotate(-3deg) scale(0.95); }
            75% { transform: translateY(-25px) translateX(5px) rotate(3deg) scale(1.05); }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
            40% { transform: translateY(-30px) scale(1.2); }
            60% { transform: translateY(-15px) scale(0.9); }
          }
          
          @keyframes swing {
            0%, 100% { transform: rotate(-8deg) scale(1); }
            25% { transform: rotate(5deg) scale(1.1); }
            50% { transform: rotate(8deg) scale(0.95); }
            75% { transform: rotate(-5deg) scale(1.05); }
          }
          
          @keyframes floatEnhanced {
            0%, 100% { 
              transform: translateY(0px) translateX(0px) rotate(0deg) scale(1); 
              box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
            }
            25% { 
              transform: translateY(-30px) translateX(15px) rotate(5deg) scale(1.05); 
              box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
            }
            50% { 
              transform: translateY(-15px) translateX(-10px) rotate(-3deg) scale(0.98); 
              box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45);
            }
            75% { 
              transform: translateY(-35px) translateX(8px) rotate(3deg) scale(1.02); 
              box-shadow: 0 30px 55px rgba(0, 0, 0, 0.6);
            }
          }

                 /* Üst Bölüm - Slider */
         .slider-section {
           width: 100%;
           min-height: 100dvh;
           position: relative;
           display: flex;
           justify-content: center;
           align-items: center;
           overflow: hidden;
           color: white;
           text-align: center;
          background: -webkit-linear-gradient(90deg, #F94F06, #FFB802, #FF7B00);
           margin: 0 !important;
           padding: 0 !important;
           margin-bottom: 0 !important;
           padding-bottom: 0 !important;
          background: linear-gradient(90deg, #F94F06, #FFB802, #FF7B00);
           transition: background 0.5s ease;
           padding: 20px 0;
         }



         /* Navbar Container - Kırmızı çerçeve alanı - Artık kullanılmıyor */
         .navbar-container-area {
           display: none; /* Navbar artık fixed position kullanıyor */
         }

         @keyframes fadeInUp {
           from {
             opacity: 0;
             transform: translateX(-50%) translateY(30px);
           }
           to {
             opacity: 1;
             transform: translateX(-50%) translateY(0);
           }
         }

         .brand-title {
           position: absolute;
           top: 60px;
           left: 50%;
           transform: translateX(-50%);
           z-index: 2;
           pointer-events: none;
         }

         .brand-loop {
           position: absolute;
           bottom: 20px;
           left: 50%;
           transform: translateX(-50%);
           z-index: 2;
           pointer-events: auto;
           width: 100%;
         }



       .slider-content {
         z-index: 10;
          margin-top: -150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          width: 100%;
        }

        /* Ana Logo Stilleri */
        .main-logo {
          font-size: 8rem;
          font-weight: 900;
          margin-bottom: 1rem;
          line-height: 1.1;
          letter-spacing: 3px;
          text-align: center;
          width: 100%;
        }

        /* 🔴 ANI LOGO CONTAINER */
        .ani-logo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: auto;
          position: relative;
          z-index: 10;
        }

        .main-ani-logo {
          max-width: 350px;
          max-height: 175px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 15px 35px rgba(0,0,0,0.4))
                  drop-shadow(0 8px 20px rgba(255,255,255,0.2))
                  drop-shadow(0 0 30px rgba(237,28,36,0.5));
          transition: all 0.4s ease;
          animation: aniLogoFloat 3s ease-in-out infinite;
        }

        .main-ani-logo:hover {
          transform: scale(1.08);
          filter: drop-shadow(0 20px 50px rgba(0,0,0,0.6))
                  drop-shadow(0 12px 30px rgba(255,255,255,0.3))
                  drop-shadow(0 0 40px rgba(237,28,36,0.7))
                  drop-shadow(0 0 60px rgba(237,28,36,0.5));
        }

        @keyframes aniLogoFloat {
          0%, 100% { 
            transform: translateY(0px) scale(1);
          }
          50% { 
            transform: translateY(-12px) scale(1.02);
          }
        }



        .slogan-text {
          font-size: 1.5rem;
          letter-spacing: 5px;
          text-transform: uppercase;
          font-weight: 400;
          line-height: 1.4;
          margin-bottom: 2rem;
        }

        /* OSLO Altı Görsel */
        .brand-bottom-image {
          margin: 50px 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .brand-bottom-image img {
          width: 400px;
          height: 300px;
          border-radius: 15px;
          object-fit: contain;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          border: 3px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .brand-bottom-image img:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
          border-color: rgba(255, 255, 255, 0.6);
        }

                 /* OSLO Altı Slider - Marquee Mantığı */
         .new-slider {
           position: absolute;
           top: 36%;
           left: 50%;
           transform: translateX(-50%);
           z-index: 2;
           width: 100%;
           max-width: 100vw;
         }

        .slider-container {
          position: relative;
          width: 100%;
          overflow: visible;
          z-index: 4;
        }

        .slider {
          position: relative;
          width: 100%;
          height: auto;
          overflow: visible;
          z-index: 5;
        }

        .slider-track {
          display: flex;
          align-items: flex-start;
          gap: 100px;
          will-change: transform;
          animation: slide-move 20s linear infinite;
          animation-play-state: paused;
        }

        .slider-container:hover .slider-track {
          animation-play-state: running;
        }

        .slide {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          line-height: 0;
          transition: transform 0.3s ease;
        }

        .slide:nth-child(1),
        .slide:nth-child(2),
        .slide:nth-child(3) {
          transform: scale(0.8);
        }

        .slide:nth-child(4),
        .slide:nth-child(5),
        .slide:nth-child(6) {
          transform: scale(1.1);
        }

        .slide:nth-child(7),
        .slide:nth-child(8),
        .slide:nth-child(9) {
          transform: scale(0.8);
        }

        .slide-image {
          display: flex;
          align-items: flex-start;
        }

        .item-image img {
          display: block;
          width: 380px;
          height: 380px;
          object-fit: contain;
          border-radius: 0;
          box-shadow: none;
          transition: transform 0.4s ease;
          opacity: 1;
          transform: scale(1);
        }

        .slider-item img {
          transition: transform 0.4s ease-in-out;
        }

        .slider-item.center img {
          transform: scale(2.0);
        }

        @keyframes slide-move {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        /* Mobil ve tablet cihazlarda yüzen görselleri gizle */
        @media (max-width: 1024px) {
          .second-float-left,
          .second-float-right,
          .second-float-top,
          .second-float-center { 
            display: none !important; 
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        }

        /* Global section boşluk kaldırma */
        section, .slider-section, .second-section {
          margin: 0 !important;
          padding: 0 !important;
          margin-top: 0 !important;
          margin-bottom: 0 !important;
          padding-top: 0 !important;
          padding-bottom: 0 !important;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          /* Radikal boşluk kaldırma */
          * {
            box-sizing: border-box !important;
          }
          body, html {
            margin: 0 !important;
            padding: 0 !important;
            overflow-x: hidden !important;
          }
          
          /* 1. bölüm slider görsellerini mobilde büyült - Güçlü kurallar */
          .slide-image img,
          .slide img,
          .slider-item img {
            width: 114px !important;
            height: 182px !important;
            max-width: 114px !important;
            max-height: 182px !important;
            min-width: 114px !important;
            min-height: 182px !important;
          }
          
          .mini .slide-image img,
          .mini .slide img,
          .mini .slider-item img {
            width: 114px !important;
            height: 182px !important;
            max-width: 114px !important;
            max-height: 182px !important;
            min-width: 114px !important;
            min-height: 182px !important;
          }
          
          /* Mavi daire (brand-loop) mobilde büyült ve hover efekti */
          .brand-loop {
            transform: translateX(-50%) scale(1.3) !important;
            transition: all 0.3s ease !important;
            cursor: pointer !important;
          }
          
          .brand-loop:hover {
            transform: translateX(-50%) scale(1.5) !important;
            filter: brightness(1.1) !important;
          }
          
          .new-slider {
            top: 41%;
          }
          
          .slider-track {
            gap: 80px;
            animation-duration: 25s;
          }
          
          .slide:nth-child(1),
          .slide:nth-child(2),
          .slide:nth-child(3) {
            transform: scale(0.7);
          }

          .slide:nth-child(4),
          .slide:nth-child(5),
          .slide:nth-child(6) {
            transform: scale(1.0);
          }

          .slide:nth-child(7),
          .slide:nth-child(8),
          .slide:nth-child(9) {
            transform: scale(0.7);
          }
          
          .item-image img {
            width: 300px;
            height: 300px;
            object-fit: contain;
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 480px) {
          /* 1. bölüm slider görsellerini küçük mobilde daha da büyült - Güçlü kurallar */
          .slide-image img,
          .slide img,
          .slider-item img {
            width: 114px !important;
            height: 182px !important;
            max-width: 114px !important;
            max-height: 182px !important;
            min-width: 114px !important;
            min-height: 182px !important;
          }
          
          .mini .slide-image img,
          .mini .slide img,
          .mini .slider-item img {
            width: 114px !important;
            height: 182px !important;
            max-width: 114px !important;
            max-height: 182px !important;
            min-width: 114px !important;
            min-height: 182px !important;
          }
          
          /* Mavi daire küçük mobilde daha da büyük */
          .brand-loop {
            transform: translateX(-50%) scale(1.4) !important;
            transition: all 0.3s ease !important;
            cursor: pointer !important;
          }
          
          .brand-loop:hover {
            transform: translateX(-50%) scale(1.7) !important;
            filter: brightness(1.2) saturate(1.1) !important;
          }
          
          .new-slider {
            top: 46%;
          }
          
          .slider-track {
            gap: 70px;
            animation-duration: 30s;
          }
          
          .slide:nth-child(1),
          .slide:nth-child(2),
          .slide:nth-child(3) {
            transform: scale(0.6);
          }

          .slide:nth-child(4),
          .slide:nth-child(5),
          .slide:nth-child(6) {
            transform: scale(0.9);
          }

          .slide:nth-child(7),
          .slide:nth-child(8),
          .slide:nth-child(9) {
            transform: scale(0.6);
          }
          
          .item-image img {
            width: 300px;
            height: 300px;
            object-fit: contain;
            opacity: 1;
            transform: scale(1);
          }
        }

        .slide-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          text-align: center;
        }

        .slide-image {
          width: auto;
          height: auto;
          overflow: visible;
          background: transparent;
          transition: all 0.6s ease-in-out;
          transform: translateY(0);
          opacity: 1;
        }

        .slide-image:hover {
          transform: scale(1.05);
        }

        .slide-image img {
          width: 250px;
          height: 250px;
          object-fit: contain;
        }

        .slide-text {
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
          transform: translateY(0);
          opacity: 1;
          transition: all 0.6s ease-in-out;
        }

        /* Footer Styles */
        .footer {
          width: 100%;
          background: linear-gradient(90deg, #F94F06 0%, #FFB802 50%, #FF7B00 100%);
          color: white;
          font-family: 'Arial', sans-serif;
        }

        .footer-top {
          background: linear-gradient(90deg, #F94F06 0%, #FFB802 50%, #FF7B00 100%);
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

        .footer-slogan .bold {
          font-weight: 700;
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


        .slider-images-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          transition: transform 1s ease-in-out;
        }

        .slider-item {
          min-width: 420px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          opacity: 1;
          transition: none;
        }

        .slider-item.active {
          opacity: 1;
        }


        /* Slider Container Stilleri */
        /* İkinci (mini) slider için boyutlar */
        .mini .slider {
          height: 500px;
        }

        .mini .slide-image img {
          width: 200px;
          height: 200px;
          object-fit: contain;
        }

                 /* İkinci bölüm stilleri - Biscolata */
         .second-section {
           width: 100%;
           min-height: 100dvh;
           background: linear-gradient(135deg, #f5e6d3, #e8d5c4);
           display: flex;
           flex-direction: column;
           justify-content: center;
           align-items: center;
           position: relative;
           overflow: hidden;
           color: #8b4513;
           margin: 0 !important;
           padding: 0 !important;
           margin-top: 0 !important;
           padding-top: 0 !important;
         }

        /* 2. bölüm ana foto netlik/opaklık */
        .second-photo img {
          opacity: 1 !important;
          filter: none !important;
        }

        .second-photo {
          opacity: 1 !important;
          filter: none !important;
          mix-blend-mode: normal !important;
          background: transparent !important;
        }

        /* 2. bölümdeki yüzen görseller için de tam renk */
        .second-float-left img,
        .second-float-right img,
        .second-float-top img,
        .second-float-center img {
          opacity: 1 !important;
          filter: none !important;
          mix-blend-mode: normal !important;
        }

        /* Mobil responsive iyileştirmeleri */
        @media (max-width: 768px) {
          .second-section {
            min-height: 90vh;
            padding-top: 0;
          }
          .product-bar-wrapper {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1000;
            width: 92vw;
            display: flex;
            justify-content: center;
            pointer-events: auto;
          }
          /* Kategori barı boyutu */
          .product-names-bar {
            gap: 14px;
            padding: 10px 16px;
            max-width: 92vw;
            flex-wrap: nowrap;
            overflow-x: auto;
            white-space: nowrap;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .product-names-bar::-webkit-scrollbar { display: none; }
          .product-name {
            font-size: 0.8rem;
            padding: 6px 10px;
          }
          /* 2. Bölüm Tam Optimizasyon */
          .second-section {
            padding: 0 !important;
            margin: 0 !important;
            width: 100vw !important;
            max-width: 100vw !important;
            position: relative !important;
            left: 50% !important;
            right: 50% !important;
            margin-left: -50vw !important;
            margin-right: -50vw !important;
            height: 70vh !important;
            min-height: 70vh !important;
            max-height: 70vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            overflow: hidden !important;
          }
          
          .second-slide {
            margin: 0 !important;
            padding: 0 !important;
            width: 100vw !important;
            max-width: 100vw !important;
            height: 70vh !important;
            position: relative !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          .second-photo {
            margin: 0 !important;
            padding: 0 !important;
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          
          .second-photo img { 
            width: 100% !important; 
            height: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
            border-radius: 0 !important;
          }
          
          /* 2. bölümde navbar gizle */
          .second-section .navbar {
            display: none !important;
          }
          
          /* Kategori barını ortala - tam genişlik değil */
          .product-bar-wrapper {
            position: absolute !important;
            top: 2px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            z-index: 1000 !important;
            width: auto !important;
            display: flex !important;
            justify-content: center !important;
          }
          /* Yüzen görselleri mobilde gizle */
          .second-float-left,
          .second-float-right,
          .second-float-top,
          .second-float-center { 
            display: none !important; 
            visibility: hidden !important;
            opacity: 0 !important;
          }
        }

        @media (max-width: 480px) {
          .product-bar-wrapper { top: 0; width: 94vw; }
          .product-names-bar { gap: 10px; padding: 8px 12px; max-width: 94vw; }
          .product-name { font-size: 0.72rem; padding: 5px 8px; }
          /* 2. Bölüm Küçük Mobil Optimizasyon */
          .second-section {
            height: 75vh !important;
            min-height: 75vh !important;
            max-height: 75vh !important;
          }
          
          .second-slide {
            height: 75vh !important;
          }
          
          .second-photo img { 
            width: 100% !important; 
            height: 100% !important;
            object-fit: cover !important;
            object-position: center !important;
          }
          
          /* Kategori barı küçük mobilde */
          .product-bar-wrapper {
            top: 0px !important;
            width: auto !important;
          }
          /* Yüzen görselleri mobilde gizle */
          .second-float-left,
          .second-float-right,
          .second-float-top,
          .second-float-center { 
            display: none !important; 
            visibility: hidden !important;
            opacity: 0 !important;
          }
          .blog-grid { grid-template-columns: 1fr; gap: 18px; }
          .catalog-hero { padding: 40px 16px; }
        }

        

        .second-section .top-nav {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: linear-gradient(90deg, #F94F06, #FFB802, #FF7B00);
          height: 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .second-section .top-nav .action-button {
          background: #ffffff;
          color: #F94F06;
          border: none;
          padding: 8px 20px;
          border-radius: 25px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .second-section .top-nav .action-button:hover {
          background: #f8f9fa;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .second-section .brand-title {
          font-family: 'Georgia', serif;
          font-size: 4rem;
          font-weight: bold;
          font-style: italic;
          color: #8b4513;
          margin: 20px 0;
        }

        .second-section .tagline {
          font-size: 1.2rem;
          letter-spacing: 3px;
          color: #d4a574;
          margin-bottom: 40px;
          text-transform: uppercase;
        }

        .biscolata-slider {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          margin: 40px 0;
        }

        .biscolata-item {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: rgba(139, 69, 19, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .biscolata-item:hover {
          transform: scale(1.1);
        }

                 .biscolata-item img {
           width: 80px;
           height: 80px;
           object-fit: contain;
           border-radius: 50%;
         }

                   /* ===== 2. Bölüm Slider (tam boy foto) ===== */
          .second-slider{
            position: relative;
            width: 100%;
            height: 100vh;
            overflow: hidden;
          }
          .second-slides{
            display: flex;
            width: 100%;
            height: 100%;
            transition: transform .6s ease-in-out;
          }
          .second-slide{
            min-width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
                   .second-photo{
            position:absolute;
            inset:0;
            z-index:1;
            display:flex;
            align-items:center;
            justify-content:center;
            background:transparent;
            width: 100%;
            height: 100%;
            padding: 40px;
          }
          
          .second-photo img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          }
          
          /* Desktop için 2. bölüm radikal optimizasyon */
          @media (min-width: 1025px) {
            /* Body ve HTML sıfırlama */
            body, html {
              margin: 0 !important;
              padding: 0 !important;
              overflow-x: hidden !important;
            }
            
            .second-section {
              padding: 0 !important;
              margin: 0 !important;
              width: 100vw !important;
              max-width: 100vw !important;
              height: 100vh !important;
              min-height: 100vh !important;
              max-height: 100vh !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              overflow: hidden !important;
              position: relative !important;
              left: 50% !important;
              right: 50% !important;
              margin-left: -50vw !important;
              margin-right: -50vw !important;
            }
            
            .second-slide {
              width: 100vw !important;
              max-width: 100vw !important;
              height: 100vh !important;
              position: relative !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            .second-photo {
              position: absolute !important;
              inset: 0 !important;
              width: 100vw !important;
              max-width: 100vw !important;
              height: 100vh !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            .second-photo img{
              width: 100% !important;
              height: 100% !important;
              object-fit: cover !important;
              object-position: center !important;
              max-width: 100% !important;
              max-height: 100% !important;
              display: block !important;
            }
            
            /* Desktop'ta navbar gizle ve kategori barı düzelt */
            .second-section .navbar {
              display: none !important;
            }
            
            .product-bar-wrapper {
              position: absolute !important;
              top: 0px !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              width: auto !important;
              z-index: 1000 !important;
            }
          }

                   /* başlık ve yüzenler üstte kalsın */
          .second-title{ 
            position:absolute; 
            top:75%; 
            left:50%; 
            transform:translateX(-50%); 
            z-index:3; 
            text-align:center;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
            color: white;
          }
                   .second-float-left,.second-float-right,.second-float-top,.second-float-center{ position:absolute; z-index:3; display:flex; gap:20px; }
          .second-float-left{ left:20px; top:50%; transform:translateY(-50%); flex-direction:column; }
          .second-float-right{ right:20px; top:50%; transform:translateY(-50%); flex-direction:column; }
          .second-float-top{ top:20px; left:50%; transform:translateX(-50%); }
          .second-float-center{ top:75%; left:50%; transform:translate(-50%, -50%); }
          
          .second-float-left img,
          .second-float-right img,
          .second-float-top img,
          .second-float-center img {
            width: 200px;
            height: 200px;
            object-fit: contain;
            max-width: 200px;
            max-height: 200px;
            opacity: 0.3;
            filter: blur(1px);
          }




         /* ===== 3. Bölüm: Yaratıcı Katalog Tasarımı ===== */
         .catalog-section {
           width: 100%;
           min-height: 60vh;
           background: #F6F3ED;
           position: relative;
           overflow: hidden;
         }

         /* Arka Plan Görsel Alanı */
         .catalog-bg-images {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           z-index: 1;
         }


         .background-images {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           z-index: 1;
         }

         .bg-image {
           position: absolute;
           border-radius: 20px;
           overflow: hidden;
           opacity: 0.6;
           transition: all 0.5s ease;
           background-size: contain;
           background-position: center;
           background-repeat: no-repeat;
           z-index: 1;
         }

         .bg-image:hover {
           opacity: 0.8;
           transform: scale(1.05);
         }

         /* Pakshot formatı için ek optimizasyonlar */
         .bg-image img {
           max-width: 100%;
           max-height: 100%;
           object-fit: contain;
           object-position: center;
         }

         /* Görsel pozisyonları ve arka plan görselleri - Pakshot formatında */
         .bg-image-1 {
           top: 10%;
           left: 5%;
           width: 120px;
           height: 180px;
           animation: floatImage1 12s ease-in-out infinite;
           background-image: url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136');
           background-size: contain;
           background-position: center center;
           background-repeat: no-repeat;
           display: flex;
           align-items: center;
           justify-content: center;
         }

         .bg-image-2 {
           top: 20%;
           right: 8%;
           width: 105px;
           height: 165px;
           animation: floatImage2 15s ease-in-out infinite;
           animation-delay: 3s;
           background-image: url('https://images.unsplash.com/photo-1578662996442-48f60103fc96');
           background-size: contain;
           background-position: center center;
           background-repeat: no-repeat;
           display: flex;
           align-items: center;
           justify-content: center;
         }

         .bg-image-3 {
           bottom: 25%;
           left: 12%;
           width: 98px;
           height: 150px;
           animation: floatImage3 18s ease-in-out infinite;
           animation-delay: 6s;
           background-image: url('https://images.unsplash.com/photo-1587132137056-bfbf0166836e');
           background-size: contain;
           background-position: center center;
           background-repeat: no-repeat;
           display: flex;
           align-items: center;
           justify-content: center;
         }

         .bg-image-4 {
           bottom: 15%;
           right: 18%;
           width: 120px;
           height: 180px;
           animation: floatImage4 14s ease-in-out infinite;
           animation-delay: 9s;
           background-image: url('https://images.unsplash.com/photo-1609501676725-7186f757a64d');
           background-size: contain;
           background-position: center center;
           background-repeat: no-repeat;
           display: flex;
           align-items: center;
           justify-content: center;
         }

         /* Görsel animasyonları */
         @keyframes floatImage1 {
           0%, 100% { transform: translateY(0px) rotate(0deg); }
           25% { transform: translateY(-20px) rotate(2deg); }
           50% { transform: translateY(-10px) rotate(-1deg); }
           75% { transform: translateY(-25px) rotate(1deg); }
         }

         @keyframes floatImage2 {
           0%, 100% { transform: translateY(0px) rotate(0deg); }
           25% { transform: translateY(-15px) rotate(-2deg); }
           50% { transform: translateY(-5px) rotate(1deg); }
           75% { transform: translateY(-20px) rotate(-1deg); }
         }

         @keyframes floatImage3 {
           0%, 100% { transform: translateY(0px) rotate(0deg); }
           25% { transform: translateY(-18px) rotate(1deg); }
           50% { transform: translateY(-8px) rotate(-2deg); }
           75% { transform: translateY(-22px) rotate(1deg); }
         }

          @keyframes floatImage4 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            25% { transform: translateY(-12px) rotate(-1deg); }
            50% { transform: translateY(-6px) rotate(2deg); }
            75% { transform: translateY(-16px) rotate(-1deg); }
          }


         .catalog-container {
           position: relative;
           z-index: 2;
           min-height: 60vh;
           display: flex;
           flex-direction: column;
         }

         /* Hero Section */
         .catalog-hero {
           min-height: 80vh;
           display: flex;
           align-items: center;
           justify-content: center;
           text-align: center;
           padding: 60px 20px;
         }

         .hero-content {
           max-width: 800px;
         }

         .hero-badge {
           position: relative;
           display: inline-block;
           margin-bottom: 30px;
         }

         .badge-text {
           background: linear-gradient(135deg, #F94F06, #FF7B00);
           color: white;
           padding: 12px 30px;
           border-radius: 50px;
           font-size: 1.2rem;
           font-weight: 700;
           text-transform: uppercase;
           letter-spacing: 2px;
           position: relative;
           z-index: 2;
         }

         .badge-glow {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           background: linear-gradient(135deg, #D21B21, #B0151A);
           border-radius: 50px;
           filter: blur(20px);
           opacity: 0.5;
           animation: badgeGlow 3s ease-in-out infinite;
         }

         @keyframes badgeGlow {
           0%, 100% { transform: scale(1); opacity: 0.5; }
           50% { transform: scale(1.1); opacity: 0.8; }
         }

         .hero-title {
           font-size: 5rem;
           font-weight: 900;
           color: #F94F06;
           margin-bottom: 30px;
           text-shadow: 0 4px 8px rgba(249, 79, 6, 0.2);
         }

         .title-line {
           display: block;
           animation: titleSlideIn 1s ease-out forwards;
           opacity: 0;
           transform: translateY(50px);
         }

         .title-line:nth-child(1) { animation-delay: 0.2s; }
         .title-line:nth-child(2) { animation-delay: 0.4s; }
         .title-line:nth-child(3) { animation-delay: 0.6s; }

         @keyframes titleSlideIn {
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }

         .hero-subtitle {
           font-size: 1.5rem;
           color: #666;
           margin-bottom: 50px;
           font-weight: 300;
           letter-spacing: 1px;
         }

         .hero-cta {
           display: flex;
           gap: 30px;
           justify-content: center;
           flex-wrap: wrap;
         }

         .cta-button {
           position: relative;
           padding: 20px 40px;
           border: none;
           border-radius: 50px;
           font-size: 1.1rem;
           font-weight: 700;
           cursor: pointer;
           transition: all 0.4s ease;
           text-transform: uppercase;
           letter-spacing: 1px;
           overflow: hidden;
           min-width: 200px;
         }

         .cta-button.primary {
           background: linear-gradient(135deg, #F94F06, #FF7B00);
           color: white;
           box-shadow: 0 10px 30px rgba(249, 79, 6, 0.3);
         }

         .cta-button.secondary {
           background: transparent;
           color: #F94F06;
           border: 2px solid #F94F06;
           box-shadow: 0 10px 30px rgba(249, 79, 6, 0.1);
         }

         .cta-button:hover {
           transform: translateY(-5px);
         }

         .cta-button.primary:hover {
           box-shadow: 0 20px 40px rgba(249, 79, 6, 0.4);
         }

         .cta-button.secondary:hover {
           background: #F94F06;
           color: white;
           box-shadow: 0 20px 40px rgba(249, 79, 6, 0.2);
         }

         .button-bg {
           position: absolute;
           top: 0;
           left: -100%;
           width: 100%;
           height: 100%;
           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
           transition: left 0.5s;
         }

         .cta-button:hover .button-bg {
           left: 100%;
         }

         .button-text {
           position: relative;
           z-index: 2;
         }

         .button-icon {
           position: relative;
           z-index: 2;
           margin-left: 10px;
           transition: transform 0.3s ease;
         }

         .cta-button:hover .button-icon {
           transform: translateX(5px);
         }

         /* Ürün Adları Barı - Küçültülmüş */
        .product-names-bar {
           background: linear-gradient(90deg, #F94F06, #FFB802, #FF7B00);
           padding: 8px 18px;
           border-radius: 16px;
           display: flex;
           gap: 20px;
           align-items: center;
           justify-content: center;
           box-shadow: 0 6px 20px rgba(249, 79, 6, 0.3);
           backdrop-filter: none;
           border: 2px solid rgba(255, 255, 255, 0.1);
           position: relative;
           overflow: hidden;
          z-index: 50;
          pointer-events: auto;
         }

         .product-names-bar::before {
           content: '';
           position: absolute;
           top: 0;
           left: -100%;
           width: 100%;
           height: 100%;
           background: none;
           transition: left 0.6s ease;
         }

         .product-names-bar:hover::before {
           left: 100%;
         }

         .product-name {
           color: rgba(255, 255, 255, 0.8);
           font-size: 0.85rem;
           font-weight: 600;
           text-transform: uppercase;
           letter-spacing: 0.8px;
           cursor: pointer;
           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
           padding: 6px 12px;
           border-radius: 12px;
           position: relative;
           z-index: 2;
           backdrop-filter: none;
           border: none;
           background: transparent;
           box-shadow: none;
           transform: none;
         }

         .product-name:hover {
           color: white;
           background: rgba(255, 255, 255, 0.35);
           transform: translateY(-3px) scale(1.05);
           box-shadow: 0 8px 30px rgba(255, 255, 255, 0.4);
           text-shadow: 0 3px 8px rgba(0, 0, 0, 0.5);
           backdrop-filter: blur(20px);
           border: 2px solid rgba(255, 255, 255, 0.5);
           border-radius: 15px;
         }

         .product-name.active {
           color: white;
           background: transparent;
           font-weight: 700;
           text-shadow: none;
           box-shadow: none;
           transform: none;
         }



         /* Ürün Adları Barı Responsive */
         @media (max-width: 768px) {
           .product-names-bar {
            /* İnce, yatay kaydırmalı pill bar */
            padding: 8px 14px;
            height: 44px;
            gap: 14px;
            border-radius: 22px;
            flex-wrap: nowrap;
            justify-content: flex-start;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-snap-type: x mandatory;
           }
          .product-names-bar::-webkit-scrollbar { display: none; }

           .product-name {
            font-size: 0.85rem;
            padding: 6px 10px;
            border-radius: 12px;
            scroll-snap-align: center;
           }
         }

         @media (max-width: 480px) {
           .product-names-bar {
            padding: 8px 12px;
            gap: 12px;
            border-radius: 20px;
            flex-wrap: nowrap;
            justify-content: flex-start;
            overflow-x: auto;
            overflow-y: hidden;
            white-space: nowrap;
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-snap-type: x proximity;
           }
          .product-names-bar::-webkit-scrollbar { display: none; }

           .product-name {
             font-size: 0.8rem;
            padding: 5px 10px;
            border-radius: 10px;
            scroll-snap-align: center;
           }
         }

         /* Navbar Responsive */
         @media (max-width: 1024px) {
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

           .logo-text {
             font-size: 1.5rem;
             letter-spacing: 2px;
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

           .menu-logo-text {
             font-size: 1.4rem;
             letter-spacing: 2px;
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
         }



         /* Footer Responsive */
         @media (max-width: 768px) {
           .footer-slogan h2 {
             font-size: 2rem;
           }
           
           .nav-row {
             gap: 20px;
           }
           
           .nav-link {
             font-size: 0.9rem;
           }
           
           .footer-bottom-content {
             flex-direction: column;
             text-align: center;
             gap: 15px;
           }
           
           .legal-links {
             justify-content: center;
             gap: 15px;
           }
           
           .legal-link {
             font-size: 0.8rem;
           }
         }

         @media (max-width: 480px) {
           .footer-slogan h2 {
             font-size: 1.5rem;
           }
           
           .nav-row {
             flex-direction: column;
             gap: 15px;
           }
           
           .nav-link {
             font-size: 0.85rem;
           }
           
           .social-icons {
             gap: 10px;
           }
           
           .social-icon {
             width: 35px;
             height: 35px;
           }
           
           .legal-links {
             flex-direction: column;
             gap: 10px;
           }
           
           .legal-link {
             font-size: 0.75rem;
           }
         }

        /* 1. Bölüm (Slider) Responsive */
        @media (max-width: 1200px) {
          .main-logo {
            font-size: 6.5rem;
          }
          .main-ani-logo {
            max-width: 320px;
            max-height: 160px;
          }
          .slogan-text {
            font-size: 1.4rem;
            letter-spacing: 4px;
          }
        }

        @media (max-width: 768px) {
          .slider-section {
            min-height: 100vh;
            padding: 15px 0;
          }
          .main-logo {
            font-size: 4.5rem;
            margin-bottom: 0.8rem;
          }
          .main-ani-logo {
            max-width: 280px;
            max-height: 140px;
          }
          .slogan-text {
            font-size: 1.1rem;
            letter-spacing: 2px;
            margin-bottom: 1.5rem;
          }
          .brand-title {
            top: 80px;
          }
          .brand-loop {
            bottom: 15px;
          }
        }

        @media (max-width: 480px) {
          .slider-section {
            min-height: 100vh;
            padding: 10px 0;
          }
          .main-logo {
            font-size: 3.5rem;
            margin-bottom: 0.6rem;
          }
          .main-ani-logo {
            max-width: 220px;
            max-height: 110px;
          }
          .slogan-text {
            font-size: 1rem;
            letter-spacing: 1px;
            margin-bottom: 1rem;
          }
          .brand-title {
            top: 70px;
          }
          .brand-loop {
            bottom: 10px;
          }
        }

        @media (max-width: 360px) {
          .main-logo {
            font-size: 2.8rem;
          }
          .main-ani-logo {
            max-width: 200px;
            max-height: 100px;
          }
          .slogan-text {
            font-size: 0.9rem;
          }
        }

         /* ===== 4. Bölüm: Şölen Blog Bölümü ===== */
         .blog-section {
           width: 100%;
           min-height: 100vh;
           background: #ffffff;
           padding: 40px 20px;
           position: relative;
         }

         .blog-container {
           max-width: 1200px;
           margin: 0 auto;
           position: relative;
         }

         .blog-header {
           text-align: left;
           margin-bottom: 60px;
         }

         .blog-title {
           font-size: 3.5rem;
           font-weight: 900;
           color: #F94F06;
           margin-bottom: 15px;
           letter-spacing: -1px;
         }

         .blog-subtitle {
           font-size: 1.2rem;
           color: #F94F06;
           max-width: 600px;
           line-height: 1.6;
           font-weight: 400;
         }

         .blog-grid {
           display: grid;
           grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
           gap: 30px;
           margin-bottom: 60px;
         }

        .blog-card {
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.2s ease;
          position: relative;
          border: 1px solid rgba(0,0,0,0.06);
        }

        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.12);
        }

        .blog-card-image {
          width: 100%;
          height: 350px;
          position: relative;
          overflow: hidden;
          background: #ffffff;
        }

        .blog-card-image :global(img.blog-card-img) {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          transition: transform 0.4s ease;
          background: transparent;
        }

        .blog-card:hover .blog-card-image :global(img.blog-card-img) {
           transform: scale(1.08);
         }

        .blog-card-content {
          background: #ffffff;
          padding: 18px 18px 22px;
          color: #1f2937;
          margin: 0;
          border-top: 1px solid rgba(0,0,0,0.05);
        }

        .blog-card-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
          line-height: 1.35;
           display: -webkit-box;
           -webkit-line-clamp: 2;
           -webkit-box-orient: vertical;
           overflow: hidden;
         }

        .blog-card-excerpt {
          color: #4b5563;
          line-height: 1.55;
          margin-bottom: 14px;
           display: -webkit-box;
          -webkit-line-clamp: 2;
           -webkit-box-orient: vertical;
           overflow: hidden;
           font-size: 0.95rem;
         }

         .blog-card-link {
           display: inline-block;
           color: #F94F06;
           font-weight: 700;
           font-size: 0.9rem;
           text-decoration: none;
           transition: color 0.2s ease;
         }

         .blog-card-link:hover {
           color: #d93f05;
         }

         .blog-cta {
           text-align: left;
         }

         .blog-cta-link {
           color: #F94F06;
           font-size: 0.9rem;
           text-decoration: none;
           font-weight: 500;
         }

         .blog-cta-link:hover {
           text-decoration: underline;
         }

         /* 3. Bölüm (Katalog) Responsive */
         @media (max-width: 1024px) {
           .hero-title {
             font-size: 4rem;
           }
           .hero-subtitle {
             font-size: 1.3rem;
           }
           .cta-button {
             padding: 16px 32px;
             font-size: 1rem;
             min-width: 180px;
           }
         }

         @media (max-width: 768px) {
           .catalog-hero {
             padding: 50px 20px;
           }
           .hero-title {
             font-size: 3rem;
           }
           .hero-subtitle {
             font-size: 1.2rem;
             margin-bottom: 40px;
           }
           .hero-cta {
             gap: 20px;
             flex-direction: column;
           }
           .cta-button {
             padding: 14px 28px;
             font-size: 0.95rem;
             min-width: 160px;
           }
           .bg-image {
             opacity: 0.4;
           }
           
           /* Katalog arka plan görsellerini mobilde küçült - Transform Scale */
           .bg-image-1,
           .bg-image-2,
           .bg-image-3,
           .bg-image-4 {
             transform: scale(0.3) !important;
             transform-origin: center !important;
           }
           
           /* Katalog arka plan görsellerini mobilde küçült - Güçlü kurallar */
           .bg-image-1 {
             width: 40px !important;
             height: 60px !important;
             max-width: 40px !important;
             max-height: 60px !important;
             min-width: 40px !important;
             min-height: 60px !important;
           }
           
           .bg-image-2 {
             width: 35px !important;
             height: 55px !important;
             max-width: 35px !important;
             max-height: 55px !important;
             min-width: 35px !important;
             min-height: 55px !important;
           }
           
           .bg-image-3 {
             width: 30px !important;
             height: 45px !important;
             max-width: 30px !important;
             max-height: 45px !important;
             min-width: 30px !important;
             min-height: 45px !important;
           }
           
           .bg-image-4 {
             width: 40px !important;
             height: 60px !important;
             max-width: 40px !important;
             max-height: 60px !important;
             min-width: 40px !important;
             min-height: 60px !important;
           }
         }

         @media (max-width: 480px) {
           /* Katalog arka plan görsellerini küçük mobilde daha da küçült - Transform Scale */
           .bg-image-1,
           .bg-image-2,
           .bg-image-3,
           .bg-image-4 {
             transform: scale(0.2) !important;
             transform-origin: center !important;
           }
           
           /* Katalog arka plan görsellerini küçük mobilde daha da küçült - Güçlü kurallar */
           .bg-image-1 {
             width: 30px !important;
             height: 45px !important;
             max-width: 30px !important;
             max-height: 45px !important;
             min-width: 30px !important;
             min-height: 45px !important;
           }
           
           .bg-image-2 {
             width: 25px !important;
             height: 40px !important;
             max-width: 25px !important;
             max-height: 40px !important;
             min-width: 25px !important;
             min-height: 40px !important;
           }
           
           .bg-image-3 {
             width: 20px !important;
             height: 35px !important;
             max-width: 20px !important;
             max-height: 35px !important;
             min-width: 20px !important;
             min-height: 35px !important;
           }
           
           .bg-image-4 {
             width: 30px !important;
             height: 45px !important;
             max-width: 30px !important;
             max-height: 45px !important;
             min-width: 30px !important;
             min-height: 45px !important;
           }
           
           .catalog-hero {
             padding: 40px 15px;
           }
           .hero-title {
             font-size: 2.2rem;
           }
           .hero-subtitle {
             font-size: 1rem;
             margin-bottom: 30px;
           }
           .cta-button {
             padding: 12px 24px;
             font-size: 0.9rem;
             min-width: 140px;
           }
           .badge-text {
             font-size: 1rem;
             padding: 10px 25px;
           }
         }

         /* 4. Bölüm (Blog) Responsive */
         @media (max-width: 1024px) {
           .blog-title {
             font-size: 3rem;
           }
           .blog-grid {
             grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
             gap: 25px;
           }
         }

         @media (max-width: 768px) {
           .blog-section {
             padding: 50px 20px;
           }
           .blog-title {
             font-size: 2.5rem;
           }
           .blog-subtitle {
             font-size: 1.1rem;
           }
           .blog-grid {
             grid-template-columns: 1fr;
             gap: 20px;
           }
           .blog-card-image {
             height: 280px;
           }
           .blog-card-content {
             padding: 25px 20px;
           }
         }

         @media (max-width: 480px) {
           .blog-section {
             padding: 40px 15px;
           }
           .blog-title {
             font-size: 2rem;
           }
           .blog-subtitle {
             font-size: 1rem;
           }
           .blog-card-image {
             height: 220px;
           }
           .blog-card-content {
             padding: 20px 15px;
           }
           .blog-card-title {
             font-size: 1.2rem;
           }
           .blog-card-excerpt {
             font-size: 0.9rem;
           }
         }
       `}</style>

       {/* İki Bölümü Kapsayan Container */}
       <div className="relative">
       {/* İlk Bölüm - OSLO Slider */}
       <section className="slider-section">
                   
                   {/* Navbar artık fixed position kullanıyor, burada gerek yok */}
           
                   {/* Ana İçerik */}
           <div className="slider-content">
             <div className="brand-loop">
               <CurvedLoop marqueeText="Her lokmada bir anı saklı ✦ " speed={1.5} curveAmount="0px" direction="right" interactive={true} textColor="#ff0000" />
             </div>
           
          <div className="brand-title">
            <div className="ani-logo-container">
              <img 
                src="/logo.png" 
                alt="ANI Logo" 
                className="main-ani-logo"
              />
            </div>
          </div>


          {/* Yeni Slider - Tüm Görseller Aynı Boyut */}
          <div className="new-slider">
            {/* Yeşil Hotspot Alanı */}
            <div 
              ref={hotspotRef}
              className="hotspot-area"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                height: '400px',
                backgroundColor: 'transparent', // Görünmez
                border: 'none', // Çerçeve yok
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 10
              }}
            />
            <div className="slider-container" ref={sliderContainerRef}>
              <div className="slider-track">
                {sliders && sliders.length > 0 ? (
                  <>
                    {/* İlk set */}
                    {sliders.map((slider, index) => (
                      <div 
                        key={`first-${slider._id}`} 
                        className={`slider-item ${hoveredItems.has(index) ? 'center' : ''}`}
                      >
                        <div className="item-image">
                          <img 
                            src={slider.image?.asset?.url || '/placeholder.svg'} 
                            alt={slider.image?.alt || slider.title || `Slider ${index + 1}`}
                            loading={index < 4 ? "eager" : "lazy"}
                          />
                        </div>
                      </div>
                    ))}
                    {/* İkinci set - döngü için */}
                    {sliders.map((slider, index) => (
                      <div 
                        key={`second-${slider._id}`} 
                        className={`slider-item ${hoveredItems.has(index + sliders.length) ? 'center' : ''}`}
                      >
                        <div className="item-image">
                          <img 
                            src={slider.image?.asset?.url || '/placeholder.svg'} 
                            alt={slider.image?.alt || slider.title || `Slider ${index + 1}`}
                            loading="lazy"
                          />
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  // Fallback görseller - iki set
                  <>
                    {/* İlk set */}
                    <div className={`slider-item ${hoveredItems.has(0) ? 'center' : ''}`}>
                      <div className="item-image">
                        <img src="/bigger.png" alt="OSLO Ürün" loading="eager" />
                      </div>
                    </div>
                    <div className={`slider-item ${hoveredItems.has(1) ? 'center' : ''}`}>
                      <div className="item-image">
                        <img src="/placeholder.svg" alt="OSLO Ürün" loading="eager" />
                      </div>
                    </div>
                    <div className={`slider-item ${hoveredItems.has(2) ? 'center' : ''}`}>
                      <div className="item-image">
                        <img src="/oslo-logo.svg" alt="OSLO Ürün" loading="eager" />
                      </div>
                    </div>
                    {/* İkinci set - döngü için */}
                    <div className={`slider-item ${hoveredItems.has(3) ? 'center' : ''}`}>
                      <div className="item-image">
                        <img src="/bigger.png" alt="OSLO Ürün" loading="lazy" />
                      </div>
                    </div>
                    <div className={`slider-item ${hoveredItems.has(4) ? 'center' : ''}`}>
                      <div className="item-image">
                        <img src="/placeholder.svg" alt="OSLO Ürün" loading="lazy" />
                      </div>
                    </div>
                    <div className={`slider-item ${hoveredItems.has(5) ? 'center' : ''}`}>
                      <div className="item-image">
                        <img src="/oslo-logo.svg" alt="OSLO Ürün" loading="lazy" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
           </div>
                 </div>
       </section>

                                 {/* ===== 2. Bölüm: TAM BOY FOTO SLIDER ===== */}
                   <section className="second-section" style={{ position: 'relative' }}>
            {/* Kırmızı üst navigasyon alanı kaldırıldı */}

           {/* Ürün Adları Barı - 2. bölüme entegre, boşluksuz üstte */}
           <div className="product-bar-wrapper">
              <div className="product-names-bar">
                {productBarData?.products?.filter(product => product.isActive).sort((a, b) => (a.order || 0) - (b.order || 0)).map((product, index) => (
                  <span 
                    key={index} 
                    className={`product-name ${product.isActive ? 'active' : ''}`}
                    onClick={() => {
                      if (product.url) {
                        window.open(product.url, '_blank');
                      } else {
                        handleProductClick(product);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {product.name}
                  </span>
                )) || (
                  <>
                    <span className="product-name active" onClick={() => handleProductClick({name: 'Biscolata'})}>Biscolata</span>
                    <span className="product-name" onClick={() => handleProductClick({name: 'Boombastic'})}>Boombastic</span>
                    <span className="product-name" onClick={() => handleProductClick({name: 'Chocodan'})}>Chocodan's</span>
                    <span className="product-name" onClick={() => handleProductClick({name: 'Greta'})}>Greta</span>
                    <span className="product-name" onClick={() => handleProductClick({name: 'Luppo'})}>Luppo</span>
                    <span className="product-name" onClick={() => handleProductClick({name: 'Nutymax'})}>Nutymax</span>
                    <span className="product-name" onClick={() => handleProductClick({name: 'Ozmo'})}>Ozmo</span>
                    <span className="product-name" onClick={() => handleProductClick({name: 'Papita'})}>Papita</span>
                    <span className="product-name" onClick={() => handleProductClick({name: 'İkramlıklar'})}>İkramlıklar</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="second-slider">

                                                       <div className="second-slides" style={{ transform:`translateX(${-secondIndex*100}%)` }}>
                 {(activeSecondSlides && activeSecondSlides.length>0 ? activeSecondSlides : [{
                   _id:'ph-1',
                   title:'BIGGER ÜRÜNLERİ',
                   image:null,
                   floatingImages:[]
                 }]).map((slide, si)=>(
                 <div key={slide._id || si} className="second-slide">
                                                           {/* FOTOĞRAF (arkaplan değil, direkt img) */}
                     <div className="second-photo">
                       <img
                         src={slide.image?.asset?.url || '/bigger.png'}
                         alt={slide.title || slide.image?.alt || `Slide ${si+1}`}
                         loading="lazy"
                         decoding="async"
                       />
                     </div>

                                       {/* Başlık - Gizli */}
                    <div className="second-title" style={{ display: 'none' }}>
                      <SplitText
                        text={slide.title || slide.image?.alt || 'BIGGER ÜRÜNLERİ'}
                        className="text-2xl font-bold text-white"
                        delay={50} duration={0.8} ease="power3.out"
                        splitType="chars"
                        from={{ opacity:0, y:60, rotationX:90 }}
                        to={{ opacity:1, y:0, rotationX:0 }}
                        threshold={0.1} rootMargin="-50px" textAlign="center" tag="h1"
                      />
                    </div>


                                       {/* Sol / Sağ / Üst yüzen görseller */}
                    <div className="second-float-left">
                      {(slide.floatingImages||[])
                        .filter(i=>i.position==='left' && i.active && i.image && i.image.asset)
                        .sort((a,b)=>a.order-b.order)
                                                 .map((i,idx)=>(
                           <div key={`l-${idx}`} style={{ animation:`float ${1.2+idx*0.2}s ease-in-out infinite` }}>
                             <img src={i.image?.asset?.url || '/placeholder.svg'} alt={`left-${idx+1}`} />
                           </div>
                         ))}
                     </div>

                     <div className="second-float-right">
                       {(slide.floatingImages||[])
                         .filter(i=>i.position==='right' && i.active && i.image && i.image.asset)
                         .sort((a,b)=>a.order-b.order)
                         .map((i,idx)=>(
                           <div key={`r-${idx}`} style={{ animation:`bounce ${1.4+idx*0.3}s ease-in-out infinite`, animationDelay:`${idx*0.3}s` }}>
                             <img src={i.image?.asset?.url || '/placeholder.svg'} alt={`right-${idx+1}`} />
                           </div>
                         ))}
                     </div>
                     <div className="second-float-top">
                       {(slide.floatingImages||[])
                         .filter(i=>i.position==='top' && i.active && i.image && i.image.asset)
                         .sort((a,b)=>a.order-b.order)
                         .map((i,idx)=>(
                           <div key={`t-${idx}`} style={{ animation:`swing ${1.6+idx*0.4}s ease-in-out infinite`, animationDelay:`${idx*0.5}s` }}>
                             <img src={i.image?.asset?.url || '/placeholder.svg'} alt={`top-${idx+1}`} />
                           </div>
                         ))}
                    </div>

                    {/* Ortada - Adamın üzerinde yüzen görsel */}
                    <div className="second-float-center">
                      {(slide.floatingImages||[])
                        .filter(i=>i.position==='center' && i.active && i.image && i.image.asset)
                        .sort((a,b)=>a.order-b.order)
                        .map((i,idx)=>(
                          <div key={`c-${idx}`} style={{ animation:`float ${1.2+idx*0.2}s ease-in-out infinite` }}>
                            <img src={i.image?.asset?.url || '/placeholder.svg'} alt={`center-${idx+1}`} />
                          </div>
                        ))}
                    </div>
                 </div>
               ))}
             </div>
           </div>
         </section>

         {/* ===== 3. Bölüm: Şölen Lezzet Kataloğu - Yaratıcı Tasarım ===== */}
         <section className="catalog-section">
           {/* Arka Plan Görsel Alanı */}
           <div className="catalog-bg-images">
             
             {/* Arka Plan Görselleri */}
             <div className="background-images">
               {/* Debug bilgisi */}
               {console.log('=== BACKGROUND IMAGES DEBUG ===')}
               {console.log('Background Images Array:', backgroundImages)}
               {console.log('Background Images Length:', backgroundImages?.length)}
               {backgroundImages?.map((img, idx) => {
                 console.log(`Image ${idx + 1}:`, {
                   id: img._id,
                   title: img.title,
                   image: img.image,
                   imageUrl: img.image?.asset?.url,
                   position: img.position,
                   size: img.size,
                   active: img.active
                 });
                 return null;
               })}
               {console.log('===============================')}
               
               
               {/* Sanity'den gelen görseller - Sadece aktif olanları göster */}
               {backgroundImages && backgroundImages.length > 0 ? backgroundImages
                 .filter(bgImage => bgImage.active !== false && bgImage.image?.asset?.url)
                 .map((bgImage, index) => {
                   console.log(`Rendering Sanity Image ${index + 1}:`, bgImage);
                   console.log('Image URL:', bgImage.image?.asset?.url);
                   
                   // Boyut ayarları - Pakshot formatında (büyültülmüş)
                   const sizeMap = {
                     'small': { width: '90px', height: '135px' },
                     'medium': { width: '120px', height: '180px' },
                     'large': { width: '150px', height: '225px' }
                   };
                   
                   // Pozisyon ayarları - Daha iyi dağıtım
                   const positionMap = {
                     'top-left': { top: '10%', left: '5%' },
                     'top-right': { top: '20%', right: '8%' },
                     'bottom-left': { bottom: '25%', left: '12%' },
                     'bottom-right': { bottom: '15%', right: '18%' }
                   };
                   
                   const size = sizeMap[bgImage.size] || sizeMap['medium'];
                   const position = positionMap[bgImage.position] || positionMap['top-left'];
                   const imageUrl = bgImage.image?.asset?.url;
                   
                   return (
                     <div 
                       key={bgImage._id || `sanity-${index}`} 
                       className={`bg-image bg-image-sanity-${index + 1}`}
                       style={{
                         backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                         backgroundSize: 'contain',
                         backgroundPosition: 'center center',
                         backgroundRepeat: 'no-repeat',
                         animation: `${bgImage.animation || 'float'} ${12 + index * 3}s ease-in-out infinite`,
                        animationDelay: `${index * 3}s`,
                        opacity: 1,
                         zIndex: 2,
                         ...size,
                         ...position
                       }}
                     >
                       {!imageUrl && (
                         <div style={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           color: 'white',
                           fontSize: '12px',
                           textAlign: 'center',
                           padding: '10px'
                         }}>
                           Görsel Yüklenemedi
                         </div>
                       )}
                     </div>
                   );
                 }) : (
                   // Sanity'den veri gelmezse fallback görseller - Küçültülmüş ve kırpılmış
                   <>
                     <div className="bg-image bg-image-fallback-1" style={{
                       backgroundImage: 'url(https://images.unsplash.com/photo-1556909114-f6e7ad7d3136)',
                       backgroundSize: 'contain',
                       backgroundPosition: 'center center',
                       backgroundRepeat: 'no-repeat',
                       top: '10%',
                       left: '5%',
                       width: '120px',
                       height: '180px',
                      opacity: 1,
                       zIndex: 2
                     }}></div>
                     <div className="bg-image bg-image-fallback-2" style={{
                       backgroundImage: 'url(https://images.unsplash.com/photo-1578662996442-48f60103fc96)',
                       backgroundSize: 'contain',
                       backgroundPosition: 'center center',
                       backgroundRepeat: 'no-repeat',
                       top: '20%',
                       right: '8%',
                       width: '105px',
                       height: '165px',
                      opacity: 1,
                       zIndex: 2
                     }}></div>
                     <div className="bg-image bg-image-fallback-3" style={{
                       backgroundImage: 'url(https://images.unsplash.com/photo-1587132137056-bfbf0166836e)',
                       backgroundSize: 'contain',
                       backgroundPosition: 'center center',
                       backgroundRepeat: 'no-repeat',
                       bottom: '25%',
                       left: '12%',
                       width: '98px',
                       height: '150px',
                      opacity: 1,
                       zIndex: 2
                     }}></div>
                   </>
                 )}
             </div>
           </div>

           <div className="catalog-container">
             {/* Hero Section - Büyük Başlık ve Animasyon */}
             <div className="catalog-hero">
               <div className="hero-content">
                 <div className="hero-badge">
                   <span className="badge-text">2025</span>
                   <span className="badge-glow"></span>
                 </div>
                <h1 className="hero-title">
                  <span className="title-line">ANI</span>
                  <span className="title-line">Lezzet</span>
                  <span className="title-line">Kataloğu</span>
                </h1>
                 <p className="hero-subtitle">
                   Her damakta iz bırakan lezzetlerin buluşma noktası
                 </p>
                 <div className="hero-cta">
                   <button 
                     className="cta-button primary"
                     onClick={() => {
                       if (pdfSettings?.catalogPdf?.asset?.url) {
                         window.open(pdfSettings.catalogPdf.asset.url, '_blank');
                       } else {
                         alert('PDF dosyası bulunamadı!');
                       }
                     }}
                   >
                     <span className="button-bg"></span>
                     <span className="button-text">
                       {pdfSettings?.pdfTitle || 'Kataloğu İncele'}
                     </span>
                     <span className="button-icon">→</span>
                   </button>
                   {videoSettings?.showVideoButton && (
                     <button 
                       className="cta-button secondary"
                       onClick={() => {
                         if (videoSettings?.videoType === 'file' && videoSettings?.videoFile?.asset?.url) {
                           // Video dosyasını yeni sekmede aç
                           window.open(videoSettings.videoFile.asset.url, '_blank');
                         } else if (videoSettings?.videoType === 'url' && videoSettings?.videoUrl) {
                           // Harici video URL'ini yeni sekmede aç
                           window.open(videoSettings.videoUrl, '_blank');
                         } else {
                           alert('Video bulunamadı!');
                         }
                       }}
                     >
                       <span className="button-bg"></span>
                       <span className="button-text">
                         {videoSettings?.videoTitle || 'Video İzle'}
                       </span>
                       <span className="button-icon">▶</span>
                     </button>
                   )}
                 </div>
               </div>
             </div>


           </div>
         </section>

        
       </div>

       {/* ===== 4. Bölüm: OSLO Blog Bölümü ===== */}
       {blogSettings?.showBlogSection && (
         <section className="blog-section">
           <div className="blog-container">
             <div className="blog-header">
               <h2 className="blog-title">
                 {blogSettings?.blogTitle || 'OSLO Blog'}
               </h2>
               <p className="blog-subtitle">
                 {blogSettings?.blogSubtitle || 'Hayatını OSLO\'ya Dönüştürmek Senin Elinde!'}
               </p>
             </div>

           <div className="blog-grid">
             {blogPosts && blogPosts.length > 0 ? (
               blogPosts.slice(0, blogSettings?.maxPosts || 6).map((post) => (
                 <article key={post._id} className="blog-card">
                  <div className="blog-card-image">
                    <Image
                      src={post.mainImage?.asset?.url || '/placeholder.svg'}
                      alt={post.mainImage?.alt || post.title}
                      fill
                      className="blog-card-img"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={90}
                      priority={false}
                      style={{ objectFit: 'contain', objectPosition: getObjectPositionFromHotspot(post.mainImage), background: '#fff' }}
                    />
                  </div>
                   <div className="blog-card-content">
                     <h3 className="blog-card-title">{post.title}</h3>
                     <p className="blog-card-excerpt">{post.excerpt}</p>
                     <a href={`/blog/${post.slug?.current || post._id}`} className="blog-card-link">
                       Devamını Oku
                     </a>
                   </div>
                 </article>
               ))
             ) : (
               // Fallback blog kartları
               <>
                 <article className="blog-card">
                   <div className="blog-card-image">
                     <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136" alt="Lezzet Hikayesi" />
                   </div>
                   <div className="blog-card-content">
                     <h3 className="blog-card-title">ANI'nin Lezzet Dünyası</h3>
                     <p className="blog-card-excerpt">Her ürünümüzde özenle seçilmiş malzemeler ve geleneksel tariflerimizle hazırlanan lezzetler...</p>
                     <a href="#" className="blog-card-link">Devamını Oku</a>
                   </div>
                 </article>
                 <article className="blog-card">
                   <div className="blog-card-image">
                     <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96" alt="Ürün Tanıtımı" />
                   </div>
                   <div className="blog-card-content">
                     <h3 className="blog-card-title">Yeni Ürünlerimiz</h3>
                     <p className="blog-card-excerpt">2025 yılında sizlerle buluşacak yeni lezzetlerimizi keşfedin...</p>
                     <a href="#" className="blog-card-link">Devamını Oku</a>
                   </div>
                 </article>
                 <article className="blog-card">
                   <div className="blog-card-image">
                     <img src="https://images.unsplash.com/photo-1587132137056-bfbf0166836e" alt="Etkinlik" />
                   </div>
                   <div className="blog-card-content">
                     <h3 className="blog-card-title">Özel Etkinlikler</h3>
                     <p className="blog-card-excerpt">OSLO ailesi olarak düzenlediğimiz özel etkinlikler ve etkinliklerimizden haberler...</p>
                     <a href="#" className="blog-card-link">Devamını Oku</a>
                   </div>
                 </article>
               </>
             )}
           </div>

           <div className="blog-cta">
             <a 
               href={blogSettings?.ctaLink || '/blog'} 
               className="blog-cta-link"
             >
               {blogSettings?.ctaText || 'Tüm Blog içeriklerine ulaşmak için tıklayınız'}
             </a>
           </div>
         </div>
       </section>
       )}


       {/* Footer */}
       <footer className="footer">
         <div className="footer-top">
           <div className="footer-content">
             <div className="footer-slogan">
               <h2>{footerData?.slogan || 'Hayatın her anında'}</h2>
             </div>
             
             <div className="footer-nav">
               {footerData?.navigationLinks ? (
                 <>
                   <div className="nav-row">
                     {footerData.navigationLinks
                       .filter(link => link.isActive && link.row === 1)
                       .sort((a, b) => (a.order || 0) - (b.order || 0))
                       .map((link, index) => (
                         <a key={index} href={link.url} className="nav-link">{link.text}</a>
                       ))}
                   </div>
                   <div className="nav-row">
                     {footerData.navigationLinks
                       .filter(link => link.isActive && link.row === 2)
                       .sort((a, b) => (a.order || 0) - (b.order || 0))
                       .map((link, index) => (
                         <a key={index} href={link.url} className="nav-link">{link.text}</a>
                       ))}
                   </div>
                 </>
              ) : null}
             </div>
             
             <div className="footer-social">
               <p className="social-text">{footerData?.socialText || 'Bizi takip edin!'}</p>
               <div className="social-icons">
                 {footerData?.socialLinks ? (
                   footerData.socialLinks
                     .filter(link => link.isActive)
                     .sort((a, b) => (a.order || 0) - (b.order || 0))
                     .map((link, index) => (
                       <a key={index} href={link.url} className="social-icon" aria-label={link.platform}>
                         {link.platform === 'facebook' && (
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                           </svg>
                         )}
                         {link.platform === 'instagram' && (
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                           </svg>
                         )}
                         {link.platform === 'twitter' && (
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                           </svg>
                         )}
                         {link.platform === 'linkedin' && (
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                           </svg>
                         )}
                         {link.platform === 'youtube' && (
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                             <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                           </svg>
                         )}
                       </a>
                     ))
                 ) : (
                   // Fallback sosyal medya ikonları
                   <>
                     <a href="#" className="social-icon" aria-label="Facebook">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                       </svg>
                     </a>
                     <a href="#" className="social-icon" aria-label="Instagram">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                       </svg>
                     </a>
                     <a href="#" className="social-icon" aria-label="Twitter">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                       </svg>
                     </a>
                     <a href="#" className="social-icon" aria-label="LinkedIn">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                       </svg>
                     </a>
                     <a href="#" className="social-icon" aria-label="YouTube">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                         <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                       </svg>
                     </a>
                   </>
                 )}
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
                 {footerData?.legalLinks ? (
                   footerData.legalLinks
                     .filter(link => link.isActive)
                     .sort((a, b) => (a.order || 0) - (b.order || 0))
                     .map((link, index) => (
                       <a key={index} href={link.url} className="legal-link">{link.text}</a>
                     ))
                 ) : (
                   // Fallback yasal linkler
                   <>
                     <a href="/bilgi-toplumu" className="legal-link">Bilgi Toplumu Hizmetleri</a>
                     <a href="/gizlilik" className="legal-link">Gizlilik ve Güvenlik Politikamız</a>
                     <a href="/kvkk" className="legal-link">Kişisel Verilerin Korunması</a>
                     <a href="/cerez-politikasi" className="legal-link">Çerez Politikası</a>
                   </>
                 )}
               </div>
             </div>
             <div className="footer-copyright">
               <p>{footerData?.copyright || '2023 Şölen Tüm Hakları Saklıdır.'}</p>
             </div>
           </div>
         </div>
       </footer>

     </>
   );
 }

export async function getStaticProps() {
  try {
    // Sanity'den veri çek
    console.log('=== FETCHING DATA FROM SANITY ===');
    const [sliders, backgroundTexts, secondSlides, backgroundImages, pdfSettings, videoSettings, blogSettings, blogPosts, productBarData, menuData, logoData, footerData] = await Promise.all([
      client.fetch(queries.sliders),
      client.fetch(queries.backgroundTexts),
      client.fetch(queries.secondSlides),
      client.fetch(queries.backgroundImages),
      client.fetch(queries.pdfSettings),
      client.fetch(queries.videoSettings),
      client.fetch(queries.blogSettings),
      client.fetch(queries.blogPosts),
      client.fetch(queries.productBar),
      client.fetch(queries.menu),
      client.fetch(queries.logo),
      client.fetch(queries.footer)
    ]);

    console.log('Fetched data:');
    console.log('Sliders:', sliders?.length || 0);
    console.log('Background Texts:', backgroundTexts?.length || 0);
    console.log('Second Slides:', secondSlides?.length || 0);
    console.log('Background Images:', backgroundImages?.length || 0);
    console.log('PDF Settings:', pdfSettings);
    console.log('Video Settings:', videoSettings);
    console.log('Blog Settings:', blogSettings);
    console.log('Blog Posts:', blogPosts?.length || 0);
    console.log('Product Bar Data:', productBarData);
    console.log('Menu Data:', menuData);
    console.log('Logo Data:', logoData);

    return {
      props: {
        sliders: sliders || [],
        backgroundTexts: backgroundTexts || [],
        secondSlides: secondSlides || [],
        backgroundImages: backgroundImages || [],
        pdfSettings: pdfSettings || null,
        videoSettings: videoSettings || null,
        blogSettings: blogSettings || null,
        blogPosts: blogPosts || [],
        productBarData: productBarData || null,
        menuData: menuData || null,
        logoData: logoData || null,
        footerData: footerData || null
      },
      revalidate: 60
    };
  } catch (error) {
    console.error('Sanity veri çekme hatası:', error);
    
    // Hata durumunda fallback veriler
    const fallbackSliders = [
      {
        _id: '1',
        title: 'Ana Slider 1',
        image: { asset: { url: '/placeholder.svg' } },
        active: true,
        order: 1
      }
    ];

    const fallbackBackgroundTexts = [
      {
        _id: '1',
        title: 'Arka Plan Yazıları',
        leftText: 'SWEET',
        rightText: 'LOVE',
        active: true
      }
    ];

    const fallbackSecondSlides = [
      {
        _id: '1',
        title: 'BIGGER ÜRÜNLERİ',
        image: { asset: { url: '/bigger.png' } },
        active: true,
        order: 1,
        floatingImages: []
      }
    ];

    const fallbackBackgroundImages = [
      {
        _id: '1',
        title: 'Arka Plan 1',
        image: { asset: { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136' } },
        position: 'top-left',
        size: 'medium',
        animation: 'float',
        active: true,
        order: 1
      },
      {
        _id: '2',
        title: 'Arka Plan 2',
        image: { asset: { url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96' } },
        position: 'top-right',
        size: 'medium',
        animation: 'float',
        active: true,
        order: 2
      },
      {
        _id: '3',
        title: 'Arka Plan 3',
        image: { asset: { url: 'https://images.unsplash.com/photo-1587132137056-bfbf0166836e' } },
        position: 'bottom-left',
        size: 'medium',
        animation: 'float',
        active: true,
        order: 3
      },
      {
        _id: '4',
        title: 'Arka Plan 4',
        image: { asset: { url: 'https://images.unsplash.com/photo-1609501676725-7186f757a64d' } },
        position: 'bottom-right',
        size: 'medium',
        animation: 'float',
        active: true,
        order: 4
      }
    ];

    return {
      props: {
        sliders: fallbackSliders,
        backgroundTexts: fallbackBackgroundTexts,
        secondSlides: fallbackSecondSlides,
        backgroundImages: fallbackBackgroundImages,
        pdfSettings: null,
        videoSettings: null,
        blogSettings: null,
        blogPosts: [],
        productBarData: null,
        menuData: null,
        logoData: null,
        footerData: null
      },
      revalidate: 60
    };
  }
}

