import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, ArrowRight, MessageCircle, Check } from 'lucide-react';
import SERVICES from '../data/services';
import ProjectCard from '../components/ProjectCard';
import { getCachedSnapshot, fetchProjects } from '../services/api';

const HOW_WE_WORK = [
  { step: '01', title: 'Consultation', desc: 'Site inspection and discussion of your requirements, plot conditions, and budget.' },
  { step: '02', title: 'Estimate', desc: 'Clear, transparent itemised quote with material standards and realistic timeline.' },
  { step: '03', title: 'Execution', desc: 'Dedicated supervision across every stage with consistent workmanship and safety.' },
  { step: '04', title: 'Handover', desc: 'Final walkthrough, testing of all fittings, and clean handover on schedule.' },
];

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = SERVICES.find((s) => s.slug === slug);

  const cached = getCachedSnapshot();
  const [projects, setProjects] = useState(cached?.projects || []);

  useEffect(() => {
    fetchProjects()
      .then((res) => setProjects(res.data || []))
      .catch(() => {});
  }, []);

  if (!service) {
    return (
      <div className="container section-pad text-center">
        <h1 style={{ fontFamily: 'var(--font-display)' }}>Service Not Found</h1>
        <p style={{ color: 'var(--text-secondary)' }}>The requested service page does not exist.</p>
        <Link to="/services" className="btn-primary-ak mt-3">
          <ArrowLeft size={16} strokeWidth={1.5} /> Back to Services
        </Link>
      </div>
    );
  }

  const taggedProjects = projects.filter(
    (p) =>
      p.category &&
      (p.category.toLowerCase() === service.title.toLowerCase() ||
        p.category.toLowerCase() === service.slug.toLowerCase())
  );

  const heroPhoto = taggedProjects[0]?.imageUrl || service.image || '/media/about-studio.webp';

  return (
    <div>
      <Helmet>
        <title>{service.title} | AK Constructions</title>
        <meta name="description" content={service.desc} />
        <link rel="canonical" href={`https://www.akconstructionbyraju.com/services/${service.slug}`} />
      </Helmet>

      {/* Hero */}
      <section className="position-relative py-5" style={{ background: 'var(--n-900)', color: '#fff', overflow: 'hidden' }}>
        <img
          src={heroPhoto}
          alt={service.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
        />
        <div className="container position-relative py-5" style={{ zIndex: 2 }}>
          <Link to="/services" className="d-inline-flex align-items-center gap-1 text-decoration-none mb-3" style={{ color: 'var(--n-300)', fontSize: '14px' }}>
            <ArrowLeft size={15} strokeWidth={1.5} /> All Services
          </Link>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(34px, 5vw, 54px)', color: '#fff', marginBottom: '14px' }}>
            {service.title}
          </h1>
          <p style={{ color: 'var(--n-200)', maxWidth: '640px', fontSize: '17px', marginBottom: '28px' }}>
            {service.intro || service.desc}
          </p>
          <div className="d-flex flex-wrap gap-3">
            <Link to={`/book-appointment?service=${encodeURIComponent(service.title)}`} className="btn-primary-ak">
              Book Appointment <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
            <a
              href={`https://wa.me/919747552036?text=${encodeURIComponent(`Hi, I want to enquire about ${service.title}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-light-ak"
            >
              <MessageCircle size={15} strokeWidth={1.5} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* What We Do + Image */}
      <section className="section-pad">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <span className="section-label">Scope of Work</span>
              <h2 className="section-heading">What We Do</h2>
              <ul className="list-unstyled d-flex flex-column gap-3 mt-4 mb-0">
                {(service.whatWeDo || []).map((item, idx) => (
                  <li key={idx} className="d-flex align-items-start gap-3">
                    <span
                      className="d-inline-flex align-items-center justify-content-center flex-shrink-0 mt-1"
                      style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: 'var(--accent-subtle)',
                        color: 'var(--accent)',
                      }}
                    >
                      <Check size={14} strokeWidth={2} />
                    </span>
                    <span style={{ fontSize: '15px', color: 'var(--text-primary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <div className="img-3x2">
                <img src={heroPhoto} alt={service.title} loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="section-pad" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <span className="section-label">Process</span>
          <h2 className="section-heading mb-4">How We Work</h2>
          <div className="row g-4">
            {HOW_WE_WORK.map((item) => (
              <div className="col-md-6 col-lg-3" key={item.step}>
                <div className="card-ak p-4 h-100">
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--accent)', display: 'block', marginBottom: '8px' }}>
                    {item.step}
                  </span>
                  <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '8px' }}>
                    {item.title}
                  </h5>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tagged Projects */}
      <section className="section-pad">
        <div className="container">
          <h2 className="section-heading mb-4">Projects Featuring {service.title}</h2>
          {taggedProjects.length > 0 ? (
            <div className="row g-4">
              {taggedProjects.map((project) => (
                <div className="col-md-6 col-lg-4" key={project._id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
              <p className="mb-3" style={{ color: 'var(--text-secondary)' }}>
                Contact us to discuss your {service.title.toLowerCase()} requirements or to visit our recent sites in Kannur.
              </p>
              <Link to={`/book-appointment?service=${encodeURIComponent(service.title)}`} className="btn-primary-ak">
                Book Appointment <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
