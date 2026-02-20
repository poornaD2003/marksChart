import React, { useState } from 'react'

export default function InputForm({ onAdd, activeSubject }) {
  const [name, setName] = useState('')
  const [marks, setMarks] = useState('')
  const [structureMarks, setStructureMarks] = useState('')
  const [essayMarks, setEssayMarks] = useState('')

  const subjectColors = {
    agriculture: 'green',
    sinhala: 'red',
    bc: 'yellow'
  }

  function submit(e) {
    e.preventDefault()
    const m = parseFloat(marks) || 0
    const sm = parseFloat(structureMarks) || 0
    const em = parseFloat(essayMarks) || 0
    
    if (!name.trim()) return
    
    onAdd({ 
      name: name.trim(), 
      marks: m,
      structureMarks: sm,
      essayMarks: em,
      subject: activeSubject,
      date: new Date().toISOString()
    })
    
    // Clear form
    setName('')
    setMarks('')
    setStructureMarks('')
    setEssayMarks('')
  }

  return (
    <form onSubmit={submit} className="grid grid-cols-1 gap-3 sm:grid-cols-4">
      <input
        className="border p-2 rounded col-span-4"
        placeholder="Paper name "
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        className="border p-2 rounded"
        placeholder="MCQ Marks "
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
        type="number"
        min="0"
        max="100"
        step="0.1"
      />
      <input
        className="border p-2 rounded"
        placeholder="Structure Marks "
        value={structureMarks}
        onChange={(e) => setStructureMarks(e.target.value)}
        type="number"
        min="0"
        max="100"
        step="0.1"
      />
      <input
        className="border p-2 rounded"
        placeholder="Essay Marks "
        value={essayMarks}
        onChange={(e) => setEssayMarks(e.target.value)}
        type="number"
        min="0"
        max="100"
        step="0.1"
      />
      <div className="col-span-4">
        <button 
          type="submit" 
          className={`mt-2 px-4 py-2 bg-${subjectColors[activeSubject]}-600 text-white rounded hover:bg-${subjectColors[activeSubject]}-700 transition-colors`}
        >
          Add Paper to {activeSubject.charAt(0).toUpperCase() + activeSubject.slice(1)}
        </button>
      </div>
    </form>
  )
}