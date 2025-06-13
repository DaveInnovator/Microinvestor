// components/InvestmentSuggestions.jsx
export default function InvestmentSuggestions({ advice }) {
  return (
    <div className="bg-gray-900 p-4 rounded shadow-lg text-white">
      <h2 className="text-lg font-semibold mb-2">💡 AI Investment Plan</h2>
      <p className="text-sm text-gray-300 whitespace-pre-wrap">
        {advice}
      </p>
    </div>
  )
}
