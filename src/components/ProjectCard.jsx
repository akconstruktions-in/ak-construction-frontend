import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project._id}`} className="card-ak d-block text-decoration-none h-100">
      <div className="img-3x2">
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
        />
      </div>
      <div className="p-4">
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

        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
          {project.title}
        </h4>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {project.description}
        </p>

        <span className="d-inline-flex align-items-center gap-1" style={{ fontSize: '14px', fontWeight: 500, color: 'var(--accent)' }}>
          View Details <ArrowRight size={15} strokeWidth={1.5} />
        </span>
      </div>
    </Link>
  );
};

export default ProjectCard;
