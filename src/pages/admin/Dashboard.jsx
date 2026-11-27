import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RefreshCw, Upload, Trash2, Edit2, Plus } from 'lucide-react';
import SERVICES from '../../data/services';
import {
  fetchProjects, addProject, updateProject, deleteProject,
  addGalleryImages, removeGalleryImage,
  fetchMembers, addMember, deleteMember,
  fetchTestimonials, addTestimonial, deleteTestimonial,
  fetchEnquiries, updateEnquiryStatus, deleteEnquiry,
  generateSnapshot,
} from '../../services/api';

const EMPTY_PROJECT = {
  title: '',
  description: '',
  status: 'completed',
  place: '',
  ownerName: '',
  timeline: '',
  category: '',
  scope: '',
  published: true,
  featured: false,
  image: null,
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [projectForm, setProjectForm] = useState(EMPTY_PROJECT);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [memberForm, setMemberForm] = useState({ name: '', role: '', image: null });
  const [testimonyForm, setTestimonyForm] = useState({ name: '', text: '', image: null });

  const loadData = async () => {
    setLoading(true);
    try {
      const [projRes, memRes, testRes, enqRes] = await Promise.all([
        fetchProjects(),
        fetchMembers(),
        fetchTestimonials(),
        fetchEnquiries().catch(() => ({ data: [] })),
      ]);
      setProjects(projRes.data || []);
      setMembers(memRes.data || []);
      setTestimonials(testRes.data || []);
      setEnquiries(enqRes.data || []);
    } catch {
      toast.error('Failed to load dashboard data. Server may be waking up.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handlePublishSnapshot = async () => {
    setPublishing(true);
    try {
      const res = await generateSnapshot();
      if (res?.data) {
        localStorage.setItem('ak_snapshot', JSON.stringify(res.data));
        localStorage.setItem('ak_snapshot_ts', String(Date.now()));
      }
      toast.success('Snapshot published!');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to publish snapshot');
    } finally {
      setPublishing(false);
    }
  };

  /* ---- Projects ---- */
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description) {
      return toast.warn('Title and description are required');
    }
    if (!editingId && !projectForm.image) {
      return toast.warn('Cover image is required for new projects');
    }

    try {
      let savedId = editingId;
      if (editingId) {
        await updateProject(editingId, projectForm);
        toast.success('Project updated!');
      } else {
        const res = await addProject(projectForm);
        savedId = res.data?.data?._id;
        toast.success('Project added!');
      }

      if (savedId && galleryFiles.length > 0) {
        await addGalleryImages(savedId, galleryFiles);
        toast.success('Gallery photos uploaded!');
      }

      setEditingId(null);
      setProjectForm(EMPTY_PROJECT);
      setGalleryFiles([]);
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving project');
    }
  };

  const startEditProject = (p) => {
    setEditingId(p._id);
    setProjectForm({
      title: p.title || '',
      description: p.description || '',
      status: p.status || 'completed',
      place: p.place || '',
      ownerName: p.ownerName || '',
      timeline: p.timeline || '',
      category: p.category || '',
      scope: p.scope || '',
      published: p.published !== false,
      featured: Boolean(p.featured),
      image: null,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      loadData();
    } catch {
      toast.error('Error deleting project');
    }
  };

  const handleRemoveGalleryPhoto = async (projectId, publicId) => {
    try {
      await removeGalleryImage(projectId, publicId);
      toast.success('Photo removed');
      loadData();
    } catch {
      toast.error('Error removing photo');
    }
  };

  /* ---- Members ---- */
  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.role || !memberForm.image) {
      return toast.warn('Fill all member fields');
    }
    try {
      await addMember(memberForm);
      toast.success('Member added!');
      setMemberForm({ name: '', role: '', image: null });
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding member');
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await deleteMember(id);
      toast.success('Member deleted');
      loadData();
    } catch {
      toast.error('Error deleting member');
    }
  };

  /* ---- Testimonials ---- */
  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    if (!testimonyForm.name || !testimonyForm.text) {
      return toast.warn('Fill all testimonial fields');
    }
    try {
      await addTestimonial({ ...testimonyForm, role: 'Verified Client' });
      toast.success('Testimonial added!');
      setTestimonyForm({ name: '', text: '', image: null });
      loadData();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error adding testimonial');
    }
  };

  const handleDeleteTestimonial = async (id) => {
    try {
      await deleteTestimonial(id);
      toast.success('Testimonial deleted');
      loadData();
    } catch {
      toast.error('Error deleting testimonial');
    }
  };

  /* ---- Enquiries ---- */
  const handleEnquiryStatus = async (id, status) => {
    try {
      await updateEnquiryStatus(id, status);
      toast.success('Status updated');
      loadData();
    } catch {
      toast.error('Error updating enquiry');
    }
  };

  const handleDeleteEnquiry = async (id) => {
    try {
      await deleteEnquiry(id);
      toast.success('Enquiry deleted');
      loadData();
    } catch {
      toast.error('Error deleting enquiry');
    }
  };

  if (loading) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
        <div className="spinner-border text-gold mb-3" />
        <p className="text-muted small">Loading admin panel (server may be waking up)…</p>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 pb-5 admin-panel">
      {/* Top Bar */}
      <nav className="navbar navbar-dark bg-dark-custom mb-4 shadow-sm">
        <div className="container-fluid px-4">
          <span className="navbar-brand mb-0 h1" style={{ fontFamily: 'var(--font-display)' }}>
            AK Constructions <small className="text-muted ms-2" style={{ fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>Admin</small>
          </span>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-gold btn-sm d-inline-flex align-items-center gap-1"
              onClick={handlePublishSnapshot}
              disabled={publishing}
            >
              <RefreshCw size={14} /> {publishing ? 'Publishing…' : 'Publish Snapshot'}
            </button>
            <button type="button" className="btn btn-outline-light btn-sm" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="list-group list-group-flush">
                {[
                  { id: 'projects', label: `Projects (${projects.length})` },
                  { id: 'enquiries', label: `Enquiries (${enquiries.length})` },
                  { id: 'members', label: `Team Members (${members.length})` },
                  { id: 'testimonials', label: `Testimonials (${testimonials.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`list-group-item list-group-item-action py-3 ${activeTab === tab.id ? 'active bg-dark border-dark' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <>
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 fw-bold">{editingId ? 'Edit Project' : 'Add New Project'}</h5>
                    {editingId && (
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => { setEditingId(null); setProjectForm(EMPTY_PROJECT); setGalleryFiles([]); }}
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSaveProject}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Title *</label>
                          <input type="text" className="form-control" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} />
                        </div>
                        <div className="col-md-3">
                          <label className="form-label small text-muted">Status</label>
                          <select className="form-select" value={projectForm.status} onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}>
                            <option value="completed">Completed</option>
                            <option value="ongoing">Ongoing</option>
                          </select>
                        </div>
                        <div className="col-md-3">
                          <label className="form-label small text-muted">Service Category</label>
                          <select className="form-select" value={projectForm.category} onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}>
                            <option value="">Select service</option>
                            {SERVICES.map((s) => (
                              <option key={s.slug} value={s.title}>{s.title}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-12">
                          <label className="form-label small text-muted">Description *</label>
                          <textarea className="form-control" rows="2" value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label small text-muted">Location</label>
                          <input type="text" className="form-control" value={projectForm.place} onChange={(e) => setProjectForm({ ...projectForm, place: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label small text-muted">Client Name</label>
                          <input type="text" className="form-control" value={projectForm.ownerName} onChange={(e) => setProjectForm({ ...projectForm, ownerName: e.target.value })} />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label small text-muted">Timeline</label>
                          <input type="text" className="form-control" placeholder="e.g. 12 Months" value={projectForm.timeline} onChange={(e) => setProjectForm({ ...projectForm, timeline: e.target.value })} />
                        </div>
                        <div className="col-12">
                          <label className="form-label small text-muted">Scope of Work</label>
                          <input type="text" className="form-control" placeholder="e.g. 40m bored piling + foundation" value={projectForm.scope} onChange={(e) => setProjectForm({ ...projectForm, scope: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Cover Image (auto-cropped 1200×800) {editingId ? '(optional)' : '*'}</label>
                          <input type="file" accept="image/*" className="form-control" onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files[0] })} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Additional Gallery Photos (optional, multi-select)</label>
                          <input type="file" accept="image/*" multiple className="form-control" onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))} />
                        </div>
                        <div className="col-12 d-flex gap-4">
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="pubCheck" checked={projectForm.published} onChange={(e) => setProjectForm({ ...projectForm, published: e.target.checked })} />
                            <label className="form-check-label small" htmlFor="pubCheck">Published</label>
                          </div>
                          <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="featCheck" checked={projectForm.featured} onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })} />
                            <label className="form-check-label small" htmlFor="featCheck">Featured on Home</label>
                          </div>
                        </div>
                        <div className="col-12 text-end mt-3">
                          <button type="submit" className="btn btn-gold px-4 d-inline-flex align-items-center gap-1">
                            {editingId ? <><Upload size={15} /> Save Changes</> : <><Plus size={15} /> Add Project</>}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white py-3"><h5 className="mb-0 fw-bold">Manage Projects</h5></div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      {projects.map((p) => (
                        <li key={p._id} className="list-group-item py-3">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <img src={p.imageUrl} alt={p.title} className="rounded" style={{ width: '72px', height: '48px', objectFit: 'cover' }} />
                              <div className="ms-3">
                                <h6 className="mb-0">{p.title}</h6>
                                <small className="text-muted">
                                  {p.status} {p.category ? `· ${p.category}` : ''} {p.place ? `· ${p.place}` : ''}
                                </small>
                              </div>
                            </div>
                            <div className="d-flex gap-2">
                              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => startEditProject(p)}>
                                <Edit2 size={14} />
                              </button>
                              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProject(p._id)}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                          {p.gallery?.length > 0 && (
                            <div className="d-flex flex-wrap gap-2 mt-2 ps-5">
                              {p.gallery.map((g) => (
                                <div key={g.publicId} className="position-relative">
                                  <img src={g.imageUrl} alt="" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                                  <button
                                    type="button"
                                    className="btn btn-danger btn-sm position-absolute top-0 end-0 p-0"
                                    style={{ width: '18px', height: '18px', fontSize: '10px', lineHeight: 1 }}
                                    onClick={() => handleRemoveGalleryPhoto(p._id, g.publicId)}
                                    aria-label="Remove gallery photo"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {/* ENQUIRIES TAB */}
            {activeTab === 'enquiries' && (
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white py-3"><h5 className="mb-0 fw-bold">Client Enquiries</h5></div>
                <div className="card-body p-0">
                  {enquiries.length === 0 ? (
                    <p className="p-4 text-muted mb-0">No enquiries received yet.</p>
                  ) : (
                    <ul className="list-group list-group-flush">
                      {enquiries.map((enq) => (
                        <li key={enq._id} className="list-group-item py-3">
                          <div className="d-flex justify-content-between align-items-start gap-3">
                            <div>
                              <h6 className="mb-1">{enq.name} · <a href={`tel:${enq.phone}`}>{enq.phone}</a></h6>
                              <div className="small text-muted mb-1">
                                {enq.service || 'General'} {enq.location ? `· ${enq.location}` : ''}
                              </div>
                              {enq.message && <p className="small mb-0">{enq.message}</p>}
                            </div>
                            <div className="d-flex align-items-center gap-2">
                              <select
                                className="form-select form-select-sm"
                                value={enq.status || 'new'}
                                onChange={(e) => handleEnquiryStatus(enq._id, e.target.value)}
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="archived">Archived</option>
                              </select>
                              <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteEnquiry(enq._id)}>
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* MEMBERS TAB */}
            {activeTab === 'members' && (
              <>
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white py-3"><h5 className="mb-0 fw-bold">Add Team Member</h5></div>
                  <div className="card-body">
                    <form onSubmit={handleAddMember}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Full Name *</label>
                          <input type="text" className="form-control" value={memberForm.name} onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Role *</label>
                          <input type="text" className="form-control" value={memberForm.role} onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })} />
                        </div>
                        <div className="col-12">
                          <label className="form-label small text-muted">Profile Photo (auto-cropped 400×400) *</label>
                          <input type="file" accept="image/*" className="form-control" onChange={(e) => setMemberForm({ ...memberForm, image: e.target.files[0] })} />
                        </div>
                        <div className="col-12 text-end">
                          <button type="submit" className="btn btn-gold px-4">Add Member</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white py-3"><h5 className="mb-0 fw-bold">Manage Members</h5></div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      {members.map((m) => (
                        <li key={m._id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                          <div className="d-flex align-items-center">
                            <img src={m.imageUrl} alt={m.name} className="rounded-circle" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                            <div className="ms-3">
                              <h6 className="mb-0">{m.name}</h6>
                              <small className="text-muted">{m.role}</small>
                            </div>
                          </div>
                          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteMember(m._id)}>Delete</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}

            {/* TESTIMONIALS TAB */}
            {activeTab === 'testimonials' && (
              <>
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white py-3"><h5 className="mb-0 fw-bold">Add Testimonial</h5></div>
                  <div className="card-body">
                    <form onSubmit={handleAddTestimonial}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Client Name *</label>
                          <input type="text" className="form-control" value={testimonyForm.name} onChange={(e) => setTestimonyForm({ ...testimonyForm, name: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label small text-muted">Client Photo (Optional, 200×200)</label>
                          <input type="file" accept="image/*" className="form-control" onChange={(e) => setTestimonyForm({ ...testimonyForm, image: e.target.files[0] })} />
                        </div>
                        <div className="col-12">
                          <label className="form-label small text-muted">Testimonial Text *</label>
                          <textarea className="form-control" rows="3" value={testimonyForm.text} onChange={(e) => setTestimonyForm({ ...testimonyForm, text: e.target.value })} />
                        </div>
                        <div className="col-12 text-end">
                          <button type="submit" className="btn btn-gold px-4">Add Testimonial</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white py-3"><h5 className="mb-0 fw-bold">Manage Testimonials</h5></div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      {testimonials.map((t) => (
                        <li key={t._id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                          <div>
                            <h6 className="mb-1">{t.name}</h6>
                            <p className="text-muted small mb-0">"{t.text}"</p>
                          </div>
                          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteTestimonial(t._id)}>Delete</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
