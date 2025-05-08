import React, { useState, useRef, useEffect } from 'react';
import { Upload, AlertCircle, FileVideo, FileImage, Loader2, Moon, Sun, Shield, Phone } from 'lucide-react';
import DifferenceOverlay from './components/DifferenceOverlay';

interface FileDisplay {
  file: File | null;
  preview: string;
  type: 'image' | 'video';
}

function App() {
  const [originalFile, setOriginalFile] = useState<FileDisplay>({ file: null, preview: '', type: 'image' });
  const [testFile, setTestFile] = useState<FileDisplay>({ file: null, preview: '', type: 'image' });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ score: number | null; message: string | null }>({
    score: null,
    message: null,
  });
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode === 'true';
  });
  
  const formRef = useRef<HTMLFormElement>(null);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: (value: FileDisplay) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      const type = file.type.startsWith('image/') ? 'image' : 'video';
      setFile({ file, preview, type });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!originalFile.file || !testFile.file) return;

    setIsAnalyzing(true);
    setResult({ score: null, message: null });

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        score: 85,
        message: "High probability of deepfake detected",
      });
    }, 2000);
  };

  const FileUploadBox = ({ 
    label, 
    file, 
    onChange 
  }: { 
    label: string; 
    file: FileDisplay; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
  }) => (
    <div className="w-full transform hover:scale-105 transition-transform duration-300">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">{label}</label>
      <div className={`
        border-2 border-dashed rounded-lg p-4 backdrop-blur-sm
        ${file.file 
          ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20' 
          : 'border-gray-300 hover:border-blue-500 bg-white/30 dark:bg-gray-800/30'}
        transition-all duration-300
      `}>
        <input
          type="file"
          accept="image/*,video/*"
          onChange={onChange}
          className="hidden"
          id={label}
        />
        <label
          htmlFor={label}
          className="flex flex-col items-center justify-center cursor-pointer"
        >
          {file.file ? (
            <div className="w-full">
              {file.type === 'image' ? (
                <img
                  src={file.preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              ) : (
                <video
                  src={file.preview}
                  controls
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
              )}
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 text-center">
                {file.file.name}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <div className="flex justify-center gap-2">
                <FileImage className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                <FileVideo className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Click or drag to upload {label.toLowerCase()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Supports images and videos
              </p>
            </div>
          )}
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 animate-gradient-shift"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="bubble"
              style={{
                '--size': `${Math.random() * 8 + 4}rem`,
                '--left': `${Math.random() * 100}%`,
                '--delay': `${Math.random() * 5}s`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={toggleDarkMode}
        className="fixed top-4 right-4 p-2 rounded-full bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform duration-300"
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-yellow-500" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button>

      <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in flex items-center justify-center gap-3">
              <Shield className="w-8 h-8 text-blue-500" />
              Deepfake Detection System
              <span role="img" aria-label="AI" className="text-3xl">🤖</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in-delayed">
              Upload original and test files to analyze for potential deepfake manipulation
            </p>
          </div>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-xl shadow-xl p-6 mb-8 animate-slide-up"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <FileUploadBox
                label="Original File"
                file={originalFile}
                onChange={(e) => handleFileChange(e, setOriginalFile)}
              />
              <FileUploadBox
                label="Test File"
                file={testFile}
                onChange={(e) => handleFileChange(e, setTestFile)}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!originalFile.file || !testFile.file || isAnalyzing}
                className={`
                  flex items-center justify-center px-6 py-3 rounded-lg
                  text-white font-medium text-lg
                  ${isAnalyzing || !originalFile.file || !testFile.file
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transform hover:scale-105 hover:shadow-lg'}
                  transition-all duration-300
                `}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2" />
                    Analyze Files
                  </>
                )}
              </button>
            </div>
          </form>

          {result.score !== null && (
            <div className="backdrop-blur-md bg-white/70 dark:bg-gray-800/70 rounded-xl shadow-xl p-6 animate-fade-in">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Analysis Results
                </h2>
                <div className="flex items-center justify-center gap-2 text-lg text-gray-700 dark:text-gray-200">
                  <AlertCircle className="text-yellow-500 animate-pulse" />
                  <span>{result.message}</span>
                </div>
              </div>

              <div className="relative pt-1 mb-8">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200 dark:text-blue-200 dark:bg-blue-900">
                      Match Percentage
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600 dark:text-blue-300">
                      {result.score}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200 dark:bg-blue-900">
                  <div
                    style={{ width: `${result.score}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 dark:bg-blue-400 transition-all duration-1000 ease-out"
                  />
                </div>
              </div>

              {originalFile.type === 'image' && testFile.type === 'image' && (
                <div className="relative h-0 w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              
                  </h3>
                  <DifferenceOverlay
                    originalImage={originalFile.preview}
                    testImage={testFile.preview}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Helpline Information */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 p-6 rounded-xl shadow-xl backdrop-blur-md bg-white/80 dark:bg-gray-800/80 transition-all duration-300">
        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Cybercrime Helpline
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              If you've detected a deepfake or need to report cybercrime:
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-500">1930</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                (24/7 National Helpline Number)
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              You can also visit the National Cyber Crime Reporting Portal at{' '}
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                cybercrime.gov.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;