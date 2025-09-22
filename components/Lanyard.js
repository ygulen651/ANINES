import React, { useState } from 'react';

export default function Lanyard() {
  const [canvasError, setCanvasError] = useState(null);
  const [canvasLoaded, setCanvasLoaded] = useState(false);
  
  console.log('Lanyard component rendering...');
  
  const handleCanvasCreated = () => {
    console.log('Canvas created successfully');
    setCanvasLoaded(true);
  };
  
  const handleCanvasError = (error) => {
    console.error('Canvas error:', error);
    setCanvasError(error);
  };
  
  if (canvasError) {
    return (
      <div className="w-full h-screen bg-red-500 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Canvas Hatası!</h2>
          <p className="text-sm">3D Canvas yüklenemedi</p>
          <p className="text-xs mt-2">{canvasError.message}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="lanyard-wrapper" style={{ 
      width: '350px', 
      height: '500px', 
      background: 'transparent',
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: '50px'
    }}>
      
      {/* CSS 3D Lanyard */}
      <div className="w-full h-full flex items-center justify-center perspective-1000">
        <div className="lanyard-3d">
          {/* Lanyard String */}
          <div className="lanyard-string"></div>
          
          {/* ID Card - Clickable to Products Page */}
          <div 
            className="id-card clickable-card"
            onClick={() => window.location.href = '/products'}
            style={{ cursor: 'pointer' }}
          >
            {/* Oslo Logo */}
            <div className="oslo-logo">
              <img 
                src="/Artboard 1@2x.png" 
                alt="OSLO Logo" 
                className="logo-image"
              />
            </div>
            
            {/* Click Instruction - Inside Card */}
            <div className="click-text">
              ÜRÜNLER İÇİN TIKLA
            </div>
          </div>
          
          {/* Card Clip */}
          <div className="card-clip"></div>
        </div>
      </div>
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .lanyard-3d {
          position: relative;
          animation: rotate 10s linear infinite;
        }
        
        .lanyard-string {
          width: 8px;
          height: 250px;
          background: linear-gradient(to bottom, #D21B21, #B0151A, #D21B21);
          position: absolute;
          top: -125px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 4px;
          box-shadow: 0 0 15px rgba(210, 27, 33, 0.4);
        }
        
        .id-card {
          width: 150px;
          height: 220px;
          background: linear-gradient(145deg, #FFE043, #FFE766);
          border-radius: 15px;
          position: relative;
          box-shadow: 
            0 20px 50px rgba(255, 224, 67, 0.5),
            inset 0 2px 0 rgba(255, 255, 255, 0.3),
            inset 0 -2px 0 rgba(0,0,0,0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 25px 20px;
          border: 4px solid #E6CA3C;
        }
        
        .card-clip {
          width: 14px;
          height: 14px;
          background: linear-gradient(145deg, #666, #333);
          position: absolute;
          top: -17px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 4px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.4);
        }
        
        .card-header {
          text-align: center;
          margin-bottom: 10px;
        }
        
        .company-logo {
          font-size: 12px;
          font-weight: bold;
          color: #ffffff;
          letter-spacing: 1px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        
        .card-type {
          font-size: 8px;
          color: #ffffff;
          margin-top: 2px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        
        .card-footer {
          text-align: center;
          margin-top: 10px;
        }
        
        .employee-name {
          font-size: 14px;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 2px;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        
        .employee-id {
          font-size: 10px;
          color: #ffffff;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        }
        
        .oslo-logo {
          position: relative;
          width: 120px;
          height: 85px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        }
        
        .empty-space {
          width: 60px;
          height: 40px;
          margin: 10px 0;
        }
        
        .clickable-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .clickable-card:hover {
          transform: scale(1.05);
          box-shadow: 
            0 25px 60px rgba(255, 224, 67, 0.6),
            inset 0 2px 0 rgba(255, 255, 255, 0.4),
            inset 0 -2px 0 rgba(0,0,0,0.3);
        }
        
        .click-text {
          color: #333;
          font-size: 14px;
          font-weight: bold;
          text-align: center;
          margin-top: 20px;
          text-shadow: 0 1px 2px rgba(255,255,255,0.5);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 0.7; }
          50% { opacity: 1; }
          100% { opacity: 0.7; }
        }
        
        @keyframes rotate {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
        
        @media (max-width: 768px) {
          .lanyard-wrapper {
            width: 300px !important;
            height: 400px !important;
            paddingTop: '30px' !important;
          }
          
          .id-card {
            width: 120px !important;
            height: 180px !important;
            padding: 20px 15px !important;
          }
          
          .lanyard-string {
            height: 200px !important;
            top: -100px !important;
          }
          
          .company-logo {
            font-size: 10px !important;
          }
          
          .card-type {
            font-size: 7px !important;
          }
          
          .employee-name {
            font-size: 12px !important;
          }
          
          .employee-id {
            font-size: 9px !important;
          }
          
          .atom-symbol {
            width: 40px !important;
            height: 40px !important;
          }
          
          .orbit-1, .orbit-2, .orbit-3 {
            width: 25px !important;
            height: 25px !important;
          }
        }
        
        @media (max-width: 480px) {
          .lanyard-wrapper {
            width: 250px !important;
            height: 350px !important;
            paddingTop: '20px' !important;
          }
          
          .id-card {
            width: 100px !important;
            height: 150px !important;
            padding: 15px 12px !important;
          }
          
          .lanyard-string {
            height: 150px !important;
            top: -75px !important;
          }
        }
      `}</style>
    </div>
  );
}
