import { Link } from 'react-router-dom';

const Hero = () => {
  const phoneNumber = "9747552036"; // Replace with actual number

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${phoneNumber}?text=Hi%20I%20want%20to%20discuss%20a%20project`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      className="hero-section" 
      style={{ 
        backgroundImage: `
          linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
          url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')
        ` 
      }}
    >
      <img src="/logo-full.png" className="hero-watermark" alt="" />

      <div className="container hero-content">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="hero-title text-white">Shaping the Future of Architecture</h1>
            <p className="hero-subtitle text-white">Minimalist design meets sustainable functionality.</p>
            <div className="d-flex gap-3 mt-4">
              <button onClick={handleWhatsAppClick} className="btn btn-gold">
                Start a Project
              </button>
              <Link to="/projects" className="btn btn-outline-light" style={{ padding: '12px 30px', borderRadius: 0, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 500 }}>
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
