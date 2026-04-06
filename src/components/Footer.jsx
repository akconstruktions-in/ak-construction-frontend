import { Link } from 'react-router-dom';

const Footer = () => {
  const phoneNumber = "9747552036"; // Replace with actual number

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    window.open(`https://wa.me/${phoneNumber}?text=Hi%20I%20want%20to%20discuss%20a%20project`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="footer pt-5 pb-4">
      <div className="container text-center text-md-left">
        <div className="row text-center text-md-left">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-gold">Adiyapuram Kannan (AK) Constructions</h5>
            <p>We build lasting structures with a modern touch. Combining functionality with aesthetics for the ultimate living and working spaces.</p>
          </div>
          
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold tracking-widest">Links</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/projects">Projects</Link></li>
            </ul>
          </div>
          
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold tracking-widest">Socials</h5>
            <ul className="footer-links">
              <li><a href="#!">Instagram</a></li>
              <li><a href="#!">LinkedIn</a></li>
              <li><a href="#!">Facebook</a></li>
            </ul>
          </div>
          
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold tracking-widest">Contact</h5>
            <p><i className="fas fa-home mr-3"></i>Kannur, Kerala</p>
            <p><i className="fas fa-envelope mr-3"></i> ak.construktions@gmail.com</p>
            <p><i className="fas fa-phone mr-3"></i>9747552036</p>
            <button 
                onClick={handleWhatsAppClick} 
                className="btn btn-outline-gold mt-3 w-100 d-flex align-items-center justify-content-center gap-2"
              >
                {/* WhatsApp Icon */}
                <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.893.755 5.714 2.188 8.193L.093 32l7.593-2.06A15.94 15.94 0 0 0 16 32c8.836 0 16-7.164 16-16.004C32 7.56 24.836.396 16 .396zm0 29.166a13.09 13.09 0 0 1-6.662-1.83l-.476-.282-4.51 1.223 1.205-4.396-.31-.452A13.07 13.07 0 0 1 2.91 16c0-7.224 5.866-13.09 13.09-13.09 7.224 0 13.09 5.866 13.09 13.09 0 7.224-5.866 13.09-13.09 13.09zm7.396-9.77c-.404-.202-2.39-1.178-2.76-1.31-.37-.134-.64-.202-.91.202-.27.404-1.04 1.31-1.274 1.58-.234.27-.47.304-.874.102-.404-.202-1.707-.63-3.252-2.01-1.202-1.07-2.014-2.39-2.248-2.794-.234-.404-.025-.622.176-.824.18-.178.404-.47.606-.706.202-.234.27-.404.404-.672.134-.27.067-.506-.034-.708-.102-.202-.91-2.19-1.246-3.002-.328-.788-.662-.68-.91-.692l-.776-.014c-.27 0-.708.102-1.08.506-.37.404-1.414 1.382-1.414 3.37 0 1.99 1.45 3.91 1.65 4.18.202.27 2.85 4.354 6.91 6.1.966.416 1.72.664 2.306.85.97.31 1.852.266 2.55.162.778-.116 2.39-.976 2.726-1.92.336-.944.336-1.754.234-1.92-.102-.168-.37-.27-.776-.472z"/>
                </svg>

                Message us on WhatsApp
              </button>
          </div>
        </div>
        
        <hr className="mb-4" />
        
        <div className="row align-items-center">
          <div className="col-md-3 col-lg-11">
            <p>© {new Date().getFullYear()} All rights reserved @ AK Construktions .</p>
            <p>Made in india Made with ❤️ by <a href="https://github.com/Harshan-mv">Harshan MV</a></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
