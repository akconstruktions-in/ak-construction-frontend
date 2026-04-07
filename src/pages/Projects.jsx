import { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import ProjectCardExpandable from '../components/ProjectCardExpandable';
import SkeletonCard from '../components/SkeletonCard';
import { fetchProjects } from '../services/api';
import { Helmet } from "react-helmet";
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetchProjects();
        setProjects(res.data);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleToggle = (id) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  const completedProjects = projects.filter(p => p.status === 'completed');
  const ongoingProjects = projects.filter(p => p.status === 'ongoing');

  return (
    <div>
    <Helmet>
      <title>Modern House Design Kannur | Our Projects</title>
      <meta name="description" content="Explore modern house design projects in Kannur by AK Constructions, showcasing innovative and affordable architecture." />
    </Helmet>
    <section className="hero-common bg-dark-custom text-white py-5">

  <img src="/logo-gold-2.png" className="hero-logo-bg" alt="logo" />

  <div className="container py-5">
    <div className="row">
      <div className="col-md-8">
        <h1 className="display-4 fw-bold">Our Portfolio</h1>
        <p className="lead opacity-75">
          Explore our most recent architectural projects across residential and commercial sectors.
        </p>
        <p>
          Explore modern house projects in Kannur by AK Constructions.
        </p>
      </div>
    </div>
  </div>
</section>
          
      <section className="section-padding container">
        {loading ? (
          <div className="row g-4 mt-3">
            {[1, 2, 3, 4].map(i => (
              <div className="col-md-6 mb-4" key={i}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="mb-5 pb-4 border-bottom">
              <SectionTitle title="Completed Projects" subtitle="Finished Works" />
              <div className="row g-4 mt-3">
                {completedProjects.length > 0 ? completedProjects.map(project => (
                  <div className="col-md-6 mb-4" key={project._id}>
                    <ProjectCardExpandable 
                      project={project} 
                      isExpanded={expandedId === project._id} 
                      onToggle={() => handleToggle(project._id)} 
                    />
                  </div>
                )) : (
                  <p className="text-muted">No completed projects to display.</p>
                )}
              </div>
            </div>

            <div className="pt-2">
              <SectionTitle title="Ongoing Projects" subtitle="In Progress" />
              <div className="row g-4 mt-3">
                {ongoingProjects.length > 0 ? ongoingProjects.map(project => (
                  <div className="col-md-6 mb-4" key={project._id}>
                    <ProjectCardExpandable 
                      project={project} 
                      isExpanded={expandedId === project._id} 
                      onToggle={() => handleToggle(project._id)} 
                    />
                  </div>
                )) : (
                  <p className="text-muted">No ongoing projects to display.</p>
                )}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Projects;
