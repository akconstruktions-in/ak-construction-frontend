import SectionTitle from '../components/SectionTitle';
import { Helmet } from "react-helmet";
const About = () => {
  return (
    <div>
      <Helmet>
  <title>Affordable Architect in Kannur | About AK Constructions</title>
  <meta name="description" content="Learn about AK Constructions, an affordable architect in Kannur delivering creative and functional home designs across Kerala." />
</Helmet>
      {/* HERO SECTION */}
      <section className="bg-dark-custom text-white py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-md-8">
              <h1 className="display-4 fw-bold">About Us</h1>
              <p className="lead opacity-75">
                From a small village dream to designing modern living spaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="section-padding container">
        <SectionTitle title="Our Story" subtitle="Foundation" />

        <div className="row align-items-center">

          {/* LEFT SIDE - TEXT */}
          <div className="col-md-6">
            <h4 className="fw-bold mb-3">
              Every structure begins with a story…
            </h4>

            <p className="text-muted mb-3">
              In a quiet village, surrounded by simple homes and open skies, a young boy
              once stood watching buildings rise—not just as structures, but as dreams
              taking shape.
            </p>

            <p className="text-muted mb-3">
              With no luxury, no advanced tools—only curiosity and imagination—he began
              sketching. Walls, windows, spaces… not perfectly, but passionately.
            </p>

            <p className="text-muted mb-3">
              Years later, that same passion evolved into a vision—to design spaces that
              are not just built, but felt. Spaces that combine functionality,
              aesthetics, and emotion.
            </p>

            <p className="fw-semibold">
              Today, AK Constructions stands on that very foundation—turning ideas into
              meaningful spaces where people live, work, and create memories.
            </p>

            What started as a village dream has grown into becoming an affordable architect in Kannur trusted by many families.
          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="col-md-6 text-center">
            <img
                src="/pic-about3.png"
                alt="About AK Constructions"
                className="img-fluid rounded shadow"
                style={{
                  width: "100%",
                  height: "85%",
                  minHeight: "450px",
                  objectFit: "cover"
                }}
              />
          </div>
        </div>
       
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="bg-light section-padding">
        <div className="container">
          <SectionTitle title="Our Philosophy" subtitle="What Drives Us" />

          <div className="row g-4 mt-3">

            <div className="col-md-4">
              <h5 className="fw-bold">Purposeful Design</h5>
              <p className="text-muted">
                Every line we draw has intent—balancing beauty with usability.
              </p>
            </div>

            <div className="col-md-4">
              <h5 className="fw-bold">Human-Centered Spaces</h5>
              <p className="text-muted">
                We design for people first, creating environments that enhance everyday life.
              </p>
            </div>

            <div className="col-md-4">
              <h5 className="fw-bold">Timeless Aesthetics</h5>
              <p className="text-muted">
                Our designs go beyond trends, focusing on lasting impact and elegance.
              </p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default About;