"use client";

import React, { useRef, useState } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

const CODE_SNIPPETS: Record<string, string> = {
  javascript: `console.log("Hello JavaScript!");`,
  python: `print("Hello Python!")`,
};

interface LanguageSelectorProps {
  language: string;
  onSelect: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onSelect,
}) => (
  <select
    className="mb-2 p-2 rounded border border-gray-300"
    value={language}
    onChange={(e) => onSelect(e.target.value)}
  >
    {Object.keys(CODE_SNIPPETS).map((lang) => (
      <option key={lang} value={lang}>
        {lang.toUpperCase()}
      </option>
    ))}
  </select>
);

interface OutputProps {
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor | null>;
  language: string;
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const [output, setOutput] = useState<string>("");

  const runCode = () => {
    if (language !== "javascript") {
      setOutput("Вивід для цієї мови поки не реалізовано");
      return;
    }

    try {
      const code = editorRef.current?.getValue() ?? "";

      const logs: string[] = [];
      const originalConsoleLog = console.log;
      console.log = (...args: unknown[]) => {
        logs.push(args.map((arg) => String(arg)).join(" "));
      };

      new Function(code)();

      console.log = originalConsoleLog;

      setOutput(logs.length ? logs.join("\n") : "Без виводу");
    } catch (e: unknown) {
      setOutput("Помилка: " + (e instanceof Error ? e.message : String(e)));
    }
  };

  return (
    <div className="w-1/2 ml-4 flex flex-col">
      <button
        onClick={runCode}
        className="mb-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Запустити код
      </button>
      <pre className="bg-gray-900 text-green-400 p-4 rounded flex-1 overflow-auto h-[75vh]">
        {output}
      </pre>
    </div>
  );
};

const CodeEditor: React.FC = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState<string>("javascript");
  const [value, setValue] = useState<string>(CODE_SNIPPETS[language]);

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang: string) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
  };

  return (
    <div className="flex p-4 gap-4">
      <div className="w-1/2 flex flex-col">
        <LanguageSelector language={language} onSelect={onSelect} />
        <Editor
          height="30vh"
          theme="vs-dark"
          language={language}
          value={value}
          onChange={(val) => setValue(val || "")}
          onMount={onMount}
          options={{ minimap: { enabled: false } }}
        />
      </div>
      <Output editorRef={editorRef} language={language} />
    </div>
  );
};

export default CodeEditor;
