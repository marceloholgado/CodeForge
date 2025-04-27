type SelectFieldProps = {
  label: string;
  options: string[];
};

function Select({ label, options }: SelectFieldProps) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>
      <select className="w-full p-2 rounded-md border border-gray-300">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Select;
