import { useEffect, useState } from "react";
import Select from "./components/formfields/Select";

type LanguageOptions = {
  libs: string[];
  bsystem: string[];
  resources: string[];
  frameworks: string[];
};

const optionsByLanguage: Record<string, LanguageOptions> = {
  "C++": {
    libs: ["Boost", "SDL2", "OpenCV"],
    bsystem: ["g++", "g++ C++11"],
    resources: ["Interface gráfica", "Rede", "Multithreading"],
    frameworks: ["Google Test", "Catch2", "Doctest"],
  },
};

function App() {
  const languages: string[] = Object.keys(optionsByLanguage);

  const [language, setLanguage] = useState(languages[0]);

  const [libs, setLibs] = useState(optionsByLanguage[languages[0]]?.libs || []);
  const [bsystem, setBuildSystem] = useState(
    optionsByLanguage[languages[0]]?.bsystem || []
  );
  const [resources, setResources] = useState(
    optionsByLanguage[languages[0]]?.resources || []
  );
  const [frameworks, setFrameworks] = useState(
    optionsByLanguage[languages[0]]?.frameworks || []
  );

  function defineProgrammingLanguage(lang: string) {
    setLanguage(lang);
  }

  useEffect(() => {
    setLibs(optionsByLanguage[language].libs);
    setBuildSystem(optionsByLanguage[language].bsystem);
    setResources(optionsByLanguage[language].resources);
    setFrameworks(optionsByLanguage[language].frameworks);
  }, [language]);

  return (
    <div className="p-2 w-screen h-screen flex flex-col bg-slate-500 text-slate-50 font-bold">
      <h1 className="text-4xl mt-2 mb-1 text-center">CodeForge</h1>

      <div className="flex-grow flex items-center justify-center">
        <div className="p-6 w-[28rem] bg-slate-200 rounded-2xl shadow-lg text-black space-y-4">
          {/* Nome do projeto */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Nome do projeto
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Linguagem
            </label>
            <select
              value={language}
              onChange={(e) => defineProgrammingLanguage(e.target.value)}
              className="w-full p-2 rounded-md border border-gray-300"
            >
              {languages.map((lang) => (
                <option key={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* SO alvo */}
          <div>
            <label className="block text-sm font-semibold mb-2">SO alvo</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="so"
                  value="windows"
                  className="accent-blue-600"
                />
                Windows
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="so"
                  value="linux"
                  className="accent-green-600"
                />
                Linux
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="so"
                  value="macos"
                  className="accent-purple-600"
                />
                macOS
              </label>
            </div>
          </div>

          {/* Build System */}
          <Select label="Build System" options={bsystem} />

          {/* Libs */}
          <Select label="Libs" options={libs} />

          {/* Resources */}
          <Select label="resources" options={resources} />

          {/* Framework de teste */}
          <Select label="Test Framework" options={frameworks} />

          <div>
            <button className="w-full p-2 bg-green-200 rounded-md">
              Download Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
