import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend
)

function calculateTotal(paper) {
    const m = parseFloat(paper.marks) || 0
    const sm = parseFloat(paper.structureMarks) || 0
    const em = parseFloat(paper.essayMarks) || 0
    return m + sm + em
}

export default function ScoreChart({ papers, subjectName }) {
  const labels = papers.map((p) => p.name)
  
  const subjectColors = {
    agriculture: {
      marks: 'rgba(34, 197, 94, 0.7)',     // green
      structure: 'rgba(74, 222, 128, 0.7)', // light green
      essay: 'rgba(134, 239, 172, 0.7)'     // lighter green
    },
    sinhala: {
      marks: 'rgba(255, 0, 0, 1)',     // red
      structure: 'rgba(255, 71, 71, 1)',  // light red
      essay: 'rgba(255, 127, 127, 1)'      // lighter red
    },
    bc: {
      marks: 'rgba(255, 204, 0, 1)',      // yellow
      structure: 'rgba(255, 193, 7, 0.7)',  // light yellow
      essay: 'rgba(255, 217, 108, 0.7)'       // lighter yellow
    }
  }

  const colors = subjectName ? subjectColors[subjectName.toLowerCase()] : subjectColors.agriculture

  const data = {
    labels,
    datasets: [
      {
        label: 'Marks',
        data: papers.map((p) => p.marks),
        backgroundColor: colors.marks,
      },
      {
        label: 'Structure Marks',
        data: papers.map((p) => p.structureMarks),
        backgroundColor: colors.structure,
      },
      {
        label: 'Essay Marks',
        data: papers.map((p) => p.essayMarks),
        backgroundColor: colors.essay,
      }
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { 
        display: true, 
        text: `${subjectName || 'Subject'} - Marks per Paper`,
        font: { size: 16 }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y;
            }
            return label;
          },
          afterBody: function(context) {
            const paperIndex = context[0].dataIndex;
            const paper = papers[paperIndex];
            if (paper) {
              const total = calculateTotal(paper);
              return [`Total: ${total}`];
            }
            return [];
          }
        }
      }
    },
    scales: {
      y: { 
        beginAtZero: true, 
        max: 100,
        title: {
          display: true,
          text: 'Marks'
        }
      },
      x: {
        ticks: {
          callback: function(value, index, values) {
            const paper = papers[index]
            if (paper) {
              const total = calculateTotal(paper)
              return [paper.name, `Total: ${total}`]
            }
            return value
          },
          font: {
            size: 11,
            lineHeight: 1.5
          },
          maxRotation: 0,
          minRotation: 0
        }
      }
    },
  }

  // Calculate statistics
  const totals = papers.map(paper => calculateTotal(paper))
  const average = papers.length 
    ? (totals.reduce((sum, total) => sum + total, 0) / papers.length).toFixed(2) 
    : '-'
  const highest = papers.length ? Math.max(...totals) : '-'
  const lowest = papers.length ? Math.min(...totals) : '-'

  return (
    <div>
      {/* Statistics Cards */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 p-3 rounded text-center">
          <div className="text-sm text-gray-600">Average Total</div>
          <div className="text-xl font-bold text-blue-700">{average}</div>
        </div>
        <div className="bg-green-50 p-3 rounded text-center">
          <div className="text-sm text-gray-600">Highest Total</div>
          <div className="text-xl font-bold text-green-700">{highest}</div>
        </div>
        <div className="bg-red-50 p-3 rounded text-center">
          <div className="text-sm text-gray-600">Lowest Total</div>
          <div className="text-xl font-bold text-red-700">{lowest}</div>
        </div>
      </div>

      {/* Papers Count */}
      <div className="mb-3 text-sm text-gray-600">
        Total Papers: {papers.length}
      </div>

      {/* Chart */}
      {papers.length > 0 ? (
        <Bar options={options} data={data} />
      ) : (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded">
          No papers added for {subjectName} yet. Add some papers to see the chart.
        </div>
      )}
    </div>
  )
}