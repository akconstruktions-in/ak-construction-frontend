import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const phoneNumber = "9747552036"; // Replace with actual number

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${phoneNumber}?text=Hi%20I%20want%20to%20discuss%20a%20project`, '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-custom sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">AK Constructions</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`} to="/services">Services</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`} to="/projects">Projects</Link>
            </li>
          </ul>
          <div className="d-flex">
            <button onClick={handleWhatsAppClick} className="btn btn-gold d-flex align-items-center gap-2">
              
              {/* WhatsApp Icon */}
              <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.893.755 5.714 2.188 8.193L.093 32l7.593-2.06A15.94 15.94 0 0 0 16 32c8.836 0 16-7.164 16-16.004C32 7.56 24.836.396 16 .396zm0 29.166a13.09 13.09 0 0 1-6.662-1.83l-.476-.282-4.51 1.223 1.205-4.396-.31-.452A13.07 13.07 0 0 1 2.91 16c0-7.224 5.866-13.09 13.09-13.09 7.224 0 13.09 5.866 13.09 13.09 0 7.224-5.866 13.09-13.09 13.09zm7.396-9.77c-.404-.202-2.39-1.178-2.76-1.31-.37-.134-.64-.202-.91.202-.27.404-1.04 1.31-1.274 1.58-.234.27-.47.304-.874.102-.404-.202-1.707-.63-3.252-2.01-1.202-1.07-2.014-2.39-2.248-2.794-.234-.404-.025-.622.176-.824.18-.178.404-.47.606-.706.202-.234.27-.404.404-.672.134-.27.067-.506-.034-.708-.102-.202-.91-2.19-1.246-3.002-.328-.788-.662-.68-.91-.692l-.776-.014c-.27 0-.708.102-1.08.506-.37.404-1.414 1.382-1.414 3.37 0 1.99 1.45 3.91 1.65 4.18.202.27 2.85 4.354 6.91 6.1.966.416 1.72.664 2.306.85.97.31 1.852.266 2.55.162.778-.116 2.39-.976 2.726-1.92.336-.944.336-1.754.234-1.92-.102-.168-.37-.27-.776-.472z"/>
              </svg>

              Let's Talk
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
