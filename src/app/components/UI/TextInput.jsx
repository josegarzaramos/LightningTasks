const TextInput = ({
  value,
  onChange,
  placeholder = '',
  required,
  fontBold = false,
  error = false,
  ...props
}) => (
  <input
    type="text"
    className={`border ${
      error ? 'border-red-500' : 'border-gray'
    } rounded-lg px-4 py-3 focus-visible:outline focus-visible:outline-1 focus-visible:outline-blue ${
      fontBold ? 'font-bold' : ''
    }`}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    required={required}
    {...props}
  />
);

export default TextInput;
