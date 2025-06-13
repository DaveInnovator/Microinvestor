// components/UserOverview.jsx
export default function UserOverview({ income, goal, risk }) {
  return (
    <div className="bg-gray-900 p-4 rounded shadow-lg text-white">
      <h2 className="text-lg font-semibold mb-2">📊 Your Profile</h2>
      <ul className="space-y-1 text-sm text-gray-300">
        <li><strong>Monthly Income:</strong> ₦{income}</li>
        <li><strong>Goal:</strong> {goal}</li>
        <li><strong>Risk Tolerance:</strong> {risk}</li>
      </ul>
    </div>
  )
}
