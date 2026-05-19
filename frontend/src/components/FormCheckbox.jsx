/**
 * FormCheckbox Component
 * Reusable checkbox input with label and accessibility
 * 
 * @param {Object} props
 * @param {string} props.id - Unique identifier
 * @param {string} props.label - Checkbox label
 * @param {boolean} props.checked - Is checked
 * @param {Function} props.onChange - Change handler
 * @param {boolean} [props.disabled] - Is disabled
 * @param {string} [props.name] - Input name attribute
 * @param {ReactNode} [props.children] - Custom label content (can include JSX)
 * @param {string} [props.className] - Additional CSS classes
 */
export default function FormCheckbox({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  name,
  children,
  className = '',
  ...inputProps
}) {
  const wrapperClasses = ['form-checkbox', className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <input
        id={id}
        type="checkbox"
        name={name || id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        aria-label={label}
        {...inputProps}
      />
      {(label || children) && (
        <label htmlFor={id}>
          {children || label}
        </label>
      )}
    </div>
  );
}
