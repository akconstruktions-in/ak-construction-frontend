import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ProjectCardExpandable from '../components/ProjectCardExpandable';
import SkeletonCard from '../components/SkeletonCard';
import SERVICES from '../data/services';
import { getCachedSnapshot, fetchProjects } from '../services/api';

const Projects = () => {
  const cached = getCachedSnapshot();
  const [projects, setProjects] = useState(cached?.projects || []);
  const [loading, setLoading] = useState(!cached);
  const [expandedId, setExpandedId] = useState(null);

  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  useEffect(() => {
    fetchProjects()
      .then((res) => setProjects(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const locations = Array.from(
    new Set(projects.map((p) => p.place).filter(Boolean))
  );

  const filtered = projects.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (serviceFilter !== 'all' && (p.category || '').toLowerCase() !== serviceFilter.toLowerCase()) return false;
    if (locationFilter !== 'all' && p.place !== locationFilter) return false;
    return true;
  });

  return (
    <div>
      <Helmet>
        <title>Projects | AK Constructions Kannur</title>
        <meta
          name="description"
          content="Explore completed and ongoing piling, foundation and residential construction projects by AK Constructions."
        />
        <link rel="canonical" href="https://www.akconstructionbyraju.com/projects" />
      </Helmet>

      {/* Header */}
      <section className="py-5" style={{ background: 'var(--n-900)', color: '#fff' }}>
        <div className="container py-4">
          <span className="section-label" style={{ color: '#f5d284' }}>Portfolio</span>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', color: '#fff', marginBottom: '12px' }}>
            Our Projects
          </h1>
          <p style={{ color: 'var(--n-300)', maxWidth: '580px', marginBottom: 0 }}>
            Explore our residential and commercial construction works across Kannur and Kerala.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border)' }}>
        <div className="container py-3">
          <div className="row g-2 align-items-center">
            <div className="col-auto d-flex gap-2">
              {['all', 'completed', 'ongoing'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={statusFilter === st ? 'btn-primary-ak' : 'btn-outline-ak'}
                  style={{ padding: '6px 14px', fontSize: '13px', textTransform: 'capitalize' }}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="col-md-3 ms-md-auto">
              <select
                className="form-select form-select-sm"
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                aria-label="Filter by service"
              >
                <option value="all">All Services</option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>

            {locations.length > 0 && (
              <div className="col-md-2">
                <select
                  className="form-select form-select-sm"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  aria-label="Filter by location"
                >
                  <option value="all">All Locations</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad">
        <div className="container">
          {loading ? (
            <div className="row g-4">
              {[1, 2, 3, 4].map((i) => (
                <div className="col-md-6" key={i}>
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="row g-4">
              {filtered.map((project) => (
                <div className="col-md-6" key={project._id}>
                  <ProjectCardExpandable
                    project={project}
                    isExpanded={expandedId === project._id}
                    onToggle={() => setExpandedId((prev) => (prev === project._id ? null : project._id))}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <p style={{ color: 'var(--text-secondary)' }}>No projects match the selected filters.</p>
              <button
                type="button"
                className="btn-outline-ak"
                onClick={() => { setStatusFilter('all'); setServiceFilter('all'); setLocationFilter('all'); }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Projects;
