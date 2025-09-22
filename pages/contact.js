import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/contact.module.css';

/**
 * İletişim sayfası
 */
export default function Contact() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simülasyon - gerçek bir API endpoint'e gönderebilirsiniz
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    }, 2000);
  };

  return (
    <div className={styles.contactPage}>
      <style jsx global>{`

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
          color: #FFA600 !important;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 10px 15px;
          border-radius: 5px;
          transition: all 0.3s ease;
        }

        .menu-button:hover {
          background: #FFA600 !important;
          color: white !important;
        }

        .menu-button .menu-text {
          transition: color 0.3s ease;
        }

        .menu-button:hover .menu-text {
          color: white !important;
        }

        .hamburger-icon {
          background: #FFA600;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          border: 2px solid #FFA600;
          transition: all 0.3s ease;
        }

        .menu-button:hover .hamburger-icon {
          background: white !important;
          border-color: white !important;
        }

        .hamburger-icon span {
          width: 16px;
          height: 3px;
          background: white !important;
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .menu-button:hover .hamburger-icon span {
          background: #FFA600 !important;
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

        /* İletişim Kartları */
        .contact-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }

        .contact-card {
          background: white;
          padding: 40px 30px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(102, 126, 234, 0.1);
          position: relative;
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }

        .contact-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 50px rgba(102, 126, 234, 0.2);
        }

        .contact-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          font-size: 2rem;
          color: white;
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
        }

        .contact-card h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 10px;
        }

        .contact-card p {
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }

        /* İletişim Formu */
        .contact-form {
          background: white;
          padding: 50px;
          border-radius: 25px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(102, 126, 234, 0.1);
        }

        .form-group {
          margin-bottom: 30px;
          position: relative;
        }

        .form-label {
          display: block;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 15px 20px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #fafafa;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          background: white;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 18px 30px;
          border: none;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-button .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 10px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .success-message {
          background: #10b981;
          color: white;
          padding: 15px 20px;
          border-radius: 12px;
          margin-bottom: 20px;
          text-align: center;
          font-weight: 600;
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Harita Bölümü */
        .map-section {
          background: #f8fafc;
          padding: 80px 0;
          margin-top: 60px;
        }

        .map-container {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          height: 400px;
          position: relative;
        }

        .map-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
        }

        /* İletişim Sayfası Responsive */
        @media (max-width: 1200px) {
          .logo-image {
            max-width: 350px;
            max-height: 120px;
          }
          .heroTitle {
            font-size: 3rem;
          }
          .contact-cards {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 25px;
          }
        }

        @media (max-width: 768px) {
          .navbar {
            top: 12px;
            left: 12px;
            right: 12px;
          }

          .logo-image {
            max-width: 220px;
            max-height: 80px;
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

          .heroSection {
            min-height: 50vh;
            padding: 80px 20px 40px;
          }

          .heroTitle {
            font-size: 2.5rem;
          }

          .heroSubtitle {
            font-size: 1.1rem;
          }

          .mainContent {
            padding: 50px 0;
          }

          .contact-form {
            padding: 40px 25px;
          }

          .contact-cards {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 50px;
          }

          .contact-card {
            padding: 35px 25px;
          }

          .contact-icon {
            width: 70px;
            height: 70px;
            font-size: 1.8rem;
          }

          .mapSection {
            padding: 70px 0 90px 0;
            margin-top: 60px;
          }

          .mapContainer {
            height: 500px;
            border-radius: 20px;
            margin: 0 20px;
          }
        }

        @media (max-width: 480px) {
          .navbar {
            top: 8px;
            left: 8px;
            right: 8px;
          }

          .logo-image {
            max-width: 180px;
            max-height: 65px;
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

          .heroSection {
            min-height: 45vh;
            padding: 70px 15px 30px;
          }

          .heroTitle {
            font-size: 2rem;
          }

          .heroSubtitle {
            font-size: 1rem;
          }

          .mainContent {
            padding: 40px 0;
          }

          .contact-form {
            padding: 30px 20px;
          }

          .contact-cards {
            gap: 15px;
            margin-bottom: 40px;
          }

          .contact-card {
            padding: 30px 20px;
          }

          .contact-icon {
            width: 60px;
            height: 60px;
            font-size: 1.6rem;
          }

          .contact-card h3 {
            font-size: 1.3rem;
          }

          .contact-card p {
            font-size: 0.9rem;
          }

          .mapSection {
            padding: 60px 0 80px 0;
            margin-top: 40px;
          }

          .mapContainer {
            height: 400px;
            border-radius: 15px;
            margin: 0 15px;
          }

          .form-input {
            padding: 12px 16px;
            font-size: 0.95rem;
          }

          .submit-button {
            padding: 16px 25px;
            font-size: 1rem;
          }
        }

        @media (max-width: 360px) {
          .heroTitle {
            font-size: 1.8rem;
          }

          .contact-form {
            padding: 25px 15px;
          }

          .contact-card {
            padding: 25px 15px;
          }

          .mapContainer {
            height: 350px;
            margin: 0 10px;
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

      {/* Başlık */}
      <section className={styles.topHeadingSection}>
        <h1 className={styles.pageHeading}>İLETİŞİM</h1>
      </section>

      {/* Konum ve Haritalar */}
      <section className={styles.locationsSection}>
        <div className={styles.locationsGrid}>
          <div className={styles.locationBlock}>
            <h3 className={styles.locationTitle}>MERKEZ - FABRİKA</h3>
            <p className={styles.locationAddress}>Organize Sanayi Bölgesi 16. Cadde No:16<br/>KARAMAN / TÜRKİYE</p>
            <div className={styles.mapContainerSimple}>
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent('Organize Sanayi Bölgesi 16. Cadde No:16, Karaman, Türkiye')}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Merkez Fabrika Harita"
              ></iframe>
            </div>
          </div>
          <div className={styles.locationBlock}>
            <h3 className={styles.locationTitle}>İSTANBUL BÖLGE MÜDÜRLÜĞÜ</h3>
            <p className={styles.locationAddress}>Mahmutbey Mahallesi, İSTOÇ Toptancılar Sitesi, 32. Ada No: 66/68 Bağcılar<br/>İSTANBUL / TÜRKİYE</p>
            <div className={styles.mapContainerSimple}>
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent('İSTOÇ Toptancılar Sitesi 32. Ada No:66/68 Bağcılar, İstanbul, Türkiye')}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="İstanbul Bölge Müdürlüğü Harita"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Telefon ve Fax */}
      <section className={styles.phoneFaxSection}>
        <div className={styles.phoneFaxGrid}>
          <div className={styles.phoneCol}>
            <h4 className={styles.subHeading}>TELEFON VE FAX</h4>
            <p className={styles.phoneLine}>+90 (338) 224 12 30</p>
            <p className={styles.phoneLine}>+90 (338) 224 12 34</p>
          </div>
          <div className={styles.phoneCol}>
            <h4 className={styles.subHeading}>TELEFON VE FAX</h4>
            <p className={styles.phoneLine}>+90 (212) 659 19 66 - 67</p>
            <p className={styles.phoneLine}>+90 (212) 659 19 68</p>
          </div>
        </div>
      </section>

      {/* E-posta */}
      <section className={styles.emailSection}>
        <div className={styles.redDivider}></div>
        <p className={styles.emailQuestion}>SORULARINIZ İÇİN</p>
        <a href="mailto:bilgi@anibiskuvi.com.tr" className={styles.emailAddress}>bilgi@anibiskuvi.com.tr</a>
      </section>

      {/* İletişim Formu */}
      <section className={styles.formSection}>
        <h2 className={styles.formHeading}>İLETİŞİM FORMU</h2>
        <p className={styles.formInfo}>Değerli Ziyaretçimiz, Bizimle iletişime geçmek için iletişim formunu eksiksiz olarak doldurunuz.<br/>(Aşağıda alınan tüm bilgiler KVKK (Kişisel Verileri Koruma Kanunu) ilkesine uygun olarak gizli tutulmaktadır.)</p>
        <div className={styles.formContainerCentered}>
          {submitStatus === 'success' && (
            <div className={styles.successMessage}>Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</div>
          )}
          <form onSubmit={handleSubmit} className={styles.formGrid}> 
            <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Adı Soyadı" className={styles.formInput} required />
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="E-Posta" className={styles.formInput} required />
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Telefon" className={styles.formInput} />
            <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} placeholder="Konu" className={styles.formInput} />
            <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="Mesajınız" className={`${styles.formInput} ${styles.formTextarea}`}></textarea>
            <button type="submit" className={styles.blackButton} disabled={isSubmitting}>{isSubmitting ? 'Gönderiliyor...' : 'GÖNDER'}</button>
          </form>
        </div>
      </section>
    </div>
  )
}