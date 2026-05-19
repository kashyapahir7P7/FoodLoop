/**
 * FormButton Component
 * Reusable submit button with loading state, accessibility, and animations
 * 
 * @param {Object} props
 * @param {string} props.label - Button text
 * @param {boolean} [props.loading] - Is loading
 * @param {boolean} [props.disabled] - Is disabled
 * @param {string} [props.type] - Button type (submit, button, reset)
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.loadingText] - Text to show while loading
 * @param {string} [props.className] - Additional CSS classes
 * @param {Function} [props.children] - Button content
 */
export default function FormButton({
  label,
  loading = false,
  disabled = false,
  type = 'submit',
  onClick,
  loadingText = 'Processing...',
  className = '',
  children,
  ...buttonProps
}) {
  const buttonClasses = [
    'form-button',
    loading && 'loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
      aria-label={loading ? loadingText : label}
      {...buttonProps}
    >
      {loading ? loadingText : label || children}
    </button>
  );
}
