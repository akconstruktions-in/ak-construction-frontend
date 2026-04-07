import SectionTitle from '../components/SectionTitle';
import { Helmet } from "react-helmet";
const Services = () => {
  return (
    <div>
      <Helmet>
  <title>Architectural Services in Malabar | AK Constructions</title>
  <meta name="description" content="Professional architectural services in Malabar including home design, interior design, and construction planning." />
</Helmet>
<section className="hero-common bg-dark-custom text-white py-5">

  <img src="/logo-gold-2.png" className="hero-logo-bg" alt="logo" />

  <div className="container py-5 position-relative">
    <div className="row">
      <div className="col-md-8">
        <h1 className="display-4 fw-bold">Our Services</h1>
        <p className="lead opacity-75">
          Turning ideas into timeless architectural experiences.
        </p>
        <p>
          We provide complete architectural services in Malabar, from concept to final construction.
        </p>
      </div>
    </div>
  </div>

</section>
      {/* SERVICES SECTION */}
      <section className="section-padding container">
        <SectionTitle title="What We Do" subtitle="Expertise" />

        {/* IMAGE */}
        <div className="w-100 mb-5">
          <img
              src="/concept-to-dream.png"
              alt=""
              style={{
                width: "100%",
                height: "auto",
                display: "block"
              }}
           />
        </div>

        {/* SERVICE PHASES */}
        <div className="row g-4">

          <div className="col-md-4">
            <h5 className="fw-bold">Initial Concept</h5>
            <p className="text-muted">
              We transform your vision into sketches and structured ideas through detailed client discussions.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">Design Development</h5>
            <p className="text-muted">
              Advanced 3D modeling and material selection bring your concept to life with precision.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">Construction Documents</h5>
            <p className="text-muted">
              Detailed blueprints and technical documentation ensure flawless execution.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">Bidding & Planning</h5>
            <p className="text-muted">
              We handle contractor selection, budgeting, and regulatory approvals seamlessly.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">Construction</h5>
            <p className="text-muted">
              From groundwork to structure, we manage every stage with quality and precision.
            </p>
          </div>

          <div className="col-md-4">
            <h5 className="fw-bold">Final Handover</h5>
            <p className="text-muted">
              We deliver a polished space with landscaping, interiors, and finishing touches ready for use.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Services;