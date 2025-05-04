type SelectFieldProps = {
  label: string;
  options: string[];
  onChange?: (value: string) => void;
};

function Select({ label, options, onChange }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <select
        className="w-full p-2 rounded-md border border-gray-300"
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
