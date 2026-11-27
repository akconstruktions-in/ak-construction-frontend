import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, MessageCircle } from 'lucide-react';
import SERVICES from '../data/services';

const Footer = () => {
  return (
    <footer className="footer-ak">
      <div className="container">
        <div className="row g-5">
          {/* Brand */}
          <div className="col-lg-4">
            <h5 style={{ color: '#fff', fontFamily: 'var(--font-display)', fontSize: '1.6rem', marginBottom: '12px' }}>
              Adiyapuram Kannan (AK) Constructions
            </h5>
            <p style={{ fontSize: '14px', color: 'var(--n-400)', lineHeight: 1.7 }}>
              We build lasting structures with a modern touch. Full house construction, commercial buildings, and renovation work across Kerala.
            </p>
            <div className="d-flex flex-wrap gap-2 mt-4">
              <Link to="/book-appointment" className="btn-primary-ak" style={{ fontSize: '14px', padding: '10px 18px' }}>
                Book Appointment
              </Link>
              <a
                href="https://wa.me/919747552036?text=Hi%20I%20want%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-light-ak"
                style={{ fontSize: '14px', padding: '10px 18px' }}
              >
                <MessageCircle size={15} strokeWidth={1.5} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-6 col-md-4 col-lg-2">
            <h6>Navigation</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/book-appointment">Book Appointment</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-6 col-md-4 col-lg-3">
            <h6>Services</h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              {SERVICES.slice(0, 7).map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>{s.title}</Link>
                </li>
              ))}
              <li>
                <Link to="/services" style={{ color: 'var(--accent)' }}>View all {SERVICES.length} services →</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 col-lg-3">
            <h6>Contact</h6>
            <ul className="list-unstyled d-flex flex-column gap-3" style={{ fontSize: '14px', color: 'var(--n-400)' }}>
              <li className="d-flex align-items-start gap-2">
                <MapPin size={16} strokeWidth={1.5} className="mt-1 flex-shrink-0" style={{ color: 'var(--accent)' }} />
                <span>Kannur, Kerala</span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Mail size={16} strokeWidth={1.5} className="flex-shrink-0" style={{ color: 'var(--accent)' }} />
                <a href="mailto:ak.construktions@gmail.com">ak.construktions@gmail.com</a>
              </li>
              <li className="d-flex align-items-center gap-2">
                <Phone size={16} strokeWidth={1.5} className="flex-shrink-0" style={{ color: 'var(--accent)' }} />
                <a href="tel:+919747552036">Raju MV - 9747552036</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
          <span>© {new Date().getFullYear()} AK Constructions. All rights reserved.</span>
          <span style={{ fontSize: '0.875rem', color: 'var(--n-400)', textAlign: 'center' }}>
            Made in India 🇮🇳  ·  <a href="https://github.com/Harshan-mv" target="_blank" rel="noopener noreferrer" aria-label="Harshan MV on GitHub" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Made with ❤️ by Harshan MV</a>
          </span>
          <span>Kannur, Kerala</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
