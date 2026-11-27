import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Phone, MessageCircle, CheckCircle2, Loader2 } from 'lucide-react';
import SERVICES from '../data/services';
import { submitEnquiry, warmUpBackend } from '../services/api';

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const initialService = searchParams.get('service') || '';

  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: initialService,
    location: '',
    message: '',
    company: '', // honeypot
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | waking | success | error
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    warmUpBackend();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    // If backend takes > 3s (cold start), show friendly waking state
    const wakeTimer = setTimeout(() => {
      setStatus((prev) => (prev === 'submitting' ? 'waking' : prev));
    }, 3000);

    try {
      await submitEnquiry(form);
      clearTimeout(wakeTimer);
      setStatus('success');
      setForm({ name: '', phone: '', service: '', location: '', message: '', company: '' });
    } catch (err) {
      // Auto-retry once in case of cold-start timeout
      try {
        setStatus('waking');
        await submitEnquiry(form);
        clearTimeout(wakeTimer);
        setStatus('success');
        setForm({ name: '', phone: '', service: '', location: '', message: '', company: '' });
      } catch (retryErr) {
        clearTimeout(wakeTimer);
        setStatus('error');
        setErrorMsg(
          retryErr.response?.data?.message ||
          'Server is taking longer than expected. Please message us directly on WhatsApp or call.'
        );
      }
    }
  };

  const whatsappFallbackUrl = `https://wa.me/919747552036?text=${encodeURIComponent(
    `Hi, I am ${form.name || 'interested in a project'}. Service: ${form.service || 'General'}. Location: ${form.location || 'Kerala'}. ${form.message || ''}`
  )}`;

  return (
    <div>
      <Helmet>
        <title>Book Appointment | AK Constructions</title>
        <meta
          name="description"
          content="Book a site visit or request an estimate for new home construction, renovation, or commercial building work with AK Constructions in Kannur."
        />
        <link rel="canonical" href="https://www.akconstructionbyraju.com/book-appointment" />
      </Helmet>

      <section className="py-5" style={{ background: 'var(--n-900)', color: '#fff' }}>
        <div className="container py-4">
          <span className="section-label" style={{ color: '#f5d284' }}>Contact</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', color: '#fff', marginBottom: '12px' }}>
            Book Appointment
          </h1>
          <p style={{ color: 'var(--n-300)', maxWidth: '580px', marginBottom: 0 }}>
            Share your site details and required service. We respond quickly by phone or WhatsApp.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              {status === 'success' ? (
                <div className="card-ak p-5 text-center">
                  <CheckCircle2 size={40} strokeWidth={1.5} style={{ color: '#1e6b36', margin: '0 auto 16px' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', marginBottom: '8px' }}>Enquiry Received</h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
                    Thank you. Our team will contact you shortly on your phone number.
                  </p>
                  <button type="button" className="btn-outline-ak" onClick={() => setStatus('idle')}>
                    Send Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card-ak p-4 p-md-5">
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '20px' }}>
                    Project Enquiry
                  </h3>

                  {/* Honeypot field — hidden from humans */}
                  <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label" style={{ fontSize: '14px', fontWeight: 500 }}>Your Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Full name"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" style={{ fontSize: '14px', fontWeight: 500 }}>Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        className="form-control"
                        required
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="10-digit mobile number"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" style={{ fontSize: '14px', fontWeight: 500 }}>Service Required</label>
                      <select
                        className="form-select"
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                      >
                        <option value="">Select a service</option>
                        {SERVICES.map((s) => (
                          <option key={s.slug} value={s.title}>{s.title}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" style={{ fontSize: '14px', fontWeight: 500 }}>Site Location</label>
                      <input
                        type="text"
                        className="form-control"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        placeholder="City / District"
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label" style={{ fontSize: '14px', fontWeight: 500 }}>Project Details</label>
                      <textarea
                        className="form-control"
                        rows="4"
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Brief scope, plot size, or timeline"
                      />
                    </div>
                  </div>

                  {status === 'waking' && (
                    <div className="mt-3 p-3 d-flex align-items-center gap-2" style={{ background: 'var(--accent-subtle)', borderRadius: 'var(--r-md)', fontSize: '14px' }}>
                      <Loader2 size={16} className="spin" /> Waking up the server, one moment…
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="mt-3 p-3" style={{ background: '#fdecec', color: '#8f1f1f', borderRadius: 'var(--r-md)', fontSize: '14px' }}>
                      {errorMsg}
                    </div>
                  )}

                  <div className="mt-4 d-flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="btn-primary-ak"
                      disabled={status === 'submitting' || status === 'waking'}
                    >
                      {status === 'submitting' || status === 'waking' ? 'Sending…' : 'Submit Enquiry'}
                    </button>
                    <a
                      href={whatsappFallbackUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline-ak"
                    >
                      <MessageCircle size={15} strokeWidth={1.5} /> Send via WhatsApp
                    </a>
                  </div>
                </form>
              )}
            </div>

            {/* Direct Contact Sidebar */}
            <div className="col-lg-5">
              <div className="p-4 p-md-5" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '12px' }}>
                  Prefer Direct Contact?
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                  Call or WhatsApp Raju directly for immediate assistance on piling, foundation or structural projects.
                </p>
                <div className="d-flex flex-column gap-3">
                  <a href="tel:+919747552036" className="btn-primary-ak justify-content-center">
                    <Phone size={16} strokeWidth={1.5} /> Call Raju mv +91 9747552036
                  </a>
                  <a
                    href={whatsappFallbackUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-ak justify-content-center"
                  >
                    <MessageCircle size={16} strokeWidth={1.5} /> WhatsApp Us
                  </a>
                </div>
                <hr className="my-4" />
                <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <div><strong>Office:</strong> Kannur, Kerala</div>
                  <div><strong>Email:</strong> ak.construktions@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;
