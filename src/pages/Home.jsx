import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
         Micro-Investor
      </motion.h1>
      <motion.p
        className="text-lg max-w-md text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        AI that helps you invest small and grow smart. Let's build your future one ₦ at a time.
      </motion.p>
      <motion.button
        className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 transition rounded-md font-semibold"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate('/onboarding')}
      >
        Get Started
      </motion.button>
    </div>
  )
}
