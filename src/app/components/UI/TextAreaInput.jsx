const TextareaInput = ({
  value,
  onChange,
  placeholder = '',
  maxLength = 500,
  required = false,
}) => {
  return (
    <>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        required={required}
        className={
          'border border-gray rounded-lg px-4 py-3 min-h-28 h-full resize-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-blue'
        }
      />
      <span className="text-sm text-right text-zinc-400">
        {value.length}/{maxLength} characters
      </span>
    </>
  );
};

export default TextareaInput;
