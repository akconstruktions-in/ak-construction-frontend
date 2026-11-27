import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import SERVICES from '../data/services';

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className="sticky-top"
      style={{
        backgroundColor: 'var(--bg-page)',
        borderBottom: '1px solid var(--border)',
        zIndex: 1030,
      }}
    >
      <div className="container d-flex align-items-center justify-content-between py-3">
        {/* Brand */}
        <Link
          to="/"
          className="d-flex align-items-center gap-2 text-decoration-none"
          style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--text-primary)' }}
        >
          <img
            src="/media/logo-mark-gold.webp"
            alt="AK Constructions"
            width="36"
            height="28"
            style={{ objectFit: 'contain' }}
          />
          <span>AK Constructions</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="d-none d-lg-flex align-items-center gap-4">
          <Link
            to="/"
            className="text-decoration-none"
            style={{
              fontSize: '15px',
              fontWeight: location.pathname === '/' ? 600 : 400,
              color: location.pathname === '/' ? 'var(--accent)' : 'var(--text-primary)',
            }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-decoration-none"
            style={{
              fontSize: '15px',
              fontWeight: location.pathname === '/about' ? 600 : 400,
              color: location.pathname === '/about' ? 'var(--accent)' : 'var(--text-primary)',
            }}
          >
            About
          </Link>

          {/* Services Mega-Menu Trigger */}
          <div
            className="position-relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              type="button"
              onClick={() => setMegaOpen((prev) => !prev)}
              className="btn btn-link p-0 text-decoration-none d-inline-flex align-items-center gap-1"
              style={{
                fontSize: '15px',
                fontWeight: location.pathname.startsWith('/services') ? 600 : 400,
                color: location.pathname.startsWith('/services') ? 'var(--accent)' : 'var(--text-primary)',
              }}
              aria-expanded={megaOpen}
            >
              Services <ChevronDown size={16} strokeWidth={1.5} />
            </button>

            {megaOpen && (
              <div
                className="position-absolute start-50 translate-middle-x pt-2"
                style={{ top: '100%', width: '680px', zIndex: 1050 }}
              >
                <div
                  className="p-4 shadow-lg"
                  style={{
                    background: 'var(--bg-page)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--r-lg)',
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3 pb-2" style={{ borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      All Building &amp; Construction Services
                    </span>
                    <Link
                      to="/services"
                      style={{ fontSize: '13px', fontWeight: 500, color: 'var(--accent)' }}
                    >
                      View all {SERVICES.length} services →
                    </Link>
                  </div>
                  <div className="row g-1">
                    {SERVICES.map((svc) => (
                      <div className="col-6" key={svc.slug}>
                        <Link
                          to={`/services/${svc.slug}`}
                          className="d-block p-2 text-decoration-none"
                          style={{
                            borderRadius: 'var(--r-sm)',
                            fontSize: '13.5px',
                            color: 'var(--text-primary)',
                            transition: 'background 0.15s',
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--n-100)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          {svc.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/projects"
            className="text-decoration-none"
            style={{
              fontSize: '15px',
              fontWeight: location.pathname.startsWith('/projects') ? 600 : 400,
              color: location.pathname.startsWith('/projects') ? 'var(--accent)' : 'var(--text-primary)',
            }}
          >
            Projects
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="d-none d-lg-flex align-items-center gap-3">
          <a
            href="tel:+919747552036"
            className="d-inline-flex align-items-center gap-1 text-decoration-none"
            style={{ fontSize: '14px', color: 'var(--text-secondary)' }}
          >
            <Phone size={15} strokeWidth={1.5} /> 9747552036 -Raju mv
          </a>
          <Link to="/book-appointment" className="btn-primary-ak">
            Book Appointment
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="d-lg-none btn btn-link p-1 text-dark"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>

      {/* Mobile Full-Screen Menu */}
      {mobileOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column p-4 overflow-auto"
          style={{ background: 'var(--bg-page)', zIndex: 2000 }}
        >
          <div className="d-flex justify-content-between align-items-center pb-3 mb-3" style={{ borderBottom: '1px solid var(--border)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>AK Constructions</span>
            <button
              type="button"
              className="btn btn-link p-1 text-dark"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} strokeWidth={1.5} />
            </button>
          </div>

          <div className="d-flex flex-column gap-3 flex-grow-1">
            <Link to="/" className="fs-5 text-decoration-none py-1">Home</Link>
            <Link to="/about" className="fs-5 text-decoration-none py-1">About Us</Link>

            <div>
              <button
                type="button"
                className="btn btn-link p-0 fs-5 text-decoration-none d-flex align-items-center justify-content-between w-100 text-dark py-1"
                onClick={() => setMobileServicesOpen((prev) => !prev)}
              >
                <span>Services</span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.5}
                  style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
                />
              </button>
              {mobileServicesOpen && (
                <div className="ps-3 pt-2 d-flex flex-column gap-2" style={{ borderLeft: '2px solid var(--accent)' }}>
                  <Link to="/services" className="text-decoration-none fw-medium" style={{ color: 'var(--accent)', fontSize: '14px' }}>
                    All Services Overview
                  </Link>
                  {SERVICES.map((svc) => (
                    <Link
                      key={svc.slug}
                      to={`/services/${svc.slug}`}
                      className="text-decoration-none"
                      style={{ fontSize: '14px', color: 'var(--text-secondary)' }}
                    >
                      {svc.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/projects" className="fs-5 text-decoration-none py-1">Projects</Link>
          </div>

          <div className="pt-4 d-flex flex-column gap-2" style={{ borderTop: '1px solid var(--border)' }}>
            <Link to="/book-appointment" className="btn-primary-ak justify-content-center w-100">
              Book Appointment
            </Link>
            <a
              href="https://wa.me/919747552036?text=Hi%20I%20want%20to%20discuss%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-ak justify-content-center w-100"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
