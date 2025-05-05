import { useEffect, useState } from "react";
import Select from "./components/formfields/Select";
import axios from "axios";

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
    resources: ["Graphic Interface ", "Rede", "Multithreading"],
    frameworks: ["Google Test", "Catch2", "Doctest"],
  },
  /*JAVA: {
    libs: ["SpringBoot", "Hibernate"],
    bsystem: ["JAVA"],
    resources: ["Interface", "Console"],
    frameworks: ["JUnit", "TestNG", "Mockito"],
  },*/
};

function App() {
  const languages: string[] = Object.keys(optionsByLanguage);

  const [projectName, setProjectName] = useState("");
  const [targetOS, setTargetOS] = useState("Windows");
  const [selectedLib, setSelectedLib] = useState(
    optionsByLanguage[languages[0]]?.libs[0]
  );
  const [selectedBsystem, setSelectedBsystem] = useState(
    optionsByLanguage[languages[0]]?.bsystem[0]
  );
  const [selectedResource, setSelectedResource] = useState(
    optionsByLanguage[languages[0]]?.resources[0]
  );
  const [selectedFramework, setSelectedFramework] = useState(
    optionsByLanguage[languages[0]]?.frameworks[0]
  );
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

  function defineLib(lib: string) {
    setSelectedLib(lib);
  }

  function defineBSystem(bsystem: string) {
    setSelectedBsystem(bsystem);
  }

  function defineResource(resource: string) {
    setSelectedResource(resource);
  }

  function defienFramework(framework: string) {
    setSelectedFramework(framework);
  }

  useEffect(() => {
    setLibs(optionsByLanguage[language].libs);
    setBuildSystem(optionsByLanguage[language].bsystem);
    setResources(optionsByLanguage[language].resources);
    setFrameworks(optionsByLanguage[language].frameworks);
  }, [language]);

  function onClickDownloadButton(): void {
    const body = {
      project_name: projectName,
      lang: language,
      lib: selectedLib,
      build_system: selectedBsystem,
      resources: selectedResource,
      frameworks: selectedFramework,
      target_os: targetOS,
    };
    console.log("Inciando criação do projeto");
    axios
      .post("codeforge-production-60a3.up.railway.app/generate", body, {
        responseType: "blob", // <- isso é essencial para lidar com arquivos
      })
      .then((response) => {
        const blob = new Blob([response.data], { type: "application/zip" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${body.project_name}.zip`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao gerar o projeto:", error);
      });
  }

  return (
    <div className="p-2 w-screen h-screen flex flex-col bg-slate-500 text-slate-50 font-bold">
      <h1 className="text-4xl mt-2 mb-2 text-center">CodeForge</h1>

      <div className="flex-grow flex items-center justify-center">
        <div className="p-6 w-[28rem] bg-slate-200 rounded-2xl shadow-lg text-black space-y-4">
          {/* Pproject Name */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Project Name
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-gray-300"
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <Select
            label="Language"
            options={languages}
            onChange={defineProgrammingLanguage}
          />

          {/* SO */}
          <div>
            <label className="block text-sm font-semibold mb-2">SO alvo</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="so"
                  value="windows"
                  checked={targetOS === "Windows"}
                  className="accent-blue-600"
                  onChange={(e) => setTargetOS(e.target.value)}
                />
                Windows
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="so"
                  value="linux"
                  className="accent-green-600"
                  onChange={(e) => setTargetOS(e.target.value)}
                />
                Linux
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="so"
                  value="macos"
                  className="accent-purple-600"
                  onChange={(e) => setTargetOS(e.target.value)}
                />
                macOS
              </label>
            </div>
          </div>

          {/* Build System */}
          <Select
            label="Build System"
            options={bsystem}
            onChange={defineBSystem}
          />

          {/* Libs */}
          <Select label="Libs" options={libs} onChange={defineLib} />

          {/* Resources */}
          <Select
            label="resources"
            options={resources}
            onChange={defineResource}
          />

          {/* Framework */}
          <Select
            label="Test Framework"
            options={frameworks}
            onChange={defienFramework}
          />

          <div>
            <button
              onClick={onClickDownloadButton}
              className="w-full p-2 bg-green-200 rounded-md"
            >
              Download Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
