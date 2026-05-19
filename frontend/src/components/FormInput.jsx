import { useState } from 'react';

/**
 * FormInput Component
 * Reusable form input with validation states, error handling, and accessibility
 * 
 * @param {Object} props
 * @param {string} props.id - Unique identifier
 * @param {string} props.label - Input label
 * @param {string} props.type - Input type (text, email, password, number, etc.)
 * @param {string} props.placeholder - Placeholder text
 * @param {string} props.value - Current value
 * @param {Function} props.onChange - Change handler
 * @param {string} [props.error] - Error message
 * @param {string} [props.success] - Success message
 * @param {string} [props.help] - Help text
 * @param {boolean} [props.required] - Whether field is required
 * @param {boolean} [props.disabled] - Whether field is disabled
 * @param {boolean} [props.showPasswordToggle] - Show password visibility toggle
 * @param {Function} [props.onPasswordToggle] - Password visibility toggle handler
 * @param {boolean} [props.isPasswordVisible] - Is password visible
 * @param {string} [props.className] - Additional CSS classes
 */
export default function FormInput({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  success,
  help,
  required = false,
  disabled = false,
  showPasswordToggle = false,
  onPasswordToggle,
  isPasswordVisible = false,
  className = '',
  ...inputProps
}) {
  const inputClasses = [
    'form-input',
    error && 'error',
    success && 'success',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inputType = showPasswordToggle && type === 'password' 
    ? isPasswordVisible ? 'text' : 'password'
    : type;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className={`form-label ${required ? 'form-label-required' : ''}`}>
          {label}
        </label>
      )}
      
      <div className={showPasswordToggle ? 'form-input-wrapper' : ''}>
        <input
          id={id}
          type={inputType}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          aria-label={label || placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : help ? `${id}-help` : undefined}
          {...inputProps}
        />
        
        {showPasswordToggle && type === 'password' && (
          <button
            type="button"
            className="password-toggle"
            onClick={onPasswordToggle}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            tabIndex={0}
          >
            {isPasswordVisible ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        )}
      </div>

      {error && (
        <div id={`${id}-error`} className="form-error" role="alert">
          <span>✕</span>
          <span>{error}</span>
        </div>
      )}

      {success && !error && (
        <div id={`${id}-success`} className="form-success" role="status">
          <span>✓</span>
          <span>{success}</span>
        </div>
      )}

      {help && !error && !success && (
        <div id={`${id}-help`} className="form-help">
          {help}
        </div>
      )}
    </div>
  );
}
