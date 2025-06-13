import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OnboardingStep from '../components/OnboardingStep'
import { generateInvestmentAdvice } from '../utils/generateAdvice'
import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { useNavigate } from 'react-router-dom'

pdfMake.vfs = pdfFonts.vfs

const steps = [
  'What’s your monthly income?',
  'What’s your main financial goal?',
  'What’s your risk tolerance level?',
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    income: '',
    goal: '',
    risk: '',
  })

  const [loading, setLoading] = useState(false)
  const [advice, setAdvice] = useState('')

  const handleNext = () => {
    if (step < steps.length) setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1)
  }

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const getAdvice = async () => {
    setLoading(true)
    try {
      const result = await generateInvestmentAdvice(
        formData.income,
        formData.goal,
        formData.risk
      )
      setAdvice(result)

      // Save data to localStorage for dashboard
      localStorage.setItem('microInvestorFormData', JSON.stringify(formData))
      localStorage.setItem('microInvestorAdvice', result)
    } catch (err) {
      console.error(err)
      setAdvice('Something went wrong. Try again later.')
    } finally {
      setLoading(false)
    }
  }

  const downloadPDF = () => {
    const docDefinition = {
      content: [
        { text: '📊 Your AI-Powered Investment Plan', style: 'header' },
        { text: `\nMonthly Income: ₦${formData.income}` },
        { text: `Financial Goal: ${formData.goal}` },
        { text: `Risk Tolerance: ${formData.risk}` },
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

  useEffect(() => {
    if (step === 3 && !advice) {
      getAdvice()
    }
  }, [step])

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-950 text-white p-4">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <OnboardingStep question={steps[0]} key="step1">
            <input
              type="number"
              placeholder="₦ Monthly Income"
              className="w-full px-4 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 ring-green-400"
              value={formData.income}
              onChange={handleChange('income')}
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-green-500 rounded hover:bg-green-600"
              >
                Next
              </button>
            </div>
          </OnboardingStep>
        )}

        {step === 1 && (
          <OnboardingStep question={steps[1]} key="step2">
            <select
              value={formData.goal}
              onChange={handleChange('goal')}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white outline-none focus:ring-2 ring-green-400"
            >
              <option value="">Select goal</option>
              <option value="save">Save for emergency</option>
              <option value="invest">Grow wealth (investing)</option>
              <option value="travel">Travel</option>
              <option value="retire">Retire early</option>
            </select>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleBack}
                className="px-6 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-green-500 rounded hover:bg-green-600"
              >
                Next
              </button>
            </div>
          </OnboardingStep>
        )}

        {step === 2 && (
          <OnboardingStep question={steps[2]} key="step3">
            <div className="flex flex-col gap-3">
              {['Low', 'Medium', 'High'].map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    setFormData({ ...formData, risk: level.toLowerCase() })
                    handleNext()
                  }}
                  className="w-full py-2 rounded bg-gray-800 hover:bg-green-600"
                >
                  {level}
                </button>
              ))}
              <button
                onClick={handleBack}
                className="mt-2 px-6 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Back
              </button>
            </div>
          </OnboardingStep>
        )}

        {step === 3 && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-lg"
          >
            <h2 className="text-2xl font-bold mb-4">🎯 AI-Generated Plan</h2>
            {loading ? (
              <p className="text-green-400 animate-pulse">
                Thinking like Warren Buffet...
              </p>
            ) : (
              <>
                <div className="bg-gray-800 p-4 rounded whitespace-pre-wrap text-left mb-4">
                  <p><strong>Monthly Income:</strong> ₦{formData.income}</p>
                  <p><strong>Financial Goal:</strong> {formData.goal}</p>
                  <p><strong>Risk Tolerance:</strong> {formData.risk}</p>
                  <hr className="my-2 border-gray-600" />
                  <p><strong>AI-Generated Plan:</strong></p>
                  <p>{advice}</p>
                </div>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={handleBack}
                    className="px-6 py-2 bg-gray-700 rounded hover:bg-gray-600"
                  >
                    Back
                  </button>
                  <button
                    onClick={downloadPDF}
                    className="px-6 py-2 bg-green-500 rounded hover:bg-green-600"
                  >
                    Save as PDF
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-6 py-2 bg-blue-500 rounded hover:bg-blue-600"
                  >
                    View Dashboard
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
