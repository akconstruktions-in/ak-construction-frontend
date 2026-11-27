import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, MapPin, ArrowRight } from 'lucide-react';

const ProjectCardExpandable = ({ project, isExpanded, onToggle }) => {
  return (
    <div className="card-ak h-100 d-flex flex-column">
      <div
        className="img-3x2"
        onClick={onToggle}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(); }}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
        />
      </div>

      <div className="p-4 flex-grow-1 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span
            className="px-2 py-1"
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
          {project.place && (
            <span className="d-inline-flex align-items-center gap-1" style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              <MapPin size={13} strokeWidth={1.5} /> {project.place}
            </span>
          )}
        </div>

        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '8px' }}>
          {project.title}
        </h4>

        {isExpanded && (
          <div className="mt-2 mb-3">
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
              {project.description}
            </p>
            <div className="row g-3 mb-3">
              <div className="col-6">
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Location</div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{project.place || 'N/A'}</div>
              </div>
              <div className="col-6">
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Client</div>
                <div style={{ fontSize: '14px', fontWeight: 500 }}>{project.ownerName || 'Confidential'}</div>
              </div>
              {project.status === 'completed' && project.timeline && (
                <div className="col-6">
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Timeline</div>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{project.timeline}</div>
                </div>
              )}
              {project.category && (
                <div className="col-6">
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Service</div>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{project.category}</div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-auto d-flex justify-content-between align-items-center pt-2">
          <button
            type="button"
            className="btn btn-link p-0 text-decoration-none d-inline-flex align-items-center gap-1"
            style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-secondary)' }}
            onClick={onToggle}
          >
            {isExpanded ? (
              <>Less details <ChevronUp size={15} strokeWidth={1.5} /></>
            ) : (
              <>Quick preview <ChevronDown size={15} strokeWidth={1.5} /></>
            )}
          </button>

          <Link
            to={`/projects/${project._id}`}
            className="d-inline-flex align-items-center gap-1 text-decoration-none"
            style={{ fontSize: '14px', fontWeight: 500, color: 'var(--accent)' }}
          >
            Full page <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardExpandable;
