import { useEffect, useState } from "react";

type LanguageOptions = {
  libs: string[];
  resources: string[];
  frameworks: string[];
};

const optionsByLanguage: Record<string, LanguageOptions> = {
  "C++": {
    libs: ["Boost", "SDL2", "OpenCV"],
    resources: ["Interface gráfica", "Rede", "Multithreading"],
    frameworks: ["Google Test", "Catch2", "Doctest"],
  },
};

function App() {
  const languages: string[] = Object.keys(optionsByLanguage);

  const [language, setLanguage] = useState(languages[0]);

  const [libs, setLibs] = useState(optionsByLanguage[languages[0]]?.libs || []);
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
    setResources(optionsByLanguage[language].resources);
    setFrameworks(optionsByLanguage[language].frameworks);
  }, [language]);

  return (
    <div className="p-4 w-screen h-screen flex flex-col bg-slate-500 text-slate-50 font-bold">
      <h1 className="text-4xl mt-8 text-center">CodeForge</h1>

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
          <div>
            <label className="block text-sm font-semibold mb-1">
              Build System
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-gray-300"
            />
          </div>

          {/* Libs */}
          <div>
            <label className="block text-sm font-semibold mb-1">Libs</label>
            <select className="w-full p-2 rounded-md border border-gray-300">
              {libs.map((lib) => (
                <option key={lib}>{lib}</option>
              ))}
            </select>
          </div>

          {/* resources */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              resources
            </label>
            <select className="w-full p-2 rounded-md border border-gray-300">
              {resources.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Framework de teste */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Framework de teste
            </label>
            <select className="w-full p-2 rounded-md border border-gray-300">
              {frameworks.map((fw) => (
                <option key={fw}>{fw}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
