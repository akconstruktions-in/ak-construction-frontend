import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestPasswordReset, verifyResetOtp, submitNewPassword } from '../../services/api';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!email) return toast.warn('Please enter your admin email');
    
    setLoading(true);
    try {
      const res = await requestPasswordReset(email);
      if (res.success) {
        toast.success(res.message);
        setStep(2);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return toast.warn('Please enter the 6-digit OTP');

    setLoading(true);
    try {
      const res = await verifyResetOtp(email, otp);
      if (res.success) {
        toast.success(res.message);
        setStep(3);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid or expired OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return toast.warn('Please fill all password fields');
    if (newPassword.length < 5) return toast.warn('Password must be at least 5 characters');
    if (newPassword !== confirmPassword) return toast.warn('Passwords do not match');

    setLoading(true);
    try {
      const res = await submitNewPassword(email, newPassword);
      if (res.success) {
        toast.success(res.message);
        navigate('/admin/login');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error resetting password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow-sm border-0 p-4 p-md-5" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="text-center mb-4">
          <h2 className="font-serif fw-bold text-dark mb-1">AK Constructions</h2>
          <p className="text-muted small">Admin Recovery</p>
        </div>

        {step === 1 && (
          <form onSubmit={handleRequestOtp}>
            <h5 className="mb-3">Forgot Password</h5>
            <p className="text-muted small mb-4">Enter your admin email address and we'll send you a One Time Password (OTP) to reset your password.</p>
            <div className="mb-4">
              <label className="form-label small fw-bold">Email Address</label>
              <input 
                type="email" 
                className="form-control form-control-lg bg-light" 
                placeholder="admin@arkitektur.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-gold btn-lg w-100 text-uppercase tracking-wide" disabled={loading}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            <div className="text-center mt-4">
              <Link to="/admin/login" className="text-decoration-none small text-muted">Back to Login</Link>
            </div>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <h5 className="mb-3">Verify OTP</h5>
            <p className="text-muted small mb-4">An OTP has been sent to <strong>{email}</strong>. It will expire in 10 minutes.</p>
            <div className="mb-4">
              <label className="form-label small fw-bold">6-Digit OTP</label>
              <input 
                type="text" 
                className="form-control form-control-lg bg-light text-center tracking-widest" 
                placeholder="------"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-gold btn-lg w-100 text-uppercase tracking-wide" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <div className="text-center mt-4">
              <button type="button" className="btn btn-link text-decoration-none small text-muted p-0" onClick={() => setStep(1)} disabled={loading}>Change Email</button>
            </div>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <h5 className="mb-3">Set New Password</h5>
            <p className="text-muted small mb-4">Your OTP was verified securely. Please enter your new admin password.</p>
            <div className="mb-3">
              <label className="form-label small fw-bold">New Password</label>
              <input 
                type="password" 
                className="form-control form-control-lg bg-light" 
                placeholder="Min 5 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold">Confirm Password</label>
              <input 
                type="password" 
                className="form-control form-control-lg bg-light" 
                placeholder="Match new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <button type="submit" className="btn btn-gold btn-lg w-100 text-uppercase tracking-wide" disabled={loading}>
              {loading ? 'Updating...' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
