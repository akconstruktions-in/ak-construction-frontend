import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
  fetchProjects, addProject, deleteProject,
  fetchMembers, addMember, deleteMember,
  fetchTestimonials, addTestimonial, deleteTestimonial 
} from '../../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  
  // States
  const [activeTab, setActiveTab] = useState('projects');
  
  // Data States
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [memberForm, setMemberForm] = useState({ name: '', role: '', image: null });
  const [projectForm, setProjectForm] = useState({ title: '', description: '', status: 'completed', place: '', ownerName: '', timeline: '', image: null });
  const [testimonyForm, setTestimonyForm] = useState({ name: '', text: '', image: null });

  const loadData = async () => {
    setLoading(true);
    try {
      const [projRes, memRes, testRes] = await Promise.all([
        fetchProjects(), fetchMembers(), fetchTestimonials()
      ]);
      setProjects(projRes.data);
      setMembers(memRes.data);
      setTestimonials(testRes.data);
    } catch (err) {
      toast.error('Failed to load dashboard data');
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

  // Removed uploadImageMock since real backend multer takes the literal File payload

  // ----- member Handlers -----
  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!memberForm.name || !memberForm.role || !memberForm.image) return toast.warn('Fill all member fields');
    
    try {
      await addMember({ name: memberForm.name, role: memberForm.role, image: memberForm.image });
      toast.success('Member added!');
      setMemberForm({ name: '', role: '', image: null });
      loadData();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Error adding member');
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await deleteMember(id);
      toast.success('Member deleted');
      loadData();
    } catch (e) {
      toast.error('Error deleting member');
    }
  };

  // ----- Project Handlers -----
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.description || !projectForm.image) return toast.warn('Fill required project fields');
    
    try {
      await addProject({ ...projectForm, image: projectForm.image });
      toast.success('Project added!');
      setProjectForm({ title: '', description: '', status: 'completed', place: '', ownerName: '', timeline: '', image: null });
      loadData();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Error adding project');
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await deleteProject(id);
      toast.success('Project deleted');
      loadData();
    } catch (e) {
      toast.error('Error deleting project');
    }
  };

  // ----- Testimonial Handlers -----
  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    if (!testimonyForm.name || !testimonyForm.text) return toast.warn('Fill all testimonial fields');
    
    try {
      await addTestimonial({ name: testimonyForm.name, text: testimonyForm.text, role: 'Verified Client', image: testimonyForm.image });
      toast.success('Testimonial added!');
      setTestimonyForm({ name: '', text: '', image: null });
      loadData();
    } catch (e) {
      toast.error(e.response?.data?.message || 'Error adding testimonial');
    }
  };

  const handleDeleteTestimonial = async (id) => {
    try {
      await deleteTestimonial(id);
      toast.success('Testimonial deleted');
      loadData();
    } catch (e) {
      toast.error('Error deleting testimonial');
    }
  };


  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-gold"></div></div>;

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Admin Navbar */}
      <nav className="navbar navbar-dark bg-dark-custom mb-4 shadow">
        <div className="container-fluid px-4">
          <span className="navbar-brand mb-0 h1 font-serif tracking-widest">AK Constructions <small className="text-muted ms-2" style={{fontSize: '0.8rem'}}>Admin Panel</small></span>
          <button className="btn btn-outline-light btn-sm rounded-0 text-uppercase tracking-wide" onClick={handleLogout}>Log Out</button>
        </div>
      </nav>

      <div className="container">
        <div className="row g-4">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="card border-0 shadow-sm">
              <div className="list-group list-group-flush">
                <button className={`list-group-item list-group-item-action py-3 ${activeTab === 'projects' ? 'active bg-gold border-gold' : ''}`} onClick={() => setActiveTab('projects')}>Projects Base</button>
                <button className={`list-group-item list-group-item-action py-3 ${activeTab === 'members' ? 'active bg-gold border-gold' : ''}`} onClick={() => setActiveTab('members')}>Team Members</button>
                <button className={`list-group-item list-group-item-action py-3 ${activeTab === 'testimonials' ? 'active bg-gold border-gold' : ''}`} onClick={() => setActiveTab('testimonials')}>Testimonials</button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            
            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <>
                <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white py-3"><h5 className="mb-0 fw-bold">Add New Project</h5></div>
                  <div className="card-body">
                    <form onSubmit={handleAddProject}>
                      <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label small text-muted">Title *</label>
                            <input type="text" className="form-control" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small text-muted">Status</label>
                            <select className="form-select" value={projectForm.status} onChange={e => setProjectForm({...projectForm, status: e.target.value})}>
                                <option value="completed">Completed</option>
                                <option value="ongoing">Ongoing</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label small text-muted">Description *</label>
                            <textarea className="form-control" rows="2" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})}></textarea>
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small text-muted">Location</label>
                            <input type="text" className="form-control" value={projectForm.place} onChange={e => setProjectForm({...projectForm, place: e.target.value})} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small text-muted">Client Name</label>
                            <input type="text" className="form-control" value={projectForm.ownerName} onChange={e => setProjectForm({...projectForm, ownerName: e.target.value})} />
                        </div>
                        <div className="col-md-4">
                            <label className="form-label small text-muted">Timeline</label>
                            <input type="text" className="form-control" placeholder="e.g. 12 Months" value={projectForm.timeline} onChange={e => setProjectForm({...projectForm, timeline: e.target.value})} />
                        </div>
                        <div className="col-12">
                            <label className="form-label small text-muted">Cover Image *</label>
                            <input type="file" className="form-control" onChange={e => setProjectForm({...projectForm, image: e.target.files[0]})} />
                        </div>
                        <div className="col-12 text-end mt-4">
                            <button type="submit" className="btn btn-gold px-4">Add Project</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white py-3"><h5 className="mb-0 fw-bold">Manage Projects</h5></div>
                  <div className="card-body p-0">
                    <ul className="list-group list-group-flush">
                      {projects.map(p => (
                        <li key={p._id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                          <div className="d-flex align-items-center">
                            <img src={p.imageUrl} alt="preview" className="rounded" style={{width: '60px', height: '60px', objectFit: 'cover'}} />
                            <div className="ms-3">
                              <h6 className="mb-0">{p.title}</h6>
                              <small className={`badge ${p.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'} text-uppercase mt-1`} style={{fontSize:'0.65rem'}}>{p.status}</small>
                            </div>
                          </div>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteProject(p._id)}>Delete</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
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
                            <input type="text" className="form-control" value={memberForm.name} onChange={e => setMemberForm({...memberForm, name: e.target.value})} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small text-muted">Role *</label>
                            <input type="text" className="form-control" placeholder="e.g. Lead Architect" value={memberForm.role} onChange={e => setMemberForm({...memberForm, role: e.target.value})} />
                        </div>
                        <div className="col-12">
                            <label className="form-label small text-muted">Profile Photo *</label>
                            <input type="file" className="form-control" onChange={e => setMemberForm({...memberForm, image: e.target.files[0]})} />
                        </div>
                        <div className="col-12 text-end mt-4">
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
                      {members.map(m => (
                        <li key={m._id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                          <div className="d-flex align-items-center">
                            <img src={m.imageUrl} alt="preview" className="rounded-circle shadow-sm" style={{width: '50px', height: '50px', objectFit: 'cover'}} />
                            <div className="ms-3">
                              <h6 className="mb-0">{m.name}</h6>
                              <small className="text-muted">{m.role}</small>
                            </div>
                          </div>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteMember(m._id)}>Delete</button>
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
                            <input type="text" className="form-control" value={testimonyForm.name} onChange={e => setTestimonyForm({...testimonyForm, name: e.target.value})} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small text-muted">Client Logo/Photo (Optional)</label>
                            <input type="file" className="form-control" onChange={e => setTestimonyForm({...testimonyForm, image: e.target.files[0]})} />
                        </div>
                        <div className="col-12">
                            <label className="form-label small text-muted">Testimonial Text *</label>
                            <textarea className="form-control" rows="3" value={testimonyForm.text} onChange={e => setTestimonyForm({...testimonyForm, text: e.target.value})}></textarea>
                        </div>
                        <div className="col-12 text-end mt-4">
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
                      {testimonials.map(t => (
                        <li key={t._id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                          <div className="d-flex align-items-center">
                            <div className="ms-1">
                              <h6 className="mb-1">{t.name}</h6>
                              <p className="text-muted small mb-0 w-75">"{t.text}"</p>
                            </div>
                          </div>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteTestimonial(t._id)}>Delete</button>
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
