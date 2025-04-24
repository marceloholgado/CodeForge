import { useState } from "react";
import ProgrammingLanguage from "./components/formfields/Language";

const optionsByLanguage = {
  "C++": {
    libs: ["Boost", "SDL2", "OpenCV"],
    recursos: ["Interface gráfica", "Rede", "Multithreading"],
    frameworks: ["Google Test", "Catch2", "Doctest"],
  },
  "C++2": {
    libs: ["Boost", "SDL2", "OpenCV"],
    recursos: ["Interface gráfica", "Rede", "Multithreading"],
    frameworks: ["Google Test", "Catch2", "Doctest"],
  },
};

function App() {
  const languages = Object.keys(optionsByLanguage);

  const [language, setLanguage] = useState(languages[0]);

  const libs = optionsByLanguage[languages[0]]?.libs || [];
  const recursos = optionsByLanguage[languages[0]]?.recursos || [];
  const frameworks = optionsByLanguage[languages[0]]?.frameworks || [];

  function defineProgrammingLanguage(lang) {
    setLanguage(lang);
  }

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
              value={(languages[0], languages[1])}
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

          {/* Recursos */}
          <div>
            <label className="block text-sm font-semibold mb-1">Recursos</label>
            <select className="w-full p-2 rounded-md border border-gray-300">
              {recursos.map((r) => (
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
