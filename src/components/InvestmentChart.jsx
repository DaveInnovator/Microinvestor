// components/InvestmentChart.jsx
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend)

export default function InvestmentChart({ allocations = {} }) {
  if (!allocations || typeof allocations !== 'object') {
    console.error("Invalid allocations data for InvestmentChart:", allocations)
    return null
  }

  const data = {
    labels: Object.keys(allocations),
    datasets: [
      {
        data: Object.values(allocations),
        backgroundColor: ['#34d399', '#60a5fa', '#f87171'],
        borderColor: '#1f2937', // Dark border
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="bg-gray-900 p-4 rounded shadow-lg text-white">
      <h2 className="text-lg font-semibold mb-4">📊 Allocation Breakdown</h2>
      <Pie data={data} />
    </div>
  )
}
