// In FormField.jsx
const FormField = ({ label, value, onChange, placeholder, type = 'text', multiline = false, error, disabled = false }) => {
  const inputClasses = `
    w-full px-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg 
    focus:outline-none focus:ring-2 focus:ring-green-400 
    ${error ? 'ring-2 ring-red-400' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `;
  
  const handleChange = (event) => {
    if (type === 'file') {
      // For file input, pass the file object to onChange
      onChange(event);  // Pass the first file selected
    } else {
      // For regular inputs, pass the value
      onChange(event.target.value);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-gray-700 text-sm font-medium">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`${inputClasses} min-h-[100px]`}
          disabled={disabled}
        />
      ) : type === 'file' ? (
        <input
          type="file"
          onChange={handleChange}
          className={`${inputClasses}`}
          disabled={disabled}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={inputClasses}
          disabled={disabled}
        />
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormField;
