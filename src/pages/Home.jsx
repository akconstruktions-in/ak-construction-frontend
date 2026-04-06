import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import SectionTitle from '../components/SectionTitle';
import ProjectCard from '../components/ProjectCard';
import TestimonialCard from '../components/TestimonialCard';
import MemberCard from '../components/MemberCard';
import SkeletonCard from '../components/SkeletonCard';
import { fetchProjects, fetchTestimonials, fetchMembers } from '../services/api';
import { Helmet } from "react-helmet";

// Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';



const Home = () => {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsRes, testimonialsRes, membersRes] = await Promise.all([
          fetchProjects(),
          fetchTestimonials(),
          fetchMembers()
        ]);
        
        setProjects(projectsRes.data);
        setTestimonials(testimonialsRes.data);
        setMembers(membersRes.data);
      } catch (error) {
        console.error("Failed to load home page data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="container py-5 mt-5">
        <div className="row g-4 mt-5 pt-5">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div className="col-md-4 mb-4" key={i}>
              <SkeletonCard />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Best Architect in Kannur | AK Constructions</title>
        <meta name="description" content="Best architect in Kannur offering modern house design, affordable architecture, and premium construction services across Malabar." />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "AK Constructions",
            "areaServed": "Kannur, Kerala",
            "telephone": "+91 9747552036"
          }
          `}
        </script>
      </Helmet>
      <Hero />

      {/* About Section */}
      <section className="section-padding bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <SectionTitle 
                title="Designing the Future, Preserving the Past" 
                subtitle="About AK Constructions" 
              />
              <p className="text-muted mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                We are a collective of architects, designers, and engineers dedicated to creating spaces that inspire. With over a decade of experience in residential and commercial design, we bridge the gap between aesthetic beauty and everyday functionality.
              </p>
              <div className="row mt-5 mb-4">
                <div className="col-6">
                  <h3 className="text-gold fw-bold mb-0">15+</h3>
                  <span className="text-muted text-uppercase small" style={{ letterSpacing: '1px' }}>Years Experience</span>
                </div>
                <div className="col-6">
                  <h3 className="text-gold fw-bold mb-0">200+</h3>
                  <span className="text-muted text-uppercase small" style={{ letterSpacing: '1px' }}>Projects Completed</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" alt="Office Space" className="img-fluid shadow" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-dark-custom">
        <div className="container">
          <SectionTitle 
            title="Our Expertise" 
            subtitle="Services" 
            centered={true} 
          />
          <p className="text-center">
            We are the best architect in Kannur providing modern house design and architectural services across Malabar
          </p>
          
          <div className="row mt-5">
            {[
              { icon: 'fa-building', title: 'Architecture', desc: 'Comprehensive architectural solutions from concept to construction.' },
              { icon: 'fa-couch', title: 'Interior Design', desc: 'Crafting beautiful, functional spaces tailored to your lifestyle.' },
              { icon: 'fa-leaf', title: 'Urban Planning', desc: 'Sustainable master planning for communities and developments.' },
            ].map((service, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="p-4 border border-secondary border-opacity-25 h-100 hover-bg-gold transition-all text-center">
                  <div className="text-gold mb-4" style={{ fontSize: '2.5rem' }}>
                    {/* Placeholder icon since we aren't loading fontawesome directly, using inline svg instead */}
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                    </svg>
                  </div>
                  <h4 className="mb-3">{service.title}</h4>
                  <p className="opacity-75">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-5">
            <SectionTitle 
              title="Featured Works" 
              subtitle="Portfolio" 
            />
          </div>
          <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={2}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 2 }
              }}
              className="pb-5"
            >
              {projects.map((project) => (
                <SwiperSlide key={project._id}>
                  <ProjectCard project={project} />
                </SwiperSlide>
              ))}
            </Swiper>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-light">
        <div className="container">
          <SectionTitle 
            title="What Our Clients Say" 
            subtitle="Testimonials" 
            centered={true} 
          />
          <div className="row justify-content-center mt-5">
            <div className="col-lg-8">
              <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="pb-5"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial._id}>
                    <TestimonialCard testimonial={testimonial} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="section-padding">
        <div className="container">
          <SectionTitle 
            title="Meet The Architects" 
            subtitle="Our Team" 
            centered={true} 
          />
          <div className="row mt-5">
            {members.map(member => (
              <div className="col-md-4 mb-4" key={member._id}>
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
