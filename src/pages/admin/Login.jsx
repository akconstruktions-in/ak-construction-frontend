import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginAdmin } from '../../services/api';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = await loginAdmin(email, password);
      localStorage.setItem('adminToken', payload.data.token);
      toast.success('Login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light" style={{ minHeight: '100vh' }}>
      <div className="card shadow-lg border-0" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark font-serif tracking-wide mb-1">AK Constructions</h3>
            <p className="text-muted small text-uppercase" style={{ letterSpacing: '2px' }}>Admin Portal</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label small text-muted text-uppercase" style={{ letterSpacing: '1px' }}>Email address</label>
              <input 
                type="email" 
                className="form-control rounded-0 py-2" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@arkitektur.com"
              />
            </div>
            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <label className="form-label small text-muted text-uppercase" style={{ letterSpacing: '1px' }}>Password</label>
                <Link to="/admin/forgot-password" className="small text-muted text-decoration-none">Forgot password?</Link>
              </div>
              <input 
                type="password" 
                className="form-control rounded-0 py-2" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-gold w-100 py-2 d-flex justify-content-center align-items-center"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
