import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import TestimonialCard from '../components/TestimonialCard';
import MemberCard from '../components/MemberCard';
import SkeletonCard from '../components/SkeletonCard';
import SERVICES from '../data/services';
import useReveal from '../hooks/useReveal';
import {
  getCachedSnapshot,
  fetchPublicData,
  warmUpBackend,
} from '../services/api';

const Home = () => {
  const cached = getCachedSnapshot();
  const [projects, setProjects] = useState(cached?.projects || []);
  const [testimonials, setTestimonials] = useState(cached?.testimonials || []);
  const [members, setMembers] = useState(cached?.members || []);
  const [loading, setLoading] = useState(!cached);
  const revealRef = useReveal();

  useEffect(() => {
    warmUpBackend();
    let mounted = true;

    fetchPublicData()
      .then((data) => {
        if (!mounted) return;
        setProjects(data.projects);
        setTestimonials(data.testimonials);
        setMembers(data.members);
      })
      .catch(() => { })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => { mounted = false; };
  }, []);

  const heroImages = useMemo(() => {
    // Use local public images (fallback) instead of remote Cloudinary URLs
    // Add any additional images placed in public/media/ as needed
    return ['/media/about-studio.webp'];
  }, []);


  // Pick a project photo for a service if tagged, else use service placeholder
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
    <div ref={revealRef}>
      <Helmet>
        <title>AK Constructions — Home Construction, Commercial Buildings &amp; Renovation in Kannur</title>
        <meta
          name="description"
          content="General building contractors in Kannur, Kerala for new home construction, full house renovation, commercial buildings, and finishing works."
        />
        <link rel="canonical" href="https://www.akconstructionbyraju.com/" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Adiyapuram Kannan (AK) Constructions',
            url: 'https://www.akconstructionbyraju.com',
            telephone: '+91 9747552036',
            email: 'ak.construktions@gmail.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Kannur',
              addressRegion: 'Kerala',
              addressCountry: 'IN',
            },
            areaServed: 'Kerala',
          })}
        </script>
      </Helmet>

      <Hero heroImages={heroImages} />

      {/* Stats Strip */}
      <section style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="container py-4">
          <div className="row g-4 text-center text-md-start">
            <div className="col-4">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--accent)', lineHeight: 1 }}>
                15+
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Years Experience
              </div>
            </div>
            <div className="col-4">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--accent)', lineHeight: 1 }}>
                200+
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Projects Completed
              </div>
            </div>
            <div className="col-4">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--accent)', lineHeight: 1 }}>
                Kannur
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Kerala
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-pad">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 reveal">
              <SectionTitle
                title="Designing the Future, Preserving the Past"
                subtitle="About AK Constructions"
              />
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '24px' }}>
                We are a collective of architects, designers, and engineers dedicated to creating spaces that inspire. With over a decade of experience in residential and commercial construction, we bridge the gap between aesthetic beauty and everyday functionality.
              </p>
              <Link to="/about" className="btn-outline-ak">
                Read Our Story <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
            </div>
            <div className="col-lg-6 reveal">
              <div className="img-3x2">
                <img
                  src="/media/about-studio.webp"
                  alt="AK Constructions studio and site work"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-pad" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
            <div>
              <span className="section-label">Services</span>
              <h2 className="section-heading mb-0">Our Expertise</h2>
            </div>
            <Link to="/services" className="btn-outline-ak">
              All {SERVICES.length} Services <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>

          <div className="row g-4">
            {SERVICES.slice(0, 6).map((svc) => {
              const photo = getServicePhoto(svc);
              return (
                <div className="col-md-6 col-lg-4 reveal" key={svc.slug}>
                  <Link to={`/services/${svc.slug}`} className="card-ak d-block text-decoration-none h-100">
                    <div className="img-3x2">
                      <img src={photo} alt={svc.title} loading="lazy" />
                    </div>
                    <div className="p-4">
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', marginBottom: '6px' }}>
                        {svc.title}
                      </h4>
                      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
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

      {/* Projects Section */}
      <section className="section-pad">
        <div className="container">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
            <div>
              <span className="section-label">Portfolio</span>
              <h2 className="section-heading mb-0">Featured Works</h2>
            </div>
            <Link to="/projects" className="btn-outline-ak">
              View All Projects <ArrowRight size={15} strokeWidth={1.5} />
            </Link>
          </div>

          {loading ? (
            <div className="row g-4">
              {[1, 2, 3].map((i) => (
                <div className="col-md-4" key={i}>
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={2}
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="pb-5"
            >
              {projects.map((project) => (
                <SwiperSlide key={project._id}>
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <p style={{ color: 'var(--text-secondary)' }}>Projects will appear here shortly.</p>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="section-pad" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <SectionTitle title="What Our Clients Say" subtitle="Testimonials" centered />
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  spaceBetween={24}
                  slidesPerView={1}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  className="pb-5"
                >
                  {testimonials.map((t) => (
                    <SwiperSlide key={t._id}>
                      <TestimonialCard testimonial={t} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team Members Section */}
      {members.length > 0 && (
        <section className="section-pad">
          <div className="container">
            <SectionTitle title="Meet The Team" subtitle="Our Team" centered />
            <div className="row g-4 justify-content-center">
              {members.map((member) => (
                <div className="col-md-4 col-lg-3" key={member._id}>
                  <MemberCard member={member} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA Strip */}
      <section className="section-pad" style={{ background: 'var(--n-900)', color: '#fff' }}>
        <div className="container text-center">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(30px, 5vw, 48px)', color: '#fff', marginBottom: '16px' }}>
            Planning a Home, Renovation, or Commercial Build?
          </h2>
          <p style={{ color: 'var(--n-300)', maxWidth: '520px', margin: '0 auto 28px', fontSize: '16px' }}>
            Talk directly with our team in Kannur for site assessment, estimates and scheduling.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
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
            <a href="tel:+919747552036" className="btn-outline-light-ak">
              <Phone size={16} strokeWidth={1.5} /> +91 9747552036 -Raju mv
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
