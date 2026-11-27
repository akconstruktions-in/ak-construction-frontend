import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import SERVICES from '../data/services';
import { getCachedSnapshot, fetchProjects } from '../services/api';

const Services = () => {
  const cached = getCachedSnapshot();
  const [projects, setProjects] = useState(cached?.projects || []);

  useEffect(() => {
    fetchProjects()
      .then((res) => setProjects(res.data || []))
      .catch(() => {});
  }, []);

  const getServicePhoto = (svc) => {
    const match = projects.find(
      (p) =>
        p.category &&
        (p.category.toLowerCase() === svc.title.toLowerCase() ||
          p.category.toLowerCase() === svc.slug.toLowerCase())
    );
    return match?.imageUrl || svc.image;
  };

  return (
    <div>
      <Helmet>
        <title>Services — Home Construction, Renovation &amp; Commercial Work | AK Constructions</title>
        <meta
          name="description"
          content="Complete house construction, full house renovation, real estate, commercial buildings, foundation, piling, and interior finishing services by AK Constructions."
        />
        <link rel="canonical" href="https://www.akconstructionbyraju.com/services" />
      </Helmet>

      {/* Page Header */}
      <section className="py-5" style={{ background: 'var(--n-900)', color: '#fff' }}>
        <div className="container py-4">
          <span className="section-label" style={{ color: '#f5d284' }}>Services</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', color: '#fff', marginBottom: '12px' }}>
            Our Services
          </h1>
          <p style={{ color: 'var(--n-300)', maxWidth: '620px', marginBottom: 0 }}>
            Full house construction, commercial buildings, and complete renovation work across Kannur and Kerala.
          </p>
        </div>
      </section>

      {/* All 16 Services Grid */}
      <section className="section-pad">
        <div className="container">
          <SectionTitle title="What We Do" subtitle="Complete Building Services" />

          <div className="row g-4">
            {SERVICES.map((svc) => {
              const photo = getServicePhoto(svc);
              return (
                <div className="col-md-6 col-lg-4" key={svc.slug}>
                  <Link to={`/services/${svc.slug}`} className="card-ak d-block text-decoration-none h-100">
                    <div className="img-3x2">
                      <img src={photo} alt={svc.title} loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '8px' }}>
                        {svc.title}
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                        {svc.desc}
                      </p>
                      <span className="d-inline-flex align-items-center gap-1" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--accent)' }}>
                        View Service <ArrowRight size={14} strokeWidth={1.5} />
                      </span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Banner */}
      <section className="section-pad" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <SectionTitle title="How We Work" subtitle="Our Process" />
          <div className="img-16x9 mb-5">
            <img src="/media/concept-to-dream.webp" alt="From consultation to handover" loading="lazy" />
          </div>
          <div className="row g-4">
            {[
              { title: '1. Consultation', text: 'We visit your site, understand your requirements, and review drawings or renovation scope.' },
              { title: '2. Estimate', text: 'You receive a clear, itemised quotation with material specifications and project timeline.' },
              { title: '3. Execution', text: 'Our engineers and skilled trades execute every stage with regular supervision and quality checks.' },
              { title: '4. Handover', text: 'We complete final finishing, testing, and site cleaning before handing over your ready building.' },
            ].map((step) => (
              <div className="col-md-6 col-lg-3" key={step.title}>
                <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '8px' }}>{step.title}</h5>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
