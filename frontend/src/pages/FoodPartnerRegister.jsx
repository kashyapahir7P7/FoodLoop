import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import FormCheckbox from '../components/FormCheckbox';
import { useForm } from '../hooks/useForm';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export default function FoodPartnerRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  // const navigate = useNavigate();


  const form = useForm({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: '',
    password: '',
  });

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { businessName, contactPerson, email, phone, password } = form.values

     await axios.post("/api/auth/foodpartner/register", {
      name: businessName, contactName: contactPerson, email, phone, password
    }, {
      withCredentials: true
    })

    form.setValues({
      businessName: '',
      contactPerson: '',
      email: '',
      phone: '',
      businessType: '',
      password: '',
    })


    // navigate("/create-food")

  };

  return (
    <div className="auth-page">
      <div className="auth-page-content">
        <div className="form-wrapper">
          <div className="form-header">
            <h1 className="form-title">Partner Registration</h1>
            <p className="form-subtitle">
              Register your business and start reducing food waste
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <FormInput
              id="businessName"
              label="Business Name"
              type="text"
              name="businessName"
              placeholder="Your Restaurant"
              value={form.values.businessName}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.businessName ? form.errors.businessName : ''}
              required
            />

            <FormInput
              id="contactPerson"
              label="Contact Person"
              type="text"
              name="contactPerson"
              placeholder="John Doe"
              value={form.values.contactPerson}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.contactPerson ? form.errors.contactPerson : ''}
              required
            />

            <FormInput
              id="email"
              label="Business Email"
              type="email"
              name="email"
              placeholder="contact@restaurant.com"
              value={form.values.email}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.email ? form.errors.email : ''}
              required
            />

            <FormInput
              id="phone"
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="+1 (555) 123-4567"
              value={form.values.phone}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.phone ? form.errors.phone : ''}
              required
            />

            <div className="form-group">
              <label htmlFor="businessType" className="form-label form-label-required">
                Business Type
              </label>
              <select
                name="businesType"
                id="businessType"
                name="businessType"
                className="form-input"
                value={form.values.businessType}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                required
              >
                <option value="">-- Select Business Type --</option>
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Café</option>
                <option value="bakery">Bakery</option>
                <option value="grocery">Grocery Store</option>
                <option value="supermarket">Supermarket</option>
                <option value="catering">Catering Service</option>
                <option value="other">Other</option>
              </select>
              {form.touched.businessType && form.errors.businessType && (
                <div className="form-error" role="alert">
                  <span>✕</span>
                  <span>{form.errors.businessType}</span>
                </div>
              )}
            </div>

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
              help="At least 8 characters with uppercase, lowercase, and numbers"
              required
              showPasswordToggle
              onPasswordToggle={handlePasswordToggle}
              isPasswordVisible={showPassword}
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
              label="Create Business Account"
              loading={form.loading}
              loadingText="Creating account..."
              disabled={!agreedToTerms}
            />
          </form>

          <div className="form-footer">
            <div>
              Already a partner?{' '}
              <Link to="/foodpartner/login">
                Sign in
              </Link>
            </div>
            <div style={{ marginTop: 'var(--spacing-md)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-border)' }}>
              Looking to register as a regular user?{' '}
              <Link to="/user/register" style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
