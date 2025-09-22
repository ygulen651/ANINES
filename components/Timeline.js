import React from 'react';

const Timeline = ({ events }) => {
  return (
    <div className="timeline-container">
      <style jsx>{`
        .timeline-container {
          position: relative;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, #D21B21, #FF6B35);
          transform: translateX(-50%);
          z-index: 1;
        }

        .timeline-events {
          position: relative;
          z-index: 2;
        }

        .timeline-event {
          display: flex;
          margin-bottom: 80px;
          position: relative;
          align-items: center;
        }

        .timeline-event:nth-child(even) {
          flex-direction: row-reverse;
        }

        .timeline-event:nth-child(even) .event-content {
          text-align: right;
        }

        .event-content {
          flex: 1;
          padding: 0 60px;
          max-width: 45%;
        }

        .event-year {
          display: inline-block;
          background: linear-gradient(135deg, #D21B21, #FF6B35);
          color: white;
          padding: 8px 20px;
          border-radius: 25px;
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 15px;
          box-shadow: 0 4px 15px rgba(210, 27, 33, 0.3);
        }

        .event-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 10px;
          line-height: 1.3;
        }

        .event-description {
          color: #666;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .event-image {
          width: 120px;
          height: 120px;
          border-radius: 15px;
          object-fit: cover;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
          border: 4px solid white;
        }

        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: linear-gradient(135deg, #D21B21, #FF6B35);
          border-radius: 50%;
          border: 4px solid white;
          box-shadow: 0 0 0 4px rgba(210, 27, 33, 0.2);
          z-index: 3;
        }

        .event-card {
          background: white;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
          position: relative;
        }

        .event-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }

        .event-card::before {
          content: '';
          position: absolute;
          top: 50%;
          width: 20px;
          height: 20px;
          background: white;
          transform: translateY(-50%) rotate(45deg);
          border: 1px solid #f0f0f0;
          z-index: -1;
        }

        .timeline-event:nth-child(odd) .event-card::before {
          right: -10px;
          border-left: none;
          border-bottom: none;
        }

        .timeline-event:nth-child(even) .event-card::before {
          left: -10px;
          border-right: none;
          border-top: none;
        }

        .event-stats {
          display: flex;
          gap: 20px;
          margin-top: 15px;
        }

        .stat-item {
          text-align: center;
          flex: 1;
        }

        .stat-number {
          display: block;
          font-size: 1.5rem;
          font-weight: 700;
          color: #D21B21;
          margin-bottom: 5px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #666;
          font-weight: 500;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .timeline-line {
            left: 30px;
          }

          .timeline-event {
            flex-direction: row !important;
            margin-bottom: 50px;
          }

          .timeline-event:nth-child(even) .event-content {
            text-align: left;
          }

          .event-content {
            max-width: none;
            padding-left: 80px;
            padding-right: 20px;
          }

          .timeline-dot {
            left: 30px;
          }

          .event-card::before {
            display: none;
          }

          .event-image {
            width: 80px;
            height: 80px;
          }

          .event-stats {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>

      <div className="timeline-line"></div>
      <div className="timeline-events">
        {events.map((event, index) => (
          <div key={index} className="timeline-event">
            <div className="timeline-dot"></div>
            <div className="event-content">
              <div className="event-card">
                <div className="event-year">{event.year}</div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>
                {event.stats && (
                  <div className="event-stats">
                    {event.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="stat-item">
                        <span className="stat-number">{stat.number}</span>
                        <span className="stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {(event.image || event.imageUrl) && (
              <div className="event-visual">
                <img src={event.imageUrl || event.image} alt={event.title} className="event-image" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
