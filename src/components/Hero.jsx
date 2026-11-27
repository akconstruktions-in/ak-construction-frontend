import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle } from 'lucide-react';

const ROTATE_INTERVAL_MS = 4 * 60 * 1000; // 4 minutes (within 3-5 min range)

const Hero = ({ heroImages = [] }) => {
  const images = heroImages.length > 0 ? heroImages : ['/media/about-studio.webp'];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, ROTATE_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [images.length]);

  const currentSrc = images[activeIndex % images.length] || '/media/about-studio.webp';

  return (
    <section
      className="position-relative d-flex align-items-center"
      style={{
        minHeight: '82vh',
        backgroundColor: 'var(--n-900)',
        overflow: 'hidden',
      }}
    >
      {/* Preloaded / rotating project hero photo */}
      <img
        key={currentSrc}
        src={currentSrc}
        alt="AK Constructions project"
        fetchPriority="high"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.42,
          transition: 'opacity 0.8s ease',
        }}
      />

      {/* Subtle directional gradient for legible typography */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(28,24,20,0.85) 0%, rgba(28,24,20,0.45) 60%, rgba(28,24,20,0.2) 100%)',
        }}
      />

      <div className="container position-relative py-5" style={{ zIndex: 2 }}>
        <div className="row">
          <div className="col-lg-8">
            <span
              className="d-inline-block mb-3 px-3 py-1"
              style={{
                background: 'rgba(200,136,10,0.18)',
                borderLeft: '3px solid var(--accent)',
                color: '#f5d284',
                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              Adiyapuram Kannan (AK) Constructions · Kannur, Kerala
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 6.5vw, 68px)',
                color: '#ffffff',
                lineHeight: 1.08,
                marginBottom: '20px',
              }}
            >
              Your Vision Our Challenge
            </h1>

            <p
              style={{
                fontSize: 'clamp(16px, 2vw, 19px)',
                color: 'rgba(255,255,255,0.84)',
                maxWidth: '580px',
                marginBottom: '32px',
                lineHeight: 1.6,
              }}
            >
              General building contractors for new homes, commercial buildings, and full house renovations across Kerala.
            </p>

            <div className="d-flex flex-wrap gap-3">
              <Link to="/book-appointment" className="btn-primary-ak">
                Book Appointment <ArrowRight size={16} strokeWidth={1.5} />
              </Link>
              <a
                href="https://wa.me/919747552036?text=Hi%20I%20want%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light-ak"
              >
                <MessageCircle size={16} strokeWidth={1.5} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
