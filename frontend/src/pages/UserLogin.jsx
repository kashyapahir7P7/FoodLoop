import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import FormCheckbox from '../components/FormCheckbox';
import { useForm } from '../hooks/useForm';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function UserLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    email: '',
    password: '',
  });

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form.values

     await axios.post("/api/auth/user/login", { email, password }, { withCredentials: true })

    navigate("/");

  };

  return (
    <div className="auth-page">
      <div className="auth-page-content">
        <div className="form-wrapper">
          <div className="form-header">
            <h1 className="form-title">Welcome Back</h1>
            <p className="form-subtitle">
              Sign in to your account to access FoodLoop
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <FormInput
              id="email"
              label="Email Address"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.email ? form.errors.email : ''}
              required
            />

            <FormInput
              id="password"
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.password ? form.errors.password : ''}
              required
              showPasswordToggle
              onPasswordToggle={handlePasswordToggle}
              isPasswordVisible={showPassword}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
              <FormCheckbox
                id="rememberMe"
                label="Remember me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <Link
                to="/forgot-password"
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: 'var(--color-primary)',
                  fontWeight: 'var(--font-weight-semibold)',
                }}
              >
                Forgot password?
              </Link>
            </div>

            <FormButton
              label="Sign In"
              loading={form.loading}
              loadingText="Signing in..."
            />
          </form>

          <div className="form-footer">
            <div>
              Don't have an account?{' '}
              <Link to="/user/register">
                Create one
              </Link>
            </div>
            <div style={{ marginTop: 'var(--spacing-md)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
              Are you a business?{' '}
              <Link to="/foodpartner/login" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                Login as partner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
