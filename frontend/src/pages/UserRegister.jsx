import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import FormCheckbox from '../components/FormCheckbox';
import { useForm } from '../hooks/useForm';
import { usePasswordToggle } from '../hooks/usePasswordToggle';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function UserRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const navigate = useNavigate()

  const form = useForm({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { togglePasswordVisibility } = usePasswordToggle();
  const handlePasswordToggle = () => {
    togglePasswordVisibility('password');
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = form.values;

    try {

      await axios.post("/api/auth/user/register", {
        fullName: firstName + " " + lastName,
        email,
        password
      }, {
        withCredentials: true
      }
      );

      form.setValues({ firstName: "", lastName: "", email: "", password: "" })


      navigate("/")

    } catch (err) {
      console.log(err);
    }

  };

  return (
    <div className="auth-page">
      <div className="auth-page-content">
        <div className="form-wrapper">
          <div className="form-header">
            <h1 className="form-title">Create Account</h1>
            <p className="form-subtitle">
              Join FoodLoop and start reducing food waste today
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
              <FormInput
                id="firstName"
                label="First Name"
                type="text"
                placeholder="John"
                name="firstName"
                value={form.values.firstName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.touched.firstName ? form.errors.firstName : ''}
                required
              />
              <FormInput
                id="lastName"
                name="lastName"
                label="Last Name"
                type="text"
                placeholder="Doe"
                value={form.values.lastName}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                error={form.touched.lastName ? form.errors.lastName : ''}
                required
              />
            </div>

            <FormInput
              id="email"
              name="email"
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.email ? form.errors.email : ''}
              required
            />

            <FormInput
              id="password"
              name="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.password ? form.errors.password : ''}
              help="At least 8 characters with uppercase, lowercase, and numbers"
              required
              showPasswordToggle
              onPasswordToggle={handlePasswordToggle}
            />

            <FormCheckbox
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                if (e.target.checked && form.errors.terms) {
                  form.setFieldError('terms', '');
                }
              }}
            >
              I agree to the{' '}
              <Link to="/terms" style={{ color: 'var(--color-primary)' }}>
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/privacy" style={{ color: 'var(--color-primary)' }}>
                Privacy Policy
              </Link>
            </FormCheckbox>

            {form.errors.terms && (
              <div className="form-error" role="alert">
                <span>✕</span>
                <span>{form.errors.terms}</span>
              </div>
            )}

            <FormButton
              label="Create Account"
              loading={form.loading}
              loadingText="Creating account..."
              disabled={!agreedToTerms}
            />
          </form>

          <div className="form-footer">
            <div>
              Already have an account?{' '}
              <Link to="/user/login">
                Sign in
              </Link>
            </div>
            <div style={{ marginTop: 'var(--spacing-md)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
              Registering as a business?{' '}
              <Link to="/foodpartner/register" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                Register as a partner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
