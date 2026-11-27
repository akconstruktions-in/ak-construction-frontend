import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, MapPin, Calendar, User, Layers, X, MessageCircle } from 'lucide-react';
import { getCachedSnapshot, fetchProject } from '../services/api';

const ProjectDetail = () => {
  const { id } = useParams();
  const cached = getCachedSnapshot();
  const cachedProj = cached?.projects?.find((p) => p._id === id) || null;

  const [project, setProject] = useState(cachedProj);
  const [loading, setLoading] = useState(!cachedProj);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    fetchProject(id)
      .then((res) => setProject(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="container section-pad">
        <div className="skel mb-4" style={{ height: '420px', borderRadius: 'var(--r-lg)' }} />
        <div className="skel mb-3" style={{ height: '32px', width: '50%' }} />
        <div className="skel" style={{ height: '16px', width: '80%' }} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container section-pad text-center">
        <h1 style={{ fontFamily: 'var(--font-display)' }}>Project Not Found</h1>
        <Link to="/projects" className="btn-primary-ak mt-3">
          <ArrowLeft size={16} strokeWidth={1.5} /> Back to Projects
        </Link>
      </div>
    );
  }

  const allPhotos = [
    { imageUrl: project.imageUrl, caption: project.title },
    ...(project.gallery || []),
  ];

  return (
    <div>
      <Helmet>
        <title>{project.title} | AK Constructions</title>
        <meta name="description" content={project.description} />
        <link rel="canonical" href={`https://www.akconstructionbyraju.com/projects/${project._id}`} />
      </Helmet>

      <div className="container section-pad">
        <Link to="/projects" className="d-inline-flex align-items-center gap-1 text-decoration-none mb-4" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          <ArrowLeft size={15} strokeWidth={1.5} /> All Projects
        </Link>

        <div className="row g-5">
          <div className="col-lg-7">
            <div
              className="img-3x2 mb-3"
              style={{ cursor: 'zoom-in' }}
              onClick={() => setLightboxImg(project.imageUrl)}
            >
              <img src={project.imageUrl} alt={project.title} />
            </div>

            {allPhotos.length > 1 && (
              <div className="row g-2">
                {allPhotos.map((img, idx) => (
                  <div className="col-4 col-md-3" key={idx}>
                    <div
                      className="img-3x2"
                      style={{ cursor: 'zoom-in' }}
                      onClick={() => setLightboxImg(img.imageUrl)}
                    >
                      <img src={img.imageUrl} alt={img.caption || `${project.title} ${idx + 1}`} loading="lazy" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-lg-5">
            <span
              className="d-inline-block px-2 py-1 mb-3"
              style={{
                fontSize: '12px',
                fontWeight: 500,
                borderRadius: 'var(--r-sm)',
                background: project.status === 'completed' ? '#eaf4ec' : 'var(--accent-subtle)',
                color: project.status === 'completed' ? '#1e6b36' : 'var(--accent-hover)',
              }}
            >
              {project.status === 'completed' ? 'Completed' : 'Ongoing'}
            </span>

            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>
              {project.title}
            </h1>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '24px' }}>
              {project.description}
            </p>

            {project.scope && (
              <div className="mb-4 p-3" style={{ background: 'var(--bg-surface)', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Scope of Work</div>
                <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{project.scope}</div>
              </div>
            )}

            <div className="d-flex flex-column gap-3 mb-4 py-3" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
              {project.place && (
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '14px' }}>
                  <MapPin size={16} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Location:</span>
                  <strong>{project.place}</strong>
                </div>
              )}
              {project.ownerName && (
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '14px' }}>
                  <User size={16} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Client:</span>
                  <strong>{project.ownerName}</strong>
                </div>
              )}
              {project.timeline && (
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '14px' }}>
                  <Calendar size={16} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Timeline:</span>
                  <strong>{project.timeline}</strong>
                </div>
              )}
              {project.category && (
                <div className="d-flex align-items-center gap-2" style={{ fontSize: '14px' }}>
                  <Layers size={16} strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>Service:</span>
                  <strong>{project.category}</strong>
                </div>
              )}
            </div>

            <div className="d-flex flex-wrap gap-2">
              <Link to="/book-appointment" className="btn-primary-ak">
                Enquire Similar Project
              </Link>
              <a
                href={`https://wa.me/919747552036?text=${encodeURIComponent(`Hi, I saw "${project.title}" and want to discuss a similar project.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-ak"
              >
                <MessageCircle size={15} strokeWidth={1.5} /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
          style={{ background: 'rgba(0,0,0,0.9)', zIndex: 3000 }}
          onClick={() => setLightboxImg(null)}
        >
          <button
            type="button"
            className="btn btn-link position-absolute top-0 end-0 m-3 text-white"
            onClick={() => setLightboxImg(null)}
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>
          <img
            src={lightboxImg}
            alt={project.title}
            style={{ maxHeight: '90vh', maxWidth: '92vw', objectFit: 'contain', borderRadius: 'var(--r-md)' }}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
