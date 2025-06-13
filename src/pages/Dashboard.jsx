import { useEffect, useState } from 'react'
import InvestmentChart from '../components/InvestmentChart'
import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.vfs

export default function Dashboard() {
  const [formData, setFormData] = useState(null)
  const [advice, setAdvice] = useState('')
  const [allocations, setAllocations] = useState({})

  useEffect(() => {
    const storedFormData = localStorage.getItem('microInvestorFormData')
    const storedAdvice = localStorage.getItem('microInvestorAdvice')

    if (storedFormData) {
      const parsed = JSON.parse(storedFormData)
      setFormData(parsed)

      setAllocations({
        'Index Funds': Math.floor(parsed.income * 0.25),
        'Emergency Fund': Math.floor(parsed.income * 0.10),
        'Crypto/Alt': Math.floor(parsed.income * 0.05),
      })
    }

    if (storedAdvice) {
      setAdvice(storedAdvice)
    }
  }, [])

  const downloadPDF = () => {
    const docDefinition = {
      content: [
        { text: '📊 Your AI-Powered Investment Plan', style: 'header' },
        { text: `\nMonthly Income: ₦${formData.income}` },
        { text: `Financial Goal: ${formData.goal}` },
        { text: `Risk Tolerance: ${formData.risk}` },
        {
          text: '\nRecommended Allocations:',
          style: 'subheader',
        },
        ...Object.entries(allocations).map(([key, value]) => ({
          text: `${key}: ₦${value}`,
        })),
        { text: '\nAI-Generated Advice:', style: 'subheader' },
        { text: advice || 'No advice generated.' },
      ],
      styles: {
        header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
      },
    }

    pdfMake.createPdf(docDefinition).download('investment-plan.pdf')
  }

  if (!formData)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🚫 No Investment Data Found</h1>
      <p className="text-gray-400 mb-6">
        Looks like you haven’t filled out the investment assessment yet.
      </p>
      <a
        href="/onboarding"
        className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        🧠 Take Assessment Now
      </a>
    </div>
  )


  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">📈 MicroInvestor Dashboard</h1>
        
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gray-900 p-4 rounded shadow">
          <h2 className="text-sm text-gray-400">Monthly Income</h2>
          <p className="text-xl font-bold text-green-400">₦{formData.income}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded shadow">
          <h2 className="text-sm text-gray-400">Goal</h2>
          <p className="text-lg">{formData.goal}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded shadow">
          <h2 className="text-sm text-gray-400">Risk</h2>
          <p className="capitalize">{formData.risk}</p>
        </div>
      </section>

      <InvestmentChart allocations={allocations} />

      <section className="bg-gray-900 p-6 rounded shadow-lg space-y-4">
        <h2 className="text-xl font-semibold"> AI Investment Summary</h2>
        <pre className="bg-gray-800 p-4 rounded whitespace-pre-wrap text-green-300">
          {advice}
        </pre>
        <div className="flex gap-4">
          <button
            onClick={downloadPDF}
            className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
          >
            Download PDF
          </button>
          <button
            className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
            onClick={() => {
              localStorage.clear()
              window.location.href = '/'
            }}
          >
            Retake Assessment
          </button>
        </div>
      </section>
    </div>
  )
}
