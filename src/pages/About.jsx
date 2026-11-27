import { Helmet } from 'react-helmet';
import SectionTitle from '../components/SectionTitle';

const About = () => {
  return (
    <div>
      <Helmet>
        <title>About AK Constructions | Kannur, Kerala</title>
        <meta
          name="description"
          content="Learn about AK Constructions, delivering piling, foundation, structural and home construction across Kannur and India."
        />
        <link rel="canonical" href="https://www.akconstructionbyraju.com/about" />
      </Helmet>

      {/* Header */}
      <section className="py-5" style={{ background: 'var(--n-900)', color: '#fff' }}>
        <div className="container py-4">
          <span className="section-label" style={{ color: '#f5d284' }}>About Us</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', color: '#fff', marginBottom: '12px' }}>
            About Us
          </h1>
          <p style={{ color: 'var(--n-300)', maxWidth: '580px', marginBottom: 0 }}>
            From a small village dream to designing modern living spaces.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-pad">
        <div className="container">
          <SectionTitle title="Our Story" subtitle="Foundation" />

          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '16px' }}>
                Every structure begins with a story…
              </h4>
              <p style={{ color: 'var(--text-secondary)' }}>
                In a quiet village, surrounded by simple homes and open skies, a young boy once stood watching buildings rise—not just as structures, but as dreams taking shape.
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                With no luxury, no advanced tools—only curiosity and imagination—he began sketching. Walls, windows, spaces… not perfectly, but passionately.
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                Years later, that same passion evolved into a vision—to design spaces that are not just built, but felt. Spaces that combine functionality, aesthetics, and emotion.
              </p>
              <p style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                Today, AK Constructions stands on that very foundation—turning ideas into meaningful spaces where people live, work, and create memories.
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
                What started as a village dream has grown into becoming an affordable architect in Kannur trusted by many families.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="img-3x2">
                <img
                  src="/media/about-studio.webp"
                  alt="About AK Constructions"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-pad" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <SectionTitle title="Our Philosophy" subtitle="What Drives Us" />

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card-ak p-4 h-100">
                <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '8px' }}>
                  Purposeful Design
                </h5>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 0 }}>
                  Every line we draw has intent—balancing beauty with usability.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-ak p-4 h-100">
                <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '8px' }}>
                  Human-Centered Spaces
                </h5>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 0 }}>
                  We design for people first, creating environments that enhance everyday life.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card-ak p-4 h-100">
                <h5 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '8px' }}>
                  Timeless Aesthetics
                </h5>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: 0 }}>
                  Our designs go beyond trends, focusing on lasting impact and elegance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
