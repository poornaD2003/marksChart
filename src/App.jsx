import React, { useState, useEffect } from 'react'
import InputForm from './components/InputForm'
import ScoreChart from './components/ScoreChart'

export default function App() {
  const [papers, setPapers] = useState({
    agriculture: [],
    sinhala: [],
    bc: []
  })
  const [activeSubject, setActiveSubject] = useState('agriculture')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedPapers = localStorage.getItem('subjectPapers')
    if (savedPapers) {
      try {
        setPapers(JSON.parse(savedPapers))
      } catch (error) {
        console.error('Error loading saved papers:', error)
      }
    }
    
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('subjectPapers', JSON.stringify(papers))
  }, [papers])

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  function addPaper(p) {
    setPapers((prev) => ({
      ...prev,
      [activeSubject]: [...prev[activeSubject], p]
    }))
  }

  function clearAll() {
    setPapers((prev) => ({
      ...prev,
      [activeSubject]: []
    }))
  }

  function clearAllSubjects() {
    setPapers({
      agriculture: [],
      sinhala: [],
      bc: []
    })
  }

  const subjects = [
    { id: 'agriculture', name: 'Agriculture', color: 'green' },
    { id: 'sinhala', name: 'Sinhala', color: 'red' },
    { id: 'bc', name: 'BC', color: 'yellow' }
  ]

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${
      darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className={`max-w-4xl mx-auto p-6 rounded shadow transition-colors duration-300 ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Subject ScoreBoard</h1>
          
          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-full transition-colors duration-300 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Subject Buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setActiveSubject(subject.id)}
              className={`px-4 py-2 rounded text-white transition-all ${
                activeSubject === subject.id 
                  ? `bg-${subject.color}-600 ring-2 ring-offset-2 ${
                      darkMode ? 'ring-offset-gray-800' : 'ring-offset-white'
                    } ring-gray-400` 
                  : darkMode 
                    ? 'bg-gray-600 hover:bg-gray-500' 
                    : 'bg-gray-400 hover:bg-gray-500'
              }`}
            >
              {subject.name}
            </button>
          ))}
        </div>

        {/* Active Subject Indicator */}
        <div className={`mb-4 p-3 rounded border-l-4 border-blue-500 transition-colors duration-300 ${
          darkMode ? 'bg-gray-700' : 'bg-gray-50'
        }`}>
          <h2 className="text-lg font-medium">
            Active Subject: <span className="text-blue-600 dark:text-blue-400">
              {subjects.find(s => s.id === activeSubject)?.name}
            </span>
          </h2>
        </div>

        <InputForm onAdd={addPaper} activeSubject={activeSubject} darkMode={darkMode} />
        
        <div className="mt-6">
          <ScoreChart papers={papers[activeSubject]} subjectName={subjects.find(s => s.id === activeSubject)?.name} darkMode={darkMode} />
        </div>
        
        <div className="mt-4 flex gap-2">
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Clear {subjects.find(s => s.id === activeSubject)?.name}
          </button>
          <button
            onClick={clearAllSubjects}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Clear All Subjects
          </button>
        </div>
      </div>
    </div>
  )
}