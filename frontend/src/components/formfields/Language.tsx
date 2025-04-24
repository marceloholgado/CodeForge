function ProgrammingLanguage({ language, defineProgrammingLanguage }) {
  return (
    <>
      <div>
        <label className="block text-sm font-semibold mb-1">Linguagem</label>
        <select
          value={language}
          onChange={(e) => defineProgrammingLanguage(e.target.value)}
          className="w-full p-2 rounded-md border border-gray-300"
        >
          <option value="C++">C++</option>
          {/* adicionar mais opções futuramente */}
        </select>
      </div>
    </>
  );
}

export default ProgrammingLanguage;
