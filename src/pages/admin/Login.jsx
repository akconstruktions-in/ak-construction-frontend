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
    } catch {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-light position-relative" style={{ minHeight: '100vh' }}>
      <Link to="/" className="btn btn-outline-dark position-absolute top-0 start-0 m-4" style={{ fontSize: '0.85rem' }}>
        ← Back to Home
      </Link>
      <div className="card shadow border-0" style={{ width: '100%', maxWidth: '400px', borderRadius: 'var(--r-lg)' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark mb-1" style={{ fontFamily: 'var(--font-display)' }}>AK Constructions</h3>
            <p className="text-muted small">Admin Portal</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label small text-muted">Email address</label>
              <input
                type="email"
                className="form-control py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@akconstructionbyraju.com"
              />
            </div>
            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <label className="form-label small text-muted">Password</label>
                <Link to="/admin/forgot-password" className="small text-muted text-decoration-none">Forgot password?</Link>
              </div>
              <input
                type="password"
                className="form-control py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="btn btn-gold w-100 py-2" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
